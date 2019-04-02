import { Routes, RouteDetails } from './../metro-bus/models/routes.model';

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Subject, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusesSearchService {
routes: Routes[]=[];
apiUrl= environment.apiUrl;
favorites=[];
$$routes= new BehaviorSubject(this.routes);
$$filterBus= new BehaviorSubject(this.routes);
routeDetails: RouteDetails;
$$routeDetails=new BehaviorSubject(this.routeDetails);
$$favorites = new BehaviorSubject(this.favorites);
stopETA = [];
$$stopETA = new BehaviorSubject(this.stopETA);
  constructor(private http: HttpClient) { }


  getRoutes(){
    return this.http.get<{Routes: Routes[]}>(`${this.apiUrl}/Bus.svc/json/jRoutes/`).pipe(
      map(response=>{

        return response.Routes.map(routes=>{
          return routes;

        });
      })
    ).subscribe(formattedRes=>{
      this.routes = formattedRes;
      this.$$routes.next([...this.routes]);
    })
  }
  return$$filterBus(){
    return this.$$filterBus.asObservable();
  }
  return$$routes(){
    return this.$$routes.asObservable();
  }
  getRouteDetails(route){
    return this.http.get<RouteDetails>(`${this.apiUrl}/Bus.svc/json/jRouteDetails?RouteID=${route}`).pipe(map(
      response=>{
        return response;
      }
    )).subscribe(formattedRoute=>{
      this.routeDetails=formattedRoute;
      this.$$routeDetails.next(this.routeDetails);
    });

  }
  pushFavorites(list){
    this.$$favorites.next([list]);
  }
  getEstimatedTime(array){
    let stopMap = array.map(stop=>{
      return this.http.get(`${this.apiUrl}/NextBusService.svc/json/jPredictions?StopID=${stop.StopID}`);

    });
    return forkJoin(stopMap).subscribe(response=>{
      this.stopETA = response;
      this.$$stopETA.next([...this.stopETA]);
    }
    );


  }

  return$$stopETA(){
    return this.$$stopETA.asObservable();
  }
  return$$favorites(){
    return this.$$favorites.asObservable();
  }
  return$$RouteDetails(){
    return this.$$routeDetails.asObservable();
  }
}
