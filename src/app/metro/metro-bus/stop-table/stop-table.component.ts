import { Component, OnInit } from '@angular/core';
import { BusesSearchService } from '../services/buses-search.service';

@Component({
  selector: 'app-stop-table',
  templateUrl: './stop-table.component.html',
  styleUrls: ['./stop-table.component.css']
})
export class StopTableComponent implements OnInit {
$$stopETA;
  constructor(private _routes: BusesSearchService) { }

  ngOnInit() {
  this.$$stopETA=  this._routes.return$$stopETA();

  }

}
