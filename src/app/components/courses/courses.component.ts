import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any = [];
  teacherId: any;
  studentId: any;
  student: any;
  path:string;
  constructor(private courseService: CourseService, private router:Router ,private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('tId');
    this.studentId = this.activatedRoute.snapshot.paramMap.get('sId');
  this.path=this.router.url;
    console.log('here tId', this.teacherId);
    if (this.studentId) {
      this.courseService.getTeachersCourses(this.teacherId).subscribe((response) => {
        this.courses = response.findedTeacherCourses;
       console.log('here findedTeacherCourses',response.findedTeacherCourses) ;
      });
      this.userService.getUserById(this.studentId).subscribe((response) => {
        this.student = response.findedUser;
      });
    } else {
      this.courseService.getAllCourses().subscribe((response) => {
        this.courses = response.coursesTab.slice(0, 6);
      });
    }



  }

}
