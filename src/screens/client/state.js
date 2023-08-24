import { copyObject, basicReducer } from 'lib';

export const init = {
  id: -1,
  name: "",
  lastName: "",
  birthDay: 0,
  gender: "",
  email: "",
  password: "",
  license: "",
  role: "",
  userStatus: "",
  passwordStatus: "",
  nutritionistId: "",
  enabled: false,
  fullName: "",
  accountNonExpired: false,
  accountNonLocked: false,
  credentialsNonExpired: false,
  username: "",
  itemList: []
}

export const reducer = (state, action) => {
  let updated = copyObject(state)
  switch (action.type) {
    case 'SET':
      updated = action.payload
      break;
    case 'EDIT':
      setFields(updated, action.payload)
      break;
    case 'UPDATE':
      updated[action.field] = action.payload
      break;
    case 'ACTIVATE':
      updated.itemList = updated.itemList.map(obj => obj.id === action.payload.id ? action.payload : obj)
      setFields(updated, init)
    case 'ELIMINATE':
      const indx = updated.itemList.findIndex(v => v.id === action.payload)
      updated.itemList.splice(indx, indx >= 0 ? 1 : 0)
      break;
    case 'CANCEL':
      setFields(updated, init)
    default:
      break;
  }
  return updated
}

export const handler = (event, field, dispatch) => {
  let value = event.target.value
  dispatch({type: 'UPDATE', payload: value, field: field})
}

function setFields(updated, obj) {
  updated.id = obj.id
  updated.name = obj.name
  updated.lastName = obj.lastName
  updated.birthDay = obj.birthDay
  updated.gender = obj.gender
  updated.email = obj.email
  updated.password = obj.password
  updated.license = obj.license
  updated.role = obj.role
  updated.userStatus = obj.userStatus
  updated.passwordStatus = obj.passwordStatus
  updated.nutritionistId = obj.nutritionistId
  updated.enabled = obj.enabled
  updated.fullName = obj.fullName
  updated.accountNonExpired = obj.accountNonExpired
  updated.accountNonLocked = obj.accountNonLocked
  updated.credentialsNonExpired = obj.credentialsNonExpired
  updated.username = obj.username
}
