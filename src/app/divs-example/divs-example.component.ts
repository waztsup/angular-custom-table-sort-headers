import { Component } from '@angular/core';
import { User } from '../app.component';
import { ListSortService, Sort } from '../services/list-sort.service';

@Component({
  selector: 'app-divs-example',
  templateUrl: './divs-example.component.html',
  styleUrls: ['./divs-example.component.css'],
  providers: [ListSortService],
})
export class DivsExampleComponent {
  public users: User[] = [
    {
      username: 'a',
      email: 'a@example.com',
      firstName: 'a',
      lastName: 'a',
    },
    {
      username: 'b',
      email: 'b@example.com',
      firstName: 'b',
      lastName: 'b2',
    },
    {
      username: 'c',
      email: 'c@example.com',
      firstName: 'c2',
      lastName: 'b',
    },
    {
      username: 'd',
      email: 'd@example.com',
      firstName: 'c',
      lastName: 'd',
    },
  ];

  constructor() {}

  sortData(sort: Sort): void {
    this.users = this.users.sort((a, b) => {
      let sort1 = 0;
      if (a[sort.active] < b[sort.active]) {
        sort1 = -1;
      } else if (a[sort.active] > b[sort.active]) {
        sort1 = 1;
      }
      return sort.direction === 'desc' ? sort1 * -1 : sort1;
    });
  }
}
