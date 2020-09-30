import config from '../../configuration'
import { v1 as uuidV1 } from 'uuid'
import express from 'express'
import allEvents from './events'
import * as calculations from './calculations'
import LightningClient from 'lightning-client'
import { createAoStore, pubState } from '../app/store'

const lightningRouter = express.Router()
const client = config.clightning.enable
  ? new LightningClient(config.clightning.dir, true)
  : null

lightningRouter.post('/lightning/channel', (req, res) => {
  if (client) {
    client.fundchannel(req.body.id, 'all').then(channel => {
      console.log(channel)
      res.send(true)
    })
  }
})

export function createInvoice(amount, label, description, expiresInSec) {
  return client.invoice(amount * 1000, label, description, expiresInSec)
}

export function newAddress() {
  return client.newaddr('p2sh-segwit')
}

export function updateAll() {
  checkFunds()
  getInfo()
}

export function watchOnChain() {
  setInterval(updateAll, 1000 * 60 * 10)
  setTimeout(() => {
    updateAll()
  }, 560)
}

export function checkFunds() {
  const aoStore = createAoStore(pubState)()
  return client
    .listfunds()
    .then(result => {
      try {
        allEvents.fundsSet(result.outputs, result.channels)
        result.outputs.forEach(o => {
          if (
            o.status === 'confirmed' &&
            aoStore.state.cash.usedTxIds.indexOf(o.txid) === -1
          ) {
            aoStore.state.tasks.forEach(t => {
              if (t.address === o.address) {
                let cadAmt = calculations.satsToCad(
                  o.value,
                  aoStore.state.cash.spot
                )
                allEvents.taskBoosted(t.taskId, cadAmt, o.txid)
              }
            })
          }
        })
      } catch (err) {
        console.log(
          'lighting error; maybe lightningd (c-lightning) is not running'
        )
      }
    })
    .catch(console.log)
}

export function getInfo() {
  return client
    .getinfo()
    .then(result => {
      client
        .listpeers()
        .then(peers => {
          try {
            result.peers = peers.peers.map(p => {
              return {
                id: p.id,
                channels: p.channels.length > 0
              }
            })
            console.log('lightning client result:', result)
          } catch (err) {}
          try {
            allEvents.getNodeInfo(result)
          } catch (err) {
            console.log('getNodeInfo error:  ', err)
          }
        })
        .catch(err => {})
    })
    .catch(console.log)
}

export function recordEveryInvoice(start) {
  client
    .waitanyinvoice(start)
    .then(invoice => {
      let satoshis = invoice.msatoshi / 1000
      let spot = serverState.cash.spot
      let cadAmt = calculations.satsToCad(satoshis, spot)
      serverState.tasks.forEach(t => {
        if (t.payment_hash === invoice.payment_hash) {
          allEvents.taskBoostedLightning(
            t.taskId,
            cadAmt,
            invoice.payment_hash,
            invoice.pay_index
          )
        }
      })
      recordEveryInvoice(start + 1)
    })
    .catch(console.log)
}
