import { Injectable } from '@angular/core';
import * as mapGl from "mapbox-gl";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})

export class MapService {
  metroMap;
  constructor() { }
  generateMap(){
    Object.getOwnPropertyDescriptor(mapGl, "accessToken").set(
      environment.mapBoxApiKey
    );
    this.metroMap =  new mapGl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-77.03637, 38.89511],
      zoom: 10
    });
  }
  getMarkers(routeDetails){
    let routeMarkers;
    let routeMarkers0 = {
      type: "FeatureCollection",
      features: routeDetails.Direction0.Stops.map(shapeCoord => {
        return {
          type: "Feature",
          properties: {
            message: "",
            iconSize: [5, 5],
            className: "dot",
            "marker-color": "#3bb2d0",
            "marker-symbol": "circle",
            "marker-size": "small"
          },
          geometry: {
            type: "Point",
            coordinates: [shapeCoord.Lon, shapeCoord.Lat]
          }
        };
      })
    };
    let routeMarkers1= {
      type: "FeatureCollection",
      features: routeDetails.Direction1.Stops.map(shapeCoord => {
        return {
          type: "Feature",
          properties: {
            message: "",
            iconSize: [5, 5],
            className: "dot",
            "marker-color": "#3bb2d0",
            "marker-symbol": "circle",
            "marker-size": "small"
          },
          geometry: {
            type: "Point",
            coordinates: [shapeCoord.Lon, shapeCoord.Lat]
          }
        };
      })
    };
    return routeMarkers=[routeMarkers0,routeMarkers1];
  }
  setMarkers(markersArray){
    markersArray.forEach(markerGroup=>{
      markerGroup.features.forEach(marker => {
        new mapGl.Marker(marker)
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.metroMap);
      });
    })
  }


  getShape(routeData){
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
  setShape(shapeCoords){this.metroMap.addLayer(shapeCoords);}

}