import { Component, OnInit } from "@angular/core";
import { BusesSearchService } from "../metro-bus/services/buses-search.service";
import { of } from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  favorites = [];
  $$favorites;
  mapSelection = new SelectionModel(true, []);
  $$busPositions;
  busPositions=[];
  currentSelection:[{stop:string;routes:[],checked:boolean}] = [{stop:'',routes:[],checked:false}];

  constructor(private _routes: BusesSearchService) {}

  ngOnInit() {
    this._routes.return$$favorites().subscribe(faves => {
      this.favorites = faves;
      let filteredArray = faves.filter(function(item, pos) {
        return faves.indexOf(item) == pos;
      });
      this.$$favorites = of(filteredArray);
      this._routes.getEstimatedTime(filteredArray);
    });
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    this.favorites ? this._routes.$$favorites.next([...this.favorites]) : null;
    this._routes.return$$busPositions().subscribe(busPositions => {
      this.busPositions = busPositions;
    });

    setTimeout(() => {
      return this.updateStopETA();
    }, 60000);
  }
  updateStopETA() {
    this._routes.getEstimatedTime(this.favorites);
  }

  onRemove(i) {
    this.favorites.splice(i, 1);
    localStorage.setItem("favorites", JSON.stringify([...this.favorites]));
    this._routes.$$favorites.next([...this.favorites]);
    this.favorites.length <= 0 ? this._routes.$$stopETA.next([""]) : null;
    this._routes.getEstimatedTime(this.favorites);
  }
  onAddMap(route) {
    console.log(route);
  }
  onChange(i, stopsArr) {
      /// on toggle set info

    this.currentSelection[i]= {routes:stopsArr.Routes,
      stop:stopsArr.StopID,
      checked:this.currentSelection[i]? !this.currentSelection[i].checked: true
      }
    // check to see if toggle was on or off

    if(this.currentSelection[i].checked===true){
      // send it to get the map details;
      this._routes.getBusPositions(this.currentSelection[i]);
    }else{
      this.busPositions = this.busPositions.filter(arr=>{
        return !arr.stopID.includes(this.currentSelection[i].stop)
      })
      this._routes.busPositions=this.busPositions;
      this._routes.$$busPositions.next([...this.busPositions]);
      // purge from the bus locations array and reset map filter;
      // by sending the updated observable

    }





  }
}
