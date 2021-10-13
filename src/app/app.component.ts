import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AppFacadeService } from './store/app-facade.service';
import { ExamFacadeService } from './store/exam/exam-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'container min-h-full flex flex-col py-20 gap-4',
  },
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        animate(
          '1.5s',
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.5, offset: 0.8 }),
            style({ opacity: 1, offset: 1.0 }),
          ])
        ),
      ]),
      transition(':leave', animate(1000, style({ opacity: 0 }))),
    ]),
    trigger('byeExam', [
      state('in', style({ opacity: 1 })),

      transition('* <=> *', [
        animate(
          '0.5s',
          keyframes([style({ opacity: 1 }), style({ opacity: 0 })])
        ),
      ]),
    ]),
    trigger('helloResults', [
      state('in', style({ opacity: 1 })),

      transition('* <=> *', [
        query(':self', [
          stagger('5s', [
            animate(
              '3s',
              keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  @HostBinding('@fade') fadeAnimation: any;

  isExamEnd$!: Observable<{ value: boolean }>;

  title = 'exam-runner';
  animationTrigger = true;

  constructor(
    private examStore: ExamFacadeService,
    private appStore: AppFacadeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.examStore.loadDefaultExam();
    this.isExamEnd$ = this.appStore
      .getExamEnd()
      .pipe(map((value) => ({ value })));
  }

  nextStep() {
    this.appStore.setNextStep();
  }

  previousStep() {
    this.appStore.setPreviousStep();
  }

  finishExam() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'end exam') {
        this.animationTrigger = !this.animationTrigger;
        this.appStore.finishExam();
      }
    });
  }
}
