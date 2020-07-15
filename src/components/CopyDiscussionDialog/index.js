import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  button: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  box: {
    padding: '48px;'
  }
});

function CopyDiscussionDialog(props) {
  const classes = useStyles();
  const { onClose, open, discussionLink } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Here's you discussion link:</DialogTitle>
      <Box className={classes.box}><h2>{discussionLink}</h2></Box>
    </Dialog>
  );
}

CopyDiscussionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  discussionLink: PropTypes.string.isRequired,
};

export default CopyDiscussionDialog;
