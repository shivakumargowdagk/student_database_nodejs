const express = require("express");
const router = express.Router();

const { createStudent, getAllStudents, deleteStudent, viewStudentById, updateStudentById } = require('../controllers/student');

router.post('/createstudent', createStudent);
router.get('/getallstudents', getAllStudents);
router.put('/deletestudent/:studentId', deleteStudent);
router.get('/viewstudentbyid/:studentId', viewStudentById);
router.put('/updatestudentbyid/:studentId', updateStudentById);

module.exports = router;