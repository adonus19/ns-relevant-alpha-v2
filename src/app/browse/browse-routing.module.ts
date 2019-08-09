import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse.component";

const routes: Routes = [
    { path: "", component: BrowseComponent },
    { path: ':mode', loadChildren: '~/app/browse/event-create/search.module#SearchModule' }
];

@NgModule({
    imports: [NativeScriptRouterModule, NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BrowseRoutingModule { }
