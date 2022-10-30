const crypto  = require ('crypto')
const WebhookEvents = require('../models/webhookEvents')
const sendTicket = require('../helper/tickets')

const secret = "sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a"
//const paystack = require('paystack-api')("sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a")
//const sendEmail = require('../helper/sendEmail')
const {addNewProduct} = require('../controllers/products')

const bodyparser = require('body-parser')



    
async function  handleWebhook (req, res)  {
    try{

    
         //const event = req.body;
        //res.send(200);
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex')
        if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
     const  event = await req.body
      const email = await req.body.data.customer.email

      const webHookEvent =  await new WebhookEvents({
        webhookEvent: event
      }).save()

      console.log(webHookEvent)
      
      

      // if(event.event === 'charge.success' && event.data.metadata.pay_for === 'ticket' ){
      //   //sendTicket(email,"BUSA Show Ticket","Your Ticket","BUSA","ezehdavidhoddy@gmail.com")
      //   console.log(event)
      // } else if(event.event === 'charge.success' && event.data.metadata.pay_for === 'product'){
      //   //addNewProduct();
      //   console.log(event)
      // }
     
    // Do something with event  
    //console.log(event)
        
   // console.log(email)

   
    res.json({
        success: true
    });
    
    }

} catch(error){
    console.log(error)
}
}
   


// setTimeout(function(){
//     const stuff2 = handleWebhook()
//     console.log(stuff2)

// },60000)


async function getAllWebhookEvents  (req,res){
    try{
        const webEvents = await     WebhookEvents.find({})

    res.status(200).json({
        "success": true,
        "data": webEvents
    })

    } catch (error) {
        res.status(500).json({
            "success": false,
            "data": "Internal Error Occured"
        })
    }
    
}

// exports.verifyEvents = async (req,req) =>{

// }
 
module.exports = {
    handleWebhook,
    getAllWebhookEvents
    
}