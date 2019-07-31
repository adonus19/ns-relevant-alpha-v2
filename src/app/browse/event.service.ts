import { Injectable } from "@angular/core";
import { CalendarEvent } from './event.model';
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventService {
    private _events = new BehaviorSubject<CalendarEvent[]>(null);
    private loadedEvents: CalendarEvent[] = [
        {
            title: 'Baptisms', description: "Haven't been baptised? Now's the time!", date: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/cuban.jpg', id: '1'
        },
        {
            title: "Men's Target Practice", description: "Hopefully you are better than these guys...", date: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/stormtrooper.jpg', id: '1'
        },
        {
            title: "Women's Bible Study", description: "Women that pray together stay together", date: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/letters.jpg', id: '1'
        },
        {
            title: 'Advance in the Mountains', description: "Need to fall back? Then push forward!", date: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
            timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/person.jpg', id: '1'
        }
    ];

    get events() {
        return this.loadedEvents.slice();
    }

    fetchCurrentEvents() {
        this._events.next(this.loadedEvents);
    }
}
