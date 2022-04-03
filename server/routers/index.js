const router = require('express').Router();
const HospitalRouter = require('./hospital.route');

router.use('/hospital', HospitalRouter);

module.exports = router;
