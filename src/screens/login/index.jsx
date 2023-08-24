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
    <></>
  )


}

export default Login;