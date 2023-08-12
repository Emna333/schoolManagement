import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-signup-parent',
  templateUrl: './go-to-signup-parent.component.html',
  styleUrls: ['./go-to-signup-parent.component.css']
})
export class GoToSignupParentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  goToSignupParent(){
    this.router.navigate(['signupParent']);
  }
}
