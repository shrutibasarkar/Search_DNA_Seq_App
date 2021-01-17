import React, { useState, useEffect }from "react";
import { render } from "react-dom";
import Header from "./Header"
import DNAForm from "./DNAForm"
import RecentSearches from "./RecentSearches"
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Row, Col } from "reactstrap";

const BASE_URL ='http://127.0.0.1:8000';

const App = () => {

  const [loadingText, setLoadingText] = useState(false);
  
  useEffect( () => {
    // Anything in here is fired on component mount.
    const request = new Request(`${BASE_URL}/api/results`, {
      method: 'get'
    });
    console.log('xxxxx', request)
  }, []);

  return(
    <div>
      <Header />
      <div class="row">
      <div class="col"> <DNAForm loadingText={loadingText} setLoadingText={setLoadingText}/></div>
      <div class="col"> <RecentSearches loadingText={loadingText}/></div>
      </div> 
    </div>
  );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);