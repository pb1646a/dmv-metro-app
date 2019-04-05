import { MapService } from './../services/map-service.service';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BusesSearchService } from '../metro-bus/services/buses-search.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  busPositions=[]
  $$busPositions;

  constructor(private _routes: BusesSearchService, private _map: MapService) { }

  ngOnInit() {
    this._routes.return$$busPositions().subscribe(pos=>{
      this.busPositions= pos;
      this.$$busPositions=of(this.busPositions);
    });
//set a 60 s timer to send updated locaitons for buses;

  }
  ngOnDestroy(){

  }
}
