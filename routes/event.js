const express =  require('express')
const {uploadEvent, getAllEvents, getEventById, getEventsByHost, deleteEventById, updateEventById, getIperuCampusEvents, getMainCampusEvent} = require('../controllers/event')
const router = express.Router();

router.route('/uploadEvent').post(uploadEvent);
router.route('/getAllEvents').get(getAllEvents);
router.route('/getEventbyId/:eventId').get(getEventById);
router.route('/getEventsByHost/:hostId').get(getEventsByHost);
router.route('/deleteEventById/:eventId').delete(deleteEventById);
router.route('/updateEventById/:eventId').put(updateEventById);
router.route('/getIperuCampusEvents').get(getIperuCampusEvents)
router.route('/getMainCampusEvents').get(getMainCampusEvent)

module.exports = router;