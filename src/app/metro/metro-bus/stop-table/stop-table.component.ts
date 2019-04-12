import { Component, OnInit, Input } from '@angular/core';
import { BusesSearchService } from '../services/buses-search.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-stop-table',
  templateUrl: './stop-table.component.html',
  styleUrls: ['./stop-table.component.css']
})
export class StopTableComponent implements OnInit {
stopEta;
$$stopETA;
busPositions=[]
$$busPositions;

@Input() selectedStop;

  constructor(private _routes: BusesSearchService) { }

  ngOnInit() {

    this.$$stopETA = this._routes.return$$stopETA();
    this._routes.return$$busPositions().subscribe(pos=>{
      this.busPositions= pos;
      this.$$busPositions=of(this.busPositions);
    });



  }

}
