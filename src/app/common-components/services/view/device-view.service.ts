import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceViewService {

  constructor(public $$breakPoint: BreakpointObserver) { }

  deviceType;
  $$deviceType = new BehaviorSubject(this.deviceType);

  getDeviceView(device){
    this.$$breakPoint.observe([
      Breakpoints[device]
    ]).subscribe(result=>{
      console.log(result);
      this.deviceType=result;
      this.$$deviceType.next(this.deviceType);
  })
}

return$$deviceType(){
  return this.$$deviceType.asObservable();
}

}
