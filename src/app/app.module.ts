import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { StudentsComponent } from './components/students/students.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SearchComponent } from './components/search/search.component';
import { MapComponent } from './components/map/map.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { HomeComponent } from './components/home/home.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { GoToSignupParentComponent } from './components/go-to-signup-parent/go-to-signup-parent.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseComponent } from './components/course/course.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { StudentComponent } from './components/student/student.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { TeachersCardsComponent } from './components/teachers-cards/teachers-cards.component';
import { TeacherCardComponent } from './components/teacher-card/teacher-card.component';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { SeeEvaluationComponent } from './components/see-evaluation/see-evaluation.component';
import { SignupComponent } from './components/signup/signup.component';
import { ParentSearchComponent } from './components/parent-search/parent-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    AboutComponent,
    StudentsComponent,
    DashboardComponent,
    SignupTeacherComponent,
    SponsorsComponent,
    CoursesComponent,
    SearchComponent,
    MapComponent,
    SignupParentComponent,
    HomeComponent,
    SignupStudentComponent,
    GoToSignupParentComponent,
    SignupAdminComponent,
    LoginComponent,
    AddCourseComponent,
    CourseComponent,
    ContactComponent,
    AdminComponent,
    UsersTableComponent,
    CoursesTableComponent,
    CourseInfoComponent,
    TeachersComponent,
    DashboardTeacherComponent,
    StudentComponent,
    SearchPageComponent,
    TeachersCardsComponent,
    TeacherCardComponent,
    CustomFilterPipe,
    EvaluationComponent,
    DashboardStudentComponent,
    SeeEvaluationComponent,
    SignupComponent,
    ParentSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
