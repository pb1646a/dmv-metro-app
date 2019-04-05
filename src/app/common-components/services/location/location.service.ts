import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentPosition;
  $$currentPosition = new BehaviorSubject(this.currentPosition)
  constructor() { }

  getUserCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.currentPosition = {
          time: position.timestamp,
          coords: {lon: position.coords.longitude,lat: position.coords.latitude}
        };
        this.$$currentPosition.next(this.currentPosition);

      }
       )
    }
  }
  return$$currentPosition(){
    return this.$$currentPosition.asObservable();
  }
}
