const prisma = require("../../db/index")

const findUser = async () => {
    const user = await prisma.user.findMany()
    return user
}

const findUserByID = async (no) => {
    const user = await prisma.user.findUnique({
        where: {
            no: no
        }
    })
    return user
}

const insertUser = async (newUserData) => {
    const user = await prisma.user.create({
        data: {
            no: parseInt(newUserData.no),
            name: newUserData.name,
            address: newUserData.address
        }
    })
    return user
}

const deleteUser = async (no) => {
    const user = await prisma.user.delete({
        where: {
            no: no
        }
    })
    return user
}

const editUserByID = async (no, newUserData) => {
    const user = await prisma.user.update({
        where: {
            no: no
        },
        data: {
            name: newUserData.name,
            address: newUserData.address
        }
    })
    return user
}

module.exports = {
    findUser,
    insertUser,
    editUserByID,
    deleteUser,
    findUserByID,
}