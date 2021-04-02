import React from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/Home.css';
class Footer extends React.Component{
    handleClick=()=>{
        this.props.history.push('/thankyou');
    }
    Contactus=()=>{
        this.props.history.push('/contactus');
    }
    Aboutus=()=>{
        this.props.history.push('/aboutus');
    }

    Rateus=()=>{
        this.props.history.push('/rateus');
    }
    render()
    {
        return(
            <div>
              <br/>
              <br/>
              <br/>
              <br/>
            
        
<div className="bg-dark text-center container-fluid fixed-bottom">
  
      <br/>
      <button className="btn btn-success btn-sm" onClick={this.Aboutus}>about us</button>&nbsp;&nbsp;
  <button className="btn btn-success btn-sm" onClick={this.Contactus}>contact us</button>&nbsp;&nbsp;
  <button className="btn btn-success btn-sm" onClick={this.Rateus}>rate us</button>&nbsp;&nbsp;
  <a href="#top" className="btn btn-success btn-sm">Goto Top</a>
  </div>

            </div>
        )
    }
}

export default withRouter(Footer);