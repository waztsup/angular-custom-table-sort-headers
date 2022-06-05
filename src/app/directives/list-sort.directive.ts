import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  ListSortService,
  Sort,
  SortDirection,
} from '../services/list-sort.service';

@Directive({
  selector: '[listSort]',
})
export class ListSortDirective implements OnInit, OnDestroy {
  @Input() listSortActive: string;
  @Input() listSortDirection: SortDirection;
  @Output() listSortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  private clearSubs: Subject<boolean> = new Subject<boolean>();

  constructor(private listSortService: ListSortService) {}

  ngOnInit(): void {
    this.listSortService.setInitialState(
      this.listSortActive,
      this.listSortDirection
    );

    this.listSortService.sortState
      .pipe(takeUntil(this.clearSubs))
      .subscribe((res) => {
        this.listSortChange.emit(res);
      });
  }

  ngOnDestroy() {
    this.clearSubs.next(true);
    this.clearSubs.complete();
  }
}
