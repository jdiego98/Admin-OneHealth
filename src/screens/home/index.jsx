import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useForm, useSessionStorage } from "hooks";
import { init, reducer } from './state';
import { Button, Input, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import Nutritionist from 'screens/nutritionist'

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
          <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
          <AccordionBody accordionId="2">
            <strong>This is the second item&#39;s accordion body.</strong>
            You can modify any of this with custom CSS or overriding our default
            variables. It&#39;s also worth noting that just about any HTML can
            go within the <code>.accordion-body</code>, though the transition
            does limit overflow.
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
          <AccordionBody accordionId="3">
            <strong>This is the third item&#39;s accordion body.</strong>
            You can modify any of this with custom CSS or overriding our default
            variables. It&#39;s also worth noting that just about any HTML can
            go within the <code>.accordion-body</code>, though the transition
            does limit overflow.
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default Home;