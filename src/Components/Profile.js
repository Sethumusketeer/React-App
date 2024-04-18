import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Tabs, Tab, Container, Grid, Paper, Card, CardContent } from '@material-ui/core';

const UserProfile = ({ email }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await fetch(
            'https://localhost:7245/api/user/userdetails/Sethupathi@email.com',
            //'https://localhost:7245/api/user/' + String(email),
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setCurrentUser(data);
          } else {
            console.log('Server Error:', response.statusText);
          }
        } catch (error) {
          console.log('Failed to fetch user:', error);
        }
      };
      fetchUser();
  }, [email]);

  const handleUpdate = async (event) => {
    event.preventDefault(); 
    const response = await fetch(`https://localhost:7245/api/user/${currentUser.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    });
  
    if (!response.ok) {
      console.log('Update Error:', response.statusText);
    }
  };

  console.log("Current user:", currentUser);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  if (currentUser === null) {
    return <div>Loading...</div>
  } else {
    return (
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* The tab bar */}
                <Tabs value={tab} onChange={handleTabChange}>
                  <Tab label="Personal Information" />
                  <Tab label="Work Information" />
                  <Tab label="Others" />
                </Tabs>
              </Grid>

              {tab === 0 && (
                <Grid item xs={12}>
                  {/* Personal Information Fields*/}
                  <Card>
                    <CardContent>
                      <TextField
                        variant="outlined"
                        label="Name"
                        fullWidth
                        value={currentUser.name || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                        required
                      />
                      <TextField
                        variant="outlined"
                        label="Email"
                        fullWidth
                        value={currentUser.email || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                        required
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {tab === 1 && (
                <Grid item xs={12}>
                  {/* Work Information Fields */}
                  <Card>
                    <CardContent>
                      <TextField
                        variant="outlined"
                        label="Designation"
                        fullWidth
                        value={currentUser.designation || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, designation: e.target.value })}
                        required
                      />
                      <TextField
                        variant="outlined"
                        label="DateJoined"
                        type="date"
                        fullWidth
                        value={currentUser.dateJoined ? currentUser.dateJoined.split('T')[0] : ""}
                        onChange={(e) => setCurrentUser({ ...currentUser, dateJoined: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {tab === 2 && (
                <Grid item xs={12}>
                  {/* Other Fields */}
                  <Card>
                    <CardContent>
                      <TextField
                        variant="outlined"
                        label="DateOfBirth"
                        type="date"
                        fullWidth
                        value={currentUser.dateOfBirth ? currentUser.dateOfBirth.split('T')[0] : ""}
                        onChange={(e) => setCurrentUser({ ...currentUser, dateOfBirth: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                      />
                      <TextField
                        variant="outlined"
                        label="Gender"
                        fullWidth
                        value={currentUser.gender || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
                        required
                      />
                      <TextField
                        variant="outlined"
                        label="Age"
                        fullWidth
                        value={currentUser.age || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
                        required
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button variant="contained" type="submit" color="primary" fullWidth>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  }
};

export default UserProfile;