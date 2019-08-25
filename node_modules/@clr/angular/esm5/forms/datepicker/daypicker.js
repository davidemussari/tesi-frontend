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
var ClrDaypicker = /** @class */ (function () {
    function ClrDaypicker(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    Object.defineProperty(ClrDaypicker.prototype, "monthAttrString", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectMonthText, {
                CALENDAR_MONTH: this.calendarMonth,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "yearAttrString", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectYearText, {
                CALENDAR_YEAR: this.calendarYear.toString(),
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "ariaLiveMonth", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentMonthPhrase, {
                CURRENT_MONTH: this.calendarMonth,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "updateAriaLiveYear", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentYearPhrase, {
                CURRENT_YEAR: this.calendarYear.toString(),
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    ClrDaypicker.prototype.changeToMonthView = function () {
        this._viewManagerService.changeToMonthView();
    };
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    ClrDaypicker.prototype.changeToYearView = function () {
        this._viewManagerService.changeToYearView();
    };
    Object.defineProperty(ClrDaypicker.prototype, "calendarMonth", {
        /**
         * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
         */
        get: function () {
            return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "calendarYear", {
        /**
         * Returns the year value of the calendar.
         */
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    ClrDaypicker.prototype.nextMonth = function () {
        this._dateNavigationService.moveToNextMonth();
    };
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    ClrDaypicker.prototype.previousMonth = function () {
        this._dateNavigationService.moveToPreviousMonth();
    };
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    ClrDaypicker.prototype.currentMonth = function () {
        this._dateNavigationService.moveToCurrentMonth();
    };
    ClrDaypicker = tslib_1.__decorate([
        Component({ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div aria-live=\"polite\" class=\"clr-sr-only\">\n      {{ ariaLiveMonth }}.  {{updateAriaLiveYear}}.\n    </div>\n    <div class=\"calendar-pickers\">\n        <button\n                class=\"calendar-btn monthpicker-trigger\"\n                type=\"button\" (click)=\"changeToMonthView()\"\n                [attr.aria-label]=\"monthAttrString\"\n                [attr.title]=\"monthAttrString\">\n                {{calendarMonth}}\n        </button>\n        <button\n                class=\"calendar-btn yearpicker-trigger\"\n                type=\"button\"\n                (click)=\"changeToYearView()\"\n                [attr.aria-label]=\"yearAttrString\"\n                [attr.title]=\"yearAttrString\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"previousMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerPreviousMonth\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.keys.datepickerPreviousMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"currentMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerCurrentMonth\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.keys.datepickerCurrentMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"nextMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerNextMonth\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.keys.datepickerNextMonth\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }),
        tslib_1.__metadata("design:paramtypes", [ViewManagerService,
            DateNavigationService,
            LocaleHelperService,
            ClrCommonStringsService])
    ], ClrDaypicker);
    return ClrDaypicker;
}());
export { ClrDaypicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5cGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9kYXlwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR2xGO0lBQ0Usc0JBQ1UsbUJBQXVDLEVBQ3ZDLHNCQUE2QyxFQUM3QyxvQkFBeUMsRUFDMUMsYUFBc0M7UUFIckMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDMUMsa0JBQWEsR0FBYixhQUFhLENBQXlCO0lBQzVDLENBQUM7SUFFSixzQkFBSSx5Q0FBZTthQUFuQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7Z0JBQ2pGLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNuQyxDQUFDLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHdDQUFjO2FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDaEYsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFO2FBQzVDLENBQUMsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQWE7YUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO2dCQUNyRixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDbEMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBa0I7YUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFO2dCQUNwRixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7YUFDM0MsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNILHdDQUFpQixHQUFqQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNILHVDQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFLRCxzQkFBSSx1Q0FBYTtRQUhqQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hILENBQUM7OztPQUFBO0lBS0Qsc0JBQUksc0NBQVk7UUFIaEI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUM1RCxDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0gsZ0NBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUNBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUEvRVUsWUFBWTtRQUR4QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGc2REFBK0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2lEQUdoRixrQkFBa0I7WUFDZixxQkFBcUI7WUFDdkIsbUJBQW1CO1lBQzNCLHVCQUF1QjtPQUxwQyxZQUFZLENBZ0Z4QjtJQUFELG1CQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0FoRlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZpZXctbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7IHNlbGVjdG9yOiAnY2xyLWRheXBpY2tlcicsIHRlbXBsYXRlVXJsOiAnLi9kYXlwaWNrZXIuaHRtbCcsIGhvc3Q6IHsgJ1tjbGFzcy5kYXlwaWNrZXJdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJEYXlwaWNrZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF92aWV3TWFuYWdlclNlcnZpY2U6IFZpZXdNYW5hZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9sb2NhbGVIZWxwZXJTZXJ2aWNlOiBMb2NhbGVIZWxwZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IG1vbnRoQXR0clN0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbW1vblN0cmluZ3MucGFyc2UodGhpcy5jb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlclNlbGVjdE1vbnRoVGV4dCwge1xuICAgICAgQ0FMRU5EQVJfTU9OVEg6IHRoaXMuY2FsZW5kYXJNb250aCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCB5ZWFyQXR0clN0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbW1vblN0cmluZ3MucGFyc2UodGhpcy5jb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlclNlbGVjdFllYXJUZXh0LCB7XG4gICAgICBDQUxFTkRBUl9ZRUFSOiB0aGlzLmNhbGVuZGFyWWVhci50b1N0cmluZygpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGFyaWFMaXZlTW9udGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb21tb25TdHJpbmdzLnBhcnNlKHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmRheXBpY2tlclNSQ3VycmVudE1vbnRoUGhyYXNlLCB7XG4gICAgICBDVVJSRU5UX01PTlRIOiB0aGlzLmNhbGVuZGFyTW9udGgsXG4gICAgfSk7XG4gIH1cblxuICBnZXQgdXBkYXRlQXJpYUxpdmVZZWFyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29tbW9uU3RyaW5ncy5wYXJzZSh0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5kYXlwaWNrZXJTUkN1cnJlbnRZZWFyUGhyYXNlLCB7XG4gICAgICBDVVJSRU5UX1lFQVI6IHRoaXMuY2FsZW5kYXJZZWFyLnRvU3RyaW5nKCksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIFZpZXdNYW5hZ2VyU2VydmljZSB0byBjaGFuZ2UgdG8gdGhlIG1vbnRocGlja2VyIHZpZXcuXG4gICAqL1xuICBjaGFuZ2VUb01vbnRoVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuY2hhbmdlVG9Nb250aFZpZXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgVmlld01hbmFnZXJTZXJ2aWNlIHRvIGNoYW5nZSB0byB0aGUgeWVhcnBpY2tlciB2aWV3LlxuICAgKi9cbiAgY2hhbmdlVG9ZZWFyVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuY2hhbmdlVG9ZZWFyVmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1vbnRoIHZhbHVlIG9mIHRoZSBjYWxlbmRhciBpbiB0aGUgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZCBmb3JtYXQuXG4gICAqL1xuICBnZXQgY2FsZW5kYXJNb250aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVIZWxwZXJTZXJ2aWNlLmxvY2FsZU1vbnRoc0FiYnJldmlhdGVkW3RoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5ZWRDYWxlbmRhci5tb250aF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeWVhciB2YWx1ZSBvZiB0aGUgY2FsZW5kYXIuXG4gICAqL1xuICBnZXQgY2FsZW5kYXJZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5ZWRDYWxlbmRhci55ZWFyO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UgdG8gbW92ZSB0byB0aGUgbmV4dCBtb250aC5cbiAgICovXG4gIG5leHRNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UubW92ZVRvTmV4dE1vbnRoKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB0byBtb3ZlIHRvIHRoZSBwcmV2aW91cyBtb250aC5cbiAgICovXG4gIHByZXZpb3VzTW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLm1vdmVUb1ByZXZpb3VzTW9udGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHRvIG1vdmUgdG8gdGhlIGN1cnJlbnQgbW9udGguXG4gICAqL1xuICBjdXJyZW50TW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLm1vdmVUb0N1cnJlbnRNb250aCgpO1xuICB9XG59XG4iXX0=