import { PopUpComponent } from './../pop-up/pop-up.component';
import { Injectable } from "@angular/core";
import * as mapGl from "mapbox-gl";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root"
})
export class MapService {
  metroMap;
  constructor() {}
  generateMap() {
    Object.getOwnPropertyDescriptor(mapGl, "accessToken").set(
      environment.mapBoxApiKey
    );
    this.metroMap = new mapGl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-77.03637, 38.89511],
      zoom: 13
    });
  }


  getMarkers(array) {
    let markers = array.map(route => {
      return {
        type: "FeatureCollection",
        features: route.busPositions.map(positions => {
          return {
            type: "Feature",
            properties: {
              vehicleID: positions.VehicleID,
              lastUpdate: positions.DateTime,
              stopID: route.stopID,
              routeID: route.routeID,
              iconSize: [5, 5],
              className: "dot",
              "marker-color": "#3bb2d0",
              "marker-symbol": "bus",
              "marker-size": "small"
            },
            geometry: {
              type: "Point",
              coordinates: [positions.Lon, positions.Lat]
            }
          };
        })
      };
    });

    return markers;
  }
  setMarkers(markers) {
    markers.map(markerGroup => {
      return markerGroup.features.map(marker => {
        let el = document.createElement("div");
        el.className = "marker";
        el.textContent = `${marker.properties.vehicleID}`;
        return new mapGl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapGl.Popup({offset: 25})
          .setHTML(`<app-pop-up><div class="heading">
          ${marker.properties.vehicleID}</div><div class="subtitle">
          ${marker.properties.lastUpdate}</div></app-pop-up>`))
          .addTo(this.metroMap);
      });
    });

  }

  getShape(routeData) {
    let coords0 = routeData.Direction0.Shape.map(coordinates => {
      return [coordinates.Lon, coordinates.Lat];
    });
    let coords1 = routeData.Direction0.Shape.map(coordinates => {
      return [coordinates.Lon, coordinates.Lat];
    });
    let coords = coords0.concat(coords1);
    return {
      id: `${routeData.Name}`,
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coords
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#888",
        "line-width": 4
      }
    };
  }
  setShape(shapeCoords) {
    this.metroMap.addLayer(shapeCoords);
  }

  destroyMap() {
    this.metroMap.remove();
  }
}
