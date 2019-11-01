import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output, Inject, ChangeDetectionStrategy, PLATFORM_ID, ViewChild, ElementRef, } from '@angular/core';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { ClrAxis } from '../../utils/popover/enums/axis.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { isPlatformBrowser } from '@angular/common';
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
var ClrDatagridFilter = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatagridFilter, _super);
    function ClrDatagridFilter(_filters, commonStrings, smartToggleService, platformId, popoverId) {
        var _this = _super.call(this, _filters) || this;
        _this.commonStrings = commonStrings;
        _this.smartToggleService = smartToggleService;
        _this.platformId = platformId;
        _this.popoverId = popoverId;
        _this.subs = [];
        // Smart Popover
        _this.smartPosition = {
            axis: ClrAxis.VERTICAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.END,
            content: ClrAlignment.END,
        };
        _this.openChange = new EventEmitter(false);
        _this.subs.push(smartToggleService.openChange.subscribe(function (change) {
            _this.open = change;
        }));
        return _this;
    }
    ClrDatagridFilter_1 = ClrDatagridFilter;
    Object.defineProperty(ClrDatagridFilter.prototype, "open", {
        get: function () {
            return this.smartToggleService.open;
        },
        set: function (open) {
            var boolOpen = !!open;
            if (boolOpen !== this.open) {
                this.smartToggleService.open = !!open;
                this.openChange.emit(!!open);
                if (!boolOpen && isPlatformBrowser(this.platformId)) {
                    this.anchor.nativeElement.focus();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "customFilter", {
        set: function (filter) {
            this.setFilter(filter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "active", {
        /**
         * Indicates if the filter is currently active
         */
        get: function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridFilter.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    var ClrDatagridFilter_1;
    tslib_1.__decorate([
        ViewChild('anchor', { static: false, read: ElementRef }),
        tslib_1.__metadata("design:type", ElementRef)
    ], ClrDatagridFilter.prototype, "anchor", void 0);
    tslib_1.__decorate([
        Input('clrDgFilterOpen'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrDatagridFilter.prototype, "open", null);
    tslib_1.__decorate([
        Output('clrDgFilterOpenChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrDatagridFilter.prototype, "openChange", void 0);
    tslib_1.__decorate([
        Input('clrDgFilter'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrDatagridFilter.prototype, "customFilter", null);
    ClrDatagridFilter = ClrDatagridFilter_1 = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-filter',
            // We register this component as a CustomFilter, for the parent column to detect it.
            providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter_1 }, UNIQUE_ID_PROVIDER],
            template: "\n      <button class=\"datagrid-filter-toggle\"\n              type=\"button\"\n              #anchor\n              clrPopoverAnchor\n              clrPopoverOpenCloseButton\n              [class.datagrid-filter-open]=\"open\" \n              [class.datagrid-filtered]=\"active\">\n          <clr-icon [attr.shape]=\"active ? 'filter-grid-circle': 'filter-grid'\" class=\"is-solid\"></clr-icon>\n      </button>\n\n      <div class=\"datagrid-filter\"\n           [id]=\"popoverId\"\n           clrFocusTrap\n           *clrPopoverContent=\"open at smartPosition; outsideClickToClose: true; scrollToClose: true\">\n          <div class=\"datagrid-filter-close-wrapper\">\n              <button type=\"button\" class=\"close\" clrPopoverCloseButton>\n                  <clr-icon shape=\"close\" [attr.title]=\"commonStrings.keys.close\"></clr-icon>\n              </button>\n          </div>\n\n          <ng-content></ng-content>\n      </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__param(3, Inject(PLATFORM_ID)),
        tslib_1.__param(4, Inject(UNIQUE_ID)),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider,
            ClrCommonStringsService,
            ClrPopoverToggleService,
            Object, String])
    ], ClrDatagridFilter);
    return ClrDatagridFilter;
}(DatagridFilterRegistrar));
export { ClrDatagridFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTix1QkFBdUIsRUFFdkIsV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQW9CLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFNUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBRS9GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBEOzs7O0dBSUc7QUErQkg7SUFBZ0QsNkNBQXlEO0lBR3ZHLDJCQUNFLFFBQTRCLEVBQ3JCLGFBQXNDLEVBQ3JDLGtCQUEyQyxFQUN0QixVQUFrQixFQUNyQixTQUFpQjtRQUw3QyxZQU9FLGtCQUFNLFFBQVEsQ0FBQyxTQU1oQjtRQVhRLG1CQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUNyQyx3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LENBQUMsQ0FBQTtpREFKUixlQUFlO1lBQ0gsdUJBQXVCO1lBQ2pCLHVCQUF1QjtZQUNWLE1BQU07T0FQdEMsaUJBQWlCLENBK0Q3QjtJQUFELHdCQUFDO0NBQUEsQUEvREQsQ0FBZ0QsdUJBQXVCLEdBK0R0RTtTQS9EWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgSW5qZWN0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciwgUmVnaXN0ZXJlZEZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlclBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9pbnRlcmZhY2VzL3BvcG92ZXItcG9zaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENsckF4aXMgfSBmcm9tICcuLi8uLi91dGlscy9wb3BvdmVyL2VudW1zL2F4aXMuZW51bSc7XG5pbXBvcnQgeyBDbHJTaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9lbnVtcy9zaWRlLmVudW0nO1xuaW1wb3J0IHsgQ2xyQWxpZ25tZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9lbnVtcy9hbGlnbm1lbnQuZW51bSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItdG9nZ2xlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQ3VzdG9tIGZpbHRlciB0aGF0IGNhbiBiZSBhZGRlZCBpbiBhbnkgY29sdW1uIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9iamVjdCBwcm9wZXJ0eSBzdHJpbmcgZmlsdGVyLlxuICogVGhlIHJlYXNvbiB0aGlzIGlzIG5vdCBqdXN0IGFuIGlucHV0IG9uIERhdGFncmlkQ29sdW1uIGlzIGJlY2F1c2Ugd2UgbmVlZCB0aGUgZmlsdGVyJ3MgdGVtcGxhdGUgdG8gYmUgcHJvamVjdGVkLFxuICogc2luY2UgaXQgY2FuIGJlIGFueXRoaW5nIChub3QganVzdCBhIHRleHQgaW5wdXQpLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctZmlsdGVyJyxcbiAgLy8gV2UgcmVnaXN0ZXIgdGhpcyBjb21wb25lbnQgYXMgYSBDdXN0b21GaWx0ZXIsIGZvciB0aGUgcGFyZW50IGNvbHVtbiB0byBkZXRlY3QgaXQuXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogQ2xyRGF0YWdyaWRGaWx0ZXIgfSwgVU5JUVVFX0lEX1BST1ZJREVSXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxidXR0b24gY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXItdG9nZ2xlXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICNhbmNob3JcbiAgICAgICAgICAgICAgY2xyUG9wb3ZlckFuY2hvclxuICAgICAgICAgICAgICBjbHJQb3BvdmVyT3BlbkNsb3NlQnV0dG9uXG4gICAgICAgICAgICAgIFtjbGFzcy5kYXRhZ3JpZC1maWx0ZXItb3Blbl09XCJvcGVuXCIgXG4gICAgICAgICAgICAgIFtjbGFzcy5kYXRhZ3JpZC1maWx0ZXJlZF09XCJhY3RpdmVcIj5cbiAgICAgICAgICA8Y2xyLWljb24gW2F0dHIuc2hhcGVdPVwiYWN0aXZlID8gJ2ZpbHRlci1ncmlkLWNpcmNsZSc6ICdmaWx0ZXItZ3JpZCdcIiBjbGFzcz1cImlzLXNvbGlkXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyXCJcbiAgICAgICAgICAgW2lkXT1cInBvcG92ZXJJZFwiXG4gICAgICAgICAgIGNsckZvY3VzVHJhcFxuICAgICAgICAgICAqY2xyUG9wb3ZlckNvbnRlbnQ9XCJvcGVuIGF0IHNtYXJ0UG9zaXRpb247IG91dHNpZGVDbGlja1RvQ2xvc2U6IHRydWU7IHNjcm9sbFRvQ2xvc2U6IHRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLWNsb3NlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGNsclBvcG92ZXJDbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmNsb3NlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkRmlsdGVyPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+XG4gIGltcGxlbWVudHMgQ3VzdG9tRmlsdGVyLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGNvbnN0cnVjdG9yKFxuICAgIF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgc21hcnRUb2dnbGVTZXJ2aWNlOiBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIHBvcG92ZXJJZDogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKF9maWx0ZXJzKTtcbiAgICB0aGlzLnN1YnMucHVzaChcbiAgICAgIHNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShjaGFuZ2UgPT4ge1xuICAgICAgICB0aGlzLm9wZW4gPSBjaGFuZ2U7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBAVmlld0NoaWxkKCdhbmNob3InLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IEVsZW1lbnRSZWYgfSlcbiAgYW5jaG9yOiBFbGVtZW50UmVmO1xuXG4gIC8vIFNtYXJ0IFBvcG92ZXJcbiAgcHVibGljIHNtYXJ0UG9zaXRpb246IENsclBvcG92ZXJQb3NpdGlvbiA9IHtcbiAgICBheGlzOiBDbHJBeGlzLlZFUlRJQ0FMLFxuICAgIHNpZGU6IENsclNpZGUuQUZURVIsXG4gICAgYW5jaG9yOiBDbHJBbGlnbm1lbnQuRU5ELFxuICAgIGNvbnRlbnQ6IENsckFsaWdubWVudC5FTkQsXG4gIH07XG5cbiAgcHVibGljIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLnNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0ZpbHRlck9wZW4nKVxuICBwdWJsaWMgc2V0IG9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGNvbnN0IGJvb2xPcGVuID0gISFvcGVuO1xuICAgIGlmIChib29sT3BlbiAhPT0gdGhpcy5vcGVuKSB7XG4gICAgICB0aGlzLnNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuID0gISFvcGVuO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoISFvcGVuKTtcbiAgICAgIGlmICghYm9vbE9wZW4gJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLmFuY2hvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdGaWx0ZXJPcGVuQ2hhbmdlJykgcHVibGljIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckRnRmlsdGVyJylcbiAgcHVibGljIHNldCBjdXN0b21GaWx0ZXIoZmlsdGVyOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+KSB7XG4gICAgdGhpcy5zZXRGaWx0ZXIoZmlsdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5pc0FjdGl2ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=