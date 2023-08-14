import { useReducer, useState, useEffect } from "react"
import { copyObject } from "../lib"

export function useForm(initialState, reducer) {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [isFormValid, setIsFormValid] = useState(false)


  function fieldBind(name) {
    let fState = copyObject(state[name])
    let value;
    if (fState.type === "THOUSANDS") {
      if (fState.value === undefined) {
        fState.value = ""
      }
      value = fState.value.toString().replace(".", ",")
    } else {
      value = fState.value
    }
    return {
      value: value,
      id: name + '_field',
      name: name,
      disabled: fState.disabled !== undefined ? fState.disabled : false,
      object: fState,
      onChange: e => handler(e, fState, state, dispatch)
    }
  }

  function collectionFieldBind(collection, field, index) {
    let fState = state[collection].value[index][field]
    let value;
    if (fState.type === "THOUSANDS") {
      value = fState.value.toString().replace(".", ",")
    } else {
      value = fState.value
    }
    return {
      value: value,
      id: collection + '_' + field + '_' + index,
      name: field,
      disabled: fState.disabled,
      object: fState,
      onChange: e => handler(e, fState, state, dispatch, index)
    }
  }

  useEffect(() => {
    setIsFormValid(checkFormValidity(state))
  }, [state])

  const handleSubmit = (action) => {
    let proceedWithSubmission = true
    for (const key in state) {
      let fState = copyObject(state[key])
      fState.fieldName = key
      const { passes, message } = fieldValidation(fState, state)
      if (!passes) proceedWithSubmission = false
      dispatch({ type: 'VALIDATION', field: key, hasError: !passes, message: message })
    }
    if (!proceedWithSubmission) return Promise.reject('Hay errores en el formulario.')
    return action(state)
  }

  const validateField = (fieldName) => {
    let fState = state[fieldName]
    const { passes, message } = fieldValidation(fState, state)
    dispatch({ type: 'VALIDATION', payload: fState.value, field: fieldName, hasError: !passes, message: message })
    return passes
  }

  const resetForm = () => {
    dispatch({ type: 'SET', payload: initialState })
  }

  const disableForm = () => {
    let disabledForm = copyObject(state)
    for (const key in state) disabledForm[key].disabled = true;
    dispatch({ type: 'SET', payload: disabledForm })
  }

  const resetField = (name) => {
    let updated = copyObject(state)
    if (typeof updated[name].value === 'object') {
      updated[name].value = initialState[name].value
      updated[name+'Filter'].value = initialState[name+'Filter'].value
      updated[name].disabled = initialState[name].disabled
    } else
      updated[name].value = initialState[name].value
    dispatch({ type: 'SET', payload: updated })
  }

  const resetFields = (values) => {
    let updated = copyObject(state)
    for (var x = 0; x < values.length; x++) {
      updated[values[x]].value = initialState[values[x]].value
      updated[values[x]].disabled = initialState[values[x]].disabled
      let filter = values[x] + 'Filter'
      if (typeof updated[values[x]].value === 'object') {
        updated[filter].value = ''
        updated[filter].disabled = initialState[filter].disabled
      }
    }
    dispatch({ type: 'SET', payload: updated })
  }

  const resetCollectionItem = (collection, index) => {
    let collectionState = copyObject(state[collection])
    let itemState = copyObject(collectionState.value[index])
    for (const key in itemState) {
      let common = { disabled: false, touched: false, hasError: false, error: '' }
      if (itemState[key].type === 'OBJECT') {
        itemState[key] = { ...itemState[key], value: { value: -1, name: '' }, ...common }
      } else if (itemState[key].type === 'DECIMAL' || itemState[key].type === 'INTEGER') {
        itemState[key] = { ...itemState[key], value: 0, ...common }
      } else {
        itemState[key] = { ...itemState[key], value: '', ...common }
      }
    }
    collectionState.value[index] = itemState
    dispatch({ type: 'SET', payload: { ...state, [collection]: collectionState } })
  }

  const disableField = (name) => {
    let disable = { [name]: { ...state[name] } }
    let filter = name + 'Filter'
    if (disable[name].type === 'OBJECT') disable = { ...disable, [filter]: { ...initialState[filter] } }
    dispatch({ type: 'SET', payload: { ...state, ...disable } })
  }

  return {
    state, dispatch, isFormValid, validateField,
    handleSubmit, fieldBind, collectionFieldBind,
    resetField, resetCollectionItem, disableField,
    resetForm, disableForm, resetFields
  }
}

function checkFormValidity(state) {
  let formIsValid = true
  for (const key in state) {
    if (state[key].hasError) formIsValid = false
  }
  return formIsValid
}

const handler = (e, fState, state, dispatch, index) => {
  let value
  let current = fState.value
  let field = !e.target.name ? e.target.dataset.filter : e.target.name
  let dispatchAction = fState.dispatch !== undefined ? fState.dispatch : 'DIRECT'
  switch (fState.type) {
    case 'OBJECT':
      value = JSON.parse(e.target.dataset.object)
      break;
    case 'CHECKBOX':
      value = e.target.value === 'false'
      break;
    case 'INTEGER':
      value = e.target.value !== '' ? parseInt(e.target.value, 10) : ''
      break;
    case 'DECIMAL':
      value = e.target.value !== '' ? parseFloat(e.target.value) : ''
      break;
    case 'THOUSANDS':
      value = e.target.value !== '' ? parseFloat((e.target.value.replace(/\s+/g, '').replace(",", "."))) : ''
      break;
    default:
      value = e.target.value
      break;
  }
  fState.value = value
  const { passes, message } = fieldValidation(fState, state)
  const modified = value !== current
  dispatch({ type: dispatchAction, field: field, payload: value, touched: modified, hasError: !passes, message: message, index: index })
}

function fieldValidation(fieldState, state) {
  if (!fieldState.validations || fieldState.validations.length === 0) return { passes: true, message: '' }
  for (let i = 0; i < fieldState.validations.length; i++) {
    let { valid, message } = fieldState.validations[i](fieldState, state)
    if (!valid) return { passes: false, message: message }
  }
  return { passes: true, message: '' }
}