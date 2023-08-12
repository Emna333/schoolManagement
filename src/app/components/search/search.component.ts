import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  search: any = {};
  teachers: any = [];
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
   
  }
searchTeacher(){
  localStorage.setItem('specialty',JSON.stringify(this.search));
  this.router.navigate(['allTeachers/search']);
}
}
