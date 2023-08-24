import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useForm, useSessionStorage } from "hooks";
import { init, reducer } from './state';
import { Button, Input, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import Nutritionist from 'screens/nutritionist'
import Client from "screens/client"

const Home = (props) => {
  const { state, handleSubmit, fieldBind, clearForm } = useForm(init, reducer)
  const [loggedUser, setLoggedUser] = useSessionStorage('LoggedUser', { value: 'not logged in' })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState('1')

  const toggle = (id) => {
    if (open === id) setOpen();
    else setOpen(id);
  };

  return (
    <>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Mantenimiento de nutricionistas</AccordionHeader>
          <AccordionBody accordionId="1">
            <Nutritionist/>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Mantenimiento de clientes</AccordionHeader>
          <AccordionBody accordionId="2">
            <Client/>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default Home;