import React, { Component } from 'react';
import ConstactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList ';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContactsList = newContact => {
    const { contacts } = this.state;
    const trueFilter = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (trueFilter) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    const contact = { ...newContact, id: nanoid() };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    const adaptedData = JSON.stringify(contacts);
    localStorage.setItem('key', adaptedData);
  };

  componentDidMount() {
    const gettedData = localStorage.getItem('key');
    const parsedData = JSON.parse(gettedData);
    console.log(parsedData);
    this.setState();
    console.log(this.state.contacts);
  }

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalName = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalName)
    );
  };
  onFilterChange = ev => {
    this.setState({
      filter: ev.target.value,
    });
  };

  deletedContacts = nameId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== nameId),
    });
    localStorage.removeItem('key');
  };
  render() {
    const filteredName = this.filterContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ConstactForm onSubmit={this.addContactsList} />
        {this.state.contacts.length > 0 ? (
          <>
            <h2>Contacts</h2>
            <Filter
              value={this.state.filter}
              onFilterChange={this.onFilterChange}
            />
            <ContactList
              onFilterContacts={filteredName}
              onChange={this.deletedContacts}
            />
          </>
        ) : (
          <h2>"Contact list is empty"</h2>
        )}
      </div>
    );
  }
}
