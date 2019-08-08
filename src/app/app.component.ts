import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { UIService } from "./shared/ui.service";

import * as firebase from 'nativescript-plugin-firebase';
import { EventService } from "./browse/event.service";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(private vcRef: ViewContainerRef, private uiService: UIService,
        private eventService: EventService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        firebase.init()
            .then(() => {
                console.log(`Connected!`);
                this.eventService.fetchCurrentEvents();
            })
            .catch(err => {
                console.log(err);
                if (err === 'Firebase already initialized') {
                    this.eventService.fetchCurrentEvents();
                }
            });

        this.uiService.setRootVCRef(this.vcRef);
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }
}
