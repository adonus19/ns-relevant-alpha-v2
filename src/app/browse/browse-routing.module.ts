import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse.component";

const routes: Routes = [
    { path: "default", component: BrowseComponent },
    { path: 'default/:mode', loadChildren: '~/app/browse/search/search.module#SearchModule' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BrowseRoutingModule { }
