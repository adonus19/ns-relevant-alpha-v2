import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { UIService } from "./shared/ui.service";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(private vcRef: ViewContainerRef, private uiService: UIService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.uiService.setRootVCRef(this.vcRef);
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }
}
