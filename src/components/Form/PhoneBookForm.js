import css from './PhoneBookForm.module.css';
import { getFilter } from 'redux/filter/FilterSelectors';
import { addNewContact } from 'redux/contacts/ContactsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/ContactsSelectors';
import { nanoid } from 'nanoid';
import { AddIcon, PhoneIcon } from '@chakra-ui/icons';
import { Button, Stack, Box } from '@chakra-ui/react';
import {
  Icon,
  AbsoluteCenter,
  FormControl,
  FormLabel,
  InputLeftElement,
  InputGroup,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import React, { useState } from 'react';
export const ContactForm = () => {
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const nameInputId = nanoid();
  const telInputId = nanoid();
  const handleNameInvalid = () => {
    setAlert(false);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const { name, number } = form.elements;
    if (contacts) {
      if (contacts.find(element => element.name === name.value)) {
        setAlert(true);
        setTimeout(handleNameInvalid, 3000);
        return;
      }
    }
    dispatch(addNewContact({ name: name.value, number: number.value }));
    form.reset();
    const input = document.getElementsByName('filter');
    input.value = filter;
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <Box p="6">
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Icon viewBox="0 0 24 24" color="gray.300">
                      <path
                        fill="currentColor"
                        d="M21 21v-2c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464h-8c-1.38 0-2.632 0.561-3.536 1.464s-1.464 2.156-1.464 3.536v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.829 0.335-1.577 0.879-2.121s1.292-0.879 2.121-0.879h8c0.829 0 1.577 0.335 2.121 0.879s0.879 1.292 0.879 2.121v2c0 0.552 0.448 1 1 1s1-0.448 1-1zM17 7c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464-2.632 0.561-3.536 1.464-1.464 2.156-1.464 3.536 0.561 2.632 1.464 3.536 2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536zM15 7c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121 0.335-1.577 0.879-2.121 1.292-0.879 2.121-0.879 1.577 0.335 2.121 0.879 0.879 1.292 0.879 2.121z"
                      />
                    </Icon>
                  }
                />
                <Input
                  className={css['form-input']}
                  placeholder="Enter the contact name."
                  id={nameInputId}
                  type="text"
                  name="name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                />
              </InputGroup>{' '}
              {alert && (
                <Alert status="warning">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>warning</AlertTitle>
                    <AlertDescription>
                      This name is already in your contacts
                    </AlertDescription>
                  </Box>
                </Alert>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input
                  placeholder="Enter the contact pone number."
                  id={telInputId}
                  type="tel"
                  name="number"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Box position="relative" h="100px">
            <AbsoluteCenter p="2" color="white" axis="both">
              <Button
                align="center"
                type="submit"
                rightIcon={<AddIcon boxSize={6} />}
                colorScheme="teal"
                variant="solid"
              >
                Add contact
              </Button>
            </AbsoluteCenter>
          </Box>
        </Box>
      </form>
    </>
  );
};
