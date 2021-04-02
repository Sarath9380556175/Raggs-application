import axios from 'axios';
import React from 'react';
import '../styles/contactus.css';
class Contactus extends React.Component{
    constructor()
    {
        super();
        this.state={
            firstname:undefined,
            lastname:undefined,
            email:undefined,
            password:undefined,
            comment:undefined,
            Contactus:{}
        }
    }


    

    

    
    
   


    handlesubmit=()=>{
        const {firstname,lastname,email,password,comment}=this.state;
        axios({
            url:'https://dry-citadel-95113.herokuapp.com/contactus',
            method:'POST',
            headers:{'content-Type':'application/json'},
            data:
            {
                firstname:firstname,
                lastname:lastname,
                password:password,
                email:email,
                comment:comment
            }
            
        }).then(res=>this.setState({Contactus:res.data.contactus}))
        .catch(err=>console.log(err))

        this.props.history.push('/thankyou')
}
       
       
    firstname=(event)=>{
        const name=event.target.name;
        console.log(name)
        const value=event.target.value;
        console.log(value)
        this.setState({[name]:value})
    }

    lastname=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        this.setState({[name]:value})
    }

    password=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        this.setState({[name]:value})
    }

    email=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        this.setState({[name]:value})
    }

    comment=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        this.setState({[name]:value})
    }

    render()
    {
        return(
        
            <div>
<div className="jumbotron text-center">
		<div style={{fontWeight: "bold"}}>Contactus
<br/>
<form className="rounded forms" name="formdata"  onSubmit={this.handlesubmit}>
    {/*eslint-disable-next-line*/}
<i className="fas fa-user"></i>&nbsp;&nbsp;<input type="text" name="firstname"   required  style={{border:"2px solid black"}} className="rounded"  onChange={this.firstname}/><br/><br/>
<i className="fas fa-user"></i>&nbsp;&nbsp;<input type="text" name="lastname"  required  className="rounded" style={{border:"2px solid black"}} onChange={this.lastname} /><br/><br/>
<i className="fas fa-lock"></i>&nbsp;&nbsp;<input type="password" name="password"  required className="rounded text-primary" style={{border:"2px solid black"}} onChange={this.password}/><br/><br/>
<i className="fas fa-envelope"></i>&nbsp;&nbsp;<input type="email" name="email" required  className="rounded" style={{border:"2px solid black"}}  onChange={this.email}/><br/><br/>
<i className="fas fa-comment"></i>&nbsp;&nbsp;<textarea rows="3" cols="20" width="200" height="30" required   name="comment" className="text-success" style={{fontSize: "12px"}} onChange={this.comment}></textarea><br/><br/>
<button className="btn btn-primary btn-sm">submit</button>
</form>
</div>

</div>
            </div>

        );
}

}

export default Contactus;