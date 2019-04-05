import { MapService } from "./../services/map-service.service";
import { Component, OnInit, Input } from "@angular/core";
import * as mapGl from "mapbox-gl";
import { BusesSearchService } from "../metro-bus/services/buses-search.service";

@Component({
  selector: "app-map-view",
  templateUrl: "./map-view.component.html",
  styleUrls: ["./map-view.component.css"]
})
export class MapViewComponent implements OnInit {
  metroBusMap;
  shapeLine;
  stopMarkers;
  defaultFlyTo;
  $$busPositions;
  busPositions: [];

  @Input() mapData;

  constructor(
    private mapService: MapService,
    private _route: BusesSearchService
  ) {}

  ngOnInit() {
    this.mapService.generateMap();
    this.$$busPositions = this._route.return$$busPositions();
    this.$$busPositions.subscribe(positions => {
      this.busPositions = positions;
      this.stopMarkers = [];
      this.metroBusMap = this.mapService.metroMap;
      this.stopMarkers = this.mapService.getMarkers(this.busPositions);
    });

    if (this.mapData) {
      this.metroBusMap = this.mapService.metroMap;
      this.shapeLine = this.mapService.getShape(this.mapData);
      this.stopMarkers = this.mapService.getGeneralMarkers(this.mapData);
      this.defaultFlyTo = this.mapData.Direction0.Stops[0];
      this.metroBusMap.on("load", () => {
        this.mapService.setShape(this.shapeLine);
        // this.mapService.setMarkers(this.stopMarkers);
        this.metroBusMap.flyTo({
          center: { lng: this.defaultFlyTo.Lon, lat: this.defaultFlyTo.Lat }
        });
      });
    }
  }
}
