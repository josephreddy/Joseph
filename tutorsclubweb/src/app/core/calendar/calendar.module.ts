import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {CalendarComponent} from "./calendar.component";
import {DayPilotModule} from "daypilot-pro-angular";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports:      [
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    CalendarComponent
  ],
  exports:      [ CalendarComponent ],
  providers:    [ DataService ]
})
export class CalendarModule { }
