import React from "react";
import { render } from "react-dom";
import Header from "./Header"
import DNAForm from "./DNAForm"
import RecentSearches from "./RecentSearches"

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

  // fetches the results from database
  async getAllMatchedResult(isReload){
    await fetch(`/api/results`)
    .then((response) => response.json())
    .then((data) => {
      let parsedData = JSON.parse(data);
      this.setState({
        result: parsedData,
        reload: isReload
      })
    })
  }

  // triggers getAllMatchedResult once when 
  // the page load initially
  componentWillMount(){
    if(!this.state.reload) {
      this.getAllMatchedResult(false)
    }
  }

  // it triggers getAllMatchedResult everytime  
  // when user submits the query
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