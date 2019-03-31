import { Component, OnInit } from "@angular/core";
import { BusesSearchService } from "../services/buses-search.service";
import { of} from "rxjs";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  favorites = [];
  $$favorites;

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
  }
  onRemove(i){
    this.favorites.splice(i,1);
    localStorage.setItem('favorites', JSON.stringify([...this.favorites]));
    this._routes.$$favorites.next([...this.favorites]);
    this.favorites.length<=0?this._routes.$$stopETA.next(['']):null;
    this._routes.getEstimatedTime(this.favorites);
  }
onAddMap(route){
  console.log(route);

}
}
