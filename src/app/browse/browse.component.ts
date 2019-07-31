import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "./event.service";
import { CalendarEvent } from "./event.model";
import { Subscription } from "rxjs";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit, OnDestroy {
    currentEvents: CalendarEvent[];
    eventSub: Subscription;

    constructor(private eventService: EventService) {
        // this.eventService.fetchCurrentEvents();
    }

    ngOnInit(): void {
        this.currentEvents = this.eventService.events;
    }

    ngOnDestroy() {
        // this.eventSub.unsubscribe();
    }

    getEventDetail(args) {
        console.log(args);
    }
}
