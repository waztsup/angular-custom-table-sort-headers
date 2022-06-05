import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListSortHeaderComponent } from './list-sort-header/list-sort-header.component';
import { ListSortDirective } from './directives/list-sort.directive';
import { DivsExampleComponent } from './divs-example/divs-example.component';
import { TableExampleComponent } from './table-example/table-example.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    ListSortDirective,
    ListSortHeaderComponent,
    DivsExampleComponent,
    TableExampleComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
