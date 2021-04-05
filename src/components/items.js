import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import  Modal from 'react-modal';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border:'6px solid black',
      background:'LightSeaGreen'
    }
  };
class Items extends React.Component{
    constructor()
    {
        super();
        this.state={
            Items:[],
            ismodalopen:false,
            name:undefined,
            email:undefined,
            password:undefined,
            mobilenumber:undefined,
            gender:undefined,
            payments:{},
            subTotal:undefined
        }
    }

    componentDidMount()
    {
        const qs=queryString.parse(this.props.location.search)
        const Id=qs.item;
        const price=Number(qs.price);
        console.log(price)

        axios({
            url:'https://immense-chamber-71560.herokuapp.com/itemslist',
            method:'POST',
            headers:{'content-Type':'application/json'},
            data:
            {
                ItemId:Id
            }
        })
        .then(res=>this.setState({Items:res.data.Items,subTotal:price}))

        .catch(error=>console.log(error))
    }

    handleClick=(state,value)=>{
        this.setState({[state]:value})
        
    }



    handlename=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        console.log(name)
        console.log(value)
        this.setState({[name]:value})
    }

    

    handleemail=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        console.log(name)
        console.log(value)
        this.setState({[name]:value})
    }

    handlepassword=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        console.log(name)
        console.log(value)
        this.setState({[name]:value})
    }

    handlegender=(gender)=>{
        
       this.setState({gender:gender})
    }

    handlemobilenumber=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        console.log(name)
        console.log(value)
        this.setState({[name]:value})
    }

   /*payment code*/
   isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
}

isObj = (val) => {
    return typeof val === 'object'
}

stringifyValue = (val) => {
    if (this.isObj(val) && !this.isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
}

buildForm = ({ action, params }) => {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', this.stringifyValue(params[key]))
        form.appendChild(input)
    })

    return form
}

post = (details) => {
    const form = this.buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
}

getData = (data) => {
    return fetch(`https://immense-chamber-71560.herokuapp.com/payment`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

makePayment = (e) => {
    const { subTotal, email } = this.state;
    this.getData({ amount: subTotal, email: email }).then(response => {
        var information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        this.post(information);
    })
    e.preventDefault();


    const {name,password,mobilenumber,gender}=this.state;
    axios({
        url:'https://immense-chamber-71560.herokuapp.com/paymentform',
        method:'POST',
        headers:{'content-Type':'application/json'},
        data:
        {
             name:name,
            email:email,
            password:password,
            mobilenumber:mobilenumber, 
             gender:gender
        }
    })

    .then(res=>this.setState({payments:res.data.payments}))

    .catch(error=>console.log(error))

    
}



    render()
    {
        const {Items,ismodalopen}=this.state;
        return(
            <div>
                 <Modal
            isOpen={ismodalopen}
            style={customStyles}>
    
                <div className="text-center">
                <div>Payment form</div>
    <div onClick={()=>this.handleClick('ismodalopen',false)} style={{float:'right',marginTop:'-49px',fontSize:'20px',fontStyle:'italic',color:'gold',marginRight:'-16px'}}>close</div>

              <form style={{border:'4px double orangered'}} onSubmit={this.makePayment}>
       <i className="fas fa-user"></i>&nbsp;&nbsp;<input type="text" name="name"  required  onChange={this.handlename} /><br/><br/>
       <i className="fas fa-envelope"></i>&nbsp;&nbsp;<input type="email" name="email"   required  onChange={this.handleemail} /><br/><br/>
       <i className="fas fa-lock"></i>&nbsp;&nbsp;<input type="password" name="password"   required  onChange={this.handlepassword} /><br/><br/>
       &#9743;&nbsp;<input type="tel" name="mobilenumber"  required onChange={this.handlemobilenumber}/><br/><br/>
       Gender:<i className="fas fa-male"></i>&nbsp;<input type="radio" name="gender" required  onChange={()=>this.handlegender('male')}/>&nbsp;Male&nbsp;&nbsp;
       <i className="fas fa-male"></i>&nbsp;<input type="radio" name="gender" required   onChange={()=>this.handlegender('female')}/>&nbsp;Female&nbsp;&nbsp;
       <i className="fas fa-male"></i>&nbsp;<input type="radio" name="gender" required    onChange={()=>this.handlegender('others')}/>&nbsp;Others<br/><br/>

       <button className="btn btn-primary">proceed</button>
          
              </form>
              </div>
            </Modal>
            {Items.length!==0?
                
                Items.map((item)=>{
                    return <div className="container">
                    <img src={`../${item.image}`} style={{width:'100%', height:'auto'}}  className="rounded" alt=""/>
                     <div className="ml-2 mt-2"  style={{color:'orangered'}}>Name:&nbsp;{item.name}</div>
                     <div  className="ml-2 mt-2"  style={{color:'darkslateblue',fontStyle:'italic',fontFamily:'sans-serif'}}>price:&nbsp;&#8377;&nbsp;{this.state.subTotal} per person</div>
                     <div  className="ml-2 mt-2"  style={{color:'darkslateblue'}}>Contact Number:&nbsp;{item.contact_number}</div><br/>
                     &nbsp;
                     &nbsp;&nbsp;<button className=" btn btn-outline-danger" onClick={()=>this.handleClick('ismodalopen',true)}>Paynow</button>
                    </div>
                })
                
            :<div style={{fontSize:'25px',fontStyle:'italic',fontFamily:'serif'}}>No Item Found</div>}


        
            </div>
            
           
        )
    }
}

export default Items;
