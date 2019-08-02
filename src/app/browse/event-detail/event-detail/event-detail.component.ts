import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { CalendarEvent } from '../../event.model';

@Component({
    selector: 'ns-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss'],
    moduleId: module.id,
})
export class EventDetailComponent implements OnInit {
    eventDetails: CalendarEvent;

    constructor(private modalParams: ModalDialogParams) { }

    ngOnInit() {
        console.log(this.modalParams.context['event']);
        this.eventDetails = this.modalParams.context['event'];
    }

    closeModal() {
        this.modalParams.closeCallback();
    }

}
