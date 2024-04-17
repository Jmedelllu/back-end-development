const { findStudents, findStudentsByID, insertStudent,editStudentByID, deleteStudent } = require("./students.repository")

const getAllStudents = async () => {
    const students = await findStudents()
    return students
}

const addStudent = async (newStudentData) => {
    if(!newStudentData.name || !newStudentData.address){
        throw new Error("id dan address harus diisi");
    }else if(newStudentData.name.length > 2 || newStudentData.address.length > 2){
        const student = await insertStudent(newStudentData)
        return student
    }
}

const updateStudentByID = async(id, newStudentData) =>{
    if(typeof id !== 'number'){
        throw new Error("id harus berupa angka");
    }else if(!newStudentData.name || !newStudentData.address){
        throw new Error("id dan address harus diisi");
    }else if(newStudentData.name.length > 2 || newStudentData.address.length > 2){
        const student = await editStudentByID(id, newStudentData)
        return student
    }
}

const deleteStudentByID = async(id) => {
    if(typeof id !== 'number'){
        throw new Error("id harus berupa angka");
    }
    
    const student = await findStudentsByID(id)

    if(!student){
        throw new Error("data tidak ditemukan");
    }else{
        await deleteStudent(id)
    }
}

const getStudentByID = async(id) => {
    if(typeof id !== 'number'){
        throw new Error("id harus berupa angka");
    } else {
        const result = await findStudentsByID(id)
        if(result){
            return result;
        } else {
            throw new Error("data tidak ditemukan");
        }  
    }
}

module.exports = {
    getAllStudents,
    addStudent,
    updateStudentByID,
    deleteStudentByID,
    getStudentByID,
}