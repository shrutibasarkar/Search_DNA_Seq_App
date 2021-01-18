import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";

const mathRound = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + mathRound();
  const left = 50 + mathRound();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#efdcc3',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    'overflow-wrap': 'break-word'
  },
}));

const DnaSeqModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="full-query-button">Submitted DNA Sequence</h2>
      <p id="full-query-button-description">
      {props.dnaQuery}
      </p>
      <dnaSeqModal />
    </div>
  );

  return (
    <div>
      <Button color='inherit'  variant="contained" onClick={handleOpen}>see full query</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="full-query-button"
        aria-describedby="full-query-button-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default DnaSeqModal;