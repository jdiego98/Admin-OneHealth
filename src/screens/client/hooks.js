import { apiRequest, copyObject } from "lib";
import { useEffect } from "react";

export function usePersisted(state, dispatch) {
  useEffect(() => {
    let updated = copyObject(state)
    apiRequest('get', '/users').then(res => {
      updated.itemList = res.data.filter(i => i.role === 'CLIENT')
      dispatch({type: 'SET', payload: updated})
    }).catch(error => {
      alert("Error recuperando clientes")
    })
  }, [])
}

// export function usePersisted(params, state, catalogues, dispatch) {
//   useDeepCompareEffect(() => {
//     if (undefinedIdOrCataloguesEmpty(params.idSolicitud, catalogues)) return
//     let updated = copyObject(state)
//     apiRequest('get', `api/info_laboral?idPersona=${params.idPersona}`, null).then(res => {
//       toState(params, res.data, updated, catalogues)
//       dispatch({type: 'SET', payload: updated})
//     }).catch(error => {
//       //TODO lo que se haga con el error
//     })
//   }, [params, catalogues])
// }