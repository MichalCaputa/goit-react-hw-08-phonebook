import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/AuthThunk.js';
import css from './RegisterForm.module.css';
import { Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, Box } from '@chakra-ui/react';
export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <FormControl p="3">
        <FormLabel className={css.form}>Username </FormLabel>
        <Input htmlSize={55} width="auto" type="text" name="name" />
      </FormControl>
      <FormControl p="3">
        <FormLabel className={css.form}>Email </FormLabel>
        <Input htmlSize={55} width="auto" type="email" name="email" />
      </FormControl>
      <FormControl p="3">
        <FormLabel>Password </FormLabel>
        <Input htmlSize={55} width="auto" type="password" name="password" />
      </FormControl>
      <Box p="3">
        <Button type="submit">Register</Button>
      </Box>
    </form>
  );
};
