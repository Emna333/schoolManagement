import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
students:any=[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllStudents().subscribe((response)=>{
this.students=response.studentsTab.slice(0, 8);
    })
  }

}
