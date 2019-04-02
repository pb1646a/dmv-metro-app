import { Component, OnInit } from '@angular/core';
import { BusesSearchService } from '../metro-bus/services/buses-search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
favorites=[];

  constructor(private _routes: BusesSearchService) { }

  ngOnInit() {

  }

}
