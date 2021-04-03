import React from 'react';
import '../styles/Dishes.css';
import axios from 'axios';
import queryString from 'query-string';
class Dishes extends React.Component{
constructor()
{
    super();
    this.state={
  restaurants:[]
    }
}

componentDidMount()
{
    sessionStorage.clear();
    const qs=queryString.parse(this.props.location.search)
  
  const mealtype=qs.restaurant;
  
    axios({
        url:'https://dry-citadel-95113.herokuapp.com/restaurantsfilter',
        method:'POST',
        headers:{'content-Type':'application/json'},
        data:
        {
  mealtype:Number(mealtype)
        }

    })
    .then(res=>this.setState({restaurants:res.data.filter}))

    .catch(err=>console.log(err))
}


itempage=(itemid,itemprice)=>{
   
    this.props.history.push(`/Items/?item=${itemid}&price=${itemprice}`)
}

    render()
    {
        const {restaurants}=this.state;
        return(
            
            <div>
                <div className="container-fluid ">
                {restaurants.length!==0?
                    
                    restaurants.map((item)=>{
                        return  <div style={{display:'inline-block'}}  className="skr"  onClick={()=>this.itempage(item._id, item.min_price)}>
                            
               <img src={`../${item.image}`} width="300px" height="300px" className=" rounded" style={{marginRight:'70px'}} alt="Nothing Found"/>
               <div className="mt-3">
                   <div style={{marginRight:'3px',padding:'3px 20px 3px 20px',display:'inline'}} className="btn-outline-success">{item.name}</div>
                   <div style={{marginRight:'3px',padding:'3px 20px 3px 20px'}} >&#8377;&nbsp;{item.min_price} per person</div>
                   </div>
               </div>
               
                    })
               :<div style={{fontSize:'30px',color:'darkslateblue'}}>No Records Found</div> }
                
            </div>
            </div>
        )
    }
}

export default Dishes;
