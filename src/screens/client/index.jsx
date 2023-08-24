import {useState, useReducer} from "react";
//import { useNavigate } from "react-router-dom";
import {init, reducer, handler} from './state';
import { Input } from 'reactstrap';
import { usePersisted } from "./hooks";
import styles from "./style.module.css"
import { toDTO } from "./mapping";
import { apiRequest } from "lib";


const Client = (props) => {
  const [state, dispatch] = useReducer(reducer, init)
  const [loading, setLoading] = useState(false)
  usePersisted(state, dispatch)

  function onUpdate() {
    let dto = toDTO(state)
    apiRequest('put', '/users/update', dto).then(res => {
      dispatch({type: 'ACTIVATE', payload: dto})
    })
  }

  function onEliminate() {
    apiRequest('delete', `/users/${state.id}`).then(res => {
      dispatch({type: 'ELIMINATE', payload: state.id})
    })
  }

  function onActivate() {
    debugger
    apiRequest('put', `/users/activate/${state.id}`).then(res => {
      dispatch({type: 'ACTIVATE', payload: res.data})
    })
  }

  return (
    <div className="d-flex flex-row">
      <div className="container border pt-2">
        <ul className="d-flex flex-column">
          {state.itemList.length > 0 ? state.itemList.map(user => <UserItem key={'usuario_'+user.id} user={user} dispatch={dispatch}/>) : 'No hay elementos en la lista'}
        </ul>
      </div>
      <div className="container">
        <div className="form-floating mb-3">
          <Input className="form-control" id="fName" value={state.name} onChange={(event) => handler(event, 'name', dispatch)}/>
          <label htmlFor="fName">Nombre</label>
        </div>
        <div className="form-floating mb-3">
          <Input className="form-control" id="fLastName" value={state.lastName} onChange={(event) => handler(event, 'lastName', dispatch)}/>
          <label htmlFor="fLastName">Apellido</label>
        </div>           
        <div className="form-floating mb-3">
          <Input type="email" className="form-control" id="fEmail" value={state.email} onChange={(event) => handler(event, 'email', dispatch)}/>
          <label htmlFor="fEmail">Email address</label>
        </div>    
        <div className="form-floating mb-3">
          <Input type="email" className="form-control" id="fUserStatus" value={state.userStatus} onChange={(event) => handler(event, 'userStatus', dispatch)} disabled/>
          <label htmlFor="floatingUserStatus">Estado de usuario</label>
        </div>
        {state.id !== -1 ? <div className="d-flex flex-row justify-content-around mt-3">
          <button className="btn btn-warning" onClick={() => dispatch({type: 'CANCEL'})}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onUpdate()}>Actualizar</button>
          {state.userStatus === 'PENDING' ? <button onClick={() => onActivate()} className="btn btn-secondary">Activar</button> : null}
          <button className="btn btn-danger" onClick={() => onEliminate()}>Eliminar</button>
        </div> : null }  
      </div>
    </div>
  ) 
    

}
export default Client;

function UserItem(props) {

  function edit() {
    props.dispatch({type: 'EDIT', payload: props.user})
  }

  return (
    <li className={`p-2 border mb-2 ${styles.cursor_pointer}`} onClick={() => edit()}>
      <div className="d-flex flex-column">
        <label htmlFor="name">{props.user.username}</label>
        <div id="name" className="d-flex flex-row justify-content-between">
          <p>{props.user.fullName}</p>
          <p>{props.user.userStatus}</p>
        </div>
      </div>
    </li>
  )
}