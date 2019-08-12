import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventDetailComponent } from "./browse/event-detail/event-detail/event-detail.component";
import { GivingComponent } from './giving/giving.component';
import { SharedModule } from "./shared/shared.module";
import { AuthComponent } from "./auth/auth.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        EventDetailComponent,
        GivingComponent,
        AuthComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [EventDetailComponent]
})
export class AppModule { }
