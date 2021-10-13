import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
