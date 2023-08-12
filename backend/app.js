//express framework BE JS
const express = require('express');

//creates express application
const app = express();


//import body-parser module

const bodyParser = require('body-parser');

//aamelna npm i mongoose

const mongoose = require('mongoose');

//import bcrypt module
const bcrypt = require('bcrypt');

//import axios module
const axios = require('axios');

//import multer module
const multer = require('multer');

//import path module
const path = require('path');

//import nodemailer module

const nodemailer = require('nodemailer');
//import twilio module

const twilio = require('twilio');


// mongodb://127.0.0.1:27017=@ de base du serveur mongoDB(Port 27017)
// marsDB=>DB name
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB');

// app configuration

//send json response
app.use(bodyParser.json());
//get object from request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(

        'Access-Control-Allow-Headers',

        'Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn'

    );

    res.setHeader(

        'Access-Control-Allow-Methods',

        'GET, POST, DELETE, OPTIONS, PATCH, PUT'

    );

    next();

});

//configuration des fichiers

// ShortCut :remplace backend/images avec myFiles
app.use("/myFiles", express.static(path.join("backend/images")));

// Media Types
const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "application/pdf": "pdf",
};
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
        cb(null, imgName);
    },
});


//Models Importation

const Course = require('./models/course');
const User = require('./models/user');

// BL signup
//'file' le param file du service
app.post('/api/users/signup', multer({ storage: storageConfig }).single('file'),
    (req, res) => {
        console.log('here into BL signup', req.body);
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            if (req.body.role == 'student') {
                req.body.img = "http://localhost:3002/myFiles/" + req.file.filename;

            } else if (req.body.role == 'teacher') {
                req.body.cv = "http://localhost:3002/myFiles/" + req.file.filename;

            }
            console.log('here crypted pwd', cryptedPwd);
            let user = new User(req.body);
            user.save(
                (err, doc) => {
                    if (err) {
                        res.json({ msg: 'Error with signup' });

                    } else {
                        res.json({ msg: 'Added with success' });
                    }
                }

            );
        });
    });




//Business Logic:Login
// 0=> Phone Nbr Error
// 1=> pwd Error
// 2 => welcome
app.post('/api/users/login', (req, res) => {
    console.log('here into BL login', req.body);
    let user;
    User.findOne({ phone: req.body.phone }).then((doc) => {
        console.log('here response after login', doc);
        user = doc;
        if (!doc) {
            res.json({ msg: '0' });
        } else {
            return bcrypt.compare(req.body.pwd, doc.pwd);
        }
    })
        //pas de ; ici 
        .then(
            (checkPwd) => {
                console.log('here check pwd', checkPwd);
                if (!checkPwd) {
                    res.json({ msg: '1' });
                }
                else {
                    if (user.status == 'NOK') {
                        res.json({ msg: '3' });
                    }
                    else {
                        let userToSend = {
                            id: user._id,
                            fName: user.firstName,
                            lName: user.lastName,
                            role: user.role
                        };
                        res.json({ msg: '2', connectedUser: userToSend });
                    }
                }
            });
});




//BL get all users
app.get('/api/users', (req, res) => {
    console.log('here into BL:Get all users');
    User.find().then(
        (docs) => {
            res.json({ usersTab: docs })
        });
});

//BL phone child exists
app.post('/api/users/phoneChild', (req, res) => {
    console.log('here into BL:check childPhone');
    User.findOne({ role: 'student', phone: req.body.phoneChild }).then((doc) => {
        if (doc) {
            res.json({ msg: 'exists' });
        }
    });
});

//BL get all teachers
app.get('/api/users/teachersList', (req, res) => {
    console.log('here into BL:Get all teachers');
    User.find({ role: 'teacher', status: 'OK' }).then(
        (docs) => {
            console.log('Here finded teachers', docs);
            res.json({ teachersTab: docs });
        });
});

//BL get all students
app.get('/api/users/students', (req, res) => {
    console.log('here into BL:Get all students');
    User.find({ role: 'student' }).then(
        (docs) => {
            console.log('Here finded students', docs);
            res.json({ studentsTab: docs });
        });
});


//BL edit teacher status
app.put('/api/users', (req, res) => {
    console.log('here into BL:Edit user');
    User.updateOne({ _id: req.body._id }, { $set: { status: 'OK' } }, (error, result) => {
        if (error) {
            console.error(error);

            res.json({ message: 'Error' });

        } else { 
            console.log('Mise à jour réussie');
            console.log(result);
            res.json({ message: 'Updated with success' });

        }

    });
});
//BL edit student evaluation
app.put('/api/users/student', (req, res) => {
    console.log('here into BL: Edit user');
    console.log('here req.body', req.body);

    let updatedCourses = req.body.affectedCourse.map(course => ({
        evaluation: course.evaluation,
        rate: course.rate,
        courseId: course.courseId,
    }));
    console.log('here updatedCourses', updatedCourses);
    User.updateOne(
        { _id: req.body._id },
        { $set: { affectedCourse: updatedCourses } },
        (error, result) => {
            if (error) {
                console.error(error);
                res.json({ message: 'Error' });
            } else {
                console.log('Update successful');
                console.log(result);
                res.json({ message: 'Updated with success' });
            }
        }
    );
});



//Bl deleteUserById
app.delete('/api/users/:id', (req, res) => {
    console.log('here into BL:delete User By ID');
    let id = req.params.id;
    User.deleteOne({ _id: id }).then((response) => {
        console.log('Here response after delete', response);
        if (response.deletedCount == 1) {
            res.json({ message: 'Deleted with success' });
        } else {
            res.json({ message: 'Error' });
        }
    });
});

// BL get user by id
app.get('/api/users/:id', (req, res) => {
    console.log('here into BL: Get user by ID');
    User.findOne({ _id: req.params.id })
        .then((doc) => {
            if (doc) {
                res.json({ findedUser: doc });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch((error) => {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// search teacher by specialty
app.post('/api/users/searchTeacher', (req, res) => {
    console.log('here into BL search teacher by specialty');
    User.find({ role: 'teacher', status: 'OK', specialty: req.body.specialty }).then((docs) => {
        res.json({ teachers: docs });
    });

});

// search Child by phone numbr
app.post('/api/users/searchChild/byPhone', (req, res) => {
    console.log('here into BL search child by phone nbr');
    User.findOne({ role: 'student', phone: req.body.phoneChild }).then((doc) => {
        res.json({ foundChild: doc });
    });
});



//BL add course

app.post('/api/courses', (req, res) => {
    console.log('here into BL add or edit Course');
    let course = new Course(req.body);
    course.save(
        (err, doc) => {
            if (err) {
                res.json({ msg: 'Error with add or edit course' });
            } else {
                res.json({ msg: 'Added with success' });
            }
        });
});

//BL edit course 
app.put('/api/courses', (req, res) => {
    console.log('here into Bl edit course');
    let newCourse = req.body;
    Course.updateOne({ _id: newCourse._id }, newCourse).then(
        (response) => {
            console.log('here response after update', response);
            if (response.nModified == 1) {
                res.json({ msg: 'Updated with success' });
            } else {
                res.json({ msg: 'Error' });

            }
        });
});


//BL get all courses
app.get('/api/courses/all', (req, res) => {
    console.log('here into BL get All courses')
    Course.find().then((docs) => {
        res.json({ coursesTab: docs });
    });
});





//BL get course By Id
app.get('/api/courses/:id', (req, res) => {
    console.log('here into BL get course by ID');
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Course.findOne({ _id: req.params.id })
            .then((doc) => {
                console.log('here found course', doc);
                if (doc && Object.keys(doc).length !== 0) {
                    res.json({ findedCourse: doc });
                } else {
                    res.status(404).json({ error: 'Course not found' });
                }
            })
            .catch((error) => {
                console.error('Error retrieving course:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        res.status(400).json({ error: 'Invalid course ID' });
    }
});



//BL delete course
app.delete('/api/courses/:id', (req, res) => {
    Course.deleteOne({ _id: req.params.id }).then((response) => {
        console.log('here resp after delete', response);
        res.json({ msg: 'deleted with success' });
    });
});


//BL get course by teacher ID
app.get('/api/courses/teacher/:idT', (req, res) => {
    console.log('here into BL get course by teacher ID');
    Course.find({ teacherId: req.params.idT }).then((docs) => {
        console.log('here finded teachers courses', docs);
        res.json({ findedTeacherCourses: docs });
    });
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
    console.log('here into BL contact admin');

    // Send email notification to admin
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mariemjulia3333@gmail.com',
            pass: 'vkwirlkaserpjucm'
        }
    });

    let mailOptions = {
        from: 'mariemjulia3333@gmail.com',
        to: req.body.email,
        subject: 'Contact Form Submission',
        text: `Name: ${req.body.name}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.json({ msg: 'error' });

        } else {
            console.log('Email sent:', info.response);
            res.json({ msg: 'Email sent successfully' });

        }
    });
});

//sending SMS
accountSid = 'ACb2b834e72e9a67232096e042e065a601';
authToken = '114b7dc7298a466b86b8206d0bee9156';
twilioPhoneNumber = '+12295373612';
// ''
app.post('/api/send-sms', (req, res) => {
    console.log('here into BL send SMS');
    let { to, message } = req.body;
  
    let client = twilio(accountSid, authToken);
  
    client.messages
      .create({
        body: message,
        from: twilioPhoneNumber,
        to: to,
      })
      .then((message) => {
        console.log('SMS sent successfully:', message.sid);
        res.json({ success: true, message: 'SMS sent successfully' });
      })
      .catch((error) => {
        console.error('Failed to send SMS:', error);
        res.status(500).json({ success: false, message: 'Failed to send SMS' });
      });
  });




//make app exportable
module.exports = app;
