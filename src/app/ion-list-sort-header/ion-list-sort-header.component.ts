import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  IonListSortService,
  Sort,
  SortDirection,
} from './services/ion-list-sort.service';

@Component({
  selector: '[ionListSortHeader]',
  templateUrl: './ion-list-sort-header.component.html',
  styleUrls: ['./ion-list-sort-header.component.css'],
  host: {
    '(click)': 'handleClick()',
  },
})
export class IonListSortHeaderComponent implements OnInit, OnDestroy {
  private sort: Sort;
  private name: string;
  private clearSubs: Subject<boolean> = new Subject<boolean>();
  public dir: SortDirection;
  public active: boolean = false;

  constructor(
    private ionListSortService: IonListSortService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.name = this.elementRef.nativeElement.getAttribute('ionListSortHeader');
    this.ionListSortService.register(this.name);
    this.ionListSortService.sortState
      .pipe(takeUntil(this.clearSubs))
      .subscribe((res) => {
        if (res) {
          this.dir = res.direction;
          this.active = this.name === res.active;
        }
      });
  }

  ngOnDestroy() {
    this.clearSubs.next(true);
    this.clearSubs.complete();
  }

  handleClick() {
    this.ionListSortService.sort(this.name);
  }
}
