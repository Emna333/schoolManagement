import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: any = [];
  specialty: any = {};
  studentId: any;
  path: string;
  user: any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('ConnectedUser'));
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.path = this.router.url;
    if (this.path == '/allTeachers/search') {

      this.specialty = JSON.parse(localStorage.getItem('specialty'));
      this.userService.searchTeacherBySpecialty(this.specialty).subscribe((response) => {
        this.teachers = response.teachers;
      });
    } else {
      this.userService.getAllTeachers().subscribe(
        (response) => {
          console.log('here resp from BE', response.teachersTab);
          this.teachers = response.teachersTab.slice(0, 6);
        });
    }
  }

  goToCourses(id) {
    this.router.navigate([`courses/${this.studentId}/${id}`]);
  }

}
