import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage"
import DNAForm from "./DNAForm"
import RecentSearches from "./RecentSearches"
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Row, Col } from "reactstrap";

function App() {
    return(
// <div>
    
//     <HomePage/>
//     <DNAForm/>
//     <RecentSearches/>
// </div>
//     );

<div>
          <HomePage />
          <div class="row">

          <div class="col"> <DNAForm/></div>
          <div class="col"> <RecentSearches/></div>
        
          </div>
          {/* <Row>
              <Col md={4}>
              <RecentSearches/>
              </Col>
              <Col md={8}>
              <DNAForm/>
              </Col>
          </Row> */}
      
</div>
    );
  }
const appDiv = document.getElementById("app");
render(<App />, appDiv);