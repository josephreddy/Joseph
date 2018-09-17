import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilot, DayPilotCalendarComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";{}

@Component({
  selector: 'calendar-component',
  template: `<daypilot-calendar [config]="config" [events]="events" #calendar></daypilot-calendar>`,
  styleUrls: ['./calendar-up.component.css']
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild("calendar")
  calendar: DayPilotCalendarComponent;

  events: any[] = [];

  config: any = {
    locale: "en-us",
    viewType: "Week",
    columnWidthSpec: "Auto",
    headerDateFormat:"dddd",
    crosshairType: "Disabled",
    eventArrangement: "Cascade",
    allowEventOverlap: true,
    timeRangeSelectedHandling: "Enabled",
    cellDuration: 60,
    cellHeight: 50,
    onTimeRangeSelected: function (args) {
      debugger
      DayPilot.Modal.prompt("Create a new Timing:", "Timing").then(function(modal) {
        var dp = args.control;
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        }));
      });
    },
    eventDeleteHandling: "Disabled",
    eventMoveHandling: "Update",
    onEventMoved: function (args) {
      this.message("Event moved");
    },
    eventResizeHandling: "Update",
    onEventResized: function (args) {
      this.message("Event resized");
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled",
  };

  constructor(private ds: DataService) {
    this.getWeekDates();

  }

  ngAfterViewInit(): void {
    debugger
    var from = this.calendar.control.visibleStart();
    var day = from.toString();
    var to = this.calendar.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  getWeekDates() {

    let now = new Date();
    let dayOfWeek = now.getDay(); //0-6
    let numDay = now.getDate();
  
    let start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);
  
  
    let end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);



  }
  
}

