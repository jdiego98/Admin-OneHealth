import cloneDeep from 'lodash/fp/cloneDeep';

export const copyObject = (obj) => cloneDeep(obj)

export const reducer = (state, action) => {
  let updated = copyObject(state)
  switch (action.type) {
    case 'DIRECT':
      updated[action.field].value = action.payload
      break;
    case 'SELECT':
      updated[action.field + 'Filter'].value = action.payload.name
      updated[action.field + 'Filter'].disabled = true
      updated[action.field].value = action.payload
      updated[action.field].touched = action.touched
      updated[action.field].hasError = action.hasError
      updated[action.field].error = action.message
      break;
    case 'VALIDATION':
      updated[action.field].hasError = action.hasError
      updated[action.field].error = action.message
      break;
    case 'SET':
      updated = action.payload
      break;
    default:
      break;
  }
  return updated
}

export const required = (fState) => {
  return fState.value !== '' ? { valid: true, message: '' } : { valid: false, message: 'El campo es requerido.' }
}

export const select_required = (fState) => {
  return fState.value.value !== -1 ? { valid: true, message: '' } : { valid: false, message: 'El campo es requerido.' }
}

export const pattern = (fState) => {
  return checkPattern(fState.value, fState.pattern) ? { valid: true, message: '' } : { valid: false, message: 'El formato no es adecuado.' }
}

export const one_required = (fState, state) => {
  return validateIfOneIsChecked(state, fState.pattern) ? { valid: true, message: '' } : { valid: false, message: 'El campo requiere seleccionar al menos uno.' }
}

export const check_required = (fState) => {
  return fState.value ? { valid: true, message: '' } : { valid: false, message: 'El campo es requerido.' }
}

export const number_required = (fState) => {
  return (fState.value !== '' && fState.value > 0) ? { valid: true, message: '' } : { valid: false, message: 'El valor no puede ser 0.' }
}

function checkPattern(value, pattern) {
  if (!pattern || pattern === '') return true
  let regex = new RegExp(pattern + '$');
  return regex.test(value)
}

function validateIfOneIsChecked(state, pattern) {
  for (const element of pattern) {
    if (state[element].value === true) return true
  }
  return false
}

export const date_is_past = (fState) => {
  var today = new Date();
  var target = new Date(fState.value);
  return target.getTime() < today.getTime() ? { valid: true, message: '' } : { valid: false, message: 'La fecha debe ser pasada' };
}

export const date_is_future = (fState) => {
  var today = new Date();
  var target = new Date(fState.value);
  return target.getTime() > today.getTime() ? { valid: true, message: '' } : { valid: false, message: 'La fecha debe ser futura' }
}

export const date_required = (fState) => {
  return fState.value !== '' ? { valid: true, message: '' } : { valid: false, message: 'La fecha es requerida' };
}

export const listNotEmpty = (fState) => { return fState.value.length !== 0 ? { valid: true, message: '' } : { valid: false, message: 'La lista no puede estar vacía.' } }

export const maxLength = (fstate) => {
  return fstate.value.length > fstate.maxLength ? { valid: false, message: `Longitud máxima: ${fstate.maxLength} carácteres` } : { valid: true, message: '' }
}