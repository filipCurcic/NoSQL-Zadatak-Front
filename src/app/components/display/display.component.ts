import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student-service/student.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { AdministratorService } from 'src/app/services/administrator-service/administrator.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private studentService: StudentService, private authService: AuthenticationService, private http: HttpClient) { }

  students: Student[] = [];

  student: Student = {
    id: '',
    korisnik: {
      id: '',
      ime: '',
      prezime: '',
      email: '',
      lozinka: '',
      datumRodjenja: null,
      permission: {
        id: '',
        authority: '',
      }
    }
  };
  edit = false;

  loggedIn: boolean;

  roles = [];

  administrator: boolean;


  ngOnInit(): void {
    this.getLogged();
    this.getAll();
  }

  download() {
    this.studentService.download().subscribe();
  }

  upload(file) {
    return this.studentService.upload(file).subscribe();
  }

  getLogged() {
    this.roles = this.authService.getCurrentRoles();
    this.loggedIn = this.authService.isLoggedIn();
    if (this.roles.includes('ROLE_ADMINISTRATOR')) {
      this.administrator = true;
    }
    console.log("radi on init");
  }

  logOut() {
    this.authService.logout();
  }

  getAll() {
    return this.studentService.getStudents().subscribe((data: Student[]) => {
      console.log(data)
      this.students = data;
    });
  }

  deleteStudent(id: string) {
    console.log(id);
    return this.studentService.deleteStudent(id).subscribe(() => {
      this.getAll();
    });
  }

  editStudent(id: string, student: Student) {
    console.log(student);
    return this.studentService.editStudent(id, student).subscribe(() => {
      this.getAll();
    });
  }

  editEntry(s: Student) {
    if (this.edit) {
      this.edit = false;
    }
    this.edit = true;
    this.student = Object.assign({}, s);
  }




}
