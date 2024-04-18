import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Login = ({ setUser, changeRoute }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
        const response = await fetch('https://localhost:7245/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const userData = await response.json();
        if (response.ok) {
            setUser(userData);
            changeRoute('profile');
        } else {
            console.error(userData.message);
        }

    } catch (error) {
        console.error('Error:', error);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="80vh"
        alignItems="center"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2>Login</h2>
        <TextField
          variant="outlined"
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" color="primary" size="large">
          Login
        </Button>
        <Button
          variant="text"
          style={{ marginTop: '1rem' }}
          onClick={() => changeRoute('register')}
        >
          Register
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Login;