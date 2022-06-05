import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  ListSortService,
  Sort,
  SortDirection,
} from '../services/list-sort.service';

@Component({
  selector: '[listSortHeader]',
  templateUrl: './list-sort-header.component.html',
  styleUrls: ['./list-sort-header.component.css'],
  host: {
    '(click)': 'handleClick()',
  },
})
export class ListSortHeaderComponent implements OnInit, OnDestroy {
  private sort: Sort;
  private name: string;
  private clearSubs: Subject<boolean> = new Subject<boolean>();
  public dir: SortDirection;
  public active: boolean = false;

  constructor(
    private listSortService: ListSortService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.name = this.elementRef.nativeElement.getAttribute('listSortHeader');
    this.listSortService.register(this.name);
    this.listSortService.sortState
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
    this.listSortService.sort(this.name);
  }
}
