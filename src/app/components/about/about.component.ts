import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userId: any;
  findedUser: any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(this.userId).subscribe(
      (doc) => {
        console.log('here resp from BE get User Id', doc.findedUser);
        this.findedUser = doc.findedUser;
      }
    )
  }



}
