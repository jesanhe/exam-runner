import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamStoreModule } from './store/exam/exam-store.module';
import { QuestionStoreModule } from './store/question/question-store.module';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material/material.module';
import { AppEffects } from './store/app.effects';
import { PipesModule } from './core/pipes/pipes.module';
import { QuestionNavModule } from './components/question-nav/question-nav.module';
import { PieChartModule } from './components/pie-chart/pie-chart.module';
import { ConfirmationDialogModule } from './components/confirmation-dialog/confirmation-dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MaterialModule,
    ExamStoreModule,
    QuestionStoreModule,
    BrowserAnimationsModule,
    PipesModule,
    QuestionNavModule,
    PieChartModule,
    ConfirmationDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
