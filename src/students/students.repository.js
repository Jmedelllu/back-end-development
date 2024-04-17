const prisma = require("../db")

const findStudents = async () => {
    const students = await prisma.students.findMany()
    return students
}

const findStudentsByID = async (id) => {
    const student = await prisma.students.findUnique({
        where: {
            id: id
        }
    })
    return student
}

const insertStudent = async (newStudentData) => {
    const student = await prisma.students.create({
        data: {
            name: newStudentData.name,
            address: newStudentData.address
        }
    })
    return student
}

const deleteStudent = async (id) => {
    const student = await prisma.students.delete({
        where: {
            id: id
        }
    })
    return student
}

const editStudentByID = async (id, newStudentData) => {
    const student = await prisma.students.update({
        where: {
            id: id
        },
        data: {
            name: newStudentData.name,
            address: newStudentData.address
        }
    })
    return student
}

module.exports = {
    findStudents,
    insertStudent,
    editStudentByID,
    deleteStudent,
    findStudentsByID,
}