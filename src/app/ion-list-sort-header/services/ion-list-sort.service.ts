import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type SortDirection = 'asc' | 'desc' | '';
export interface Sort {
  name: string;
  direction: 'asc' | 'desc' | '';
}

@Injectable()
export class IonListSortService {
  private sortHeaders: Map<string, string> = new Map<string, string>();
  private directions: SortDirection[] = ['asc', 'desc', ''];
  public active: string;
  public direction: SortDirection;
  public sortState: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor() {}

  nextState(): void {
    this.sortState.next({ active: this.active, direction: this.direction });
  }

  setInitialState(active, direction): void {
    this.active = active;
    this.direction = direction;
    this.nextState();
  }

  register(name: string): void {
    if (this.sortHeaders.has(name)) {
      throw Error(`Can't have two sort header with the same name: ${name}.`);
    } else {
      this.sortHeaders.set(name, name);
    }
  }

  deregister(name: string): void {
    this.sortHeaders.delete(name);
  }

  getNextDirection(): SortDirection {
    let nextDirectionIndex =
      this.directions.findIndex((d) => d === this.direction) + 1;

    if (nextDirectionIndex >= this.directions.length) {
      nextDirectionIndex = 0;
    }

    return this.directions[nextDirectionIndex];
  }

  sort(name: string): void {
    if (this.active !== name) {
      this.active = name;
      this.direction = this.directions[0];
    } else {
      this.direction = this.getNextDirection();
    }
    this.nextState();
  }
}
