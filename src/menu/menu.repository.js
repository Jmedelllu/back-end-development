const prisma = require("../db")

const findMenu = async () => {
    const menu = await prisma.menu.findMany()
    return menu
}

const findMenuByID = async (no) => {
    const menu = await prisma.menu.findUnique({
        where: {
            no: no
        }
    })
    return menu
}

const insertMenu = async (newMenuData) => {
    const menu = await prisma.menu.create({
        data: {
            no: parseInt(newMenuData.no),
            name: newMenuData.name,
            price: newMenuData.price
        }
    })
    return menu
}

const deleteMenu = async (no) => {
    const menu = await prisma.menu.delete({
        where: {
            no: no
        }
    })
    return menu
}

const editMenuByID = async (no, newMenuData) => {
    const menu = await prisma.menu.update({
        where: {
            no: no
        },
        data: {
            name: newMenuData.name,
            price: newMenuData.price
        }
    })
    return menu
}

module.exports = {
    findMenu,
    insertMenu,
    editMenuByID,
    deleteMenu,
    findMenuByID,
}