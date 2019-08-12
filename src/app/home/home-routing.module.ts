import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";

const routes: Routes = [
    {
        path: "default", component: HomeComponent
    },
    { path: "sermon/:name", component: ItemDetailComponent },
    { path: '', redirectTo: 'default', pathMatch: 'full' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
