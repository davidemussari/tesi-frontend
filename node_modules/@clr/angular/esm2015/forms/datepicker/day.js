/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { DayViewModel } from './model/day-view.model';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateNavigationService } from './providers/date-navigation.service';
let ClrDay = class ClrDay {
    constructor(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     */
    onDayViewFocus() {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    }
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     */
    selectDay() {
        const day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    }
};
tslib_1.__decorate([
    Input('clrDayView'),
    tslib_1.__metadata("design:type", DayViewModel)
], ClrDay.prototype, "dayView", void 0);
ClrDay = tslib_1.__decorate([
    Component({
        selector: 'clr-day',
        template: `
        <button
            class="day-btn"
            type="button"
            [class.is-today]="dayView.isTodaysDate"
            [class.is-disabled]="dayView.isDisabled"
            [class.is-selected]="dayView.isSelected"
            [attr.tabindex]="dayView.tabIndex"
            (click)="selectDay()"
            (focus)="onDayViewFocus()">
            {{dayView.dayModel.date}}
        </button>
    `,
        host: { '[class.day]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [DateNavigationService,
        IfOpenService,
        DateFormControlService])
], ClrDay);
export { ClrDay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9kYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBbUI1RSxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBQ2pCLFlBQ1Usc0JBQTZDLEVBQzdDLGNBQTZCLEVBQzdCLHNCQUE4QztRQUY5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7SUFDckQsQ0FBQztJQU9KOztPQUVHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDakUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLE1BQU0sR0FBRyxHQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7Q0FDRixDQUFBO0FBbEJzQjtJQUFwQixLQUFLLENBQUMsWUFBWSxDQUFDO3NDQUFVLFlBQVk7dUNBQUM7QUFWaEMsTUFBTTtJQWpCbEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7S0FZUDtRQUNILElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUU7S0FDaEMsQ0FBQzs2Q0FHa0MscUJBQXFCO1FBQzdCLGFBQWE7UUFDTCxzQkFBc0I7R0FKN0MsTUFBTSxDQTRCbEI7U0E1QlksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRGF5Vmlld01vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXktdmlldy5tb2RlbCc7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vbW9kZWwvZGF5Lm1vZGVsJztcbmltcG9ydCB7IERhdGVGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWZvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRheScsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiZGF5LWJ0blwiXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIFtjbGFzcy5pcy10b2RheV09XCJkYXlWaWV3LmlzVG9kYXlzRGF0ZVwiXG4gICAgICAgICAgICBbY2xhc3MuaXMtZGlzYWJsZWRdPVwiZGF5Vmlldy5pc0Rpc2FibGVkXCJcbiAgICAgICAgICAgIFtjbGFzcy5pcy1zZWxlY3RlZF09XCJkYXlWaWV3LmlzU2VsZWN0ZWRcIlxuICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGF5Vmlldy50YWJJbmRleFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0RGF5KClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIm9uRGF5Vmlld0ZvY3VzKClcIj5cbiAgICAgICAgICAgIHt7ZGF5Vmlldy5kYXlNb2RlbC5kYXRlfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmRheV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBEYXlWaWV3TW9kZWwgaW5wdXQgd2hpY2ggaXMgdXNlZCB0byBidWlsZCB0aGUgRGF5IFZpZXcuXG4gICAqL1xuICBASW5wdXQoJ2NsckRheVZpZXcnKSBkYXlWaWV3OiBEYXlWaWV3TW9kZWw7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGZvY3VzZWREYXkgaW4gdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB3aGVuIHRoZSBDbHJEYXkgaXMgZm9jdXNlZC5cbiAgICovXG4gIG9uRGF5Vmlld0ZvY3VzKCkge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5mb2N1c2VkRGF5ID0gdGhpcy5kYXlWaWV3LmRheU1vZGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHNlbGVjdGVkRGF5IHdoZW4gdGhlIENsckRheSBpcyBzZWxlY3RlZCBhbmQgY2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcG92ZXIuXG4gICAqL1xuICBzZWxlY3REYXkoKTogdm9pZCB7XG4gICAgY29uc3QgZGF5OiBEYXlNb2RlbCA9IHRoaXMuZGF5Vmlldy5kYXlNb2RlbDtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uubm90aWZ5U2VsZWN0ZWREYXlDaGFuZ2VkKGRheSk7XG4gICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLm1hcmtBc0RpcnR5KCk7XG4gICAgdGhpcy5faWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==