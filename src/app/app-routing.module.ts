import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { GivingComponent } from "./giving/giving.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(homeTab:home/default//eventsTab:events//givingTab:giving//contactTab:contact)",
        pathMatch: "full"
    },

    {
        path: "home",
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/home/home.module#HomeModule",
        outlet: "homeTab"
    },
    {
        path: "events",
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/browse/browse.module#BrowseModule",
        outlet: "eventsTab"
    },
    {
        path: "giving",
        component: GivingComponent,
        outlet: "givingTab"
    },
    {
        path: "contact",
        loadChildren: "~/app/contact/contact.module#ContactModule",
        outlet: "contactTab"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
