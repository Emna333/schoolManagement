import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  errorMsg: any;
  cvPreview: string;
  signupForm: FormGroup;

  constructor(private X: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],//validateur obligatoire
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      pwd: ['', [Validators.required,
      ]],
      cv: [''],
    })
  }
  signup() {
    console.log('here signup teacher obj', this.signupForm.value)
    this.signupForm.value.role = 'teacher';
    this.signupForm.value.status = 'NOK';
    this.userService.signup(this.signupForm.value, this.signupForm.value.cv).subscribe(
      (response) => {
        console.log('here resp from BE', response);
        if (response.msg == 'Error with signup') {
          this.errorMsg = response.msg;
        } else {
          this.router.navigate(['login']);
        }
      });
  }

  onCvSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.cvPreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}

