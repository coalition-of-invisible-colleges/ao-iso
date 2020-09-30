import db from './db';

class Events {
  highlighted(taskId, memberId, valence, callback) {
    let newEvent = {
      type: 'highlighted',
      taskId,
      memberId,
      valence
    }
    db.insertEvent(newEvent, callback)
  }
  
  aoInboundConnected(address, secret, callback) {
    let newEvent = {
      type: 'ao-inbound-connected',
      address,
      secret
    }
    db.insertEvent(newEvent, callback)
  }
  
  aoLinked(address, taskId, callback) {
    let newEvent = {
      type: 'ao-linked',
      address,
      taskId
    }
    db.insertEvent(newEvent, callback)
  }
  
  aoOutboundConnected(address, secret, callback) {
    let newEvent = {
      type: 'ao-outbound-connected',
      address,
      secret
    }
    db.insertEvent(newEvent, callback)
  }
  
  aoDisconnected(address, callback) {
    let newEvent = {
      type: 'ao-disconnected',
      address
    }
    db.insertEvent(newEvent, callback)
  }
  
  aoNamed(alias, callback) {
    let newEvent = {
      type: 'ao-named',
      alias
    }
    db.insertEvent(newEvent, callback)
  }
  
  getNodeInfo(info, callback) {
    let newEvent = {
      type: 'get-node-info',
      info
    }
    db.triggerShadow(newEvent)
  }
  
  rentSet(amount, callback) {
    let newEvent = {
      type: 'rent-set',
      amount
    }
    db.insertEvent(newEvent, callback)
  }
  
  capSet(amount, callback) {
    let newEvent = {
      type: 'cap-set',
      amount
    }
    db.insertEvent(newEvent, callback)
  }
  
  spotUpdated(spot, callback) {
    let newEvent = {
      type: 'spot-updated',
      spot
    }
    db.triggerShadow(newEvent)
  }
  
  currencySwitched(currency, callback) {
    let newEvent = {
      type: 'currency-switched',
      currency
    }
    db.insertEvent(newEvent, callback)
  }
  
  fundsSet(outputs, channels, callback) {
    let newEvent = {
      type: 'funds-set',
      outputs,
      channels
    }
    db.triggerShadow(newEvent)
  }
  
  memberCreated(name, fob, secret, callback) {
    let memberId = uuidV1()
    let newEvent = {
      type: 'member-created',
      memberId,
      fob,
      name,
      secret,
      active: 1,
      balance: 0,
      badges: [],
      info: {},
      lastActivated: 7
    }
    db.insertEvent(newEvent, callback)
  }
  
  memberDeactivated(memberId, callback) {
    let newEvent = {
      type: 'member-deactivated',
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  memberPurged(memberId, blame, callback) {
    let newEvent = {
      type: 'member-purged',
      memberId,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  memberActivated(memberId, callback) {
    let newEvent = {
      type: 'member-activated',
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  memberFieldUpdated(memberId, field, newfield, callback) {
    let newEvent = {
      type: 'member-field-updated',
      memberId,
      field,
      newfield
    }
    db.insertEvent(newEvent, callback)
  }
  
  memberTickerSet(memberId, symbol, index, callback) {
    let newEvent = {
      type: 'member-ticker-set',
      memberId,
      symbol,
      index
    }
    db.insertEvent(newEvent, callback)
  }
  
  dogeBarked(memberId, callback) {
    let newEvent = {
      type: 'doge-barked',
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  dogeMuted(memberId, callback) {
    let newEvent = {
      type: 'doge-muted',
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  dogeUnmuted(memberId, callback) {
    let newEvent = {
      type: 'doge-unmuted',
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  resourceCreated(
    resourceId,
    name,
    charged,
    secret,
    trackStock,
    callback
  ) {
    let newEvent = {
      type: 'resource-created',
      resourceId,
      name,
      charged,
      secret,
      info: {}
    }
    if (trackStock) {
      newEvent.stock = 0
    }
    db.insertEvent(newEvent, callback)
  }
  
  resourceStocked(resourceId, memberId, amount, paid, notes, callback) {
    let newEvent = {
      type: 'resource-stocked',
      resourceId,
      memberId,
      amount,
      paid,
      notes
    }
    db.insertEvent(newEvent, callback)
  }
  
  resourceUsed(resourceId, memberId, amount, charged, notes, callback) {
    let newEvent = {
      type: 'resource-used',
      resourceId,
      memberId,
      amount,
      charged,
      notes
    }
    db.insertEvent(newEvent, callback)
  }
  
  resourceBooked(
    resourceId,
    memberId,
    startTs,
    endTs,
    eventType,
    charge,
    notes,
    callback
  ) {
    let newEvent = {
      type: 'resource-booked',
      resourceId,
      memberId,
      startTs,
      endTs,
      eventType,
      charge,
      notes
    }
    db.insertEvent(newEvent, callback)
  }
  
  bookCancelled(resourceId, bookTime, callback) {
    let newEvent = {
      type: 'book-cancelled',
      resourceId,
      bookTime
    }
    db.insertEvent(newEvent, callback)
  }
  
  resourcePurged(resourceId, blame, callback) {
    let newEvent = {
      type: 'resource-purged',
      resourceId,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  memeAdded(filename, hash, filetype, callback) {
    let newEvent = {
      type: 'meme-added',
      taskId: uuidV1(),
      filename: filename,
      hash: hash,
      filetype: filetype
    }
    db.insertEvent(newEvent, callback)
  }
  
  sessionCreated(ownerId, session, token, callback) {
    let newEvent = {
      type: 'session-created',
      session,
      token,
      ownerId
    }
    db.insertEvent(newEvent, callback)
  }
  
  sessionKilled(session, callback) {
    let newEvent = {
      type: 'session-killed',
      session
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskCreated(name, color, deck, inId, prioritized, callback) {
    let h = crypto.createHash('sha256')
    h.update(name)
    let hash = h.digest('hex')
    let isExist = false
  
    serverState.tasks.forEach(t => {
      if (t.hash === hash) {
        isExist = true
      }
    })
  
    if (!isExist) {
      let newEvent = {
        type: 'task-created',
        taskId: uuidV1(),
        lastClaimed: Date.now(),
        name,
        color,
        deck,
        hash,
        inId,
        prioritized
      }
      db.insertEvent(newEvent, callback)
    }
  }
  
  addressUpdated(taskId, address, callback) {
    db.insertEvent(
      {
        type: 'address-updated',
        taskId,
        address
      },
      callback
    )
  }
  
  taskGuilded(taskId, guild, callback) {
    let newEvent = {
      type: 'task-guilded',
      taskId,
      guild
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskGrabbed(taskId, memberId, callback) {
    let newEvent = {
      type: 'task-grabbed',
      taskId,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  pileGrabbed(taskId, memberId, callback) {
    let newEvent = {
      type: 'pile-grabbed',
      taskId,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  pileDropped(taskId, memberId, callback) {
    let newEvent = {
      type: 'pile-dropped',
      taskId,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskSubTasked(taskId, subTask, memberId, callback) {
    let newEvent = {
      type: 'task-sub-tasked',
      taskId,
      subTask,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskDeSubTasked(taskId, subTask, memberId, callback) {
    let newEvent = {
      type: 'task-de-sub-tasked',
      taskId,
      subTask,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskPrioritized(taskId, inId, position, callback) {
    let newEvent = {
      type: 'task-prioritized',
      taskId,
      inId,
      position
    }
    db.insertEvent(newEvent, callback)
  }
  
  pilePrioritized(inId, callback) {
    let newEvent = {
      type: 'pile-prioritized',
      inId
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskRefocused(taskId, inId, blame, callback) {
    let newEvent = {
      type: 'task-refocused',
      taskId,
      inId,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  pileRefocused(inId, blame, callback) {
    let newEvent = {
      type: 'pile-refocused',
      inId,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskDropped(taskId, memberId, callback) {
    let newEvent = {
      type: 'task-dropped',
      taskId,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskPassed(taskId, fromMemberId, toMemberId, callback) {
    let newEvent = {
      type: 'task-passed',
      taskId,
      fromMemberId,
      toMemberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskValued(taskId, value, blame, callback) {
    let newEvent = {
      type: 'task-valued',
      taskId,
      value,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskColored(taskId, inId, color, blame, callback) {
    let newEvent = {
      type: 'task-colored',
      taskId,
      inId,
      color,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskClaimed(taskId, memberId, blame, callback) {
    let newEvent = {
      type: 'task-claimed',
      taskId,
      memberId,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskUnclaimed(taskId, memberId, blame, callback) {
    let newEvent = {
      type: 'task-unclaimed',
      taskId,
      memberId,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskBoosted(taskId, amount, txid, callback) {
    let newEvent = {
      type: 'task-boosted',
      taskId,
      amount,
      txid
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskBoostedLightning(
    taskId,
    amount,
    payment_hash,
    pay_index,
    callback
  ) {
    let newEvent = {
      type: 'task-boosted-lightning',
      taskId,
      amount,
      payment_hash,
      pay_index
    }
    db.insertEvent(newEvent, callback)
  }
  
  tasksRemoved(taskIds, blame, callback) {
    let newEvent = {
      type: 'tasks-removed',
      taskIds,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskSwapped(taskId, swapId1, swapId2, blame, callback) {
    let newEvent = {
      type: 'task-swapped',
      taskId,
      swapId1,
      swapId2,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskBumped(taskId, bumpId, direction, blame, callback) {
    let newEvent = {
      type: 'task-bumped',
      taskId,
      bumpId,
      direction,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  tasksReceived(tasks, blame, callback) {
    let newEvent = {
      type: 'tasks-received',
      tasks,
      blame
    }
    db.insertEvent(newEvent, callback)
  }
  
  invoiceCreated(taskId, bolt11, payment_hash, callback) {
    let newEvent = {
      type: 'invoice-created',
      taskId,
      bolt11,
      payment_hash
    }
    db.insertEvent(newEvent, callback)
  }
  
  memberCharged(memberId, charged, notes, callback) {
    let newEvent = {
      type: 'member-charged',
      memberId,
      charged,
      notes
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskTimeClocked(taskId, memberId, seconds, date, callback) {
    let newEvent = {
      type: 'task-time-clocked',
      taskId,
      memberId,
      seconds,
      date
    }
    db.insertEvent(newEvent, callback)
  }
  
  taskSeen(taskId, memberId, callback) {
    let newEvent = {
      type: 'task-seen',
      taskId,
      memberId
    }
    db.insertEvent(newEvent, callback)
  }
  
  gridCreated(name, height, width, color, deck, callback) {
    let taskId = uuidV1()
    let newEvent = {
      type: 'grid-created',
      taskId,
      name,
      height,
      width,
      color,
      deck
    }
    db.insertEvent(newEvent, callback)
  }
  
  gridAdded(taskId, height, width, callback) {
    let newEvent = {
      type: 'grid-added',
      taskId,
      height,
      width
    }
    db.insertEvent(newEvent, callback)
  }
  
  gridResized(taskId, height, width, callback) {
    let newEvent = { type: 'grid-resized', taskId, height, width }
    db.insertEvent(newEvent, callback)
  }
  
  gridPin(inId, taskId, x, y, callback) {
    let newEvent = { type: 'grid-pin', inId, taskId, x, y }
    db.insertEvent(newEvent, callback)
  }
  
  gridUnpin(inId, x, y, callback) {
    let newEvent = { type: 'grid-unpin', inId, x, y }
    db.insertEvent(newEvent, callback)
  }
}

export default new Events();
