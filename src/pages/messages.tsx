import { useState, useEffect } from 'react';
import axios from 'axios';
import { Message } from '../components/message';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [formInvalid, setFormInvalid] = useState(false);

  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '') : null;

  const [open, setOpenCreateMessageDialog] = useState(false);

  const handleClickOpenCreateMessageDialog = () => {
    setOpenCreateMessageDialog(true);
  };

  const handleCloseCreateMessageDialog = () => {
    setOpenCreateMessageDialog(false);
  };

  useEffect(() => {
    async function fetchMessages() {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/messages`);
      setMessages(res.data.data);
    }

    fetchMessages()
  }, []);

  const renderMessages = () => {
    return (
      messages.map((message:any) => <Message
        currentUser={currentUser}
        currentMessage={message}
        parentMessage={null}
        onReplyMessage={
          (bodyText, parentId) => handleReplyMessage(bodyText, parentId)
        }
      />)
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (/^\d+$/.test(data.get('bodyText') as string)) {
      setFormInvalid(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/messages`,
        {
          author: currentUser.username,
          bodyText: data.get('bodyText'),
        }
      );

      if (res.status === 200) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/messages`);
        setMessages(res.data.data);
      }
    } else {
      setFormInvalid(false);
    }
  };

  const handleReplyMessage = async (bodyText: string, parentId: string) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/messages`,
      {
        author: currentUser.username,
        bodyText: bodyText,
        parentId: parentId
      }
    );

    if (res.status === 200) {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/messages`);
      setMessages(res.data.data);
    }
  };

  const handlLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('../login', { replace: true });
  }

  return (
    <Container sx={{ py: "2rem" }} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item md={4}>
          HI, {currentUser ? currentUser.username : 'Guest'}!
        </Grid>
        <Grid item md={4}>
          <Button variant="contained" onClick={handleClickOpenCreateMessageDialog}>Start New Converstaion</Button>
        </Grid>
        <Grid item md={4}>
          {currentUser && (<Button variant="outlined" onClick={handlLogout}>Logout</Button>)}
          {!currentUser && (<Button variant="outlined" onClick={() => navigate('../login', { replace: true })}>Login</Button>)}
        </Grid>
      </Grid>

      <h3 className="">Messages:</h3>
      { messages && renderMessages() }

      <Dialog open={open} onClose={handleCloseCreateMessageDialog}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="bodyText"
              label="Body Text"
              name="bodyText"
              autoFocus
            />
            {formInvalid && (
              <Typography color="error.main">
                Should be an integer
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
