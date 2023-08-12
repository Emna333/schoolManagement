import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

 
  teachers: any = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllTeachers().subscribe((response)=>{
      this.teachers=response.teachersTab;
      });
  }
 
}
