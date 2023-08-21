import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useForm, useSessionStorage } from "hooks";
import { init, reducer } from './state';
import { Button, Input, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import styles from './style.module.css';

const Login = (props) => {
  const { state, handleSubmit, fieldBind, clearForm } = useForm(init, reducer)
  const [loggedUser, setLoggedUser] = useSessionStorage('LoggedUser', { value: 'not logged in' })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState('1')

  const toggle = (id) => {
    if (open === id) setOpen();
    else setOpen(id);
  };

  return (
    <div className="d-flex p2 justify-content-center align-items-center h-100">
      <div className={`d-flex flex-column w-75 ${styles.max_w_500px} h-100`}>
        <div class="form-floating mb-3">
          <Input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com"/>
          <label for="floatingInput">Email address</label>
        </div>        
        <div class="form-floating mb-3">
          <Input type="password" class="form-control" id="floatingPassword" placeholder="name@example.com"/>
          <label for="floatingPassword">Password</label>
        </div>
        <Button>Iniciar</Button>
      </div>

    </div>
  )


}

export default Login;