const express = require('express');
const {generateAndSendTicket, checkToken} = require('../controllers/tickets')
const router = express.Router();


//router.route('/sendEventTicket/:userId').post(sendEventTicket)
//router.route('/getEventTicket/:userId').get(getEventTicket)

router.route('/generateAndSendTicket/:userId').post(generateAndSendTicket)
router.route('/checkToken').get(checkToken);
module.exports = router