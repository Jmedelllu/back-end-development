const prisma = require("../../db/index")

const findUser = async () => {
    const user = await prisma.user.findMany()
    return user
}

const findUserByID = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user
}

const insertUser = async (newUserData) => {
    const user = await prisma.user.create({
        data: {
            id: parseInt(newUserData.id),
            user: newUserData.user,
            address: newUserData.address
        }
    })
    return user
}

const deleteUser = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id: id
        }
    })
    return user
}

const editUserByID = async (id, newUserData) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            user: newUserData.user,
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