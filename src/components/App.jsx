import { Component } from 'react';
import Container from './Container';
import Contacts from './Contacts';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

   componentDidMount() {
    const strigifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(strigifiedContacts) ?? [];

    this.setState({ contacts: parsedContacts });  
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  formAddContact = contactData => {
    const contact = { id: nanoid(), ...contactData };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleOnChangeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });    
  };
  getFilteredContact =()=>{
    const {contacts, filter} = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }
  onRemoveContact = contactId => {
  this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  }));
};
  
  render() {
     const filteredContact = this.getFilteredContact();
    return (
      <Container>
        <h1>Phonebook</h1>

        <ContactForm formAddContact={this.formAddContact} contactsArr={this.state.contacts}/>
        
        <h2>Contacts</h2>
        
        <Filter value={this.state.filter} handleOnChangeFilter={this.handleOnChangeFilter}/>
        
        <Contacts filteredContact={filteredContact} onRemoveContact={this.onRemoveContact} handleOnChangeFilter={this.handleOnChangeFilter}/>

        </Container>       
    );
  }
}
