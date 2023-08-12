import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  courseId: any;
  course: any = {};
  students: any = [];
  studentsIds: any = [];
  affectedStudents: any = [];
  connectedUser: any = {};
  form: any = ''
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      console.log('get course by id', response.findedCourse);
      this.course = response.findedCourse;
      this.studentsIds = this.course.affectedStudents;
      console.log('students ids', this.studentsIds);
      for (let i = 0; i < this.studentsIds.length; i++) {
        this.userService.getUserById(this.studentsIds[i]).
          subscribe((response) => {
            if(response.findedUser){
            this.students.push(response.findedUser);
          }
          });
      }

    });
  }

  evaluate(id) {
    this.router.navigate([`evaluation/${id}/${this.courseId}`]);
  }
}
