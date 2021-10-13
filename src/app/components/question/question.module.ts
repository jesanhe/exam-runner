import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionComponent } from './question.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PieChartModule,
    PipesModule,
  ],
  exports: [QuestionComponent],
})
export class QuestionModule {}
