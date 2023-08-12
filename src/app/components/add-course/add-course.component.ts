import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allCourses } from 'src/app/dataBaseSimulation';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm: FormGroup;
  courseId: any;
  course: any = {};
  title: string = 'Add course';
  courses: any = [];
  errorMsg: string;
  conncectedTeacher: any;
  conncectedTeacherId: any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private router: Router) { }
 
  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    //courseId existe donc edit
    if (this.courseId) {
      this.title = 'Edit Course';
      this.courseService.getCourseById(this.courseId).subscribe((response) => {
        this.course = response.findedCourse;
      });
    }
  }
  addOrEditCourse() {
    if (this.courseId) {
      this.courseService.editCourse(this.course).subscribe((response) => {
        if (response.msg == 'Updated with success') {
          this.router.navigate(['admin']);
        } else {
          this.errorMsg = response.msg;
        }
      }
      );
    } else {
      this.conncectedTeacher = JSON.parse(localStorage.getItem('connectedUser'));
      this.course.teacherId = this.conncectedTeacher.id;
      this.course.teacherName = this.conncectedTeacher.fName;
      this.courseService.addCourse(this.course).subscribe((response) => {
        console.log('here resp from BE', response);
        if (response.msg == 'Added with success') {
          this.router.navigate(['admin']);
        } else {
          this.errorMsg = response.msg;
        }

      });
    }
  }
}
