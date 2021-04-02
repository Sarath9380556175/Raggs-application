import React from 'react';
import '../styles/Home.css';
import QuicksearchItem from './Quicksearchitem'
class Quicksearch extends React.Component{
    
    render()
    {
        const {quicksearches}=this.props;
        return(
            <div>
               <div className="quick container-fluid">Quick Searches</div>
               {
               quicksearches.map((item)=>{
                   return <QuicksearchItem items={item}/>
               })
    }
    </div>
        );
    }
} 
export default Quicksearch;