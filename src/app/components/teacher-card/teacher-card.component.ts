import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent implements OnInit {
  @Input() C:any;

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToDisplay(x) {
    this.router.navigate([`userInfo/${x}`]);
  }
}
