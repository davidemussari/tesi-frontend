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
var ClrDay = /** @class */ (function () {
    function ClrDay(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     */
    ClrDay.prototype.onDayViewFocus = function () {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    };
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     */
    ClrDay.prototype.selectDay = function () {
        var day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    };
    tslib_1.__decorate([
        Input('clrDayView'),
        tslib_1.__metadata("design:type", DayViewModel)
    ], ClrDay.prototype, "dayView", void 0);
    ClrDay = tslib_1.__decorate([
        Component({
            selector: 'clr-day',
            template: "\n        <button\n            class=\"day-btn\"\n            type=\"button\"\n            [class.is-today]=\"dayView.isTodaysDate\"\n            [class.is-disabled]=\"dayView.isDisabled\"\n            [class.is-selected]=\"dayView.isSelected\"\n            [attr.tabindex]=\"dayView.tabIndex\"\n            (click)=\"selectDay()\"\n            (focus)=\"onDayViewFocus()\">\n            {{dayView.dayModel.date}}\n        </button>\n    ",
            host: { '[class.day]': 'true' }
        }),
        tslib_1.__metadata("design:paramtypes", [DateNavigationService,
            IfOpenService,
            DateFormControlService])
    ], ClrDay);
    return ClrDay;
}());
export { ClrDay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9kYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBbUI1RTtJQUNFLGdCQUNVLHNCQUE2QyxFQUM3QyxjQUE2QixFQUM3QixzQkFBOEM7UUFGOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBQ3JELENBQUM7SUFPSjs7T0FFRztJQUNILCtCQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUNILDBCQUFTLEdBQVQ7UUFDRSxJQUFNLEdBQUcsR0FBYSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBakJvQjtRQUFwQixLQUFLLENBQUMsWUFBWSxDQUFDOzBDQUFVLFlBQVk7MkNBQUM7SUFWaEMsTUFBTTtRQWpCbEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLHdiQVlQO1lBQ0gsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRTtTQUNoQyxDQUFDO2lEQUdrQyxxQkFBcUI7WUFDN0IsYUFBYTtZQUNMLHNCQUFzQjtPQUo3QyxNQUFNLENBNEJsQjtJQUFELGFBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEYXlWaWV3TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGF5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJkYXktYnRuXCJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW2NsYXNzLmlzLXRvZGF5XT1cImRheVZpZXcuaXNUb2RheXNEYXRlXCJcbiAgICAgICAgICAgIFtjbGFzcy5pcy1kaXNhYmxlZF09XCJkYXlWaWV3LmlzRGlzYWJsZWRcIlxuICAgICAgICAgICAgW2NsYXNzLmlzLXNlbGVjdGVkXT1cImRheVZpZXcuaXNTZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJkYXlWaWV3LnRhYkluZGV4XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3REYXkoKVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwib25EYXlWaWV3Rm9jdXMoKVwiPlxuICAgICAgICAgICAge3tkYXlWaWV3LmRheU1vZGVsLmRhdGV9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuZGF5XSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9pZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIERheVZpZXdNb2RlbCBpbnB1dCB3aGljaCBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBEYXkgVmlldy5cbiAgICovXG4gIEBJbnB1dCgnY2xyRGF5VmlldycpIGRheVZpZXc6IERheVZpZXdNb2RlbDtcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZm9jdXNlZERheSBpbiB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHdoZW4gdGhlIENsckRheSBpcyBmb2N1c2VkLlxuICAgKi9cbiAgb25EYXlWaWV3Rm9jdXMoKSB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmZvY3VzZWREYXkgPSB0aGlzLmRheVZpZXcuZGF5TW9kZWw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc2VsZWN0ZWREYXkgd2hlbiB0aGUgQ2xyRGF5IGlzIHNlbGVjdGVkIGFuZCBjbG9zZXMgdGhlIGRhdGVwaWNrZXIgcG9wb3Zlci5cbiAgICovXG4gIHNlbGVjdERheSgpOiB2b2lkIHtcbiAgICBjb25zdCBkYXk6IERheU1vZGVsID0gdGhpcy5kYXlWaWV3LmRheU1vZGVsO1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5ub3RpZnlTZWxlY3RlZERheUNoYW5nZWQoZGF5KTtcbiAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UubWFya0FzRGlydHkoKTtcbiAgICB0aGlzLl9pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgfVxufVxuIl19