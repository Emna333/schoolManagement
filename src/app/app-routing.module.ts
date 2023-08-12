import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { SeeEvaluationComponent } from './components/see-evaluation/see-evaluation.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeachersCardsComponent } from './components/teachers-cards/teachers-cards.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'teachers',component:TeachersCardsComponent},
  {path:'signupStudent',component:SignupStudentComponent},
  {path:'signupParent',component:SignupParentComponent},
  {path:'signupTeacher',component:SignupTeacherComponent},
  {path:'signupAdmin',component:SignupAdminComponent},
  {path:'login',component:LoginComponent},
  {path:'addCourse',component:AddCourseComponent},
  {path:'editCourse/:id',component:AddCourseComponent},
  {path:'userInfo/:id',component:AboutComponent},
  {path:'courseInfo/:id',component:CourseInfoComponent},
  {path:'contact',component:ContactComponent},
  {path:'admin',component:AdminComponent},
  {path:'teachersList/:id',component:TeachersComponent},
  {path:'allTeachers/search',component:TeachersComponent},
  {path:'courses/:sId/:tId',component:CoursesComponent},
  {path:'teacherDashboard',component:DashboardTeacherComponent},
  {path:'studentDashboard',component:DashboardStudentComponent},
  {path:'studentDashboard/:id',component:DashboardStudentComponent},
  {path:'search',component:SearchPageComponent},
  {path:'evaluation/:sId/:cId',component:EvaluationComponent},
  {path:'seeEvaluation/:id',component:SeeEvaluationComponent},
  {path:'seeEvaluation/:id/:sId',component:SeeEvaluationComponent},
  {path:'signup',component:SignupComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
