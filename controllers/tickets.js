//const express = require('express');
const User = require("../models/user");
//const sendTicket = require('../helper/tickets')
//const {handleWebhook} = require('../controllers/webhook')
const {sendQr} = require('../helper/sendEmail')
//const initPay = require('../helper/paystack')
//const event = require('../controllers/webhook')
const qr = require('qrcode')
const Token = require('../models/token')
const moment = require('moment');
const axios = require('axios')






exports.generateAndSendTicket = async  (req,res) =>{
try{
    const user = await User.findById(req.params.userId)
    const token = await new Token({
        token: ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
        isUsed: false,
        email: user.email,
        expiryDate: moment(new Date()).add(30, 'm').toDate()
      }).save();
    let data = {
        token: token.token
    };
    let stJson = JSON.stringify(data);
    qr.toString(stJson,{type:"terminal"},function(err,code){
        if(err) return console.log("error");
        //console.log(code);
        // render(code)

        
    });
    qr.toDataURL(stJson, function(err,code){
        if (err) return console.log("error");
        //console.log(code);
    })
     qr.toFile("QRcode.png",stJson,function(err,img){
        if(err) return console.log("error")

    });

    const body = `${token.token}` 

    sendQr(user.email,body,"Ticket" )

    


    res.status(200).json({
        "success": true,
        "msg":"Email sent"
    
    })

} catch(error){
    console.log(error)
    res.status(400).json({
        "success": false,
        "msg":"Internal Error Occured"
    })
}

}


exports.checkToken = async (req,res) =>{
  try{

  // const url = `https://a587-197-210-70-164.ngrok.io/api/tickets/checkToken`
  // axios
  // .get(url,data)
  // .then((response)=>{
  //   console.log(response.data)
  // })
  const token = req.body
  let check = await Token.findOne({
    token: token,
  });
  console.log(check);
  if(!check){
    res.status(400).json({
      message: "Token not found in the Database"
    })
  }

  if(check.expiryDate < new Date()){
    res.status(400).json({
      message:"Token expired."
    })
  }
  await Token.findByIdAndRemove(check._id);


  //  res.status(200).send({
  //   message: "Token verified successfully"
  // });

  
} catch (error) {
  console.log(error)
}
}





// exports.getAllTickets = async (req,res) =>{

// }







//  exports.sendEventTicket = async (req,res)=>{
//     try{
//         const user = await User.findById(req.params.userId)
        
//             sendTicket(user.email,"BUSA Show Ticket","Your Ticket","BUSA","ezehdavidhoddy@gmail.com")


//     res.status(200).json({
//         success: true  
//      })
    
// } catch (error){
//     console.log(error)
//     res.status(500).json({
//         success:false,
//         msg:error
//     })
// }







