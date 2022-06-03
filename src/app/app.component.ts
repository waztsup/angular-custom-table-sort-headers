import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IonListSortService } from './ion-list-sort-header/services/ion-list-sort.service';

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IonListSortService],
})
export class AppComponent implements OnInit, OnDestroy {
  private clearSubs: Subject<boolean> = new Subject<boolean>();
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
      lastName: 'b',
    },
    {
      username: 'c',
      email: 'c@example.com',
      firstName: 'c',
      lastName: 'b2',
    },
    {
      username: 'd',
      email: 'd@example.com',
      firstName: 'c2',
      lastName: 'd',
    },
  ];

  constructor(private ionListSortService: IonListSortService) {}

  ngOnInit(): void {
    this.ionListSortService.sortState
      .pipe(takeUntil(this.clearSubs))
      .subscribe((res) => {
        if (res && res.direction) {
          this.users = this.users.sort((a, b) => {
            let sort = 0;
            if (a[res.active] < b[res.active]) {
              sort = -1;
            } else if (a[res.active] > b[res.active]){
              sort = 1;
            }
            return res.direction === 'desc' ? sort * -1 : sort;
          });
        }
      });
  }

  ngOnDestroy() {
    this.clearSubs.next(true);
    this.clearSubs.complete();
  }
}
