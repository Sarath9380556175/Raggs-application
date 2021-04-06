import React from 'react';
import Wallpaper from './Wallpaper';
import Quicksearch from './QuickSeach';
import axios from 'axios';
import Footer from './Footer';
class Home extends React.Component{
  constructor()
  {
    super();
    this.state={
      locations:[],
      quicksearches:[]
    }
  }
 componentDidMount()
 {
   sessionStorage.clear();
   axios({
     url:'https://boiling-castle-50263.herokuapp.com/locations',
     method:'GET',
     headers:{'content-Type':'application/json'}
   })
   .then(res=>this.setState({locations:res.data.locations}))

   .catch(err=>console.log(err))


   axios({
     url:'https://boiling-castle-50263.herokuapp.com/quicksearches',
     method:'GET',
     headers:{'content-Type':'application/json'}
   }).then(res=>this.setState({quicksearches:res.data.quicksearch}))
   .catch()
 }

 

    render()
    {
      const {locations,quicksearches}=this.state;
        return(
       <div>
         <Wallpaper locations={locations}/>
         <Quicksearch quicksearches={quicksearches}/>
         <Footer/>
</div>
    
        );
    }
}

export default Home;
