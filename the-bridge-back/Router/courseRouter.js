const express = require('express');
const router = express.Router();
const courseController = require('../Controllers/courseController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/',upload.single('image'), courseController.createCourse);
router.patch('/:id',upload.single('image'), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;

