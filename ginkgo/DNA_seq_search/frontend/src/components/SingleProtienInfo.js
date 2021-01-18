import React from 'react';
import { ListGroup } from 'reactstrap';

const listGroupStyle = {
	background : 'pink',
	margin: '5px',
	'border-radius': '10px'
}

const SingleProteinInfo = (props) => {
	let dataTimeArray = props.proteinInfo.date_submitted.split('T')
	let date = dataTimeArray[0]
	return (
		<ListGroup style={listGroupStyle}>
			<p><b>Query:</b>{`${props.proteinInfo.user_input.substring(0,15)}...`}</p>
			{props.proteinInfo.salltitles== 'RESULT UNKNOWN' ? 
			<div>
				<p style={{color:'red'}}>No Match Found</p>
			</div> :
			<div>
				<p><b>Name: </b>{props.proteinInfo.salltitles}</p>
				<p><b>Match Found at:</b> {props.proteinInfo.sstart}</p>
			</div>
			}
			<p><b>Submitted Date: </b>{date} </p>
		</ListGroup>
	)

}

export default SingleProteinInfo;