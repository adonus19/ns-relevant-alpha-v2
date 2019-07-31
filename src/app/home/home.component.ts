import { Component, OnInit } from "@angular/core";
import { isIOS } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";
import { DataService, Sermon } from "../shared/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    sermons: Array<Sermon>;

    items: { name: string, desc: string, price: string, imageSrc: string }[] = [
        { name: "Pancakes!", desc: "Everybody* loves gluten.", price: "$5", imageSrc: "https://placem.at/things?w=500&txt=0&random=9" },
        { name: "Bowl of Crap", desc: "Probably something in here. But probably not.", price: "$1", imageSrc: "https://placem.at/things?w=500&txt=0&random=6" },
        { name: "Motorcycle", desc: "It'll be worth the argument with your spouse.", price: "$8899", imageSrc: "https://placem.at/things?w=500&txt=0&random=1" },
        { name: "Air Plant", desc: "It looked cool in the store.", price: "$9", imageSrc: "https://placem.at/things?w=500&txt=0&random=2" },
        { name: "Cuff Links", desc: "You'll need them once in the next ten years.", price: "$59", imageSrc: "https://placem.at/things?w=500&txt=0&random=4" },
        { name: "Skateboard", desc: "Too bad you are too old to use it.", price: "$129", imageSrc: "https://placem.at/things?w=500&txt=0&random=7" },
        { name: "Off-Brand Soda", desc: "Desperate times we live in.", price: "$2", imageSrc: "https://placem.at/things?w=500&txt=0&random=8" },
        { name: "Beer? Liquor?", desc: "Mmmmm drinky.", price: "$7", imageSrc: "https://placem.at/things?w=500&txt=0&random=10" },
        { name: "Pie!", desc: "Also good.", price: "$15", imageSrc: "https://placem.at/things?w=500&txt=0&random=11" }
    ];

    constructor(private _itemService: DataService) { }

    ngOnInit(): void {
        this.sermons = this._itemService.getItems();
    }

    onItemLoading(args) {
        // hack to get around issue with RadListView ios background colors: https://github.com/telerik/nativescript-ui-feedback/issues/196
        // if (isIOS) {
        //     var newcolor = new Color("#e6e6e6");
        //     args.ios.backgroundView.backgroundColor = newcolor.ios;
        // }
    }
}
