import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular";
import * as imagePicker from "nativescript-imagepicker";
import { CalendarEvent } from "../event.model";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { EventService } from "../event.service";

import { fromAsset } from "tns-core-modules/image-source/image-source";
import { path, knownFolders, File } from "tns-core-modules/file-system";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    isCreating = true;
    title: string;
    description: string;
    date: Date;
    timeStart: number;
    timeEnd: number;
    location: string;
    imageUrl: ImageAsset;
    firebaseImage: string;
    previewSize = 300;
    localFile: File;
    eventToEdit: CalendarEvent;

    constructor(private pageRoute: PageRoute, private router: RouterExtensions,
        private eventService: EventService
    ) {

    }

    // TODO: Configure the datePicker and time picker with single plugin
    // tns plugin add nativescript-datetimepicker
    // for deets https://github.com/NativeScript/nativescript-datetimepicker

    ngOnInit(): void {
        this.pageRoute.activatedRoute.subscribe(activeRoute => {
            activeRoute.paramMap.subscribe(params => {
                console.log('params', params);
                if (!params.has('mode')) {
                    this.isCreating = true;
                } else {
                    this.isCreating = params.get('mode') !== 'create';
                }
                if (!this.isCreating) {
                    this.eventToEdit = this.eventService.eventToEdit;
                    this.title = this.eventToEdit.title;
                    this.description = this.eventToEdit.description;
                    this.date = this.eventToEdit.date;
                    this.timeStart = this.eventToEdit.timeStart;
                    this.timeEnd = this.eventToEdit.timeEnd;
                    this.location = this.eventToEdit.location;
                    this.firebaseImage = this.eventToEdit.imageUrl;
                }
            });
        });
    }

    pickImageTap() {
        const context = imagePicker.create({ mode: 'single' });
        context.authorize()
            .then(() => {
                this.imageUrl = null;
                return context.present();
            })
            .then(selection => {
                this.imageUrl = selection[0];
                // if any issues with android see here:
                // https://github.com/NativeScript/nativescript-imagepicker/issues/197#issuecomment-400560349

                fromAsset(selection[0])
                    .then(imgSource => {
                        if (imgSource.android) {
                            this.localFile = File.fromPath(imgSource.android);
                        } else {
                            const folder = knownFolders.documents().path;
                            const fileName = `${Date.now()}.jpeg`;
                            const newPath = path.join(folder, fileName);
                            const saved = imgSource.saveToFile(newPath, "jpeg");
                            if (saved) {
                                console.log('saved!');
                                this.localFile = File.fromPath(newPath);
                            }
                        }
                    });
            });
    }

    submit() {
        // console.log('date', this.date);
        // console.log('timeStart', this.timeStart);
        // console.log('timeEnd', this.timeEnd);

        const newEvent: CalendarEvent = {
            title: this.title,
            description: this.description,
            date: this.date,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            location: this.location
        }
        if (!this.isCreating) {
            newEvent.id = this.eventToEdit.id;
            this.eventService.updateEvent(newEvent, this.localFile);
        } else {
            this.eventService.createEvent(newEvent, this.localFile);
        }
        this.router.backToPreviousPage();
    }

    deleteEvent() {
        this.eventService.deleteEvent(this.eventToEdit);
        this.router.backToPreviousPage();
    }
}
