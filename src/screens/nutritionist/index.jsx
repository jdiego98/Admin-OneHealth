import {useState, useReducer} from "react";
//import { useNavigate } from "react-router-dom";
import { useForm, useSessionStorage } from "hooks";
import {init, reducer} from './state';
import { Button, Input } from 'reactstrap';
import { usePersisted } from "./hooks";
import styles from "./style.module.css"


const Nutritionist = (props) => {
  const [state, dispatch] = useReducer(reducer, init)
  const [loading, setLoading] = useState(false)
  usePersisted(state, dispatch)

  return (
    <div className="d-flex flex-row">
      <div className="container border-primary">
        <ul>
          {state.itemList.length > 0 ? state.itemList.map(user => <UserItem key={'usuario_'+user.id} user={user} dispatch={dispatch}/>) : 'No hay elementos en la lista'}
        </ul>
      </div>
      <form className="container">
        form
      </form>
    </div>
  ) 
    

}
export default Nutritionist;

function UserItem(props) {
  return (
    <li className={"p-2 border mb-2"} >
      <div className="d-flex flex-row">
        <div className={styles.flex_grow}>
          <label for="name">{props.user.license}</label>
          <p id="name">{props.user.fullName}</p>
        </div>
        <div className={styles.flex_grow}>
          <label for="status">Estado cuenta</label>
          <p id="status">{props.user.userStatus}</p>
        </div>
        <div className={styles.flex_grow}>
          <label for="name">Estado contraseña</label>
          <p id="name">{props.user.passwordStatus}</p>
        </div>
        <div className={[styles.flex_grow, styles.buttons]}>
          {props.user.userStatus === 'PENDING' ? <Button color="primary">Activar</Button> : null}
          <Button color="danger">Eliminar</Button>
        </div>
      </div>
      
    </li>
  )
}