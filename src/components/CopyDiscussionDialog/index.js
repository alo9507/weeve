import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, DialogContent, Button, DialogTitle, Dialog, DialogActions, Box, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { blue } from '@material-ui/core/colors';
import Confetti from 'react-confetti'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles({
  button: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  copyBox: {
    padding: '48px;',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer'
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CopyDiscussionDialog(props) {
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const { onClose, open, discussionLink, width, height, copied } = props;

  const handleClose = () => {
    onClose();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleCopied = () => {
    setAlertOpen(true);
  };

  return (
    <div>
      <Confetti
        width={width}
        height={height}
        recycle={open}
      />
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Success! Let's share.</DialogTitle>
        <DialogContent dividers={true}>
          <CopyToClipboard text={discussionLink} onCopy={handleCopied}>
            <Box className={classes.copyBox}>
              {discussionLink}
            </Box>
          </CopyToClipboard>
        </DialogContent>
        <DialogActions>
          <CopyToClipboard text={discussionLink} onCopy={handleCopied}>
            <Button>Copy Link</Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Link Copied!
        </Alert>
      </Snackbar>
    </div>
  );
}

CopyDiscussionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  discussionLink: PropTypes.string.isRequired,
  copied: PropTypes.bool.isRequired
};

export default CopyDiscussionDialog;
