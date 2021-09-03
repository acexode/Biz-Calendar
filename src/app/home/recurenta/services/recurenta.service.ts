import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecurentaModel } from '../models/recurenta.model';

@Injectable({
  providedIn: 'root'
})
export class RecurentaService {

  recurenta$: BehaviorSubject<RecurentaModel | null> = new BehaviorSubject(null);
  constructor() { }
  get getRecurenta(): Observable<RecurentaModel | null> {
    return this.recurenta$.asObservable();
  }
  updateRecurenta(data: RecurentaModel | null) {
    this.recurenta$.next(data);
  }
}
