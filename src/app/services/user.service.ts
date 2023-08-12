import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = 'http://localhost:3002/api/users';
  constructor(private httpClient: HttpClient) { }
  // userObj=FN,LN,email,pwd
  signup(userObj: {
    firstName: string;
    lastName: string;
    email: string;
    pwd: string;
    address: string;
    role: string;
    phone: string;
    adress: string;
    status: string;
    childPhone: string;
    specialty: string;
    affectedCourse: { evaluation: string; rate: string; courseId: string }[];
  }, file: File) {
    let fData = new FormData();
    fData.append('file', file);
    fData.append('firstName', userObj.firstName);
    fData.append('lastName', userObj.lastName);
    fData.append('email', userObj.email);
    fData.append('pwd', userObj.pwd);
    fData.append('adress', userObj.adress);
    fData.append('role', userObj.role);
    fData.append('phone', userObj.phone);
    fData.append('status', userObj.status);
    fData.append('childPhone', userObj.childPhone);
    fData.append('specialty', userObj.specialty);



    return this.httpClient.post<{ msg: string }>(this.userURL + '/signup', fData);
  }

  // userObj=email,pwd

  login(userObj) {
    return this.httpClient.post<{ msg: string, connectedUser: any }>(this.userURL + '/login', userObj);

  }

  getAllUsers() {
    return this.httpClient.get<{ usersTab: any }>(this.userURL);

  }

  getUserById(id) {
    return this.httpClient.get<{ findedUser: any }>(`${this.userURL}/${id}`);
    //  +: concaténation
  }

  editUser(userObj) {
    return this.httpClient.put<{ message: string }>(this.userURL, userObj);
  }
  editStudent(userObj) {
    return this.httpClient.put<{ message: string }>(this.userURL + '/student', userObj);
  }

  deleteUserById(id) {
    return this.httpClient.delete<{ message: string }>(`${this.userURL}/${id}`);
  }

  getAllTeachers() {
    return this.httpClient.get<{ teachersTab: any }>(this.userURL + '/teachersList');

  }
  getAllStudents() {
    return this.httpClient.get<{ studentsTab: any }>(this.userURL + '/students');

  }
  searchTeacherBySpecialty(userObj) {
    return this.httpClient.post<{ teachers: any }>(this.userURL + '/searchTeacher', userObj);
  }
  searchChildByPhone(Obj) {
    return this.httpClient.post<{ foundChild: any }>(this.userURL + '/searchChild/byPhone', Obj);
  }
  checkEvaluation(userObj) {
    return this.httpClient.post<{ msg: string }>(`${this.userURL}/evaluation/`, userObj);
  }
  getStudentCourses(id) {
    return this.httpClient.get<{ findedCourses: any }>(`${this.userURL}/courses/${id}`);
  }
  checkPhoneChildExists(obj){
    return this.httpClient.post<{ msg: string }>(`${this.userURL}/phoneChild/`, obj);
  }
}