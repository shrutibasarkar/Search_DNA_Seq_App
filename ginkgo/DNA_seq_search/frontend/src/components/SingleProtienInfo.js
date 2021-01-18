import React from 'react';
import DnaSeqModal from "./QueryModal"
import { ListGroup } from 'reactstrap';

const SingleProteinInfo = (props) => {

	let dataTimeArray = props.proteinInfo.date_submitted.split('T')
	let date = dataTimeArray[0]
	return (
	
			<table>
				<tr style={{color:'#b47b31'}} >
			{props.proteinInfo.salltitles== 'RESULT UNKNOWN' ? 
			<p style={{color:'red'}}><b>No Match Found</b></p> :
			<div>
				<p style={{color:'green'}}><b>Match Found at:</b> {props.proteinInfo.sstart}</p>
				<p><b>Name: </b> {props.proteinInfo.salltitles}</p>
			</div>
			}
			<p><b>Submitted Date: </b>{date} </p>
			<p><b>Query:</b> {`${props.proteinInfo.user_input.substring(0,10)}...`} <br></br>
			</p>
			<div><DnaSeqModal dnaQuery={props.proteinInfo.user_input}/></div>
			<br></br><hr/>
	</tr>
	</table>

		
	)

}

export default SingleProteinInfo;