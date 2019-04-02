import { BusesSearchService } from "./../services/buses-search.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  favorites = [];

  constructor(private _routes: BusesSearchService) {}
  $$routes;
  $$routeDetails;
  pageIndex = 0;
  lowerLimit = 0;
  pageSize = 10;
  higherLimit = this.pageSize * (this.pageIndex + 1);
  pageSizeOptions = [10, 15, 25];
  onOpened(bus) {
    this._routes.getRouteDetails(bus);
    this.$$routeDetails = this._routes.return$$RouteDetails();
  }
  onAddFav(stop) {
    this.favorites.push(stop);
    this.favorites = this.getUnique(this.favorites, 'StopID');
    localStorage.setItem("favorites", JSON.stringify([...this.favorites]));
    this._routes.$$favorites.next([...this.favorites]);
  }
  ngOnInit() {
    this.$$routes = this._routes.return$$filterBus();
    this._routes.$$favorites.subscribe(favorite=>{
      this.favorites=favorite
    })
  }
  pageChange(event) {
    this.pageSize = event.pageSize;
    this.lowerLimit = event.pageSize * event.pageIndex;
    this.higherLimit = event.pageSize * (event.pageIndex + 1);
  }
  getUnique(array, key) {
    const unique = array
      .map(item => item[key])
      .map((item, index, final) => {
        return final.indexOf(item) === index && index;
      })
      .filter(item => array[item])
      .map(item => array[item]);
    return unique;
  }
}
