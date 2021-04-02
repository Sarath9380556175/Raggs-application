import React from 'react';
import '../styles/thankyou.css';
class Thankyou extends React.Component{
    render()
    {
        return(
            <div>
<div className="jumbotron">
	<div className="container p-3 my-3 border bg-white">
        {/*eslint-disable-next-line*/}
		<div className="text-center " style={{color: "darkslateblue",fontSize: "34px",marginBottom: "27px",marginTop:"36px",fontWeight:"300"}}><marquee direction="right">Thank You!</marquee></div>
		<p style={{fontSize: "15px",paddingLeft: "48px"}}>Your survey has been submitted.</p>
	</div>
	<div className="bg-dark text-white sarath container-fluid rounded" style={{marginTop: "28px"}}>
	<p className="container" style={{fontSize: "12px",paddingTop: "25px"}}>©1997-2021 LogMeIn, Inc. All rights reserved.</p>
	<p className="container" style={{fontSize:"12px"}}>View the&nbsp; <a href="https://www.facebook.com" style={{fontSize: "13px"}}>GoTo our Privacy Policy.</a></p>
</div>
</div>
            </div>
        )
    }
}
export default Thankyou;