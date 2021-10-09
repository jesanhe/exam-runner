import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exam } from './models';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  constructor(private http: HttpClient) {}

  getDefaultExam(): Observable<Exam> {
    return this.http
      .get<Exam>('assets/test-exam.json')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError('Something bad happened; please try again later.');
  }
}
