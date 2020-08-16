const router = require('express').Router();

const {findAll ,createEvent, deleteEvent, updateEvent } = require('../controllers/eventController');

router.get('/event-list/',findAll);
router.post('/event-create/',createEvent);
router.delete('/event-delete/:eventId/',deleteEvent);
router.put('/event-update/:eventId/',updateEvent);

module.exports= router;