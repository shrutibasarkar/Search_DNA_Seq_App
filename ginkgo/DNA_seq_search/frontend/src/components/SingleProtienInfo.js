import React from 'react';
import DnaSeqModal from "./QueryModal"
import { ListGroup } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	tableRow: {
		color:'#b47b31'
	},
	notMatch:{
		color:'red'
	},
	match:{
		color:'green'
	},
	bottomMargin:{
		"margin-bottom": "20px"
	}
}));


const SingleProteinInfo = (props) => {
	const classes = useStyles();
	let dataTimeArray = props.proteinInfo.date_submitted.split('T')
	const date = dataTimeArray[0]

	return (
		<table>
			<tr className={classes.tableRow} >
				{props.proteinInfo.salltitles== 'RESULT UNKNOWN' ? 
				<p className={classes.notMatch}><b>No Match Found</b></p> :
				<div>
					<p className={classes.match}><b>Match Found at:</b> {props.proteinInfo.sstart}</p>
					<p><b>Name: </b> {props.proteinInfo.salltitles}</p>
				</div>
				}
				<p><b>Submitted Date: </b>{date} </p>
				<p><b>Query:</b> {`${props.proteinInfo.user_input.substring(0,10)}...`}
				</p>
				<div className={classes.bottomMargin} ><DnaSeqModal dnaQuery={props.proteinInfo.user_input}/></div>
				<hr/>
			</tr>
		</table>
	)
}

export default SingleProteinInfo;