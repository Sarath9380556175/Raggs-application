import React from 'react';
import '../styles/aboutus.css';
import axios from 'axios'
class Aboutus extends React.Component{
    constructor()
    {
        super();
        this.state=
        {
            aboutus:[],
            aboutusdetails:[]
        }
    }

    componentDidMount()
    {
        axios({
            url:'https://peaceful-hollows-85659.herokuapp.com/aboutus',
            method:'get',
            headers:{'content-Type':'application/json'}
        })
.then(res=>this.setState({aboutus:res.data.about}))

.catch(error=>console.log(error))


axios({
    url:'https://peaceful-hollows-85659.herokuapp.com/aboutusdetails',
    method:'get',
    headers:{'content-Type':'application/json'}
})
.then(res=>this.setState({aboutusdetails:res.data.aboutus}))

.catch(error=>console.log(error))



    }
    
  
    handleClick=()=>{
        this.props.history.push('/contactus')
    }


    render()
    {
        const {aboutus,aboutusdetails}=this.state
        return(
            <div  className="rounded">
<br/><br/>
	<div class="text-center jumbotron container" style={{paddingTop: "22px",paddingBottom: "10px"}}>

    {
        aboutus.map((item)=>{
            return <div>
            
            <h2 class="aboutus">{item.title}</h2>
            <div class="jumbotron container" style={{background:`url(${item.image})`}}>
             <h6 style={{color:'yellow'}}>{item.aboutus}</h6>
           
        
    </div>
</div>
        })
        }
</div>
{
    aboutus.map((item)=>{
        return  <div className="text-center" style={{fontSize:'25px',fontWeight:'bold'}}>{item.name}</div>

    })
}

<br/>
<br/>
<div className="container text-center" >

       
{
    aboutusdetails.map((item)=>{
        return  <div className="aboutus1 rounded">
        
        <div>
            <img src={`../${item.image}`} width="300px" height="150px"  className="rounded " alt="Nothing Found"/>
            </div>
            <br/>
            <div>
                <div style={{fontSize:'20px',fontStyle:'italic',fontFamily:'serif',color:'LimeGreen',fontWeight:'bold'}}>{item.developer_name}</div>
                
                <br/>
                <div style={{color:'orangered',fontWeight:'bold',fontStyle:'italic',fontFamily:'serif'}}>{item.developer_role}</div>
           
                <br/>
           <button className="btn  btn-secondary bg-dark" style={{padding:'5px 35px 5px 35px'}} onClick={this.handleClick}>{item.contact_name}</button>
            
            </div>
        </div>
    })
}
</div>
  
            </div>
        )
    }
}

export default Aboutus;
