import { FormsService } from "./../../common-components/services/forms/forms.service";
import { Routes } from "./models/routes.model";
import { BusesSearchService } from "./../services/buses-search.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { startWith, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { of, Observable, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-metro-bus",
  templateUrl: "./metro-bus.component.html",
  styleUrls: ["./metro-bus.component.css"]
})
export class MetroBusComponent implements OnInit {
  routes: Routes[] = [];
  //$$routes = new BehaviorSubject(this.routes);
  busSearchForm: FormGroup;
  favorites = [];
  fields = [
    {
      key: "search_buses",
      value: "",
      validators: []
    }
  ];

  controls(control) {
    return this.busSearchForm.get(control);
  }
  constructor(
    private _routes: BusesSearchService,
    public _forms: FormsService
  ) {}

  ngOnInit() {
    this.busSearchForm = this._forms.createForm(this.busSearchForm);
    this._forms.setFields(this.fields, this.busSearchForm);
    this._routes.getRoutes();
    this._routes.return$$routes().subscribe(routes => {
      this.routes = routes;
      this._routes.$$filterBus.next(routes);
    });
    this.favorites=JSON.parse(localStorage.getItem('favorites'));
    this._routes.$$favorites.next([...this.favorites]);
    this.controls("search_buses")
      .valueChanges.pipe(
        startWith(""),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this._routes.$$filterBus.next(this.filter(term));
      });
  }

  private filter(term) {
    const filterTerm = term.toLowerCase();
    return this.routes.filter(route => {
      return (
        route.Name.toLowerCase().includes(filterTerm) ||
        route.RouteID.toLowerCase().includes(filterTerm)
      );
    });
  }
}
