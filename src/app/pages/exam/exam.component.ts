import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Question } from 'src/app/core/models';
import { AppFacadeService } from 'src/app/store/app-facade.service';
import { ExamFacadeService } from 'src/app/store/exam/exam-facade.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  host: {
    class: 'flex flex-col gap-4',
  },
})
export class ExamComponent implements OnInit {
  questions$!: Observable<string[]>;

  constructor(private appStore: AppFacadeService) {}

  ngOnInit(): void {
    this.questions$ = this.appStore.getQuestionsInExamIds();
  }
}
