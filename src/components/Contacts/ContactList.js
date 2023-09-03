import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getContacts } from 'redux/contacts/ContactsSelectors';
import { deleteSelectedContact } from 'redux/contacts/ContactsThunk';
import { getFilter } from 'redux/filter/FilterSelectors';
import { Spinner, AbsoluteCenter } from '@chakra-ui/react';
import { getIsLoading } from 'redux/contacts/ContactsSelectors';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
export const ContactsList = () => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleDelete = id => dispatch(deleteSelectedContact(id));
  const filter = useSelector(getFilter);

  const phoneContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box p="6">
      {isLoading && (
        <Box position="relative" h="100px">
          <AbsoluteCenter p="48" color="white" axis="both">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </AbsoluteCenter>
        </Box>
      )}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>My contacts</TableCaption>
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>phone</Th>
              <Th>delete contact</Th>
            </Tr>
          </Thead>
          <Tbody>
            {phoneContacts.map(contact => (
              <Tr key={contact.id}>
                <Td>{contact.name}</Td>
                <Td>{contact.number}</Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="teal"
                    variant="solid"
                    id={contact.name}
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
