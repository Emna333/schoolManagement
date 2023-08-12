import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(contactForm: any) {
    this.contactForm.value.email='emnaabid326@gmail.com';
    this.contactService.submitContactForm(this.contactForm.value).subscribe(
      (response) => { console.log('here response from BE',response)
        if (response.msg === 'Email sent successfully') {
          console.log('Email sent successfully');
          Swal.fire('Email sent successfully','', 'success');

        } else {
          console.error('Error sending email');
          Swal.fire('Oops!', 'Student already affected in this course.', 'error');

        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}









