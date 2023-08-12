import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SmsService } from 'src/app/services/sms.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parent-search',
  templateUrl: './parent-search.component.html',
  styleUrls: ['./parent-search.component.css']
})
export class ParentSearchComponent implements OnInit {
  searchForm: FormGroup;
  search: any = {};
  child: any = {};
  recipientPhoneNumber: string;
  message: string ='your parent is checking your results';
  constructor(private userService: UserService, private router: Router, private smsService: SmsService) { }

  ngOnInit() {
  }

  
  searchChildResult() {
    this.userService.searchChildByPhone(this.search).subscribe((response) => {
      this.child = response.foundChild;
      this.router.navigate([`studentDashboard/${this.child._id}`]);
    });
  }

  sendSMS(phoneNbr) {
    this.smsService.sendSMS(phoneNbr, this.message).subscribe(
      (response) => {
        console.log('SMS sent successfully:', response);
      },
      (error) => {
        console.error('Failed to send SMS:', error);
      }
    );
  }
}
