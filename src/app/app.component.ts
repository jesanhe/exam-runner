import { Component, OnInit } from '@angular/core';
import { FakeApiService } from './core/fake-api.service';
import { ExamFacadeService } from './store/exam/exam-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'exam-runner';

  constructor(
    private apiService: FakeApiService,
    private examStore: ExamFacadeService
  ) {}

  ngOnInit() {
    this.examStore.loadDefaultExam();
    // this.apiService.getDefaultExam().subscribe((data) => console.log(data));
  }
}
