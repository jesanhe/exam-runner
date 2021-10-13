import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionModule } from 'src/app/components/question/question.module';
import { PieChartModule } from 'src/app/components/pie-chart/pie-chart.module';
import { QuestionNavModule } from 'src/app/components/question-nav/question-nav.module';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
  },
  {
    path: '**',
    component: ExamComponent,
  },
];

@NgModule({
  declarations: [ExamComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    QuestionModule,
    PieChartModule,
    QuestionNavModule,
  ],
})
export class ExamModule {}
