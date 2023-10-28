const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent
      } = require('../controllers/studentController');

const router = express.Router();

router.post('/', addStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = {
      routes: router
  }