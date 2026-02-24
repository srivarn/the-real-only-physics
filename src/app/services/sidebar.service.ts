import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  public collapsed$: Observable<boolean> = this.collapsedSubject.asObservable();

  toggleCollapse(): void {
    this.collapsedSubject.next(!this.collapsedSubject.value);
  }

  setCollapsed(collapsed: boolean): void {
    this.collapsedSubject.next(collapsed);
  }

  isCollapsed(): boolean {
    return this.collapsedSubject.value;
  }
}
