import React from 'react';
import  '../styles/Home.css';
import {withRouter} from 'react-router-dom';
class QuicksearchItem extends React.Component{

    quicksearch=(mealtypeId)=>{
        
        this.props.history.push(`/Dishes/?restaurant=${mealtypeId}`)
    }
    render()
    {
        const {items}=this.props;
        return(
  <div className="one rounded"  data-toggle="tooltip" title={items.content} data-placement="bottom" onClick={()=>this.quicksearch(items.badge)}>
      <div style={{display: "inline-block",width: "45%"}}>
          <img src={items.image} width="129px" height="149px" alt="notfound" className="rounded-circle"/>
      </div>
      <div style={{display: "inline-block",width: "45%",verticalAlign: "top"}} className="ml-3">
          <div className="badge badge-dark rounded-circle  ml-3">{items.badge}</div>
          <div className="burger">{items.name}</div>
          <div className="two">{items.content}</div>
      </div>

  </div>


        )
    }
}

export default  withRouter(QuicksearchItem);