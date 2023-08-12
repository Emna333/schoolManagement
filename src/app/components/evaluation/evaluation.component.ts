import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluation',
  template: `
  <button (click)="openSweetAlert()">Open SweetAlert</button>
`,
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluationForm: FormGroup;
  studentId: any;
  courseId: any;
  student: any;
  msg: any;
  evaluatedCourse: any = {};
  alreadyEvaluated: any = {};
  constructor(private X: FormBuilder, private activatedRoute: ActivatedRoute, private userService: UserService
    , private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.evaluationForm = this.X.group({
      rate: ['', [Validators.required,]],//validateur obligatoire
      evaluation: ['', [Validators.required,]]
    }
    );
    this.studentId = this.activatedRoute.snapshot.paramMap.get('sId');
    this.courseId = this.activatedRoute.snapshot.paramMap.get('cId');
    this.userService.getUserById(this.studentId).subscribe((response) => {
      this.student = response.findedUser;
    });
  }
  save() {

    this.userService.getUserById(this.studentId).subscribe((response) => {
      this.student = response.findedUser;

      this.alreadyEvaluated = this.student.affectedCourse.find((obj) => obj.courseId === this.courseId);
      console.log('here already evaluated Course', this.alreadyEvaluated);

      if (!this.alreadyEvaluated) {

        //  a new element with the desired values
        this.evaluatedCourse = {
          evaluation: this.evaluationForm.value.evaluation,
          rate: this.evaluationForm.value.rate,
          courseId: this.courseId
        };
        console.log("evaluated course obj", this.evaluatedCourse);

        // add the new element in the affectedCourse array
        this.student.affectedCourse.push(this.evaluatedCourse);
        this.userService.editStudent(this.student).subscribe((response) => {
          this.msg = response.message;
          console.log(response.message);
          
          this.router.navigate(['teacherDashboard']);

        });
      } else {
        Swal.fire('Oops!', 'Student already evaluated.', 'error');

      }
    });



  }



}
