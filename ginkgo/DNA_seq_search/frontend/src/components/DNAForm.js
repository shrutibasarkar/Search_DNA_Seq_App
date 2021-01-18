import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

const DNAForm = (props) => {

  const [sequence, setSequence] = useState('');
  const [message , setMessage] = useState('');
  const [messageColor , setMessageColor] = useState('');

  // resets the text input area
  function clearTextArea(e){
    setSequence('')
    setMessage('')
  } 
 
  // sets the user query input validation message 
  // and state
  const checkStatusAndSetMessage = (response) => {
    if(response.status == '400') {
      setMessage('Please enter a valid DNA sequence containg letters ATGC!')
      setMessageColor('red')
    } else {
      setMessage('DNA sequence submitted!')
      setMessageColor('green')
      props.setState({
        reload: true,
      })
    }
  }

  // calls the backend to initiate the blast search
  const callBackend = async() => {
    setSequence('')
    const response = await fetch(`/api/dna_seq/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sequence)
    });
    checkStatusAndSetMessage(response);
  }

  return (
    <Grid style={{"background":"#f4e7d7"}} container spacing={1}>
      <Grid style={{"margin-top":"50px"}} item xs={12} align="center">
        <Typography component="h6" variant="h6">
          Enter DNA sequence:
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <textarea id="dna_seq" name="dna_seq"
            rows="5" cols="33" onClick={() => setMessage('')} 
            onChange={(e) => setSequence(e.target.value) } value={sequence} 
            placeholder='Enter a DNA sequence consisting of ATGC of at least length 30.'>
          </textarea>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        {
          message ? 
          <p style={{ color: messageColor }}> {message}</p> : <p></p>
        }
      </Grid>
      
      <Grid item xs={12} align="center">
        <Button color='primary' variant="contained" onClick={callBackend} disabled={!sequence.length}>
          SUBMIT
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button style={{"margin-bottom":"50px"}} color="inherit" variant="contained" onClick={clearTextArea}>
            Reset
        </Button>
        
      </Grid>
    </Grid>
  )
}

export default DNAForm;