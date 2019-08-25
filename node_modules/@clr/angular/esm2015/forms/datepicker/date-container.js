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
let ClrDateContainer = class ClrDateContainer {
    constructor(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
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
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(open => {
            if (open) {
                this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(state => {
            this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    set actionButton(button) {
        this.toggleButton = button;
    }
    close() {
        this.toggleButton.nativeElement.focus();
    }
    ngOnInit() {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
    }
    /**
     * Returns the classes to apply to the control
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * Determines if the control needs to add grid classes
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
     */
    get isEnabled() {
        return this._datepickerEnabledService.isEnabled;
    }
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    initializeCalendar() {
        this._dateNavigationService.initializeCalendar();
    }
    /**
     * Toggles the Datepicker Popover.
     */
    toggleDatepicker(event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    }
    /**
     * Unsubscribe from subscriptions.
     */
    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe());
    }
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
        template: `
      <ng-content select="label"></ng-content>
      <label *ngIf="!label && addGrid()"></label>
      <div class="clr-control-container" [ngClass]="controlClass()">
        <div class="clr-input-wrapper">
          <div class="clr-input-group" [class.clr-focus]="focus">
            <ng-content select="[clrDate]"></ng-content>
            <button #actionButton 
                    type="button" 
                    class="clr-input-group-icon-action"
                    [attr.title]="commonStrings.keys.datepickerToggle"
                    [attr.aria-label]="commonStrings.keys.datepickerToggle"
                    [disabled]="control?.disabled"
                    (click)="toggleDatepicker($event)"
                    *ngIf="isEnabled">
              <clr-icon shape="calendar"></clr-icon>
            </button>
            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>
          </div>
          <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
        </div>
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    `,
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
export { ClrDateContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGUtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYSxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSWxILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBaURsRixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdC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QUNoQyx1QkFBdUI7UUFDckIsY0FBYztRQUNoQixZQUFZO1FBQ0wsbUJBQW1CO1FBQ2IsYUFBYTtRQUN0QixnQkFBZ0I7R0ExQmpDLGdCQUFnQixDQXlHNUI7U0F6R1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBDb250ZW50Q2hpbGQsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcblxuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGUtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLWNvbnRyb2wtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC13cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC1ncm91cFwiIFtjbGFzcy5jbHItZm9jdXNdPVwiZm9jdXNcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJEYXRlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxidXR0b24gI2FjdGlvbkJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNsci1pbnB1dC1ncm91cC1pY29uLWFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mua2V5cy5kYXRlcGlja2VyVG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlclRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sPy5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVEYXRlcGlja2VyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzRW5hYmxlZFwiPlxuICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjYWxlbmRhclwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxjbHItZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIgKmNscklmT3BlbiBjbHJGb2N1c1RyYXA+PC9jbHItZGF0ZXBpY2tlci12aWV3LW1hbmFnZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGNsci1pY29uIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1oZWxwZXJcIiAqbmdJZj1cIiFpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIENvbnRyb2xJZFNlcnZpY2UsXG4gICAgSWZPcGVuU2VydmljZSxcbiAgICBMb2NhbGVIZWxwZXJTZXJ2aWNlLFxuICAgIElmRXJyb3JTZXJ2aWNlLFxuICAgIENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgRm9jdXNTZXJ2aWNlLFxuICAgIE5nQ29udHJvbFNlcnZpY2UsXG4gICAgRGF0ZUlPU2VydmljZSxcbiAgICBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UsXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2xdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLXJvd10nOiAnYWRkR3JpZCgpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUNvbnRhaW5lciBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyLCBPbkRlc3Ryb3kge1xuICBfZHluYW1pYzogYm9vbGVhbiA9IGZhbHNlO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIGZvY3VzID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGxhYmVsOiBDbHJMYWJlbDtcblxuICBwcml2YXRlIHRvZ2dsZUJ1dHRvbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYWN0aW9uQnV0dG9uJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBhY3Rpb25CdXR0b24oYnV0dG9uOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSBidXR0b247XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKG9wZW4gPT4ge1xuICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzQ2hhbmdlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBzdGF0ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdib2R5OmtleXVwLmVzY2FwZScpXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShpbnZhbGlkID0+IHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gaW52YWxpZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjbGFzc2VzIHRvIGFwcGx5IHRvIHRoZSBjb250cm9sXG4gICAqL1xuICBjb250cm9sQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5jb250cm9sQ2xhc3ModGhpcy5pbnZhbGlkLCB0aGlzLmFkZEdyaWQoKSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29udHJvbCBuZWVkcyB0byBhZGQgZ3JpZCBjbGFzc2VzXG4gICAqL1xuICBhZGRHcmlkKCkge1xuICAgIGlmICh0aGlzLmxheW91dFNlcnZpY2UgJiYgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgRGF0ZXBpY2tlciBpcyBlbmFibGVkIG9yIG5vdC4gSWYgZGlzYWJsZWQsIGhpZGVzIHRoZSBkYXRlcGlja2VyIHRyaWdnZXIuXG4gICAqL1xuICBnZXQgaXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyB0aGUgdXNlciBpbnB1dCBhbmQgSW5pdGlhbGl6ZXMgdGhlIENhbGVuZGFyIGV2ZXJ5dGltZSB0aGUgZGF0ZXBpY2tlciBwb3BvdmVyIGlzIG9wZW4uXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVDYWxlbmRhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuaW5pdGlhbGl6ZUNhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgRGF0ZXBpY2tlciBQb3BvdmVyLlxuICAgKi9cbiAgdG9nZ2xlRGF0ZXBpY2tlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuX2lmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UubWFya0FzVG91Y2hlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gc3Vic2NyaXB0aW9ucy5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19