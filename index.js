const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/' });
const cors = require('cors');
const getUsers = require('./users');
const db = require('./db.js');

const hostname = '127.0.0.1';
const port = 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors(
    {
        origin: 'http://127.0.0.1:5500',
        credentials: true
    }
))

app.get('/data', (req, res) => {
    res.json({
        name: "John Doe",
        age: 25
    })
});

//Morgan
app.use(morgan('combined'))

//Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.post('/login', (req, res) => {
    const {username, password} = req.body
    res.json(
        {
            status: "success",
            data: {
                username: username,
                password: password
            }
        }
    )
})
// Home route with static file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get sample data
app.get('/data', (req, res) => {
    res.json({
        name: "John Doe",
        age: 25
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.json({
        status: "success",
        data: {
            username: username,
            password: password
        }
    });
});

// Students Endpoints with Prisma

// Get all students (Prisma Get)
app.get('/students', async (req, res) => {
    try {
        const allStudents = await prisma.students.findMany();
        res.json(allStudents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Add a student (Prisma Add)
app.post('/students', async (req, res) => {
    const { name, address } = req.body;
    try {
        if (!name || !address) {
            res.status(400).json({
                status: "error",
                message: "Name and address must be provided"
            });
        } else {
            const insertStudent = await prisma.students.create({
                data: {
                    name: name,
                    address: address
                }
            });
            res.status(200).json({
                status: "success",
                message: "Data inserted successfully"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Update student by ID (Prisma Update)
app.put('/students/:id', async (req, res) => {
    const { name, address } = req.body;
    const idStudent = parseInt(req.params.id);
    try {
        if (!name || !address) {
            res.status(400).json({
                status: "error",
                message: "Name and address must be provided"
            });
        } else {
            const updateStudent = await prisma.students.update({
                where: {
                    id: idStudent
                },
                data: {
                    name: name,
                    address: address
                }
            });
            res.status(200).json({
                status: "success",
                message: `Data with id ${idStudent} updated successfully`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// Delete student by ID (Prisma Delete)
app.delete('/students/:id', async (req, res) => {
    const idStudent = parseInt(req.params.id);
    try {
        const result = await prisma.students.delete({
            where: {
                id: idStudent
            }
        });
        res.status(200).json({
            status: "success",
            message: `Data with id ${req.params.id} deleted successfully`
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// Get student by ID (Prisma Get)
app.get('/students/:id', async (req, res) => {
    const idStudent = parseInt(req.params.id);
    try {
        const result = await prisma.students.findMany({
            where: {
                id: idStudent
            }
        });
        if (result.length > 0) {
            res.status(200).json({
                data: result
            });
        } else {
            res.status(404).json({
                message: `Data with id ${req.params.id} not found`
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// Additional Endpoints

// List all users
app.get('/users', (req, res) => {
    res.json(getUsers);
});

// Get user by name (case insensitive)
app.get('/users/:name', (req, res) => {
    const user = getUsers.find(user => user.name.toLowerCase() === req.params.name.toLowerCase());
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: "User data not found"
        });
    }
});

// Add a user
app.post('/users', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        res.status(400).json({
            error: "Please provide data to be added"
        });
    } else {
        getUsers.push(req.body);
        res.send(`User with id ${id} and name ${name} added successfully`);
    }
});

// Update user data by name
app.put('/users/:nameReq', (req, res) => {
    const { id, name } = req.body;
    const { nameReq } = req.params;
    const user = getUsers.find(user => user.name.toLowerCase() === nameReq.toLowerCase());
    if (user) {
        user.id = id;
        user.name = name;
        res.json({
            message: `User with name ${nameReq} updated to ${name} with id ${id}`
        });
    } else {
        res.status(404).json({
            message: "User data not found"
        });
    }
});

// Delete user by name
app.delete('/users/:name', (req, res) => {
    const { name } = req.params;
    const user = getUsers.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (user) {
        getUsers.splice(getUsers.indexOf(user), 1);
        res.json({
            message: `User with name ${name} deleted successfully`
        });
    } else {
        res.status(404).json({
            message: "User data not found"
        });
    }
});

// Specific photo upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
    const photo = req.file;
    if (photo) {
        const fileExtension = path.extname(photo.originalname).toLowerCase();
        if (imgExtensions.includes(fileExtension)) {
            const target = path.join(__dirname, 'public', photo.originalname);
            fs.renameSync(photo.path, target);
            res.send("File uploaded successfully");
        } else {
            fs.unlinkSync(photo.path);
            res.send("Uploaded file")
        };
    };
});


//M2. routing 404
app.use((req, res, next) => {
    res.status(404).json({
        status: "Error",
        message: "Resource tidak ditemukan",
    })
    next()
})

//M3. error handling
const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        status : "error",
        message : "terjadi kesalahan pada server"
    })
}
app.use(errorHandling)


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
