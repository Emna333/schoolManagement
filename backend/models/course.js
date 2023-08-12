//import mongoose module
const mongoose=require('mongoose');

//create schema
const courseSchema=mongoose.Schema({
 name:String,
 description:String,
 duration:String,
 teacherId:String,
 teacherName:String,
 affectedStudents:Array,
 evaluatedStudents:Array,
});
//affectation d'un nom de modele pour le schema
const course=mongoose.model('Course',courseSchema);

//make course exportable
module.exports=course;