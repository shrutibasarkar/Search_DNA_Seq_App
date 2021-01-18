import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

const BASE_URL ='http://127.0.0.1:8000';
const placeHolderText = "Enter a DNA sequence consisting of ATGC of at least length 30."


const DNAForm = (props) => {

  const [sequence, setSequence] = useState('');
  const [message ,setMessage] = useState('');

  // set the user input as state
  function setText(e){
    setSequence(e.target.value)
  } 

  // clears reponse message 
  function clearResponseMessage(){
    setMessage('')
  }

  // resets the text input area
  function clearTextArea(e){
    setSequence('')
    clearResponseMessage()
  } 
 
  // check the status and set the message
  const checkStatusAndSetMessage = (response) => {
    if(response.status == '400') {
      setMessage('Please enter a valid DNA sequence containg letters ATGC')
    } else {
      setMessage('DNA sequence submitted')
      props.setState({
        reload: true
      })
    }
  }

  // calls the backend to initiate the blast search
  const callBackend = async() => {
    const request = new Request(`${BASE_URL}/api/dna_seq/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sequence)
    });
    setSequence('')
    const response = await fetch(request);
    checkStatusAndSetMessage(response);
  }

  return (
      <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h6" variant="h6">
          Enter DNA sequence:
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <textarea id="dna_seq" name="dna_seq"
          rows="5" cols="33" onClick={clearResponseMessage} onChange={setText} value={sequence} placeholder={placeHolderText}></textarea>
        </FormControl>
      </Grid>

      {
        message ? <p>{message}</p> : <p></p>
      }
      
      <Grid item xs={12} align="center">
        <Button color='primary' variant="contained" onClick={callBackend} disabled={!sequence.length}>
          SUBMIT
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" onClick={clearTextArea}>
            Reset
        </Button>
      </Grid>
    </Grid>
  )
}
export default DNAForm;