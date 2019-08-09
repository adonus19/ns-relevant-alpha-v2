import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { CalendarEvent } from '../../event.model';
import { EventService } from '../../event.service';

@Component({
    selector: 'ns-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss'],
    moduleId: module.id,
})
export class EventDetailComponent implements OnInit {
    eventDetails: CalendarEvent;

    constructor(private modalParams: ModalDialogParams, private eventService: EventService) { }

    ngOnInit() {
        // console.log(this.active);
        this.eventDetails = this.modalParams.context['event'];
    }

    closeModal(action = null) {
        this.modalParams.closeCallback(action);
    }

    editEvent() {
        this.eventService.eventToEdit = this.eventDetails;
        this.closeModal({ edit: true });
    }

}
