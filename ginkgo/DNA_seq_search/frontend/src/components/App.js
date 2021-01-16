import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header"
import DNAForm from "./DNAForm"
import RecentSearches from "./RecentSearches"
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Row, Col } from "reactstrap";

function App() {
    return(

<div>
          <Header />
          <div class="row">

          <div class="col"> <DNAForm/></div>
          <div class="col"> <RecentSearches/></div>
        
          </div>
      
</div>
    );
  }
const appDiv = document.getElementById("app");
render(<App />, appDiv);