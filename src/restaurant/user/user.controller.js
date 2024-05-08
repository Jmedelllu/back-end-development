const express = require("express");
const { getAllUser,
    addUser,
    updateUserByID,
    deleteUserByID,
    getUserByID, } = require("./user.service");

const router = express.Router();

//Get All User
router.get('/', async (req, res) => {
    try {
        const user = await getAllUser();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Add User
router.post("/", async (req, res) => {
    try {
        const newUserData = req.body;
        const user = await addUser(newUserData);

        res.send({
            data: user,
            message: "Data berhasil ditambahkan"
        });
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})


//Update User by ID
router.put("/:id", async (req, res) => {
    try{
        const newUserData = req.body;
        const idUser = parseInt(req.params.id);

        const user = await updateUserByID(idUser, newUserData);

        res.send({
            data: user,
            message: `Data dengan nomor ${idUser} berhasil diupdate`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

//Delete User by ID
router.delete("/:id", async (req, res) => {
    const idUser = parseInt(req.params.id);
    try {
        const user = await deleteUserByID(idUser);

        res.send({
            data: user,
            message: `Data dengan nomor ${idUser} berhasil dihapus`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

//Get User by ID
router.get('/:id', async (req, res) => {
    const idUser = parseInt(req.params.id);
    try {
        const user = await getUserByID(idUser);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;