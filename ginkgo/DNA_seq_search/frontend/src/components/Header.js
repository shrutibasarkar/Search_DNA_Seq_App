import React, { useEffect } from "react";
import { Jumbotron } from "reactstrap";

const Header = () => {
	
    useEffect(()=>{
        document.title="Home"
	 },[]);
	 
    return (
		<Jumbotron className=" App text-info my-4 text-center">
			<h1 style={{ color: 'orange' }}> Ginkgo Bioworks Code Challenge</h1>
			<p style={{ color: 'Brown' }}>Developed by Shruti Basarkar </p>
			<hr/>
		</Jumbotron> 
    )
}
export default Header;