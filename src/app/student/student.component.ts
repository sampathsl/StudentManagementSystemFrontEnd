import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../student";
import {StudentService} from "../student-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  allStudents: Student[] = [];
  ageArr: number[] = [];
  genderArr: String[] = ['MALE', 'FEMALE'];
  statusCode: number;
  requestProcessing = false;
  studentIdToUpdate = null;
  submitted: boolean;

  @Input() studentForm: FormGroup;
  @Input() firstName: FormControl;
  @Input() lastName: FormControl;
  @Input() dob: FormControl;
  age: FormControl;
  gender: FormControl;

  ngOnInit() {
    this.submitted = false;
    this.loadAgeList();
    this.createFormControls();
    this.createForm();
    this.getAllStudents();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.compose([Validators.required, Validators.pattern(".{5,50}")]));
    this.lastName = new FormControl('', [Validators.required, Validators.pattern(".{5,100}")]);
    this.dob = new FormControl('', [Validators.required]);
    this.age = new FormControl('5', [Validators.required]);
    this.gender = new FormControl('MALE', [Validators.required]);
  }

  createForm() {
    this.studentForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      age: this.age,
      gender: this.gender
    });
  }

  loadAgeList() {
    for (let i = 5; i <= 20; i++) {
      this.ageArr.push(i);
    }
  }

  constructor(private studentService: StudentService) { }

  // Fetch all students
  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      data => this.allStudents = data,
      errorCode =>  this.statusCode = errorCode);
  }

  onStudentFormSubmit() {

    this.submitted = true;
    if (this.studentForm.invalid) {
      return; // Validation failed, exit from method.
    }

    // Form is valid, now perform create or update
    this.preProcessConfigurations();

    const frmFirstName : string = this.studentForm.get('firstName').value;
    //frmFirstName = frmFirstName.trim();
    const frmLastName : string = this.studentForm.get('lastName').value;
    //frmLastName = frmLastName.trim();
    const frmDob : string = this.studentForm.get('dob').value;
    //frmDob = frmDob.trim();
    const frmAge : string = this.studentForm.get('age').value;
    //frmAge = frmAge.trim();
    const frmGender : string = this.studentForm.get('gender').value;
    //frmGender = frmGender.trim();

    if (this.studentIdToUpdate === null) {
      //Handle create student
      const student = new Student(null, frmFirstName, frmLastName, frmDob, frmAge, frmGender);
      this.studentService.createStudent(student)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllStudents();
            this.backToCreateStudent();
          },
          errorCode => this.statusCode = errorCode);
    } else {
      //Handle update student
      const student = new Student(this.studentIdToUpdate, frmFirstName, frmLastName, frmDob, frmAge, frmGender);
      this.studentService.updateStudent(student)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllStudents();
            this.backToCreateStudent();
          },
          errorCode => this.statusCode = errorCode);
    }
  }

  loadStudentToEdit(studentId: string) {
    this.preProcessConfigurations();
    this.studentService.getStudentById(studentId)
      .subscribe(student => {
          this.studentIdToUpdate = student.id;
          this.studentForm.setValue({ firstName: student.firstName, lastName: student.lastName ,
            dob: student.dob , age: student.age , gender: student.gender });
          this.requestProcessing = false;
        },
        errorCode =>  this.statusCode = errorCode);
  }

  deleteStudent(studentId: string) {
    this.preProcessConfigurations();
    this.studentService.deleteStudentById(studentId)
      .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllStudents();
          this.backToCreateStudent();
        },
        errorCode => this.statusCode = errorCode);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  backToCreateStudent() {
    this.studentIdToUpdate = null;
    this.submitted = false;
    this.studentForm.reset();
    this.age.setValue(5);
    this.gender.setValue('MALE');
  }

}
