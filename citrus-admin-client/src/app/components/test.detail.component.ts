import {Component,  Input, OnChanges} from 'angular2/core';
import {NgSwitch, NgFor} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Pills, Pill} from "./util/pills";
import {Test, TestDetail} from "../model/tests";
import {TestService} from "../service/test.service";
import {SourceCodeComponent} from "./source.code.component";
import {TestDesignerComponent} from "./design/test.designer.component";
import {TestExecuteComponent} from "./test.execute.component";
import {Alert} from "../model/alert";
import {AlertService} from "../service/alert.service";

@Component({
    selector: "test-detail",
    templateUrl: 'app/components/test-detail.html',
    directives: <any> [NgSwitch, NgFor, Pills, Pill,
        SourceCodeComponent, TestDesignerComponent, TestExecuteComponent]
})
export class TestDetailComponent implements OnChanges {

    @Input() test: Test;

    constructor(private _testService: TestService,
                private _alertService: AlertService) {
    }

    detail: TestDetail;

    ngOnChanges() {
        if (!this.test) {
            this.detail = undefined;
        } else {
            this.getTestDetail();
        }
    }

    getTestDetail() {
        this._testService.getTestDetail(this.test)
            .subscribe(
                detail => this.detail = detail,
                error => this.notifyError(<any>error));
    }

    notifyError(error: any) {
        this._alertService.add(new Alert("danger", error.message, false));
    }
}