import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Optional, ContentChild, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrLabel } from '../common/label';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var ClrDateContainer = /** @class */ (function () {
    function ClrDateContainer(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
        var _this = this;
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.commonStrings = commonStrings;
        this.ifErrorService = ifErrorService;
        this.focusService = focusService;
        this.controlClassService = controlClassService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this._dynamic = false;
        this.invalid = false;
        this.focus = false;
        this.subscriptions = [];
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(function (state) {
            _this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrDateContainer.prototype, "actionButton", {
        set: function (button) {
            this.toggleButton = button;
        },
        enumerable: true,
        configurable: true
    });
    ClrDateContainer.prototype.close = function () {
        this.toggleButton.nativeElement.focus();
    };
    ClrDateContainer.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
    };
    /**
     * Returns the classes to apply to the control
     */
    ClrDateContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * Determines if the control needs to add grid classes
     */
    ClrDateContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrDateContainer.prototype, "isEnabled", {
        /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         */
        get: function () {
            return this._datepickerEnabledService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    ClrDateContainer.prototype.initializeCalendar = function () {
        this._dateNavigationService.initializeCalendar();
    };
    /**
     * Toggles the Datepicker Popover.
     */
    ClrDateContainer.prototype.toggleDatepicker = function (event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    };
    /**
     * Unsubscribe from subscriptions.
     */
    ClrDateContainer.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        ContentChild(ClrLabel, { static: false }),
        tslib_1.__metadata("design:type", ClrLabel)
    ], ClrDateContainer.prototype, "label", void 0);
    tslib_1.__decorate([
        ViewChild('actionButton', { static: false }),
        tslib_1.__metadata("design:type", ElementRef),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], ClrDateContainer.prototype, "actionButton", null);
    tslib_1.__decorate([
        HostListener('body:keyup.escape'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrDateContainer.prototype, "close", null);
    ClrDateContainer = tslib_1.__decorate([
        Component({
            selector: 'clr-date-container',
            template: "\n      <ng-content select=\"label\"></ng-content>\n      <label *ngIf=\"!label && addGrid()\"></label>\n      <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n        <div class=\"clr-input-wrapper\">\n          <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n            <ng-content select=\"[clrDate]\"></ng-content>\n            <button #actionButton \n                    type=\"button\" \n                    class=\"clr-input-group-icon-action\"\n                    [attr.title]=\"commonStrings.keys.datepickerToggle\"\n                    [attr.aria-label]=\"commonStrings.keys.datepickerToggle\"\n                    [disabled]=\"control?.disabled\"\n                    (click)=\"toggleDatepicker($event)\"\n                    *ngIf=\"isEnabled\">\n              <clr-icon shape=\"calendar\"></clr-icon>\n            </button>\n            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n          </div>\n          <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n        </div>\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    ",
            providers: [
                ControlIdService,
                IfOpenService,
                LocaleHelperService,
                IfErrorService,
                ControlClassService,
                FocusService,
                NgControlService,
                DateIOService,
                DateNavigationService,
                DatepickerEnabledService,
                DateFormControlService,
                ClrCommonStringsService,
            ],
            host: {
                '[class.clr-form-control-disabled]': 'control?.disabled',
                '[class.clr-form-control]': 'true',
                '[class.clr-row]': 'addGrid()',
            }
        }),
        tslib_1.__param(8, Optional()),
        tslib_1.__metadata("design:paramtypes", [IfOpenService,
            DateNavigationService,
            DatepickerEnabledService,
            DateFormControlService,
            ClrCommonStringsService,
            IfErrorService,
            FocusService,
            ControlClassService,
            LayoutService,
            NgControlService])
    ], ClrDateContainer);
    return ClrDateContainer;
}());
export { ClrDateContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGUtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYSxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSWxILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBaURsRjtJQWdCRSwwQkFDVSxjQUE2QixFQUM3Qixz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QWE7WUFDTCxxQkFBcUI7WUFDbEIsd0JBQXdCO1lBQzNCLHNCQUFzQjtZQUNoQyx1QkFBdUI7WUFDckIsY0FBYztZQUNoQixZQUFZO1lBQ0wsbUJBQW1CO1lBQ2IsYUFBYTtZQUN0QixnQkFBZ0I7T0ExQmpDLGdCQUFnQixDQXlHNUI7SUFBRCx1QkFBQztDQUFBLEFBekdELElBeUdDO1NBekdZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPcHRpb25hbCwgQ29udGVudENoaWxkLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5cbmltcG9ydCB7IERhdGVGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWZvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVJT1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxlSGVscGVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xvY2FsZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kYXRlLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIiFsYWJlbCAmJiBhZGRHcmlkKClcIj48L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbHItaW5wdXQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXBcIiBbY2xhc3MuY2xyLWZvY3VzXT1cImZvY3VzXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyRGF0ZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8YnV0dG9uICNhY3Rpb25CdXR0b24gXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXAtaWNvbi1hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlclRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmRhdGVwaWNrZXJUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbD8uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRGF0ZXBpY2tlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0VuYWJsZWRcIj5cbiAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2FsZW5kYXJcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8Y2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyICpjbHJJZk9wZW4gY2xyRm9jdXNUcmFwPjwvY2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxjbHItaWNvbiBjbGFzcz1cImNsci12YWxpZGF0ZS1pY29uXCIgc2hhcGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtZXJyb3JcIiAqbmdJZj1cImludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb250cm9sSWRTZXJ2aWNlLFxuICAgIElmT3BlblNlcnZpY2UsXG4gICAgTG9jYWxlSGVscGVyU2VydmljZSxcbiAgICBJZkVycm9yU2VydmljZSxcbiAgICBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEZvY3VzU2VydmljZSxcbiAgICBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIERhdGVJT1NlcnZpY2UsXG4gICAgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sLWRpc2FibGVkXSc6ICdjb250cm9sPy5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25EZXN0cm95IHtcbiAgX2R5bmFtaWM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW52YWxpZCA9IGZhbHNlO1xuICBmb2N1cyA9IGZhbHNlO1xuICBjb250cm9sOiBOZ0NvbnRyb2w7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBsYWJlbDogQ2xyTGFiZWw7XG5cbiAgcHJpdmF0ZSB0b2dnbGVCdXR0b246IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2FjdGlvbkJ1dHRvbicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgYWN0aW9uQnV0dG9uKGJ1dHRvbjogRWxlbWVudFJlZikge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uID0gYnV0dG9uO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2lmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlOiBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRlRm9ybUNvbnRyb2xTZXJ2aWNlOiBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c0NoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzID0gc3RhdGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYm9keTprZXl1cC5lc2NhcGUnKVxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2xhc3NlcyB0byBhcHBseSB0byB0aGUgY29udHJvbFxuICAgKi9cbiAgY29udHJvbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuY29udHJvbENsYXNzKHRoaXMuaW52YWxpZCwgdGhpcy5hZGRHcmlkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGNvbnRyb2wgbmVlZHMgdG8gYWRkIGdyaWQgY2xhc3Nlc1xuICAgKi9cbiAgYWRkR3JpZCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRTZXJ2aWNlICYmICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIERhdGVwaWNrZXIgaXMgZW5hYmxlZCBvciBub3QuIElmIGRpc2FibGVkLCBoaWRlcyB0aGUgZGF0ZXBpY2tlciB0cmlnZ2VyLlxuICAgKi9cbiAgZ2V0IGlzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgdGhlIHVzZXIgaW5wdXQgYW5kIEluaXRpYWxpemVzIHRoZSBDYWxlbmRhciBldmVyeXRpbWUgdGhlIGRhdGVwaWNrZXIgcG9wb3ZlciBpcyBvcGVuLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluaXRpYWxpemVDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIERhdGVwaWNrZXIgUG9wb3Zlci5cbiAgICovXG4gIHRvZ2dsZURhdGVwaWNrZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl9pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLm1hcmtBc1RvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==