import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { useState, FC } from 'react';

type Props = {
  currentUser: any;
  currentMessage: any;
  parentMessage: any;
  onReplyMessage: (bodyText: string, parentId: string) => void;
};

export const Message: FC<Props> = props => {
  const [formInvalid, setFormInvalid] = useState(false);
  const { currentUser, currentMessage, parentMessage, onReplyMessage } = props;
  const hasReplies = currentMessage?.replies?.length > 0;
  const hasParent = parentMessage !== null;

  let childMessages = hasReplies && currentMessage.replies;
  childMessages = childMessages && childMessages.sort((a: any,b: any): any => {
    return (Date.parse(a.createdAt) - Date.parse(b.createdAt));
  });

  const operators = parentMessage?.replies?.map((message: any) => message.bodyText);
  const childIndex = parentMessage?.replies?.findIndex((message: any) => message._id === currentMessage._id);
  const operatorsForChild = operators?.slice(0, childIndex + 1);
  const lastMessage = parentMessage?.replies[parentMessage?.replies?.length - 1]
  const isLastChild = (lastMessage && lastMessage._id === currentMessage._id)

  const canReply = () => {
    if (!currentUser) {
      return false;
    }
    return (hasReplies ? isLastChild : (hasParent ? isLastChild : true));
  }

  const calculateMessage = (operator: string, x: string, y: string) => {
    let result = 0;
    const xNum = parseFloat(x);
    const yNum = parseFloat(y);
    switch (operator) {
      case '+':
        result = xNum + yNum;
        break;
      case '-':
        result = xNum - yNum;
        break;
      case '*':
        result = xNum * yNum;
        break;
      case '/':
        result = xNum / yNum;
        break;
      default:
        break;
    }
    return parseFloat(result.toFixed(2));
  };

  let messageResult = parseFloat(parentMessage?.bodyText);
  operatorsForChild?.forEach((operatorNumber: string) => {
    messageResult = calculateMessage(operatorNumber[0], messageResult.toString(), operatorNumber.substring(1))
  })

  const msClass = childIndex >= 0 && childIndex * 5 < 100 ? (3 * (childIndex + 1)) : 0;

  const handleSubmitReply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const replyMessage = data.get('bodyText') as string;

    setFormInvalid(false);
    if (/^[+|\-|*|/]\d+$/.test(replyMessage)) {
      onReplyMessage(replyMessage, currentMessage._id);
      setOpenReplyDialog(false);
    } else {
      setFormInvalid(true);
    }
  };

  const [open, setOpenReplyDialog] = useState(false);

  const handleClickOpenReplyDialog = () => {
    setOpenReplyDialog(true);
  };

  const handleClickCloseReplyDialog = () => {
    setOpenReplyDialog(false);
  };

  return (
    <div>
      <Card sx={{ ml: msClass }} variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Typography color="text.secondary">
                Author: { currentMessage.author }
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography color="text.secondary">
                Message: { currentMessage.bodyText }
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography color="text.secondary">
                {!isNaN(messageResult) ? `Result: ${messageResult}` : ''}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              {canReply() && (<Button variant="contained" onClick={handleClickOpenReplyDialog}>Reply</Button>)}
            </Grid>
          </Grid>

          <Dialog open={open} onClose={handleClickCloseReplyDialog}>
            <DialogTitle>Reply</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={handleSubmitReply} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="bodyText"
                  label="Body Text"
                  name="bodyText"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="parentId"
                  label="Parent ID"
                  name="parentId"
                  value={currentMessage._id}
                  disabled={true}
                />
                {formInvalid && (
                  <Typography color="error.main">
                    Should be include operator +, -, *, /. Example: +1, -2, *3, /4
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

        </CardContent>
      </Card>

      {
        hasReplies && childMessages.map((message:any) => <Message
          currentUser={currentUser}
          currentMessage={message}
          parentMessage={currentMessage}
          onReplyMessage={
            onReplyMessage
          }
        />)
      }
    </div>
  );
};
