import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToSignupAdmin(){
    this.router.navigate(['signupAdmin']);
  }
  goToSignupStudent(){
    this.router.navigate(['signupStudent']);
  }
  goToSignupTeacher(){
    this.router.navigate(['signupTeacher']);
  }
  goToSignupParent(){
    this.router.navigate(['signupParent']);
  }
}
