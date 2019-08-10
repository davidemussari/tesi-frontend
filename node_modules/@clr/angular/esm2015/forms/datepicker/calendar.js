import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, HostListener } from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '../../utils/key-codes/key-codes';
import { CalendarViewModel } from './model/calendar-view.model';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { NO_OF_DAYS_IN_A_WEEK } from './utils/constants';
let ClrCalendar = class ClrCalendar {
    constructor(_localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._subs = [];
        this.generateCalendarView();
        this.initializeSubscriptions();
    }
    /**
     * Gets the locale days according to the TranslationWidth.Narrow format.
     */
    get localeDaysNarrow() {
        return this._localeHelperService.localeDaysNarrow;
    }
    get calendar() {
        return this._dateNavigationService.displayedCalendar;
    }
    get selectedDay() {
        return this._dateNavigationService.selectedDay;
    }
    get focusedDay() {
        return this._dateNavigationService.focusedDay;
    }
    get today() {
        return this._dateNavigationService.today;
    }
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     */
    initializeSubscriptions() {
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe(() => {
            this.generateCalendarView();
        }));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe((focusedDay) => {
            this.calendarViewModel.updateFocusableDay(focusedDay);
        }));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe(() => {
            this._datepickerFocusService.focusCell(this._elRef);
        }));
    }
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     */
    generateCalendarView() {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    }
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     */
    onKeyDown(event) {
        if (event && this.focusedDay) {
            switch (event.keyCode) {
                case UP_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1 * NO_OF_DAYS_IN_A_WEEK);
                    break;
                case DOWN_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(NO_OF_DAYS_IN_A_WEEK);
                    break;
                case LEFT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1);
                    break;
                case RIGHT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(1);
                    break;
                default:
                    break; // No default case. TSLint x-(
            }
        }
    }
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Unsubscribe from subscriptions.
     */
    ngOnDestroy() {
        this._subs.forEach((sub) => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    HostListener('keydown', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrCalendar.prototype, "onKeyDown", null);
ClrCalendar = tslib_1.__decorate([
    Component({ selector: 'clr-calendar', template: "<table class=\"calendar-table weekdays\">\n    <tr class=\"calendar-row\">\n        <td *ngFor=\"let day of localeDaysNarrow\" class=\"calendar-cell weekday\">\n            {{day}}\n        </td>\n    </tr>\n</table>\n<table\n    class=\"calendar-table calendar-dates\">\n    <tr class=\"calendar-row\" *ngFor=\"let row of calendarViewModel.calendarView\">\n        <td *ngFor=\"let dayView of row\" class=\"calendar-cell\">\n            <clr-day [clrDayView]=\"dayView\"></clr-day>\n        </td>\n    </tr>\n</table>\n" }),
    tslib_1.__metadata("design:paramtypes", [LocaleHelperService,
        DateNavigationService,
        DatepickerFocusService,
        ElementRef])
], ClrCalendar);
export { ClrCalendar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2NhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVoRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUd6RCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBR3RCLFlBQ1Usb0JBQXlDLEVBQ3pDLHNCQUE2QyxFQUM3Qyx1QkFBK0MsRUFDL0MsTUFBa0I7UUFIbEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDL0MsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQU5wQixVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQVFqQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBT0Q7O09BRUc7SUFDSCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssdUJBQXVCO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNiLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2pFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBb0IsRUFBRSxFQUFFO1lBQzlFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDL0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNLLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FDNUMsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FDekMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUVILFNBQVMsQ0FBQyxLQUFvQjtRQUM1QixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzVCLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsS0FBSyxRQUFRO29CQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUM7b0JBQ3pFLE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQ3BFLE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELE1BQU07Z0JBQ1IsS0FBSyxXQUFXO29CQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxNQUFNO2dCQUNSO29CQUNFLE1BQU0sQ0FBQyw4QkFBOEI7YUFDeEM7U0FDRjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0YsQ0FBQTtBQXRDQztJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ25CLGFBQWE7OzRDQXVCN0I7QUEzR1UsV0FBVztJQUR2QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLG9oQkFBOEIsRUFBRSxDQUFDOzZDQUt0QyxtQkFBbUI7UUFDakIscUJBQXFCO1FBQ3BCLHNCQUFzQjtRQUN2QyxVQUFVO0dBUGpCLFdBQVcsQ0EwSHZCO1NBMUhZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL2tleS1jb2Rlcyc7XG5cbmltcG9ydCB7IENhbGVuZGFyVmlld01vZGVsIH0gZnJvbSAnLi9tb2RlbC9jYWxlbmRhci12aWV3Lm1vZGVsJztcbmltcG9ydCB7IENhbGVuZGFyTW9kZWwgfSBmcm9tICcuL21vZGVsL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PX09GX0RBWVNfSU5fQV9XRUVLIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6ICdjbHItY2FsZW5kYXInLCB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuaHRtbCcgfSlcbmV4cG9ydCBjbGFzcyBDbHJDYWxlbmRhciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3N1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbG9jYWxlSGVscGVyU2VydmljZTogTG9jYWxlSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhclZpZXcoKTtcbiAgICB0aGlzLmluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsZW5kYXIgVmlldyBNb2RlbCB0byBnZW5lcmF0ZSB0aGUgQ2FsZW5kYXIuXG4gICAqL1xuICBjYWxlbmRhclZpZXdNb2RlbDogQ2FsZW5kYXJWaWV3TW9kZWw7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxvY2FsZSBkYXlzIGFjY29yZGluZyB0byB0aGUgVHJhbnNsYXRpb25XaWR0aC5OYXJyb3cgZm9ybWF0LlxuICAgKi9cbiAgZ2V0IGxvY2FsZURheXNOYXJyb3coKTogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlSGVscGVyU2VydmljZS5sb2NhbGVEYXlzTmFycm93O1xuICB9XG5cbiAgZ2V0IGNhbGVuZGFyKCk6IENhbGVuZGFyTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheWVkQ2FsZW5kYXI7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWREYXkoKTogRGF5TW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXk7XG4gIH1cblxuICBnZXQgZm9jdXNlZERheSgpOiBEYXlNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5mb2N1c2VkRGF5O1xuICB9XG5cbiAgZ2V0IHRvZGF5KCk6IERheU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnRvZGF5O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgc3Vic2NyaXB0aW9ucyB0bzpcbiAgICogMS4gdXBkYXRlIHRoZSBjYWxlbmRhciB2aWV3IG1vZGVsLlxuICAgKiAyLiB1cGRhdGUgdGhlIGZvY3VzYWJsZSBkYXkgaW4gdGhlIGNhbGVuZGFyIHZpZXcgbW9kZWwuXG4gICAqIDMuIGZvY3VzIG9uIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBjYWxlbmRhci5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhclZpZXcoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX3N1YnMucHVzaChcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5mb2N1c2VkRGF5Q2hhbmdlLnN1YnNjcmliZSgoZm9jdXNlZERheTogRGF5TW9kZWwpID0+IHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclZpZXdNb2RlbC51cGRhdGVGb2N1c2FibGVEYXkoZm9jdXNlZERheSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIENhbGVuZGFyIFZpZXcgYmFzZWQgb24gdGhlIGNhbGVuZGFyIHJldHJpZXZlZCBmcm9tIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UuXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlQ2FsZW5kYXJWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJWaWV3TW9kZWwgPSBuZXcgQ2FsZW5kYXJWaWV3TW9kZWwoXG4gICAgICB0aGlzLmNhbGVuZGFyLFxuICAgICAgdGhpcy5zZWxlY3RlZERheSxcbiAgICAgIHRoaXMuZm9jdXNlZERheSxcbiAgICAgIHRoaXMudG9kYXksXG4gICAgICB0aGlzLl9sb2NhbGVIZWxwZXJTZXJ2aWNlLmZpcnN0RGF5T2ZXZWVrXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgS2V5Ym9hcmQgYXJyb3cgbmF2aWdhdGlvbiB0byB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudCAmJiB0aGlzLmZvY3VzZWREYXkpIHtcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluY3JlbWVudEZvY3VzRGF5KC0xICogTk9fT0ZfREFZU19JTl9BX1dFRUspO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuaW5jcmVtZW50Rm9jdXNEYXkoTk9fT0ZfREFZU19JTl9BX1dFRUspO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuaW5jcmVtZW50Rm9jdXNEYXkoLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluY3JlbWVudEZvY3VzRGF5KDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrOyAvLyBObyBkZWZhdWx0IGNhc2UuIFRTTGludCB4LShcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBvbiB0aGUgZm9jdXNhYmxlIGRheSB3aGVuIHRoZSBDYWxlbmRhciBWaWV3IGlzIGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==