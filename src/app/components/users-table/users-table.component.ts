import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allUsers } from 'src/app/dataBaseSimulation';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: any = [];
  findedUser: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        console.log('here resp from BE', response.usersTab);
        this.users = response.usersTab;
      }
    );
  }

  goToDisplay(x) {
    this.router.navigate([`userInfo/${x}`]);
  }

  delete(id) {
    this.userService.deleteUserById(id).subscribe(
      (response) => {
        console.log('here response after delete', response.message);
        this.userService.getAllUsers().subscribe(
          (response) => {
            console.log('here resp from BE', response.usersTab);
            this.users = response.usersTab;
          }
        );
      }
    );

  }

  validateTeacher(id) {
    this.userService.getUserById(id).subscribe(
      (response) => {
        console.log('here resp from BE', response.findedUser);
        this.findedUser = response.findedUser;
        this.userService.editUser(this.findedUser).subscribe(
          (response) => {
            console.log('Here response after edit', response.message);
            this.userService.getAllUsers().subscribe(
              (response) => {
                console.log('here resp from BE', response.usersTab);
                this.users = response.usersTab;
              }
            );
          }
        );
      }
    );
  }



  goToTeachers(id){
    this.router.navigate([`teachersList/${id}`]);
   }



}


