import React, { useState, useEffect }from "react";
import { render } from "react-dom";
import Header from "./Header"
import DNAForm from "./DNAForm"
import RecentSearches from "./RecentSearches"
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Row, Col } from "reactstrap";

const BASE_URL ='http://127.0.0.1:8000';


class App extends React.Component { 
  constructor(){
    super();
    this.setState = this.setState.bind(this)
    this.getAllMatchedResult = this.getAllMatchedResult.bind(this)
    this.state = {
      loadingText: '',
      result: '',
      reload: false
    }
  }

  async getAllMatchedResult(isReload){
    await fetch(`${BASE_URL}/api/results`)
    .then((response) => response.json())
    .then((data) => {
      let parsedData = JSON.parse(data);
      this.setState({
        result: parsedData,
        reload: isReload
      })
    })
  }

  componentWillMount(){
    if(!this.state.reload) {
      this.getAllMatchedResult(false)
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.reload) {
      this.getAllMatchedResult(false)
    }
  }

  render(){
    return(
      <div>
        <Header />
        <div class="row">
        <div class="col"> <DNAForm loadingText={this.state.loadingText} setState={this.setState} reload={this.state.reload}/></div>
        <div class="col"> <RecentSearches  result={this.state.result} reload={this.state.reload} /></div>
        </div> 
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);