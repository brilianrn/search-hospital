const router = require('express').Router();
const HospitalController = require('../controllers/hospital.controller');

router.get('/', HospitalController.listHospital);
router.get('/search', HospitalController.searchHospital);
router.get('/detail/:hospitalId', HospitalController.detailHospital);

router.post('/webhook', HospitalController.updateListHospitals);

module.exports = router;