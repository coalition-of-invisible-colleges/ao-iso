import _ from 'lodash'
import { createAoStore, pubState } from '../app/store'

export function isAmount(val, errRes) {
  let parsed = parseFloat(val)
  if (parsed !== 0 && !parsed) {
    errRes.push('amount must be a number')
    return false
  }
  if (parsed < 0) {
    errRes.push('amount must be positive')
    return false
  }
  return true
}
export function isField(val, errRes) {
  let isField =
    val === 'name' || val === 'email' || val === 'secret' || val === 'fob'
  if (!isField) {
    errRes.push('invalid field')
    return false
  }
  return isField
}
export function isAddress(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let result = false
  aoStore.state.ao.forEach(ao => {
    if (val === ao.address) {
      result = true
    }
  })
  if (!result) {
    errRes.push('invalid address')
  }
  return result
}
export function isMemberId(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let result = false
  let result2 = false
  aoStore.state.members.forEach(member => {
    if (val === member.memberId) {
      result = true
    }
  })
  aoStore.state.tasks.forEach(task => {
    if (val === task.taskId) {
      result2 = true
    }
  })

  if (!result || !result2) {
    errRes.push('invalid member')
  }
  return result
}
export function isActiveMemberId(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let result = false
  aoStore.state.members.forEach(member => {
    if (val === member.memberId && member.active >= 0) {
      result = true
    }
  })
  if (!result) {
    errRes.push('invalid member')
  }
  return result
}
export function isTaskId(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let result = false
  aoStore.state.tasks.forEach(task => {
    if (task.taskId == val) {
      result = true
    }
  })
  if (!result) {
    errRes.push('invalid task')
  }
  return result
}
export function isSession(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let result = false
  aoStore.state.sessions.forEach(s => {
    if (val === s.session) {
      result = true
    }
  })
  if (!result) {
    errRes.push('invalid session')
  }
  return result
}
export function isResourceId(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let result = false
  aoStore.state.resources.forEach(resource => {
    if (val === resource.resourceId) {
      result = true
    }
  })
  if (!result) {
    errRes.push('invalid resource')
  }
  return result
}
export function isNewResourceId(val, errRes) {
  const aoStore = createAoStore(pubState)();
  let isNew = true
  aoStore.state.resources.forEach(resource => {
    if (val == resource.resourceId) {
      isNew = false
    }
  })
  if (!isNew) {
    errRes.push('resourceId exists')
  }
  return isNew
}
export function isBool(val, errRes) {
  let isBool = typeof val === 'boolean'
  if (!isBool) {
    errRes.push('field requires boolean')
  }
  return isBool
}
export function isNotes(val, errRes) {
  return true
}
export function isCoord(val, errRes) {
  let result = true
  const lbx = 0
  const lby = 0
  const ubx = 16
  const uby = 16

  let bx = lbx <= val.x && val.x <= ubx
  let by = lby <= val.y && val.y <= uby
  if (!(by && bx) && Number.isInteger(val.x) && Number.isInteger(val.y)) {
    result = false
    // errRes.push("invalid grid coord");
  }
  return result
}
export function isColor(val, errRes) {
  let colors = ['red', 'yellow', 'green', 'purple', 'blue']
  return colors.indexOf(val) >= 0
}

