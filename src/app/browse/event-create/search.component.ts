import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular";
import * as imagePicker from "nativescript-imagepicker";
import { CalendarEvent } from "../event.model";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { EventService } from "../event.service";
import { fromAsset } from "tns-core-modules/image-source/image-source";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
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
    imageBase64: string;
    previewSize = 300;

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
                    this.isCreating = params.get('mode') !== 'edit';
                }
            })
        });
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }

    onTimeChanged(args) {
        console.log(args.value);
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
                fromAsset(selection[0])
                    .then(res => {
                        this.imageBase64 = res.toBase64String('jpeg');
                    });
            });
    }

    submit() {
        console.log('date', this.date);
        console.log('timeStart', this.timeStart);
        console.log('timeEnd', this.timeEnd);
        const newEvent: CalendarEvent = {
            title: this.title,
            description: this.description,
            date: this.date,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            location: this.location,
            imageUrl: this.imageBase64,
            id: "123"
        }
        this.eventService.createEvent(newEvent);
        this.router.backToPreviousPage();
    }
}
