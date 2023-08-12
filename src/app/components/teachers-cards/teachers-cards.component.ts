import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-cards',
  templateUrl: './teachers-cards.component.html',
  styleUrls: ['./teachers-cards.component.css']
})
export class TeachersCardsComponent implements OnInit {

  teachers: any = [];
 
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
      this.userService.getAllTeachers().subscribe(
        (response) => {
          console.log('here resp from BE', response.teachersTab);
          this.teachers = response.teachersTab;
        });
    }
  
   


}