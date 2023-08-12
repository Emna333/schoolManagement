import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courses: any = [];
  connectedUser: any = {};
  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (this.connectedUser && this.connectedUser.role === 'teacher') {
      this.courseService.getTeachersCourses(this.connectedUser.id).subscribe((response) => {
        this.courses = response.findedTeacherCourses;
      });
    }
    else {
      this.courseService.getAllCourses().subscribe((response) => {
        this.courses = response.coursesTab;
      });
    }

  }
  goToDisplay(x) {
    this.router.navigate([`courseInfo/${x}`]);
  }

  goToEdit(x) {
    this.router.navigate([`editCourse/${x}`]);
  }

  delete(x) {
    this.courseService.deleteCourse(x).subscribe(
      (response) => {
        console.log(response.msg)
        this.courseService.getAllCourses().subscribe((response) => {
          this.courses = response.coursesTab;
        });
      });
  }

}