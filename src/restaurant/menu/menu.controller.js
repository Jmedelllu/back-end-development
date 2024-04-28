const express = require("express");
const { getAllMenu,
    addMenu,
    updateMenuByID,
    deleteMenuByID,
    getMenuByID, } = require("./menu.service");

const router = express.Router();

//Get All Menu
router.get('/', async (req, res) => {
    try {
        const menu = await getAllMenu();
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Add Menu
router.post("/", async (req, res) => {
    try {
        const newMenuData = req.body;
        const menu = await addMenu(newMenuData);

        res.send({
            data: menu,
            message: "Data berhasil ditambahkan"
        });
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})


//Update Menu by ID
router.put("/:no", async (req, res) => {
    try{
        const newMenuData = req.body;
        const idMenu = parseInt(req.params.no);

        const menu = await updateMenuByID(idMenu, newMenuData);

        res.send({
            data: menu,
            message: `Data dengan nomor ${idMenu} berhasil diupdate`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

//Delete Menu by ID
router.delete("/:no", async (req, res) => {
    const idMenu = parseInt(req.params.no);
    try {
        const menu = await deleteMenuByID(idMenu);

        res.send({
            data: menu,
            message: `Data dengan nomor ${idMenu} berhasil dihapus`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

//Get Menu by ID
router.get('/:no', async (req, res) => {
    const idMenu = parseInt(req.params.no);
    try {
        const menu = await getMenuByID(idMenu);
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;