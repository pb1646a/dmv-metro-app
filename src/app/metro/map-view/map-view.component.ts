import { MetroService } from './../services/metro.service';
import { CurrentSelection, Marker } from './../metro-bus/metro-bus/models/routes.model';
import { LocationService } from "./../../common-components/services/location/location.service";
import { MapService } from "./../services/map-service.service";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import * as mapGl from "mapbox-gl";
import { BusesSearchService } from "../metro-bus/services/buses-search.service";
import { Subscription, Observable ,of} from "rxjs";

@Component({
  selector: "app-map-view",
  templateUrl: "./map-view.component.html",
  styleUrls: ["./map-view.component.css"]
})
export class MapViewComponent implements OnInit, OnDestroy {
  metroBusMap;
  shapeLine;
  stopMarkers;
  defaultFlyTo;
  $$busPositions;
  busPositions:Marker[];
  currenPosition;
  $$currentPosition;
  $$currentSelection:Observable<CurrentSelection>;
  $currentSelection: Subscription;
  selected: CurrentSelection;

  @Input() mapData;

  constructor(
    private mapService: MapService,
    private _route: BusesSearchService,
    private _locationServices: LocationService,
    private _metro: MetroService
  ) {}

  ngOnInit() {
    this.$$currentPosition = this._locationServices.return$$currentPosition();
    this.$$currentPosition.subscribe(currentPosition => {
      this.currenPosition = currentPosition;
    });

    this.mapService.generateMap();
    this.$$busPositions = this._route.return$$busPositions();
    this.$$busPositions.subscribe(positions => {
      this.busPositions = positions;
      this.$currentSelection = this._metro.return$$currentSelection().subscribe(current=>{
        console.log(current);
        this.selected = current;
        this.$$currentSelection = of(current)});
        console.log(this.selected);
      if(this.selected.checked===true){
        let position = this.busPositions.filter(position=>{
          position.stopID.includes(this.selected.stop);
        })
        this.stopMarkers = this.mapService.getMarkers(position);
      }
      this.metroBusMap = this.mapService.metroMap;
      this.stopMarkers = this.mapService.getMarkers(this.busPositions);
      this.currenPosition > 0
        ? (this.defaultFlyTo = this.currenPosition.coords)
        : null;
      this.mapService.setMarkers(this.stopMarkers);
      this.currenPosition.length > 0
        ? this.metroBusMap.flyTo({
            center: { lng: this.defaultFlyTo.lon, lat: this.defaultFlyTo.lat }
          })
        : null;
    });


    if (this.mapData) {
      this.metroBusMap = this.mapService.metroMap;
      this.shapeLine = this.mapService.getShape(this.mapData);
      this.defaultFlyTo = this.mapData.Direction0.Stops[0];
      this.metroBusMap.on("load", () => {
        this.mapService.setShape(this.shapeLine);
        this.metroBusMap.flyTo({
          center: { lng: this.defaultFlyTo.Lon, lat: this.defaultFlyTo.Lat }
        });
      });
    }
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
  }
}
