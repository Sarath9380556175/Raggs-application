import React from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/Home.css';
import Modal from 'react-modal';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import queryString from 'query-string';
import { get } from 'mongoose';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border:'6px solid black',
    background:'DeepSkyBlue'
  }
};


const modalstyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border:'6px solid black',
    background:'Yellow'
  }
};
class Wallpaper extends React.Component{
  constructor()
  {
    super();
    this.state=
    {
      islogin:false,
      email:undefined,
      password:undefined,
      gender:undefined,
      logindetails:[],
      IsuserLoggedIn:false,
      iscreatingaccount:false,
      name:undefined,
      emails:undefined,
      passwords:undefined,
      genders:undefined,
      mobilenumber:undefined,
      signupdetails:{},
      skr:undefined,
      IsGoogleuserLoggedIn:false,
      googleusername:undefined,
      isuserwanttologin:false,
      facebookusername:undefined,
      isfacebookuserloggedIn:false,
      image:undefined,
      googleimage:undefined,
      restaurants:[],
      getsignupdetails:[],
      mails:undefined
      
    }
  }

  componentDidMount()
  {
    sessionStorage.clear();
    axios({
      url:'https://vast-plateau-26931.herokuapp.com/signups',
      method:'GET',
      headers:{'content-Type':'application/json'}
    }).then(res=>this.setState({getsignupdetails:res.data.signupdetails, mails:res.data.signupdetails.map((item)=>{return item.email})}))
    .catch(error=>console.log(error))
   
  }
    Aboutus=()=>{
        this.props.history.push('/aboutus');
    }

    Contactus=()=>{
        this.props.history.push('/contactus')
    }
    Home=()=>{
        this.props.history.push('/')
    }

    Rateus=()=>{
        this.props.history.push('/rateus')
    }
    Dishes=()=>{
      this.props.history.push('./Dishes')
    }

    handleclick=(state,value)=>{
      this.setState({[state]:value,iscreatingaccount:false})

    }


    handlemail=(event)=>{
   const name=event.target.name;
   const value=event.target.value;
   this.setState({[name]:value})
    }

    handlepassword=(event)=>{
      const name=event.target.name;
      console.log(name);
const value=event.target.value;
console.log(value)
this.setState({[name]:value})
       }


       handlegender=(gender)=>{
         const {email,password,mails,getsignupdetails}=this.state;
         console.log(mails)
        const skr= getsignupdetails.map((item)=>item.email)
        console.log(skr)
         const mailing=queryString.parse(mails)
         console.log(mailing)
         axios({
    url:'https://vast-plateau-26931.herokuapp.com/login',
    method:'POST',
    headers:{'content-Type':'application/json'},
    data:
    {
      email:email,
      password:password,
      gender:gender
    }
         })
         .then(res=>this.setState({logindetails:res.data.login,gender:gender,IsuserLoggedIn:res.data.isLoggedin,islogin:false,skr:res.data.isLoggedin==false?alert('Invalid details'):alert('UserLoggedIn Successfully'),isuserwanttologin:false}))

         .catch()
       }


       handlelogout=(state,value)=>{
        this.setState({[state]:value})
       }

       handleaccount=(state,value)=>{
     this.setState({[state]:value , isuserwanttologin:false,islogin:false})
       }

       handlename=(event)=>{
         const name=event.target.name;
         console.log(name)
         const value=event.target.value;
         console.log(value)
         this.setState({[name]:value})
       }

       handleemails=(event)=>
       {
         
        const name=event.target.name;
        console.log(name);
        const value=event.target.value;
        console.log(value);
        this.setState({[name]:value})
       }

       handlepasswords=(event)=>
       {
         
        const name=event.target.name;
        console.log(name);
        const value=event.target.value;
        console.log(value);
        this.setState({[name]:value})
       }

       handlemobilenumber=(event)=>{
         const name=event.target.name;
         console.log(name);
         const value=event.target.value;
         console.log(value)
   this.setState({[name]:value})
       }

       handlegenders=(gender)=>{
         console.log(gender)
         this.setState({genders:gender})
      
       }

       handlesubmit=()=>{



        const {name,emails,passwords,genders,mobilenumber,getsignupdetails,mails}=this.state;
        console.log(mails)
        const allu=mails.indexOf(emails)
     const mailing=queryString.parse(mails)
     console.log(mailing)
        axios({
          
          url:'https://vast-plateau-26931.herokuapp.com/signup',
          method:'POST',
          headers:{'content-Type':'application/json'},
         
          data:
          {
          name:name,
          email:mails[allu]!== emails ? emails : alert('User with this email address already exist'),
          password:passwords,
          mobilenumber:mobilenumber,
          gender:genders
          }
       
        })
        .then(res=>this.setState({signupdetails:res.data.signup}))

        .catch(error=>console.log(error))

         this.props.history.push('/thankyou')
        
       }


       userlogin=(state,value)=>{
         this.setState({[state]:value,islogin:false})

       }

       responseGoogle=(response)=>{
         this.setState({googleusername:response.profileObj.name,IsGoogleuserLoggedIn:true,islogin:false,googleimage:response.profileObj.imageUrl})
       }


       handlegooglelogout=(state,value)=>{
  this.setState({[state]:value})
       }
      

       responseFacebook=(response)=>{
          this.setState({facebookusername:response.name,image:response.picture.data.url,isfacebookuserloggedIn:true,islogin:false})
       }

       handlefacebooklogout=(state,value)=>{
this.setState({[state]:value})
       }


       locationId=(event)=>{
         const location=event.target.value;
         axios({
           url:'https://vast-plateau-26931.herokuapp.com/restaurantsfilter',
           method:'POST',
           headers:{'content-Type':'application/json'},
           data:
           {
            mealtype:location
           }

         })
         .then(res=>this.setState({restaurants:res.data.filter}))

         .catch(error=>console.log(error))

       }


       handleid=(event)=>{
         const Id=event.target.value;
         this.props.history.push(`items/?item=${Id}`)
       }
      
    render()
    {
        const {locations}=this.props;
        const {islogin,IsuserLoggedIn,logindetails,iscreatingaccount,isuserwanttologin,IsGoogleuserLoggedIn,googleusername,facebookusername,isfacebookuserloggedIn,image,googleimage,restaurants}=this.state;
        return(
        <div>

         
    <nav class="navbar navbar-expand-xs bg-dark navbar-dark p-3 fixed-top">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>


  {
    IsGoogleuserLoggedIn==true && IsuserLoggedIn==false?
        <div style={{float:'right',verticalAlign:'top'}}>
        <span className="text-primary mr-3"><img src={`${googleimage}`} className="rounded-circle" width="40px" height="40px"/>&nbsp;&nbsp;{`Welcome ${googleusername}`}</span>
        <span className="text-primary" style={{border:'4px double red',padding:'4px 4px 4px 4px'}} onClick={()=>this.handlegooglelogout('IsGoogleuserLoggedIn',false)}>Logout</span>
      
      
      
        </div>
    
    :

    IsuserLoggedIn==true && IsGoogleuserLoggedIn==false?logindetails.map((item)=>{
      return  <div style={{float:'right',verticalAlign:'top'}}>
      <span className="text-primary mr-3" onClick={()=>this.handleclick('islogin',true)}>{`Welcome ${item.name}`}</span>
      <span className="text-primary" style={{border:'4px double red',padding:'4px 4px 4px 4px'}} onClick={()=>this.handlelogout('IsuserLoggedIn',false)}>Logout</span>
    
    
    
      </div>
    })


    :isfacebookuserloggedIn==true && IsuserLoggedIn==false?
    <div style={{float:'right',verticalAlign:'top'}}>
    <span className="text-primary mr-3"><img src={`${image}`} className="rounded-circle"  width="40px" height="40px"/>&nbsp;&nbsp;{`Welcome ${facebookusername}`}</span>
    <span className="text-primary" style={{border:'4px double red',padding:'4px 4px 4px 4px'}} onClick={()=>this.handlefacebooklogout('isfacebookuserloggedIn',false)}>Logout</span>
  
  
  
    </div>
    
    
  
  
  
  : IsGoogleuserLoggedIn==false? <div style={{float:'right',verticalAlign:'top'}}>
    <span className="text-primary mr-3" onClick={()=>this.handleclick('islogin',true)}>Login</span>
    <span className="text-primary" style={{border:'4px double red',padding:'4px 4px 4px 4px'}} onClick={()=>this.handleaccount('iscreatingaccount',true)}>Createanaccount</span>
  
  
  
    </div>
    
    

  :
  IsuserLoggedIn==false?<div style={{float:'right',verticalAlign:'top'}}>
      <span className="text-primary mr-3" onClick={()=>this.handleclick('islogin',true)}>Login</span>
      <span className="text-primary" style={{border:'4px double red',padding:'4px 4px 4px 4px'}} onClick={()=>this.handleaccount('iscreatingaccount',true)}>Createanaccount</span>
    
    
    
      </div>
  
  :null}


  

  













  <div class="collapse navbar-collapse" id="collapsibleNavbar">
  &nbsp;
    <ul class="navbar-nav"> 
      <li class="nav-item">
        <button class="nav-link btn  text-danger btn-sm" onClick={this.Aboutus}>About us</button>
      </li>
      &nbsp;
      <li class="nav-item">
        <button class="nav-link btn text-danger  text-white btn-sm" onClick={this.Contactus}>Contact us</button>
      </li>
      &nbsp;
      <li class="nav-item">
        <button class="nav-link btn  text-danger text-white btn-sm" onClick={this.Rateus}>Rate us</button>
      </li>    
    </ul>
  </div>  
</nav>

       <div id="demo" className="carousel slide" data-ride="carousel">


<div className="container-fluid jumbotron text-center" style={{background:"url(Assets/restaurantlogo.jpg)"}}>

  <div className="logo">
  <p className="skrs">SKR <i className="fas fa-coffee bg-warning rounded" id="top"></i> <b>R</b>estaurant</p>
</div>
<br/><br/>
<div className="btn-group">
  <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Home</button>
  <div className="dropdown-menu">
      <a href="https://www.youtube.com" className="dropdown-item bg-dark text-white">products</a>
  <a href="https://www.youtube.com" className="dropdown-item bg-dark text-white">orders</a>
  <a href="https://www.youtube.com" className="dropdown-item bg-dark text-white">complaints</a>

  </div>
  <button className="btn btn-primary" data-toggle="popover" title="SKR Restaurant" data-content="we have Variety of dishes" data-trigger="focus" onClick={this.Dishes}>Dishes</button>
  <button className="btn btn-primary" onClick={this.Aboutus}>About Us</button>
  <button className="btn btn-primary" onClick={this.Contactus}>Contact Us</button>
</div>
<br/><br/>
<div style={{display: "inline-block"}}>
  <select className="dropdown mr-2"  onChange={this.locationId}>
      <option selected>Please select your Dish</option>
      {
          locations.map((item)=>{
              return <option value={item.location_id} className="text-info">{`${item.location}`}</option>
          })
      }
      
  </select>
   
  <select  className="dropdowns" onChange={this.handleid}>
  <option selected>Select your Favourite Dish</option>
    {
           restaurants.map((item)=>{
             return  <option value={item._id} className="text-danger">{`${item.name}`}</option>
                    
           })
    }
   
  </select>
</div>
<br/><br/>
<div className="carousel-inner">
  <div className="carousel-item active">
    <img src="images/image1.png" alt="Los Angeles" width="300px" height="200px" className="rounded-circle  img-thumbnail" style={{boxShadow: "0px 0px 0px 3px grey"}}/>
  </div>
  <div className="carousel-item">
    <img src="images/image2.png" alt="Chicago" width="300px" height="200px" className="rounded-circle img-thumbnail" style={{boxShadow: "0px 0px 0px 3px grey"}}/>
  </div>
  <div className="carousel-item">
    <img src="images/image3.png" alt="New York" width="300px" height="200px" className="rounded-circle img-thumbnail" style={{boxShadow: "0px 0px 0px 3px grey"}}/>
  </div>
</div>
</div>


<a className="carousel-control-prev" href="#demo" data-slide="prev">
  <span className="carousel-control-prev-icon"></span>
</a>
<a className="carousel-control-next" href="#demo" data-slide="next">
  <span className="carousel-control-next-icon"></span>
</a>
</div>
<Modal
   
   isOpen={islogin}
   style={modalstyles}
  >

<GoogleLogin
    clientId="336603315194-gmu6rnqf99i4srke6t22lbeviclssv1p.apps.googleusercontent.com"
    buttonText="Continue With Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
<br/>
<br/>
<button onClick={()=>this.userlogin('isuserwanttologin',true)} className="btn btn-success">Login with Credentials</button>
<br/>
<br/>
<FacebookLogin
    appId="724972548147178"
    fields="name,email,picture"
    callback={this.responseFacebook} />
</Modal>


<Modal

isOpen={iscreatingaccount}
style={customStyles}
>

<div className="text-center">
                <div>Signup form</div>
    <div onClick={()=>this.handleaccount('iscreatingaccount',false)} style={{float:'right',marginTop:'-49px',fontSize:'20px',fontStyle:'italic',color:'gold',marginRight:'-16px'}}>close</div>

              <form style={{border:'4px double orangered'}} onSubmit={this.handlesubmit}>
       <i className="fas fa-user"></i>&nbsp;&nbsp;<input type="text" name="name"  required  onChange={this.handlename} /><br/><br/>
       <i className="fas fa-envelope"></i>&nbsp;&nbsp;<input type="email" name="emails"   required  onChange={this.handleemails} /><br/><br/>
       <i className="fas fa-lock"></i>&nbsp;&nbsp;<input type="password" name="passwords"   required  onChange={this.handlepasswords} /><br/><br/>
       &#9743;&nbsp;<input type="tel" name="mobilenumber"  required onChange={this.handlemobilenumber}/><br/><br/>
       Gender:<i className="fas fa-male"></i>&nbsp;<input type="radio" name="genders" required  onChange={()=>this.handlegenders('male')}/>&nbsp;Male&nbsp;&nbsp;
       <i className="fas fa-male"></i>&nbsp;<input type="radio" name="genders" required   onChange={()=>this.handlegenders('female')}/>&nbsp;Female&nbsp;&nbsp;
       <i className="fas fa-male"></i>&nbsp;<input type="radio" name="genders" required    onChange={()=>this.handlegenders('others')}/>&nbsp;Others<br/><br/>

       <button className="btn btn-primary">Submit</button>
          
              </form>
              <div>Already have an account<a href="#"  onClick={()=>this.handleclick('isuserwanttologin',true)} style={{textDecoration:'none',color:'green'}}>&nbsp;SignIn</a></div>
              </div>

</Modal>

<Modal
 isOpen={isuserwanttologin}
 style={customStyles}

>
<div className="text-center">
  <div>
  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<span className="text-center">Login Form</span>
  <span onClick={()=>this.handleclick('isuserwanttologin',false)} style={{float:'right',color:'darkslateblue'}}>close</span>
  </div>

  
<form>
  <i className="fas fa-envelope"></i>&nbsp;&nbsp;<input type="email" name="email" required onChange={this.handlemail}/><br/><br/>
 <i className="fas fa-lock">&nbsp;&nbsp;</i> <input type="password" name="password" required onChange={this.handlepassword}/><br/><br/>
 Gender:<i className="fas fa-male"></i>&nbsp;<input type="radio" name="gender" onChange={()=>this.handlegender('male')} required/>&nbsp;Male&nbsp;
 <i className="fas fa-female"></i>&nbsp;<input type="radio" name="gender" onChange={()=>this.handlegender('female')} required/>&nbsp;Female&nbsp;
 <i className="fas fa-female"></i>&nbsp;<input type="radio" name="gender" onChange={()=>this.handlegender('others')} required/>&nbsp;Others<br/><br/>
  <button className="btn btn-primary">submit</button>
</form>
<div>Dont have an account<a href="#" onClick={()=>this.handleaccount('iscreatingaccount',true)} style={{textDecoration:'none',color:'red'}}>&nbsp;Signup</a></div>
</div>
</Modal>

        </div>
        );
    }
}

export default withRouter(Wallpaper);
