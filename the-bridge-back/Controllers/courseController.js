const Course = require('../Models/Course');


const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createCourse = async (req, res) => {
    const course = new Course({
        name: req.body.name,
        price: req.body.price,
        image: req.file.path,
    });
    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        course.name = req.body.name;
        course.price = req.body.price;
        course.image = req.file.path;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Course' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}




