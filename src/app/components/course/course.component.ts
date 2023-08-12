import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  template: `
  <button (click)="openSweetAlert()">Open SweetAlert</button>
`,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() X: any;
  course: any;
  studentId: string;
  idExiste:any;
  affectedStudents = [];
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('sId');
  }

  saveStudentInCourse(id) {
    this.courseService.getCourseById(id).subscribe((response) => {
      this.course = response.findedCourse;
      if (this.studentId) {
        this.idExiste = this.course.affectedStudents.find((obj) => (obj === this.studentId));
        console.log('here this.idExiste ', this.idExiste );
        if (typeof this.idExiste === 'undefined') {
          this.course.affectedStudents.push(this.studentId);
          this.courseService.editCourse(this.course).subscribe((response) => {
            console.log('here resp from BE: course edited ', response);
            Swal.fire('Student successfully affected','', 'success');
            this.router.navigate([`courseInfo/${id}`]);
          });
        } else {
          Swal.fire('Oops!', 'Student already affected in this course.', 'error');
        }

    }
  });

 
  }
}
