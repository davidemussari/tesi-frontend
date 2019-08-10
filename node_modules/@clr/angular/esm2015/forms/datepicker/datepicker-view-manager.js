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
let ClrDatepickerViewManager = class ClrDatepickerViewManager extends AbstractPopover {
    constructor(parent, _injector, _viewManagerService) {
        super(_injector, parent);
        this._viewManagerService = _viewManagerService;
        this.configurePopover();
    }
    /**
     * Configure Popover Direction and Close indicators
     */
    configurePopover() {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    }
    /**
     * Returns if the current view is the monthpicker.
     */
    get isMonthView() {
        return this._viewManagerService.isMonthView;
    }
    /**
     * Returns if the current view is the yearpicker.
     */
    get isYearView() {
        return this._viewManagerService.isYearView;
    }
    /**
     * Returns if the current view is the daypicker.
     */
    get isDayView() {
        return this._viewManagerService.isDayView;
    }
};
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
export { ClrDatepickerViewManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBUXRFLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEsZUFBZTtJQUMzRCxZQUF3QixNQUFrQixFQUFFLFNBQW1CLEVBQVUsbUJBQXVDO1FBQzlHLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFEOEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUU5RyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBbkNZLHdCQUF3QjtJQU5wQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLDZZQUE2QztRQUM3QyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsQ0FBQztRQUN2RCxJQUFJLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUU7S0FDdkMsQ0FBQztJQUVhLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQUFTLFVBQVUsRUFBYSxRQUFRLEVBQStCLGtCQUFrQjtHQURyRyx3QkFBd0IsQ0FtQ3BDO1NBbkNZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3RvciwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWJzdHJhY3RQb3BvdmVyIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vYWJzdHJhY3QtcG9wb3Zlcic7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZpZXctbWFuYWdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyLmh0bWwnLFxuICBwcm92aWRlcnM6IFtWaWV3TWFuYWdlclNlcnZpY2UsIERhdGVwaWNrZXJGb2N1c1NlcnZpY2VdLFxuICBob3N0OiB7ICdbY2xhc3MuZGF0ZXBpY2tlcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZXBpY2tlclZpZXdNYW5hZ2VyIGV4dGVuZHMgQWJzdHJhY3RQb3BvdmVyIHtcbiAgY29uc3RydWN0b3IoQFNraXBTZWxmKCkgcGFyZW50OiBFbGVtZW50UmVmLCBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF92aWV3TWFuYWdlclNlcnZpY2U6IFZpZXdNYW5hZ2VyU2VydmljZSkge1xuICAgIHN1cGVyKF9pbmplY3RvciwgcGFyZW50KTtcbiAgICB0aGlzLmNvbmZpZ3VyZVBvcG92ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmUgUG9wb3ZlciBEaXJlY3Rpb24gYW5kIENsb3NlIGluZGljYXRvcnNcbiAgICovXG4gIHByaXZhdGUgY29uZmlndXJlUG9wb3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0xFRlQ7XG4gICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIGN1cnJlbnQgdmlldyBpcyB0aGUgbW9udGhwaWNrZXIuXG4gICAqL1xuICBnZXQgaXNNb250aFZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5pc01vbnRoVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSBjdXJyZW50IHZpZXcgaXMgdGhlIHllYXJwaWNrZXIuXG4gICAqL1xuICBnZXQgaXNZZWFyVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmlzWWVhclZpZXc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgY3VycmVudCB2aWV3IGlzIHRoZSBkYXlwaWNrZXIuXG4gICAqL1xuICBnZXQgaXNEYXlWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuaXNEYXlWaWV3O1xuICB9XG59XG4iXX0=