import PropTypes from 'prop-types';
import ContactsStyles from './ContactsStyles';
import Delete from '../Delete';

function Contacts({ filteredContact, onRemoveContact }) {
  
  return (
    <>
      <ContactsStyles>
        {filteredContact.map(({ id, name, number }) => {
          return (
            <Delete
              key={id}
              id={id}
              name={name}
              number={number}
              onRemoveContact={onRemoveContact}
            />
          );
          
        })}
      </ContactsStyles>
    </>
  );
}

Contacts.propTypes = {
  filteredContact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveContact: PropTypes.func.isRequired,  
};

export default Contacts;
