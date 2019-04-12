import { MetroService } from "./../services/metro.service";
import {
  Marker,
  CurrentSelection
} from "./../metro-bus/metro-bus/models/routes.model";
import {
  Component,
  OnInit,
  OnDestroy,

} from "@angular/core";
import { BusesSearchService } from "../metro-bus/services/buses-search.service";
import { of, Subscription, Observable } from "rxjs";


@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit, OnDestroy{
  show= false;
  selectedStop;
  favorites = [];
  $$favorites;
  $$busPositions;
  busPositions: Marker[] = [];
  currentSelection: CurrentSelection[] = [
    { stop: "", routes: [], checked: false }
  ];
  selected: CurrentSelection;
  $$currentSelection: Observable<CurrentSelection>;
  $currentSelection: Subscription;

  constructor(
    private _routes: BusesSearchService,
    private _metro: MetroService,

  ) {}

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
  onChange(i, stopsArr) {
    /// on toggle set info

    this.currentSelection[i] = {
      routes: stopsArr.Routes,
      stop: stopsArr.StopID,
      checked: this.currentSelection[i]
        ? !this.currentSelection[i].checked
        : true
    };
    this.selected = this.currentSelection[i];
    // check to see if toggle was on or off

    if (this.currentSelection[i].checked === true) {
      // send it to get the map details;
      this._routes.getBusPositions(this.currentSelection[i]);
      this._metro.$$currentSelection.next(this.selected);
    } else {
      this.busPositions = this.busPositions.filter(arr => {
        return !arr.stopID.includes(this.currentSelection[i].stop);
      });
      this._routes.busPositions = this.busPositions;
      this._routes.$$busPositions.next([...this.busPositions]);
      // purge from the bus locations array and reset map filter;
      // by sending the updated observable
    }
  }
  unCheckAll() {
    this.currentSelection.forEach(el => {
      el.checked === true ? (el.checked = false) : null;
      this.busPositions = [];
      this._routes.busPositions = this.busPositions;
      this._routes.$$busPositions.next([...this.busPositions]);
    });
  }

  onOpened(bus) {
    this.selectedStop = bus;
  }
  onClosed() {
    return this.unCheckAll();

  }

  ngOnDestroy() {
    return this.unCheckAll();
  }
}

/*
  ngAfterViewInit() {
    const compF = this.cf.resolveComponentFactory(StopTableComponent);

    this.stopTable.clear();
    const stopTableComponent = <StopTableComponent>(
      this.stopTable.createComponent(compF).instance
    );
    stopTableComponent.stopData = this.stopEta;
  }
  */
