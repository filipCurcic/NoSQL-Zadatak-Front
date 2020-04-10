import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  private studentURL = 'http://localhost:8080/student';

  private downloadURL = 'http://localhost:8080/student/download/student.xlsx';

  private uploadURL = 'http://localhost:8080/read'


  getStudents() {
    return this.httpClient.get<Student[]>(this.studentURL + `/all`);
  }

  getStudentById(id: string) {
    return this.httpClient.get<Student>(this.studentURL + `/${id}`);
  }

  addStudent(student: Student) {
    return this.httpClient.post(this.studentURL + `/add`, student);
  }

  editStudent(id: string, student: Student) {
    return this.httpClient.put(this.studentURL + `/${id}`, student);
  }

  deleteStudent(id: string) {
    return this.httpClient.delete(this.studentURL + `/${id}`);
  }

  download() {
    console.log("prosla je funkcija u servisu");
    return this.httpClient.get(this.downloadURL, {responseType:'text'});
  }

  upload(file) {
    return this.httpClient.post(this.uploadURL, file);
  }

}
