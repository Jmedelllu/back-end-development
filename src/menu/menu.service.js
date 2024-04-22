const { findMenu, findMenuByID, insertMenu,editMenuByID, deleteMenu } = require("./menu.repository")

const getAllMenu = async () => {
    const menu = await findMenu()
    return menu
}

const addMenu = async (newMenuData) => {
    if(!newMenuData.name || !newMenuData.price){
        throw new Error("nomor dan price harus diisi");
    }else if(newMenuData.name.length > 2 || newMenuData.price.length > 2){
        const menu = await insertMenu(newMenuData)
        return menu
    }
}


const updateMenuByID = async(no, newMenuData) =>{
    if(typeof no !== 'number'){
        throw new Error("nomor harus berupa angka");
    }else if(!newMenuData.name || !newMenuData.price){
        throw new Error("nomor dan price harus diisi");
    }else if(newMenuData.name.length > 2 || newMenuData.price.length > 2){
        const menu = await editMenuByID(no, newMenuData)
        return menu
    }
}

const deleteMenuByID = async(no) => {
    if(typeof no !== 'number'){
        throw new Error("nomor harus berupa angka");
    }
    
    const menu = await findMenuByID(no)

    if(!menu){
        throw new Error("data tidak ditemukan");
    }else{
        await deleteMenu(no)
    }
}

const getMenuByID = async(no) => {
    if(typeof no !== 'number'){
        throw new Error("nomor harus berupa angka");
    } else {
        const result = await findMenuByID(no)
        if(result){
            return result;
        } else {
            throw new Error("data tidak ditemukan");
        }  
    }
}

module.exports = {
    getAllMenu,
    addMenu,
    updateMenuByID,
    deleteMenuByID,
    getMenuByID,
}