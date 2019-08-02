import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventDetailComponent } from "./browse/event-detail/event-detail/event-detail.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        EventDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [EventDetailComponent]
})
export class AppModule { }
