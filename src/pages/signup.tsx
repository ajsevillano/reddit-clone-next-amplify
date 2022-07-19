import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Grid, TextField } from '@material-ui/core';
import { Auth } from 'aws-amplify';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      signUpWithEmailAndPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  async function signUpWithEmailAndPassword(data: IFormInput) {
    const { username, email, password } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        {/* User name input*/}
        <Grid style={{ marginTop: 16 }} item>
          <TextField
            variant="outlined"
            id="username"
            label="Username"
            type="text"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register('username', {
              required: { value: true, message: 'Please enter a username.' },
              minLength: {
                value: 3,
                message: 'Please enter a username between 3-16 characters.',
              },
              maxLength: {
                value: 16,
                message: 'Please enter a username between 3-16 characters.',
              },
            })}
          />
        </Grid>
        {/* Email input */}
        <Grid style={{ marginTop: 16 }} item>
          <TextField
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : null}
            {...register('email', {
              required: { value: true, message: 'Please enter a valid email.' },
            })}
          />
        </Grid>

        {/* Password input */}
        <Grid style={{ marginTop: 16 }} item>
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register('password', {
              required: { value: true, message: 'Please enter a password.' },
              minLength: {
                value: 8,
                message: 'Please enter a stronger password.',
              },
            })}
          />
        </Grid>

        <Grid style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
