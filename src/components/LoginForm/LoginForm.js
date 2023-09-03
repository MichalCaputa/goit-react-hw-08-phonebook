import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/AuthThunk.js';
import css from './LoginForm.module.css';
import { Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, Box } from '@chakra-ui/react';
export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <FormControl p="3">
        <FormLabel className={css.form}>Email </FormLabel>
        <Input htmlSize={55} width="auto" type="email" name="email" />
      </FormControl>
      <FormControl p="3">
        <FormLabel>Password </FormLabel>
        <Input htmlSize={55} width="auto" type="password" name="password" />
      </FormControl>
      <Box p="3">
        <Button type="submit">Log In</Button>
      </Box>
    </form>
  );
};
