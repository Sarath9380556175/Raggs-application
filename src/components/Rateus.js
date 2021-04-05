import React from 'react';
import '../styles/rateus.css';
import axios from 'axios';
class Rateus extends React.Component{
    constructor()
    {
        super();
        this.state={
            ratings:{},
            rating:undefined,
            quality:undefined,
            feedback:undefined
        }
        
    }
    skr=()=>{
        this.props.history.push('/thankyou');
    }

    handlerating=(rating)=>{
        this.setState({rating:rating})
    }

    handlequality=(quality)=>{
 this.setState({quality:quality})
    }


    handlefeedback=(event)=>{
       const name=event.target.name;
       const value=event.target.value;
       this.setState({[name]:value})
    }

    handleSubmit=()=>{
        const {rating,quality,feedback}=this.state;
        axios({
            url:'http://localhost:8080/rateus',
            method:'POST',
            headers:{'content-Type':'application/json'},
            data:
            {
                Restaurant:String(rating),
                FoodQuality:String(quality),
                feedback:String(feedback)
                

            }
        })
        .then(res=>this.setState({ratings:res.data.rateus}))
        .catch(err=>console.log(err));

        this.props.history.push('/thankyou')

    }

   
    render()
    {
        return(
            <div>
                <div className="container border rounded">
                    <div className="text-center mt-3" style={{color:'darkslateblue',fontSize:'30px',fontStyle:'italic'}}>Please provide us feedback on the Restaurant
</div>
                 <form  onSubmit={this.handleSubmit}>
                     <br/>
    <div style={{color:'darkslateblue',fontSize:'15px',fontStyle:'italic'}}>1. please rate the quality of Food<br/><br/>
    
	<input type="radio" name="audio" onChange={()=>this.handlequality('Excellent')} required/>&nbsp;
    Excellent
  </div>

  <div style={{color:'darkslateblue',fontStyle:'italic'}}>
	<input type="radio" name="audio" value="b" onChange={()=>this.handlequality('Good')} required/>&nbsp;
    Good
   </div>

    <div style={{color:'darkslateblue',fontStyle:'italic'}}>
	<input type="radio" name="audio" value="a" onChange={()=>this.handlequality('Average')} required/>&nbsp;
    Average
 </div>


<div style={{color:'darkslateblue',fontStyle:'italic'}}>
<input type="radio" name="audio" onChange={()=>this.handlequality('Bad')} required/>&nbsp;
   Bad

</div>
<br/>

<div style={{color:'darkslateblue',fontSize:'15px',fontStyle:'italic'}}>2. please rate the quality of Restaurant<br/><br/>
	<input type="radio" name="radio" onChange={()=>this.handlerating('Excellent')} required/>&nbsp;
   Excellent
</div>

<div style={{color:'darkslateblue',fontStyle:'italic'}}>
	<input type="radio" name="radio" onChange={()=>this.handlerating('Good')} required/>&nbsp;
   Good
</div>

<div style={{color:'darkslateblue',fontStyle:'italic'}}>
	<input type="radio" name="radio" onChange={()=>this.handlerating('Average')} required/>&nbsp;
   Average
</div>

<div style={{color:'darkslateblue',fontStyle:'italic'}}>
	<input type="radio" name="radio" onChange={()=>this.handlerating('Bad')} required/>&nbsp;
    Bad
</div>

<br/>
<br/>
<div style={{fontStyle:'italic',color:'darkslateblue'}}>3. Share more feedback on Overall Food Quality</div><br/>
<textarea rows="2" cols="150" class="container" name='feedback' onChange={this.handlefeedback}></textarea>
   <div className="text-center">
	<button className="btn btn-primary btn-sm">Submit</button>
   </div>
</form>
</div>
<div class="bg-dark" style={{paddingLeft:"36px",
    paddingTop: "39px",
    paddingBottom: "28px"}}>
<div style={{fontSize: "13px",color:"white"}}>©1997-2021 LogMeIn, Inc. All rights reserved.</div>
<div style={{fontSize: "14px",color: "white"}}>View the&nbsp;&nbsp;<a href="www.edureka.com">GoToRestaurant Privacy Policy.</a></div>
	</div>
   
</div>

            
        );
    }
}

export default Rateus;
