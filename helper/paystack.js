const axios = require('axios')
const Ref = require('../models/reference')
require('dotenv').config()


async function initEventPay(email,amount){
    try{    
        const ref = await new Ref({
            ref: (Math.random() + 1).toString(36).substring(2)
        }).save()

    const json ={
            "email": "customer@email.com",
            "amount": "5000",
            "currency": "NGN",
            "reference": ref.ref, 
            "metadata": {
                "pay_for": "ticket"
            }
    }

    const token = process.env.PAYSTACK;
    
    const baseUrl = `https://api.paystack.co/transaction/initialize`;
    
     return await axios.post(baseUrl,json,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });

} catch(error){
    console.log(error)
}
}


async function initProductPay(email,amount){
    try{    
    const json ={
            "email": `${email}`,
            "amount": `${amount}`,
            "currency": "NGN",
            "metadata": {
                "pay_for": "product"
            }
    }

    const token = process.env.PAYSTACK;
    
    const baseUrl = `https://api.paystack.co/transaction/initialize`;
    
     return await axios.post(baseUrl,json,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });


} catch(error){
    console.log(error)
}
}






module.exports = {
    initEventPay,
    initProductPay
}