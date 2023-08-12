//import mongoose module
const mongoose = require('mongoose');

//create schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    img: String,
    cv: String,
    phone: String,
    role: String,
    adress: String,
    status: String,
    childPhone: String,
    specialty: String,
    
    affectedCourse:[ {
        rate: String,
        evaluation: String,
        courseId:String,
    }]

});
//affectation d'un nom de modele pour le schema
const user = mongoose.model('User', userSchema);

//make match exportable
module.exports = user;