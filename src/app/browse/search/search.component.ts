import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    isCreating = true;

    constructor(private pageRoute: PageRoute, private router: RouterExtensions) {

    }

    ngOnInit(): void {
        this.pageRoute.activatedRoute.subscribe(activeRoute => {
            console.log('activeRoute', activeRoute);
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
}
