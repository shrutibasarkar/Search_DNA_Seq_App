import React from 'react';
import { ListGroup } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import SingleProteinInfo from './SingleProtienInfo'

const RecentSearches = (props) => {

  return (
    <ListGroup>
      <h3>Recent Searches:</h3>
      {props.result ? props.result.map((ele) => {
        return <SingleProteinInfo proteinInfo={ele.fields}/> 
      }): <p></p>}
    </ListGroup>
  );
}
export default RecentSearches;


  

