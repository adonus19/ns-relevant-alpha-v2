import { Injectable } from "@angular/core";
import { CalendarEvent } from './event.model';
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventService {
    private loadedEvents: CalendarEvent[] = [
        {
            title: 'Baptisms', description: "Haven't been baptised? Now's the time!", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/cuban.jpg', id: '1'
        },
        {
            title: "Men's Target Practice", description: "Hopefully you are better than these guys... I mean the only hit everything else", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/stormtrooper.jpg', id: '1'
        },
        {
            title: "Women's Bible Study", description: "Women that pray together stay together", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/letters.jpg', id: '1'
        },
        {
            title: 'Advance in the Mountains', description: "Need to fall back? Then push forward!", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/person.jpg', id: '1'
        }
    ];
    private _events = new BehaviorSubject<CalendarEvent[]>(this.loadedEvents);

    // get events() {
    //     return this.loadedEvents.slice();
    // }

    get events() {
        return this._events.asObservable();
    }

    fetchCurrentEvents() {
        this._events.next(this.loadedEvents);
    }

    createEvent(event: CalendarEvent) {
        console.log('creating new event!', event);
        this.loadedEvents.push(event);
        this._events.next(this.loadedEvents);
    }
}
