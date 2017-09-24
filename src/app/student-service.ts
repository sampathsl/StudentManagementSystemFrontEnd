import { Injectable } from '@angular/core';
import {HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Student} from "./student";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class StudentService {

  mainURI = '/api/v1/students';

  constructor(private http: Http) { }

  getAllStudents() {
    return this.http.get(this.mainURI)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStudentById(UUID: String) {
    return this.http.get(this.mainURI + '/' + UUID)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createStudent(student: Student) : Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.mainURI, student, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  updateStudent(student: Student): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.mainURI + '/' +  student.id, student, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteStudentById(studentId: string): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    //const cpParams = new URLSearchParams();
    //cpParams.set('id', studentId);
    //const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    const options = new RequestOptions({ headers: cpHeaders});
    return this.http.delete(this.mainURI + '/' +  studentId, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json() ? res.json() : {};
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
