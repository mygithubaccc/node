const express = require('express')
const {payForTicket,payToAddProduct, verifyPayments} = require('../controllers/pay')
const router = express.Router();


router.route('/payForTicket/:userId').post(payForTicket);
router.route('/payForProduct/:userId').post(payToAddProduct);
router.route('/verifyPayment/:refId').get(verifyPayments)




module.exports = router