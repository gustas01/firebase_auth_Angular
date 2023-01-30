import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';


@NgModule({
  exports: [
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBar
  ]
})
export class AppMaterialModule { }
