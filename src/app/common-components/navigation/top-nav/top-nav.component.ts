import { DeviceViewService } from './../../services/view/device-view.service';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(private _locationServices: LocationService, private _view: DeviceViewService) { }
  smallView=false;
  deviceOptions=['Handset','Tablet', 'Web']
  $$deviceType;

  ngOnInit() {
  this._locationServices.getUserCurrentLocation();
  this._view.getDeviceView('Handset');
  this.$$deviceType = this._view.return$$deviceType();


  }

}
