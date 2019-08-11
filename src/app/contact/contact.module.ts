import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../shared/shared.module";
import { ContactComponent } from "./contact.component";
import { NativeScriptRouterModule, NativeScriptFormsModule } from "nativescript-angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [NativeScriptCommonModule, SharedModule, NativeScriptRouterModule.forChild([{ path: '', component: ContactComponent }]),
        NativeScriptFormsModule, ReactiveFormsModule],
    declarations: [ContactComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ContactModule { }
