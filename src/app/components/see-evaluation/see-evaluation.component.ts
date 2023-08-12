import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-see-evaluation',
  templateUrl: './see-evaluation.component.html',
  styleUrls: ['./see-evaluation.component.css']
})
export class SeeEvaluationComponent implements OnInit {
  courseId: any;
  connectedUser: any;
  findedUser: any;
  evaluation: any;
  rate: any;
  studentId: any;

  constructor(
    private userService: UserService, private courseService: CourseService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if (this.connectedUser.role == 'student') {
      this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.getUserById(this.connectedUser.id).subscribe((response) => {
        this.findedUser = response.findedUser;
        console.log('here resp after login student', response.findedUser);
        for (let i = 0; i < this.findedUser.affectedCourse.length; i++) {
          console.log('here this.findedUser.affectedCourse[i] ', this.findedUser.affectedCourse[i]);
          if (this.findedUser.affectedCourse[i].courseId == this.courseId) {
            this.evaluation = this.findedUser.affectedCourse[i].evaluation;
            this.rate = this.findedUser.affectedCourse[i].rate;
          }

        }
      });
    } else {
      this.studentId = this.activatedRoute.snapshot.paramMap.get('sId');
      this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.getUserById(this.studentId).subscribe((response) => {
        this.findedUser = response.findedUser;
        console.log('here resp after login student', response.findedUser);
        for (let i = 0; i < this.findedUser.affectedCourse.length; i++) {
          console.log('here this.findedUser.affectedCourse[i] ', this.findedUser.affectedCourse[i]);
          if (this.findedUser.affectedCourse[i].courseId == this.courseId) {
            this.evaluation = this.findedUser.affectedCourse[i].evaluation;
            this.rate = this.findedUser.affectedCourse[i].rate;
          }
        }
      });
    }

  }

}