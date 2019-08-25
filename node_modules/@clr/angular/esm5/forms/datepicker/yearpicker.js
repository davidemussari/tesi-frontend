import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, HostListener } from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '../../utils/key-codes/key-codes';
import { YearRangeModel } from './model/year-range.model';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { ViewManagerService } from './providers/view-manager.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var ClrYearpicker = /** @class */ (function () {
    function ClrYearpicker(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
        this.updateRange(this.yearRangeModel);
    }
    Object.defineProperty(ClrYearpicker.prototype, "ariaLiveDecadeText", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentDecadePhrase, {
                DECADE_RANGE: this.decadeRange,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrYearpicker.prototype, "calendarYear", {
        /**
         * Gets the year which the user is currently on.
         */
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    ClrYearpicker.prototype.incrementFocusYearBy = function (value) {
        this._focusedYear = this._focusedYear + value;
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (value > 0) {
                this.yearRangeModel = this.yearRangeModel.nextDecade();
            }
            else {
                this.yearRangeModel = this.yearRangeModel.previousDecade();
            }
        }
        this._datepickerFocusService.focusCell(this._elRef);
    };
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    ClrYearpicker.prototype.changeYear = function (year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    };
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    ClrYearpicker.prototype.previousDecade = function () {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Updates the YearRangeModel to the current decade.
     */
    ClrYearpicker.prototype.currentDecade = function () {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
        this.updateRange(this.yearRangeModel);
    };
    /**
     * Updates the YearRangeModel to the next decade.
     */
    ClrYearpicker.prototype.nextDecade = function () {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    ClrYearpicker.prototype.getTabIndex = function (year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    };
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    ClrYearpicker.prototype.onKeyDown = function (event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            var keyCode = event.keyCode;
            if (keyCode === UP_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-1);
            }
            else if (keyCode === DOWN_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(1);
            }
            else if (keyCode === RIGHT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(5);
            }
            else if (keyCode === LEFT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-5);
            }
        }
    };
    ClrYearpicker.prototype.updateRange = function (yrm) {
        var floor = yrm.yearRange[0];
        var ceil = yrm.yearRange[yrm.yearRange.length - 1];
        this.decadeRange = floor + " to " + ceil;
    };
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    ClrYearpicker.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
        // update the value for  decade range
    };
    tslib_1.__decorate([
        HostListener('keydown', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrYearpicker.prototype, "onKeyDown", null);
    ClrYearpicker = tslib_1.__decorate([
        Component({
            selector: 'clr-yearpicker',
            template: "\n        <div class=\"year-switchers\">\n          <div aria-live=\"polite\" class=\"clr-sr-only\">\n            {{ ariaLiveDecadeText  }}.\n          </div>\n          <button \n              class=\"calendar-btn switcher\" \n              type=\"button\" \n              (click)=\"previousDecade()\"\n              [attr.aria-label]=\"commonStrings.keys.datepickerPreviousDecade\">\n              <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.keys.datepickerPreviousDecade\"></clr-icon>\n          </button>\n          <button \n              class=\"calendar-btn switcher\" \n              type=\"button\" \n              (click)=\"currentDecade()\"\n              [attr.aria-label]=\"commonStrings.keys.datepickerCurrentDecade\">\n              <clr-icon shape=\"event\" [attr.title]=\"commonStrings.keys.datepickerCurrentDecade\"></clr-icon>\n          </button>\n          <button \n              class=\"calendar-btn switcher\" \n              type=\"button\" \n              (click)=\"nextDecade()\"\n              [attr.aria-label]=\"commonStrings.keys.datepickerNextDecade\">\n              <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.keys.datepickerNextDecade\"></clr-icon>\n          </button>\n        </div>\n        <div class=\"years\">\n            <button\n                *ngFor=\"let year of yearRangeModel.yearRange\"\n                type=\"button\"\n                class=\"calendar-btn year\"\n                [attr.tabindex]=\"getTabIndex(year)\"\n                [class.is-selected]=\"year === calendarYear\"\n                (click)=\"changeYear(year)\">\n                {{year}}\n            </button>\n        </div>\n    ",
            host: {
                '[class.yearpicker]': 'true',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [DateNavigationService,
            ViewManagerService,
            DatepickerFocusService,
            ElementRef,
            ClrCommonStringsService])
    ], ClrYearpicker);
    return ClrYearpicker;
}());
export { ClrYearpicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIveWVhcnBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWhHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQStDbEY7SUFDRSx1QkFDVSxzQkFBNkMsRUFDN0MsbUJBQXVDLEVBQ3ZDLHVCQUErQyxFQUMvQyxNQUFrQixFQUNuQixhQUFzQztRQUpyQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7UUFDdkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUU3QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFD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LENBQUMsV0FBVyxHQUFNLEtBQUssWUFBTyxJQUFNLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELHFDQUFxQztJQUN2QyxDQUFDO0lBbkNEO1FBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztpREFDbkIsYUFBYTs7a0RBb0I3QjtJQXBJVSxhQUFhO1FBN0N6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxzcURBc0NQO1lBQ0gsSUFBSSxFQUFFO2dCQUNKLG9CQUFvQixFQUFFLE1BQU07YUFDN0I7U0FDRixDQUFDO2lEQUdrQyxxQkFBcUI7WUFDeEIsa0JBQWtCO1lBQ2Qsc0JBQXNCO1lBQ3ZDLFVBQVU7WUFDSix1QkFBdUI7T0FOcEMsYUFBYSxDQW9KekI7SUFBRCxvQkFBQztDQUFBLEFBcEpELElBb0pDO1NBcEpZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBET1dOX0FSUk9XLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1cgfSBmcm9tICcuLi8uLi91dGlscy9rZXktY29kZXMva2V5LWNvZGVzJztcblxuaW1wb3J0IHsgWWVhclJhbmdlTW9kZWwgfSBmcm9tICcuL21vZGVsL3llYXItcmFuZ2UubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3TWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92aWV3LW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci15ZWFycGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInllYXItc3dpdGNoZXJzXCI+XG4gICAgICAgICAgPGRpdiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBjbGFzcz1cImNsci1zci1vbmx5XCI+XG4gICAgICAgICAgICB7eyBhcmlhTGl2ZURlY2FkZVRleHQgIH19LlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItYnRuIHN3aXRjaGVyXCIgXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInByZXZpb3VzRGVjYWRlKClcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5kYXRlcGlja2VyUHJldmlvdXNEZWNhZGVcIj5cbiAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGVcIiBkaXI9XCJsZWZ0XCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmRhdGVwaWNrZXJQcmV2aW91c0RlY2FkZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1idG4gc3dpdGNoZXJcIiBcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgICAgICAoY2xpY2spPVwiY3VycmVudERlY2FkZSgpXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlckN1cnJlbnREZWNhZGVcIj5cbiAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZXZlbnRcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlckN1cnJlbnREZWNhZGVcIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItYnRuIHN3aXRjaGVyXCIgXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm5leHREZWNhZGUoKVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmRhdGVwaWNrZXJOZXh0RGVjYWRlXCI+XG4gICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlXCIgZGlyPVwicmlnaHRcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlck5leHREZWNhZGVcIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInllYXJzXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHllYXIgb2YgeWVhclJhbmdlTW9kZWwueWVhclJhbmdlXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWJ0biB5ZWFyXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJnZXRUYWJJbmRleCh5ZWFyKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmlzLXNlbGVjdGVkXT1cInllYXIgPT09IGNhbGVuZGFyWWVhclwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVllYXIoeWVhcilcIj5cbiAgICAgICAgICAgICAgICB7e3llYXJ9fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnllYXJwaWNrZXJdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJZZWFycGlja2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3ZpZXdNYW5hZ2VyU2VydmljZTogVmlld01hbmFnZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2U6IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSBuZXcgWWVhclJhbmdlTW9kZWwodGhpcy5jYWxlbmRhclllYXIpO1xuICAgIHRoaXMuX2ZvY3VzZWRZZWFyID0gdGhpcy5jYWxlbmRhclllYXI7XG4gICAgdGhpcy51cGRhdGVSYW5nZSh0aGlzLnllYXJSYW5nZU1vZGVsKTtcbiAgfVxuXG4gIGdldCBhcmlhTGl2ZURlY2FkZVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb21tb25TdHJpbmdzLnBhcnNlKHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmRheXBpY2tlclNSQ3VycmVudERlY2FkZVBocmFzZSwge1xuICAgICAgREVDQURFX1JBTkdFOiB0aGlzLmRlY2FkZVJhbmdlLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWNhZGVSYW5nZTtcblxuICAvKipcbiAgICogWWVhclJhbmdlTW9kZWwgd2hpY2ggaXMgdXNlZCB0byBidWlsZCB0aGUgWWVhclBpY2tlciB2aWV3LlxuICAgKi9cbiAgeWVhclJhbmdlTW9kZWw6IFllYXJSYW5nZU1vZGVsO1xuXG4gIC8qKlxuICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBmb2N1c2VkIHllYXIuXG4gICAqL1xuICBwcml2YXRlIF9mb2N1c2VkWWVhcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB5ZWFyIHdoaWNoIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBvbi5cbiAgICovXG4gIGdldCBjYWxlbmRhclllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyLnllYXI7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVtZW50cyB0aGUgZm9jdXMgeWVhciBieSB0aGUgdmFsdWUgcGFzc2VkLiBVcGRhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCBpZiB0aGVcbiAgICogbmV3IHZhbHVlIGlzIG5vdCBpbiB0aGUgY3VycmVudCBkZWNhZGUuXG4gICAqL1xuICBwcml2YXRlIGluY3JlbWVudEZvY3VzWWVhckJ5KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9mb2N1c2VkWWVhciA9IHRoaXMuX2ZvY3VzZWRZZWFyICsgdmFsdWU7XG4gICAgaWYgKCF0aGlzLnllYXJSYW5nZU1vZGVsLmluUmFuZ2UodGhpcy5fZm9jdXNlZFllYXIpKSB7XG4gICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLm5leHREZWNhZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLnByZXZpb3VzRGVjYWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHRvIHVwZGF0ZSB0aGUgeWVhciB2YWx1ZSBvZiB0aGUgY2FsZW5kYXIuXG4gICAqIEFsc28gY2hhbmdlcyB0aGUgdmlldyB0byB0aGUgZGF5cGlja2VyLlxuICAgKi9cbiAgY2hhbmdlWWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlWWVhcih5ZWFyKTtcbiAgICB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuY2hhbmdlVG9EYXlWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgdG8gdGhlIHByZXZpb3VzIGRlY2FkZS5cbiAgICovXG4gIHByZXZpb3VzRGVjYWRlKCk6IHZvaWQge1xuICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLnByZXZpb3VzRGVjYWRlKCk7XG4gICAgdGhpcy51cGRhdGVSYW5nZSh0aGlzLnllYXJSYW5nZU1vZGVsKTtcbiAgICAvLyBZZWFyIGluIHRoZSB5ZWFycGlja2VyIGlzIG5vdCBmb2N1c2VkIGJlY2F1c2Ugd2hpbGUgbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBkZWNhZGUsXG4gICAgLy8geW91IHdhbnQgdGhlIGZvY3VzIHRvIHJlbWFpbiBvbiB0aGUgZGVjYWRlIHN3aXRjaGVyIGFycm93cy5cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCB0byB0aGUgY3VycmVudCBkZWNhZGUuXG4gICAqL1xuICBjdXJyZW50RGVjYWRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy55ZWFyUmFuZ2VNb2RlbC5pblJhbmdlKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS50b2RheS55ZWFyKSkge1xuICAgICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IHRoaXMueWVhclJhbmdlTW9kZWwuY3VycmVudERlY2FkZSgpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gICAgdGhpcy51cGRhdGVSYW5nZSh0aGlzLnllYXJSYW5nZU1vZGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCB0byB0aGUgbmV4dCBkZWNhZGUuXG4gICAqL1xuICBuZXh0RGVjYWRlKCk6IHZvaWQge1xuICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLm5leHREZWNhZGUoKTtcbiAgICB0aGlzLnVwZGF0ZVJhbmdlKHRoaXMueWVhclJhbmdlTW9kZWwpO1xuICAgIC8vIFllYXIgaW4gdGhlIHllYXJwaWNrZXIgaXMgbm90IGZvY3VzZWQgYmVjYXVzZSB3aGlsZSBuYXZpZ2F0aW5nIHRvIGEgZGlmZmVyZW50IGRlY2FkZSxcbiAgICAvLyB5b3Ugd2FudCB0aGUgZm9jdXMgdG8gcmVtYWluIG9uIHRoZSBkZWNhZGUgc3dpdGNoZXIgYXJyb3dzLlxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSB5ZWFyIHBhc3NlZCB0byB0aGUgZm9jdXNlZCB5ZWFyIGFuZCByZXR1cm5zIHRoZSB0YWIgaW5kZXguXG4gICAqL1xuICBnZXRUYWJJbmRleCh5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy55ZWFyUmFuZ2VNb2RlbC5pblJhbmdlKHRoaXMuX2ZvY3VzZWRZZWFyKSkge1xuICAgICAgaWYgKHRoaXMueWVhclJhbmdlTW9kZWwuaW5SYW5nZSh0aGlzLmNhbGVuZGFyWWVhcikpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZFllYXIgPSB0aGlzLmNhbGVuZGFyWWVhcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRZZWFyID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5taWRkbGVZZWFyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZFllYXIgPT09IHllYXIgPyAwIDogLTE7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgS2V5Ym9hcmQgYXJyb3cgbmF2aWdhdGlvbiBmb3IgdGhlIHllYXJwaWNrZXIuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gTk9URTogRGlkbid0IG1vdmUgdGhpcyB0byB0aGUgZGF0ZSBuYXZpZ2F0aW9uIHNlcnZpY2UgYmVjYXVzZVxuICAgIC8vIHRoZSBsb2dpYyBpcyBmYWlybHkgc2ltcGxlIGFuZCBpdCBkaWRuJ3QgbWFrZSBzZW5zZSBmb3IgbWVcbiAgICAvLyB0byBjcmVhdGUgZXh0cmEgb2JzZXJ2YWJsZXMganVzdCB0byBtb3ZlIHRoaXMgbG9naWMgdG8gdGhlIHNlcnZpY2UuXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoLTEpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoMSk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoNSk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnRGb2N1c1llYXJCeSgtNSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSYW5nZSh5cm06IFllYXJSYW5nZU1vZGVsKTogdm9pZCB7XG4gICAgY29uc3QgZmxvb3IgPSB5cm0ueWVhclJhbmdlWzBdO1xuICAgIGNvbnN0IGNlaWwgPSB5cm0ueWVhclJhbmdlW3lybS55ZWFyUmFuZ2UubGVuZ3RoIC0gMV07XG4gICAgdGhpcy5kZWNhZGVSYW5nZSA9IGAke2Zsb29yfSB0byAke2NlaWx9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIG9uIHRoZSBjdXJyZW50IGNhbGVuZGFyIHllYXIgd2hlbiB0aGUgVmlldyBpcyBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIGZvciAgZGVjYWRlIHJhbmdlXG4gIH1cbn1cbiJdfQ==