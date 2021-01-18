import React from "react";
import { Jumbotron } from "reactstrap";

const Header = () => {	 
	return (
	<Jumbotron className="App text-info my-4 text-center">
		<h1 style={{ color: '#a16e2b' }}> Ginkgo Bioworks Code Challenge</h1>
		<p style={{ color: '#b47b31' }}>Developed by Shruti Basarkar </p>
		<hr/>
	</Jumbotron> 
	)
}
export default Header;