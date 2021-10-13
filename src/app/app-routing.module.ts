import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/landing/landing.module').then(
  //       (page) => page.LandingModule
  //     ),
  // },
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('./pages/landing/landing.module').then(
  //       (page) => page.LandingModule
  //     ),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./pages/exam/exam.module').then((page) => page.ExamModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/exam/exam.module').then((page) => page.ExamModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
