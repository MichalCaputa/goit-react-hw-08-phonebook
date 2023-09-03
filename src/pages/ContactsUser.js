import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/ContactsThunk';

import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/Form/PhoneBookForm';
import { ContactsList } from 'components/Contacts/ContactList';

const UserContacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <div>
        <Helmet>
          <title>Phone Book</title>
        </Helmet>
        <ContactForm />
        <Filter />
        <ContactsList />
      </div>
    </>
  );
};
export default UserContacts;
