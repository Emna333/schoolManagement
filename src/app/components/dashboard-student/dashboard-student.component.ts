import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  connectedUser: any;
  studentId: any;
  findedUser: any;
  courses: any = [];
  title: string;
  constructor(private userService: UserService, private courseService: CourseService
    , private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (this.connectedUser.role == 'student') {
      this.title = 'dashboard Student';
      this.userService.getUserById(this.connectedUser.id).subscribe((response) => {
        this.findedUser = response.findedUser;
        console.log('here resp after login student', response.findedUser);

        for (let i = 0; i < this.findedUser.affectedCourse.length; i++) {
          console.log('here this.findedUser.affectedCourse[i] ', this.findedUser.affectedCourse[i]);

          this.courseService.getCourseById(this.findedUser.affectedCourse[i].courseId).subscribe((response) => {
            console.log('here findedCourse ', response.findedCourse)
            this.courses.push(response.findedCourse);
          });
        }
      });
    }
    else {
      this.title = 'Your child s courses';

      this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.getUserById(this.studentId).subscribe((response) => {
        this.findedUser = response.findedUser;
        console.log('here resp after search student', response.findedUser);

        for (let i = 0; i < this.findedUser.affectedCourse.length; i++) {
          console.log('here this.findedUser.affectedCourse[i] ', this.findedUser.affectedCourse[i]);

          this.courseService.getCourseById(this.findedUser.affectedCourse[i].courseId).subscribe((response) => {
            console.log('here findedCourse ', response.findedCourse)
            this.courses.push(response.findedCourse);
          });
        }
      });
    }
  }
  seeEvaluation(id) {
    if (this.connectedUser.role == 'student') {
      this.router.navigate([`seeEvaluation/${id}`]);
    }
    else {
      this.router.navigate([`seeEvaluation/${id}/${this.studentId}`]);

    }
  }

}
