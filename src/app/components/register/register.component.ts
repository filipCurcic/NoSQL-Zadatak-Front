import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student-service/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  register(ime: string, prezime: string, email: string, lozinka: string, datum: Date) {
    let student: any;
    // tslint:disable-next-line: max-line-length
    student = { korisnik: {ime: '', prezime: '', email: '', lozinka: '', datumRodjenja: null, permission: { authority: '' } } };
    student.korisnik.ime = ime;
    student.korisnik.prezime = prezime;
    student.korisnik.email = email;
    student.korisnik.lozinka = lozinka;
    student.korisnik.datumRodjenja = datum;
    this.studentService.addStudent(student).subscribe();
    console.log(student);
    alert("Success")
  }

}
