import React, { Fragment, useState } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";


const DNAForm = () => {
  // constructor(){
  //   super();
  //     this.callBackend = this.callBackend.bind()
  // }
  const [sequence, setSequence] = useState(false);
  const BASE_URL ='http://127.0.0.1:8000';

  async function callBackend(e) {
    const request = new Request(`${BASE_URL}/api/dna_seq/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sequence)
    });
    const response = await fetch(request);
    // const status = response.status;
    console.log('responsexx', response)
  }

  function setText(e){
      setSequence(e.target.value)
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
          rows="5" cols="33" onChange={setText} placeholder ="Enter a DNA sequence consisting of ATGC of at least length 30."></textarea>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={callBackend} disabled={!sequence.length}>
          Submit
        </Button>
        
      </Grid>
      
      <Grid item xs={12} align="center">
      <Button color="secondary" variant="contained" onClick="">
          Reset
        </Button>
      </Grid>
    </Grid>
  )
}
export default DNAForm;