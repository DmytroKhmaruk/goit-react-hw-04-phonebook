import { useState, useEffect } from 'react';
import Container from './Container';
import Contacts from './Contacts';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { nanoid } from 'nanoid';


export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState(''); 

  useEffect(() => {
    const strigifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(strigifiedContacts) ?? [];

    setContacts( parsedContacts );
  }, []);

  useEffect(() => {
      const stringifiedContacts = JSON.stringify(contacts);
      localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const formAddContact = contactData => {
  const contact = { id: nanoid(), ...contactData };
  setContacts(prevState => [...prevState, contact]);
};


  const handleOnChangeFilter = evt => {
    setFilter( evt.target.value );    
  };

  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onRemoveContact = contactId => {
  setContacts(prevState =>
    prevState.filter(contact => contact.id !== contactId),
  );
};
  
    return (
      <Container>
        <h1>Phonebook</h1>

        <ContactForm
          formAddContact={formAddContact}
          contactsArr={contacts} />
        
        <h2>Contacts</h2>
        
        <Filter value={filter} handleOnChangeFilter={handleOnChangeFilter}/>
        
        <Contacts filteredContact={filteredContact} onRemoveContact={onRemoveContact} handleOnChangeFilter={handleOnChangeFilter}/>

        </Container>       
    );
  }

