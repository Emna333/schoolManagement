import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL: string = 'http://localhost:3002/api/courses'
  constructor(private httpClient: HttpClient) { }

  getAllCourses() {
    return this.httpClient.get<{ coursesTab: any }>(this.courseURL + '/all');
  }

  addCourse(courseObj) {
    return this.httpClient.post<{ msg: string }>(this.courseURL, courseObj)
  }

  getCourseById(id) {
    return this.httpClient.get<{ findedCourse: any }>(this.courseURL + `/${id}`)
  }

  editCourse(courseObj) {
    return this.httpClient.put<{ msg: string }>(this.courseURL, courseObj)
  }
  deleteCourse(id) {
    return this.httpClient.delete<{ msg: string }>(this.courseURL + `/${id}`)
  }
  getTeachersCourses(idT) {
    return this.httpClient.get<{findedTeacherCourses:any }>(this.courseURL +`/teacher/${idT}`)
  }

  putEvaluatedStudents(obj,id){
    return this.httpClient.put<{msg:any }>(this.courseURL +`/students/${id}`,obj)

  }
}