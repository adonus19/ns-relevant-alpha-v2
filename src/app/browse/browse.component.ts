import { Component, OnInit, OnDestroy, ViewContainerRef } from "@angular/core";
import { EventService } from "./event.service";
import { CalendarEvent } from "./event.model";
import { Subscription } from "rxjs";
import { ModalDialogService } from "nativescript-angular";
import { EventDetailComponent } from "./event-detail/event-detail/event-detail.component";
import { UIService } from '../shared/ui.service';

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html",
    styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
    currentEvents: CalendarEvent[];
    eventSub: Subscription;

    constructor(private eventService: EventService, private modalService: ModalDialogService,
        private vcRef: ViewContainerRef, private uiService: UIService) {
        // this.eventService.fetchCurrentEvents();
    }

    ngOnInit(): void {
        // this.currentEvents = this.eventService.events;
        this.eventSub = this.eventService.events.subscribe(loadedEvents => {
            this.currentEvents = loadedEvents;
        });
    }

    ngOnDestroy() {
        this.eventSub.unsubscribe();
    }

    onItemSelected(event: CalendarEvent) {
        console.log(event);
        this.modalService.showModal(EventDetailComponent, {
            fullscreen: true, viewContainerRef: this.uiService.getRootVCRef() ? this.uiService.getRootVCRef() : this.vcRef,
            context: { event }
        }).then(() => {

        });
    }
}
