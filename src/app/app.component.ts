import { Component, OnInit } from "@angular/core";
import { DeviceViewService } from "./common-components/services/view/device-view.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private _view: DeviceViewService) {}
  smallView = false;
  deviceOptions = ["Handset", "Tablet", "Web"];
  $$deviceType;

  ngOnInit() {
    this._view.getDeviceView("Handset");
    this.$$deviceType = this._view.return$$deviceType();
  }
}
