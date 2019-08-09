import { Injectable } from "@angular/core";
import { CalendarEvent } from './event.model';
import { BehaviorSubject } from "rxjs";

import { File } from "tns-core-modules/file-system";
import { firestore, storage } from 'nativescript-plugin-firebase';
import * as firebase from 'nativescript-plugin-firebase/app';

@Injectable({ providedIn: 'root' })
export class EventService {
    private loadedEvents: CalendarEvent[] = [
        // {
        //     title: 'Baptisms', description: "Haven't been baptised? Now's the time!", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
        //     timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/cuban.jpg', id: '1'
        // },
        // {
        //     title: "Men's Target Practice", description: "Hopefully you are better than these guys... I mean the only hit everything else", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
        //     timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/stormtrooper.jpg', id: '1'
        // },
        // {
        //     title: "Women's Bible Study", description: "Women that pray together stay together", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
        //     timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/letters.jpg', id: '1'
        // },
        // {
        //     title: 'Advance in the Mountains', description: "Need to fall back? Then push forward!", date: new Date(new Date().getFullYear(), new Date().getMonth(), 4),
        //     timeStart: new Date().getHours(), timeEnd: 1 + new Date().getHours(), location: 'YMCA Clover', imageUrl: '~/assets/person.jpg', id: '1'
        // }
    ];

    eventToEdit: CalendarEvent = null;
    private _events = new BehaviorSubject<CalendarEvent[]>(this.loadedEvents);

    get events() {
        return this._events.asObservable();
    }

    fetchCurrentEvents() {
        // this._events.next(this.loadedEvents);
        firestore.collection('events').get()
            .then(events => {
                // console.log('Events retrieved', events.docs);
                if (events) {
                    this.loadedEvents = [];
                    events.forEach(doc => {
                        // console.log('Got doc: ', doc.data());
                        const event = (doc.data() as CalendarEvent);
                        event.id = doc.id;
                        this.loadedEvents.push(event);
                    });
                    this._events.next(this.loadedEvents);
                }
            })
            .catch(err => console.error('something bad happend', err));
    }

    private uploadImage(eventId: string, imgFile: File) {
        storage.uploadFile({
            remoteFullPath: `newEventImages/${eventId}`,
            localFile: imgFile,
            onProgress: status => {
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(uploadedFile => {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            imgFile.remove()
                .then(() => console.log('file deleted'))
                .catch(error => console.error('error in delete', error));
            storage.getDownloadUrl({
                remoteFullPath: `newEventImages/${eventId}`
            })
                .then(url => {
                    return firebase.firestore().collection('events').doc(eventId).update({ imageUrl: url });
                })
                .then(() => {
                    console.log(`event updated with downloadURl`);
                    this.fetchCurrentEvents();
                })
        }).catch(err => {
            console.error(err);
        });
    }

    createEvent(event: CalendarEvent, image: File) {
        console.log('creating new event!', event);
        firestore.collection('events').add(event)
            .then(docRef => {
                console.log('new event created: ', docRef);
                this.uploadImage(docRef.id, image);
            })
            .catch(error => console.error(`error in creating event: `, error));

        // this.loadedEvents.push(event);
        this._events.next(this.loadedEvents);
    }

    updateEvent(event: CalendarEvent, newImage: File = null) {
        firebase.firestore().collection('events').doc(event.id).update(event)
            .then(res => {
                console.log('event updated', res);
                if (newImage) {
                    storage.deleteFile({ remoteFullPath: `newEventImages/${event.id}` })
                        .then(() => {
                            console.log('old image removed');
                            this.uploadImage(event.id, newImage);
                        })
                        .catch(err => console.error('issue with delete image in update event', err));
                } else {
                    this.fetchCurrentEvents();
                }
            })
            .catch(err => console.log('error in updating event', err));
    }

    deleteEvent(event: CalendarEvent) {
        firebase.firestore().collection('events').doc(event.id).delete()
            .then(() => {
                console.log('event deleted')
                return storage.deleteFile({ remoteFullPath: `newEventImages/${event.id}` })
            })
            .then(() => {
                console.log('image deleted');
                this.fetchCurrentEvents();
            })
            .catch(error => console.error('error in delete event', error));
    }
}
