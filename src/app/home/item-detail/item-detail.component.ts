import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, Sermon } from "../../shared/data.service";

import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { Page } from "tns-core-modules/ui/page/page";

registerElement("VideoPlayer", () => Video);

@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: Sermon;
    videoPlayer: any;

    constructor(
        private _data: DataService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private page: Page
    ) { }

    ngOnInit(): void {
        const name = this._route.snapshot.params.name;
        this.item = this._data.getItem(name);
        console.log('checking the video src', this.item);
    }

    ngAfterViewInit() {
        this.videoPlayer = this.page.getViewById('nativeVideoPlayer');
    }

    play() {
        this.videoPlayer.play();
    }

    pause() {
        this.videoPlayer.pause();
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}
