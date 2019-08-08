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
    localFile: File;

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

    pickImageTap() {
        const context = imagePicker.create({ mode: 'single' });
        context.authorize()
            .then(() => {
                this.imageUrl = null;
                return context.present();
            })
            .then(selection => {
                this.imageUrl = selection[0];
                // TODO handle for iOS and Android. Currently only will work for iOS
                // const ios = this.imageUrl.ios;
                fromAsset(selection[0])
                    .then(imgSource => {
                        // console.log('imgSource', imgSource);
                        this.imageBase64 = imgSource.toBase64String('jpeg');
                        const folder = knownFolders.documents().path;
                        const fileName = `${Date.now()}.jpeg`;
                        const newPath = path.join(folder, fileName);
                        const saved = imgSource.saveToFile(newPath, "jpeg");
                        if (saved) {
                            console.log('saved!');
                            this.localFile = File.fromPath(newPath);
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

        this.eventService.createEvent(newEvent, this.localFile);
        this.router.backToPreviousPage();
    }
}
