import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IonListSortHeaderComponent } from './ion-list-sort-header/ion-list-sort-header.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, IonListSortHeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
