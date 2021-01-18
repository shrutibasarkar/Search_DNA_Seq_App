import React from 'react';
import { ListGroup } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import SingleProteinInfo from './SingleProtienInfo'

const RecentSearches = (props) => {

  return (
    <ListGroup>
      <h3>Recent Searches:</h3>
      {props.result.length > 0 ? props.result.map((ele) => {
        return <SingleProteinInfo proteinInfo={ele.fields}/> 
      }): <p style={{ color: '#a16e2b' }}>Currently no results</p>}
    </ListGroup>
  );
}
export default RecentSearches;


  

