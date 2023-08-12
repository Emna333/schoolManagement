import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
 
function childPhoneExistsAsyncValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const childPhone = control.value;

    return userService.checkPhoneChildExists({ childPhone }).pipe(
      map((response) => {
        if (response.msg === 'exists') {
          // If the child phone exists in the user collection, return a validation error.
          return { childPhoneExists: true };
        } else {
          // If the child phone does not exist, return null (no validation errors).
          return null;
        }
      })
    );
  };
}
@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {
  signupForm:FormGroup;
  errorMsg:any;
  phoneChildExists:any;
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
      childPhone:['',[Validators.required], [childPhoneExistsAsyncValidator(this.userService)]

    ],
    })
  }
  signup(){
  console.log('here signup parent obj', this.signupForm.value)  
  this.signupForm.value.role='parent';
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
