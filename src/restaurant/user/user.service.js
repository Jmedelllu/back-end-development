const { 
    findUser, 
    findUserByID, 
    insertUser,
    editUserByID, 
    deleteUser } = require("./user.repository")

const getAllUser = async () => {
    const user = await findUser()
    return user
}

const addUser = async (newUserData) => {
    if(!newUserData.name || !newUserData.address){
        throw new Error("id dan alamat pengguna harus diisi");
    }else if(newUserData.name.length > 2 || newUserData.address.length > 2){
        const user = await insertUser(newUserData)
        return user
    }
}


const updateUserByID = async(id, newUserData) =>{
    if(typeof id !== 'number'){
        throw new Error("id harus berupa angka");
    }else if(!newUserData.name || !newUserData.address){
        throw new Error("id dan alamat harus diisi");
    }else if(newUserData.name.length > 2 || newUserData.address.length > 2){
        const user = await editUserByID(id, newUserData)
        return user
    }
}

const deleteUserByID = async(id) => {
    if(typeof id !== 'number'){
        throw new Error("nomor harus berupa angka");
    }
    
    const user = await findUserByID(id)

    if(!user){
        throw new Error("data tidak ditemukan");
    }else{
        await deleteUser(id)
    }
}

const getUserByID = async(id) => {
    if(typeof id !== 'number'){
        throw new Error("nomor harus berupa angka");
    } else {
        const result = await findUserByID(id)
        if(result){
            return result;
        } else {
            throw new Error("data tidak ditemukan");
        }  
    }
}

module.exports = {
    getAllUser,
    addUser,
    updateUserByID,
    deleteUserByID,
    getUserByID,
}