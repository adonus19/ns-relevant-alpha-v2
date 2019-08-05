import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventDetailComponent } from "./browse/event-detail/event-detail/event-detail.component";
import { GivingComponent } from './giving/giving.component';
import { SharedModule } from "./shared/shared.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        EventDetailComponent,
        GivingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [EventDetailComponent]
})
export class AppModule { }
