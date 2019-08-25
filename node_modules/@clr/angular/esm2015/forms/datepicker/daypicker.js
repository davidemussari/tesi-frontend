import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { DateNavigationService } from './providers/date-navigation.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ViewManagerService } from './providers/view-manager.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
let ClrDaypicker = class ClrDaypicker {
    constructor(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    get monthAttrString() {
        return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectMonthText, {
            CALENDAR_MONTH: this.calendarMonth,
        });
    }
    get yearAttrString() {
        return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectYearText, {
            CALENDAR_YEAR: this.calendarYear.toString(),
        });
    }
    get ariaLiveMonth() {
        return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentMonthPhrase, {
            CURRENT_MONTH: this.calendarMonth,
        });
    }
    get updateAriaLiveYear() {
        return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentYearPhrase, {
            CURRENT_YEAR: this.calendarYear.toString(),
        });
    }
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    changeToMonthView() {
        this._viewManagerService.changeToMonthView();
    }
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    changeToYearView() {
        this._viewManagerService.changeToYearView();
    }
    /**
     * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
     */
    get calendarMonth() {
        return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
    }
    /**
     * Returns the year value of the calendar.
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    nextMonth() {
        this._dateNavigationService.moveToNextMonth();
    }
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    previousMonth() {
        this._dateNavigationService.moveToPreviousMonth();
    }
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    currentMonth() {
        this._dateNavigationService.moveToCurrentMonth();
    }
};
ClrDaypicker = tslib_1.__decorate([
    Component({ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div aria-live=\"polite\" class=\"clr-sr-only\">\n      {{ ariaLiveMonth }}.  {{updateAriaLiveYear}}.\n    </div>\n    <div class=\"calendar-pickers\">\n        <button\n                class=\"calendar-btn monthpicker-trigger\"\n                type=\"button\" (click)=\"changeToMonthView()\"\n                [attr.aria-label]=\"monthAttrString\"\n                [attr.title]=\"monthAttrString\">\n                {{calendarMonth}}\n        </button>\n        <button\n                class=\"calendar-btn yearpicker-trigger\"\n                type=\"button\"\n                (click)=\"changeToYearView()\"\n                [attr.aria-label]=\"yearAttrString\"\n                [attr.title]=\"yearAttrString\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"previousMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerPreviousMonth\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.keys.datepickerPreviousMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"currentMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerCurrentMonth\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.keys.datepickerCurrentMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"nextMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerNextMonth\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.keys.datepickerNextMonth\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }),
    tslib_1.__metadata("design:paramtypes", [ViewManagerService,
        DateNavigationService,
        LocaleHelperService,
        ClrCommonStringsService])
], ClrDaypicker);
export { ClrDaypicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5cGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9kYXlwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR2xGLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDdkIsWUFDVSxtQkFBdUMsRUFDdkMsc0JBQTZDLEVBQzdDLG9CQUF5QyxFQUMxQyxhQUFzQztRQUhyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUMxQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7SUFDNUMsQ0FBQztJQUVKLElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2pGLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDaEYsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFO1NBQzVDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ3JGLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNsQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUNwRixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7U0FDM0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDWCxJQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbkQsQ0FBQztDQUNGLENBQUE7QUFoRlksWUFBWTtJQUR4QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGc2REFBK0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDOzZDQUdoRixrQkFBa0I7UUFDZixxQkFBcUI7UUFDdkIsbUJBQW1CO1FBQzNCLHVCQUF1QjtHQUxwQyxZQUFZLENBZ0Z4QjtTQWhGWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsZUhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sb2NhbGUtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmlldy1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6ICdjbHItZGF5cGlja2VyJywgdGVtcGxhdGVVcmw6ICcuL2RheXBpY2tlci5odG1sJywgaG9zdDogeyAnW2NsYXNzLmRheXBpY2tlcl0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENsckRheXBpY2tlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3ZpZXdNYW5hZ2VyU2VydmljZTogVmlld01hbmFnZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX2xvY2FsZUhlbHBlclNlcnZpY2U6IExvY2FsZUhlbHBlclNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge31cblxuICBnZXQgbW9udGhBdHRyU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29tbW9uU3RyaW5ncy5wYXJzZSh0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5kYXRlcGlja2VyU2VsZWN0TW9udGhUZXh0LCB7XG4gICAgICBDQUxFTkRBUl9NT05USDogdGhpcy5jYWxlbmRhck1vbnRoLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHllYXJBdHRyU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29tbW9uU3RyaW5ncy5wYXJzZSh0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5kYXRlcGlja2VyU2VsZWN0WWVhclRleHQsIHtcbiAgICAgIENBTEVOREFSX1lFQVI6IHRoaXMuY2FsZW5kYXJZZWFyLnRvU3RyaW5nKCksXG4gICAgfSk7XG4gIH1cblxuICBnZXQgYXJpYUxpdmVNb250aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbW1vblN0cmluZ3MucGFyc2UodGhpcy5jb21tb25TdHJpbmdzLmtleXMuZGF5cGlja2VyU1JDdXJyZW50TW9udGhQaHJhc2UsIHtcbiAgICAgIENVUlJFTlRfTU9OVEg6IHRoaXMuY2FsZW5kYXJNb250aCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCB1cGRhdGVBcmlhTGl2ZVllYXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb21tb25TdHJpbmdzLnBhcnNlKHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmRheXBpY2tlclNSQ3VycmVudFllYXJQaHJhc2UsIHtcbiAgICAgIENVUlJFTlRfWUVBUjogdGhpcy5jYWxlbmRhclllYXIudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgVmlld01hbmFnZXJTZXJ2aWNlIHRvIGNoYW5nZSB0byB0aGUgbW9udGhwaWNrZXIgdmlldy5cbiAgICovXG4gIGNoYW5nZVRvTW9udGhWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5jaGFuZ2VUb01vbnRoVmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBWaWV3TWFuYWdlclNlcnZpY2UgdG8gY2hhbmdlIHRvIHRoZSB5ZWFycGlja2VyIHZpZXcuXG4gICAqL1xuICBjaGFuZ2VUb1llYXJWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5jaGFuZ2VUb1llYXJWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbW9udGggdmFsdWUgb2YgdGhlIGNhbGVuZGFyIGluIHRoZSBUcmFuc2xhdGlvbldpZHRoLkFiYnJldmlhdGVkIGZvcm1hdC5cbiAgICovXG4gIGdldCBjYWxlbmRhck1vbnRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZUhlbHBlclNlcnZpY2UubG9jYWxlTW9udGhzQWJicmV2aWF0ZWRbdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyLm1vbnRoXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB5ZWFyIHZhbHVlIG9mIHRoZSBjYWxlbmRhci5cbiAgICovXG4gIGdldCBjYWxlbmRhclllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyLnllYXI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB0byBtb3ZlIHRvIHRoZSBuZXh0IG1vbnRoLlxuICAgKi9cbiAgbmV4dE1vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5tb3ZlVG9OZXh0TW9udGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHRvIG1vdmUgdG8gdGhlIHByZXZpb3VzIG1vbnRoLlxuICAgKi9cbiAgcHJldmlvdXNNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UubW92ZVRvUHJldmlvdXNNb250aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UgdG8gbW92ZSB0byB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIGN1cnJlbnRNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UubW92ZVRvQ3VycmVudE1vbnRoKCk7XG4gIH1cbn1cbiJdfQ==