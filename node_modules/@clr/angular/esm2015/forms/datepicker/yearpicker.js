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
let ClrYearpicker = class ClrYearpicker {
    constructor(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
        this.updateRange(this.yearRangeModel);
    }
    get ariaLiveDecadeText() {
        return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentDecadePhrase, {
            DECADE_RANGE: this.decadeRange,
        });
    }
    /**
     * Gets the year which the user is currently on.
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    incrementFocusYearBy(value) {
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
    }
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    changeYear(year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    }
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    previousDecade() {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Updates the YearRangeModel to the current decade.
     */
    currentDecade() {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
        this.updateRange(this.yearRangeModel);
    }
    /**
     * Updates the YearRangeModel to the next decade.
     */
    nextDecade() {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    getTabIndex(year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    }
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    onKeyDown(event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            const keyCode = event.keyCode;
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
    }
    updateRange(yrm) {
        const floor = yrm.yearRange[0];
        const ceil = yrm.yearRange[yrm.yearRange.length - 1];
        this.decadeRange = `${floor} to ${ceil}`;
    }
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
        // update the value for  decade range
    }
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
        template: `
        <div class="year-switchers">
          <div aria-live="polite" class="clr-sr-only">
            {{ ariaLiveDecadeText  }}.
          </div>
          <button 
              class="calendar-btn switcher" 
              type="button" 
              (click)="previousDecade()"
              [attr.aria-label]="commonStrings.keys.datepickerPreviousDecade">
              <clr-icon shape="angle" dir="left" [attr.title]="commonStrings.keys.datepickerPreviousDecade"></clr-icon>
          </button>
          <button 
              class="calendar-btn switcher" 
              type="button" 
              (click)="currentDecade()"
              [attr.aria-label]="commonStrings.keys.datepickerCurrentDecade">
              <clr-icon shape="event" [attr.title]="commonStrings.keys.datepickerCurrentDecade"></clr-icon>
          </button>
          <button 
              class="calendar-btn switcher" 
              type="button" 
              (click)="nextDecade()"
              [attr.aria-label]="commonStrings.keys.datepickerNextDecade">
              <clr-icon shape="angle" dir="right" [attr.title]="commonStrings.keys.datepickerNextDecade"></clr-icon>
          </button>
        </div>
        <div class="years">
            <button
                *ngFor="let year of yearRangeModel.yearRange"
                type="button"
                class="calendar-btn year"
                [attr.tabindex]="getTabIndex(year)"
                [class.is-selected]="year === calendarYear"
                (click)="changeYear(year)">
                {{year}}
            </button>
        </div>
    `,
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
export { ClrYearpicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIveWVhcnBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWhHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQStDbEYsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4QixZQUNVLHNCQUE2QyxFQUM3QyxtQkFBdUMsRUFDdkMsdUJBQStDLEVBQy9DLE1BQWtCLEVBQ25CLGFBQXNDO1FBSnJDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRTdDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRTtZQUN0RixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWNEOztPQUVHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFDSyxvQkFBb0IsQ0FBQyxLQUFhO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNuRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM1RDtTQUNGO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEMsd0ZBQXdGO1FBQ3hGLDhEQUE4RDtJQUNoRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN0Qyx3RkFBd0Y7UUFDeEYsOERBQThEO0lBQ2hFLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbkQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO2FBQ3BEO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUVILFNBQVMsQ0FBQyxLQUFvQjtRQUM1QixnRUFBZ0U7UUFDaEUsNkRBQTZEO1FBQzdELHNFQUFzRTtRQUN0RSxJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sT0FBTyxHQUFXLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9CO2lCQUFNLElBQUksT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxPQUFPLEtBQUssV0FBVyxFQUFFO2dCQUNsQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQ2pDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7SUFFTyxXQUFXLENBQUMsR0FBbUI7UUFDckMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxLQUFLLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELHFDQUFxQztJQUN2QyxDQUFDO0NBQ0YsQ0FBQTtBQXBDQztJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ25CLGFBQWE7OzhDQW9CN0I7QUFwSVUsYUFBYTtJQTdDekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NQO1FBQ0gsSUFBSSxFQUFFO1lBQ0osb0JBQW9CLEVBQUUsTUFBTTtTQUM3QjtLQUNGLENBQUM7NkNBR2tDLHFCQUFxQjtRQUN4QixrQkFBa0I7UUFDZCxzQkFBc0I7UUFDdkMsVUFBVTtRQUNKLHVCQUF1QjtHQU5wQyxhQUFhLENBb0p6QjtTQXBKWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL2tleS1jb2Rlcyc7XG5cbmltcG9ydCB7IFllYXJSYW5nZU1vZGVsIH0gZnJvbSAnLi9tb2RlbC95ZWFyLXJhbmdlLm1vZGVsJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmlldy1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHIteWVhcnBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ZWFyLXN3aXRjaGVyc1wiPlxuICAgICAgICAgIDxkaXYgYXJpYS1saXZlPVwicG9saXRlXCIgY2xhc3M9XCJjbHItc3Itb25seVwiPlxuICAgICAgICAgICAge3sgYXJpYUxpdmVEZWNhZGVUZXh0ICB9fS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWJ0biBzd2l0Y2hlclwiIFxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgIChjbGljayk9XCJwcmV2aW91c0RlY2FkZSgpXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuZGF0ZXBpY2tlclByZXZpb3VzRGVjYWRlXCI+XG4gICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlXCIgZGlyPVwibGVmdFwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mua2V5cy5kYXRlcGlja2VyUHJldmlvdXNEZWNhZGVcIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItYnRuIHN3aXRjaGVyXCIgXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImN1cnJlbnREZWNhZGUoKVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmRhdGVwaWNrZXJDdXJyZW50RGVjYWRlXCI+XG4gICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImV2ZW50XCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmRhdGVwaWNrZXJDdXJyZW50RGVjYWRlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWJ0biBzd2l0Y2hlclwiIFxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgIChjbGljayk9XCJuZXh0RGVjYWRlKClcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5kYXRlcGlja2VyTmV4dERlY2FkZVwiPlxuICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZVwiIGRpcj1cInJpZ2h0XCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmRhdGVwaWNrZXJOZXh0RGVjYWRlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ZWFyc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJSYW5nZU1vZGVsLnllYXJSYW5nZVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1idG4geWVhclwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZ2V0VGFiSW5kZXgoeWVhcilcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5pcy1zZWxlY3RlZF09XCJ5ZWFyID09PSBjYWxlbmRhclllYXJcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VZZWFyKHllYXIpXCI+XG4gICAgICAgICAgICAgICAge3t5ZWFyfX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy55ZWFycGlja2VyXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyWWVhcnBpY2tlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF92aWV3TWFuYWdlclNlcnZpY2U6IFZpZXdNYW5hZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHtcbiAgICB0aGlzLnllYXJSYW5nZU1vZGVsID0gbmV3IFllYXJSYW5nZU1vZGVsKHRoaXMuY2FsZW5kYXJZZWFyKTtcbiAgICB0aGlzLl9mb2N1c2VkWWVhciA9IHRoaXMuY2FsZW5kYXJZZWFyO1xuICAgIHRoaXMudXBkYXRlUmFuZ2UodGhpcy55ZWFyUmFuZ2VNb2RlbCk7XG4gIH1cblxuICBnZXQgYXJpYUxpdmVEZWNhZGVUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29tbW9uU3RyaW5ncy5wYXJzZSh0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5kYXlwaWNrZXJTUkN1cnJlbnREZWNhZGVQaHJhc2UsIHtcbiAgICAgIERFQ0FERV9SQU5HRTogdGhpcy5kZWNhZGVSYW5nZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVjYWRlUmFuZ2U7XG5cbiAgLyoqXG4gICAqIFllYXJSYW5nZU1vZGVsIHdoaWNoIGlzIHVzZWQgdG8gYnVpbGQgdGhlIFllYXJQaWNrZXIgdmlldy5cbiAgICovXG4gIHllYXJSYW5nZU1vZGVsOiBZZWFyUmFuZ2VNb2RlbDtcblxuICAvKipcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgZm9jdXNlZCB5ZWFyLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9jdXNlZFllYXI6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgeWVhciB3aGljaCB0aGUgdXNlciBpcyBjdXJyZW50bHkgb24uXG4gICAqL1xuICBnZXQgY2FsZW5kYXJZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5ZWRDYWxlbmRhci55ZWFyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlbWVudHMgdGhlIGZvY3VzIHllYXIgYnkgdGhlIHZhbHVlIHBhc3NlZC4gVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgaWYgdGhlXG4gICAqIG5ldyB2YWx1ZSBpcyBub3QgaW4gdGhlIGN1cnJlbnQgZGVjYWRlLlxuICAgKi9cbiAgcHJpdmF0ZSBpbmNyZW1lbnRGb2N1c1llYXJCeSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZm9jdXNlZFllYXIgPSB0aGlzLl9mb2N1c2VkWWVhciArIHZhbHVlO1xuICAgIGlmICghdGhpcy55ZWFyUmFuZ2VNb2RlbC5pblJhbmdlKHRoaXMuX2ZvY3VzZWRZZWFyKSkge1xuICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICB0aGlzLnllYXJSYW5nZU1vZGVsID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5uZXh0RGVjYWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnllYXJSYW5nZU1vZGVsID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5wcmV2aW91c0RlY2FkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB0byB1cGRhdGUgdGhlIHllYXIgdmFsdWUgb2YgdGhlIGNhbGVuZGFyLlxuICAgKiBBbHNvIGNoYW5nZXMgdGhlIHZpZXcgdG8gdGhlIGRheXBpY2tlci5cbiAgICovXG4gIGNoYW5nZVllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmNoYW5nZVllYXIoeWVhcik7XG4gICAgdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmNoYW5nZVRvRGF5VmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFllYXJSYW5nZU1vZGVsIHRvIHRoZSBwcmV2aW91cyBkZWNhZGUuXG4gICAqL1xuICBwcmV2aW91c0RlY2FkZSgpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJSYW5nZU1vZGVsID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5wcmV2aW91c0RlY2FkZSgpO1xuICAgIHRoaXMudXBkYXRlUmFuZ2UodGhpcy55ZWFyUmFuZ2VNb2RlbCk7XG4gICAgLy8gWWVhciBpbiB0aGUgeWVhcnBpY2tlciBpcyBub3QgZm9jdXNlZCBiZWNhdXNlIHdoaWxlIG5hdmlnYXRpbmcgdG8gYSBkaWZmZXJlbnQgZGVjYWRlLFxuICAgIC8vIHlvdSB3YW50IHRoZSBmb2N1cyB0byByZW1haW4gb24gdGhlIGRlY2FkZSBzd2l0Y2hlciBhcnJvd3MuXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgdG8gdGhlIGN1cnJlbnQgZGVjYWRlLlxuICAgKi9cbiAgY3VycmVudERlY2FkZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMueWVhclJhbmdlTW9kZWwuaW5SYW5nZSh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UudG9kYXkueWVhcikpIHtcbiAgICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLmN1cnJlbnREZWNhZGUoKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICAgIHRoaXMudXBkYXRlUmFuZ2UodGhpcy55ZWFyUmFuZ2VNb2RlbCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgdG8gdGhlIG5leHQgZGVjYWRlLlxuICAgKi9cbiAgbmV4dERlY2FkZSgpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJSYW5nZU1vZGVsID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5uZXh0RGVjYWRlKCk7XG4gICAgdGhpcy51cGRhdGVSYW5nZSh0aGlzLnllYXJSYW5nZU1vZGVsKTtcbiAgICAvLyBZZWFyIGluIHRoZSB5ZWFycGlja2VyIGlzIG5vdCBmb2N1c2VkIGJlY2F1c2Ugd2hpbGUgbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBkZWNhZGUsXG4gICAgLy8geW91IHdhbnQgdGhlIGZvY3VzIHRvIHJlbWFpbiBvbiB0aGUgZGVjYWRlIHN3aXRjaGVyIGFycm93cy5cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0aGUgeWVhciBwYXNzZWQgdG8gdGhlIGZvY3VzZWQgeWVhciBhbmQgcmV0dXJucyB0aGUgdGFiIGluZGV4LlxuICAgKi9cbiAgZ2V0VGFiSW5kZXgoeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMueWVhclJhbmdlTW9kZWwuaW5SYW5nZSh0aGlzLl9mb2N1c2VkWWVhcikpIHtcbiAgICAgIGlmICh0aGlzLnllYXJSYW5nZU1vZGVsLmluUmFuZ2UodGhpcy5jYWxlbmRhclllYXIpKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRZZWFyID0gdGhpcy5jYWxlbmRhclllYXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mb2N1c2VkWWVhciA9IHRoaXMueWVhclJhbmdlTW9kZWwubWlkZGxlWWVhcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWRZZWFyID09PSB5ZWFyID8gMCA6IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIEtleWJvYXJkIGFycm93IG5hdmlnYXRpb24gZm9yIHRoZSB5ZWFycGlja2VyLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIE5PVEU6IERpZG4ndCBtb3ZlIHRoaXMgdG8gdGhlIGRhdGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGJlY2F1c2VcbiAgICAvLyB0aGUgbG9naWMgaXMgZmFpcmx5IHNpbXBsZSBhbmQgaXQgZGlkbid0IG1ha2Ugc2Vuc2UgZm9yIG1lXG4gICAgLy8gdG8gY3JlYXRlIGV4dHJhIG9ic2VydmFibGVzIGp1c3QgdG8gbW92ZSB0aGlzIGxvZ2ljIHRvIHRoZSBzZXJ2aWNlLlxuICAgIGlmIChldmVudCkge1xuICAgICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmluY3JlbWVudEZvY3VzWWVhckJ5KC0xKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmluY3JlbWVudEZvY3VzWWVhckJ5KDEpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmluY3JlbWVudEZvY3VzWWVhckJ5KDUpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoLTUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmFuZ2UoeXJtOiBZZWFyUmFuZ2VNb2RlbCk6IHZvaWQge1xuICAgIGNvbnN0IGZsb29yID0geXJtLnllYXJSYW5nZVswXTtcbiAgICBjb25zdCBjZWlsID0geXJtLnllYXJSYW5nZVt5cm0ueWVhclJhbmdlLmxlbmd0aCAtIDFdO1xuICAgIHRoaXMuZGVjYWRlUmFuZ2UgPSBgJHtmbG9vcn0gdG8gJHtjZWlsfWA7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBvbiB0aGUgY3VycmVudCBjYWxlbmRhciB5ZWFyIHdoZW4gdGhlIFZpZXcgaXMgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSBmb3IgIGRlY2FkZSByYW5nZVxuICB9XG59XG4iXX0=