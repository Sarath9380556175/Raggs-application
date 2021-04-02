import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Thankyou from './thankyou';
import Contactus from './contactus';
import Aboutus from './Aboutus';
import Rateus from './Rateus';
import Dishes from  './Dishes';
import Items from './items'
class Router extends React.Component{
    render()
    {
        return(
           <BrowserRouter>
           <Route exact path="/" component={Home} />
           <Route path="/thankyou" component={Thankyou}/>
           <Route path="/contactus" component={Contactus}/>
           <Route exact path="/aboutus" component={Aboutus}/>
           <Route exact path="/rateus" component={Rateus}  />
           <Route exact path="/Dishes" component={Dishes}/>
           <Route exact path="/Items" component={Items} />
           </BrowserRouter>
        )
    }
}

export default Router;