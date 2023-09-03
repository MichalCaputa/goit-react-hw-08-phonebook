import {
  Input,
  Box,
  FormLabel,
  IconButton,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/FilterSelectors';
import { setNameFilterAction } from 'redux/filter/FilterSlice';
export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleChange = evt => {
    const { value, name } = evt.target;
    if (name === 'filter') {
      dispatch(setNameFilterAction(value));
    }
  };
  const filterId = nanoid();
  return (
    <Box p="6">
      {' '}
      <FormLabel>Find Contact</FormLabel>
      <InputGroup>
        <Input
          placeholder="write a name"
          id={filterId}
          value={filter}
          type="text"
          name="filter"
          onChange={handleChange}
        />
        <InputLeftElement
          pointerEvents="none"
          children={
            <IconButton
              colorScheme="gray"
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          }
        />
      </InputGroup>
    </Box>
  );
};
