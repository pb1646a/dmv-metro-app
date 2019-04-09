import { CurrentSelection } from './../metro-bus/metro-bus/models/routes.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  constructor() { }
  selected: CurrentSelection;
  $$currentSelection = new BehaviorSubject<CurrentSelection>(this.selected);

  return$$currentSelection(){
    return this.$$currentSelection.asObservable();
  }
}
