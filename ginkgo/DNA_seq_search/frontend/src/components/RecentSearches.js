import React from 'react';
import { ListGroup } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';

const RecentSearches = (props) => {
  
  return (
    <ListGroup>
      <h3>Recent Searches:</h3>
      {props.loadingText ? <p> Running Blast for submitted query .... </p> : <p/>}
      <p> No Match</p>
      <p> No Match</p>
    </ListGroup>
  );
}
export default RecentSearches;


  

