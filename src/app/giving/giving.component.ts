import { Component, OnInit } from '@angular/core';
import InAppBrowser from 'nativescript-inappbrowser';
import { openUrl } from 'tns-core-modules/utils/utils';

@Component({
    selector: 'ns-giving',
    templateUrl: './giving.component.html',
    styleUrls: ['./giving.component.scss'],
    moduleId: module.id,
})
export class GivingComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    openLink() {
        const url = `https://app.clovergive.com/App/Form/b9959b92-432b-43fb-95d0-370e4ec2ea9f`;
        if (InAppBrowser.isAvailable()) {
            InAppBrowser.open(url, {
                dismissButtonStyle: 'close',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'overCurrentContext',
                modalTransitionStyle: 'partialCurl',
                modalEnabled: true,
                // Android Properties
                showTitle: true,
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                }
            }).then(result => {
                console.log(result);
            }).catch(error => {
                alert({
                    title: 'Error',
                    message: error.message,
                    okButtonText: 'Ok'
                });
            });
        } else {
            openUrl(url);
        }
    }

}
