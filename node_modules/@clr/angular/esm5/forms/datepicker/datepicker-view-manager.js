/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Injector, SkipSelf } from '@angular/core';
import { AbstractPopover } from '../../popover/common/abstract-popover';
import { Point } from '../../popover/common/popover';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { ViewManagerService } from './providers/view-manager.service';
var ClrDatepickerViewManager = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatepickerViewManager, _super);
    function ClrDatepickerViewManager(parent, _injector, _viewManagerService) {
        var _this = _super.call(this, _injector, parent) || this;
        _this._viewManagerService = _viewManagerService;
        _this.configurePopover();
        return _this;
    }
    /**
     * Configure Popover Direction and Close indicators
     */
    ClrDatepickerViewManager.prototype.configurePopover = function () {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    };
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isMonthView", {
        /**
         * Returns if the current view is the monthpicker.
         */
        get: function () {
            return this._viewManagerService.isMonthView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isYearView", {
        /**
         * Returns if the current view is the yearpicker.
         */
        get: function () {
            return this._viewManagerService.isYearView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isDayView", {
        /**
         * Returns if the current view is the daypicker.
         */
        get: function () {
            return this._viewManagerService.isDayView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatepickerViewManager = tslib_1.__decorate([
        Component({
            selector: 'clr-datepicker-view-manager',
            template: "<!--\n* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n* This software is released under MIT license.\n* The full license information can be found in LICENSE in the root directory of this project.\n-->\n\n<clr-monthpicker *ngIf=\"isMonthView\"></clr-monthpicker>\n<clr-yearpicker *ngIf=\"isYearView\"></clr-yearpicker>\n<clr-daypicker *ngIf=\"isDayView\"></clr-daypicker>\n",
            providers: [ViewManagerService, DatepickerFocusService],
            host: { '[class.datepicker]': 'true' }
        }),
        tslib_1.__param(0, SkipSelf()),
        tslib_1.__metadata("design:paramtypes", [ElementRef, Injector, ViewManagerService])
    ], ClrDatepickerViewManager);
    return ClrDatepickerViewManager;
}(AbstractPopover));
export { ClrDatepickerViewManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBUXRFO0lBQThDLG9EQUFlO0lBQzNELGtDQUF3QixNQUFrQixFQUFFLFNBQW1CLEVBQVUsbUJBQXVDO1FBQWhILFlBQ0Usa0JBQU0sU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUV6QjtRQUh3RSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBRTlHLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxtREFBZ0IsR0FBeEI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUtELHNCQUFJLGlEQUFXO1FBSGY7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLGdEQUFVO1FBSGQ7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLCtDQUFTO1FBSGI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQWxDVSx3QkFBd0I7UUFOcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDZCQUE2QjtZQUN2Qyw2WUFBNkM7WUFDN0MsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUM7WUFDdkQsSUFBSSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFO1NBQ3ZDLENBQUM7UUFFYSxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFBUyxVQUFVLEVBQWEsUUFBUSxFQUErQixrQkFBa0I7T0FEckcsd0JBQXdCLENBbUNwQztJQUFELCtCQUFDO0NBQUEsQUFuQ0QsQ0FBOEMsZUFBZSxHQW1DNUQ7U0FuQ1ksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdFBvcG92ZXIgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9hYnN0cmFjdC1wb3BvdmVyJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmlldy1tYW5hZ2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0ZXBpY2tlci12aWV3LW1hbmFnZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIuaHRtbCcsXG4gIHByb3ZpZGVyczogW1ZpZXdNYW5hZ2VyU2VydmljZSwgRGF0ZXBpY2tlckZvY3VzU2VydmljZV0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5kYXRlcGlja2VyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlcGlja2VyVmlld01hbmFnZXIgZXh0ZW5kcyBBYnN0cmFjdFBvcG92ZXIge1xuICBjb25zdHJ1Y3RvcihAU2tpcFNlbGYoKSBwYXJlbnQ6IEVsZW1lbnRSZWYsIF9pbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgX3ZpZXdNYW5hZ2VyU2VydmljZTogVmlld01hbmFnZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoX2luamVjdG9yLCBwYXJlbnQpO1xuICAgIHRoaXMuY29uZmlndXJlUG9wb3ZlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBQb3BvdmVyIERpcmVjdGlvbiBhbmQgQ2xvc2UgaW5kaWNhdG9yc1xuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVQb3BvdmVyKCk6IHZvaWQge1xuICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fTEVGVDtcbiAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgIHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgY3VycmVudCB2aWV3IGlzIHRoZSBtb250aHBpY2tlci5cbiAgICovXG4gIGdldCBpc01vbnRoVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmlzTW9udGhWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIGN1cnJlbnQgdmlldyBpcyB0aGUgeWVhcnBpY2tlci5cbiAgICovXG4gIGdldCBpc1llYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuaXNZZWFyVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSBjdXJyZW50IHZpZXcgaXMgdGhlIGRheXBpY2tlci5cbiAgICovXG4gIGdldCBpc0RheVZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5pc0RheVZpZXc7XG4gIH1cbn1cbiJdfQ==