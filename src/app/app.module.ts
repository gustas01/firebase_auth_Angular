import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { AddGuideDialogComponent } from './components/add-guide-dialog/add-guide-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateGuideDialogComponent } from './components/update-guide-dialog/update-guide-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGuideDialogComponent,
    UpdateGuideDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    PagesModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
