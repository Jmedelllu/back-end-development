const express = require("express");
const { getAllStudents,
    addStudent,
    updateStudentByID,
    deleteStudentByID,
    getStudentByID, } = require("./students.service");

const router = express.Router();

//Get All Students
router.get('/', async (req, res) => {
    try {
        const students = await getAllStudents();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Add Student
router.post("/", async (req, res) => {
    try {
        const newStudentData = req.body;
        const student = await addStudent(newStudentData);

        res.send({
            data: student,
            message: "Data berhasil ditambahkan"
        });
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

//Update Student by ID
router.put("/:id", async (req, res) => {
    try{
        const newStudentData = req.body;
        const idStudent = parseInt(req.params.id);

        const student = await updateStudentByID(idStudent, newStudentData);

        res.send({
            data: student,
            message: `Data dengan id ${idStudent} berhasil diupdate`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

//Delete Student by ID
router.delete("/:id", async (req, res) => {
    const idStudent = parseInt(req.params.id);
    try {
        const student = await deleteStudentByID(idStudent);

        res.send({
            data: student,
            message: `Data dengan id ${idStudent} berhasil dihapus`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

//Get student by ID
router.get('/:id', async (req, res) => {
    const idStudent = parseInt(req.params.id);
    try {
        const student = await getStudentByID(idStudent);
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;