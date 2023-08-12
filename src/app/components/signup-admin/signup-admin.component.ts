import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  errorMsg:any;
  signupForm:FormGroup;
  constructor(private X:FormBuilder ,private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.signupForm= this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],//validateur obligatoire
      lastName: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]],
      adress: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      pwd: ['',[Validators.required ,
        // Validators.pattern(‘(1=.*[a-z])(1=.*[A-Z])(1=.*[0-9])(1=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,10}’)]
      ]],
    })
  }
  signup(){
  console.log('here signup admin obj', this.signupForm.value) 
  this.signupForm.value.role='admin';
  this.userService.signup(this.signupForm.value,this.signupForm.value.cv).subscribe(
    (response)=>{ console.log('here resp from BE' ,response);
    if (response.msg=='Error with signup') {
      this.errorMsg= response.msg;
    } else {
      this.router.navigate(['login']);
    }
  }); 
  }
}
