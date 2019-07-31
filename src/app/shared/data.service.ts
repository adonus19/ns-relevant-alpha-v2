import { Injectable } from "@angular/core";
import { data } from '../../data/video-data';

export interface Sermon {
    name: string, desc: string, link: string, imageSrc: string
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private sermons: Sermon[] = [];

    constructor() {

        for (const video of data.data) {
            let link: string;
            let img: string;
            let splitVidUrl = video.link.split('//')
            link = splitVidUrl[0] + '//player.' + splitVidUrl[1].split('/')[0] + '/video/' + splitVidUrl[1].split('/')[1] +
                '?badge=0&autopause=0&player_id=0&app_id=2221';
            img = video.pictures.sizes[3].link;
            this.sermons.push({
                name: video.name,
                desc: video.description,
                link: link,
                imageSrc: img
            });
        }
    }

    getItems(): Array<Sermon> {
        return this.sermons;
    }

    getItem(name: string): Sermon {
        return this.sermons.filter((item) => item.name === name)[0];
    }
}
