import {useState} from "react";
//import { useNavigate } from "react-router-dom";
import { useForm, useSessionStorage } from "hooks";
import {init, reducer} from './state';

const Login = (props) => {
  const { state, handleSubmit, fieldBind, clearForm } = useForm(init, reducer)
  const [ loggedUser, setLoggedUser ] = useSessionStorage('LoggedUser', { value: 'not logged in' })
  const [loading, setLoading] = useState(false)

  return (<div className="flex bg-blue-900">
    <p>lol</p>
    <p>esto funciona pero el CSS no</p>
  </div>)
}

export default Login;