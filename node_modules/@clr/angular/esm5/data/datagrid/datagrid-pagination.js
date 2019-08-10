import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Page } from './providers/page';
import { ClrDatagridPageSize } from './datagrid-page-size';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var ClrDatagridPagination = /** @class */ (function () {
    function ClrDatagridPagination(page, commonStrings) {
        this.page = page;
        this.commonStrings = commonStrings;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**********
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     */
    ClrDatagridPagination.prototype.ngOnInit = function () {
        var _this = this;
        /*
         * Default page size is 10.
         * The reason we set it here and not in the provider itself is because
         * we don't want pagination if this component isn't present in the datagrid.
         */
        if (!this.page.size) {
            this.page.size = 10;
        }
        this._pageSubscription = this.page.change.subscribe(function (current) { return _this.currentChanged.emit(current); });
    };
    ClrDatagridPagination.prototype.ngOnDestroy = function () {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "pageSize", {
        /**
         * Page size
         */
        get: function () {
            return this.page.size;
        },
        set: function (size) {
            if (typeof size === 'number') {
                this.page.size = size;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "totalItems", {
        /**
         * Total items (needed to guess the last page)
         */
        get: function () {
            return this.page.totalItems;
        },
        set: function (total) {
            if (typeof total === 'number') {
                this.page.totalItems = total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastPage", {
        /**
         * Last page
         */
        get: function () {
            return this.page.last;
        },
        set: function (last) {
            if (typeof last === 'number') {
                this.page.last = last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "currentPage", {
        /**
         * Current page
         */
        get: function () {
            return this.page.current;
        },
        set: function (page) {
            if (typeof page === 'number') {
                this.page.current = page;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    ClrDatagridPagination.prototype.previous = function () {
        this.page.previous();
    };
    /**
     * Moves to the next page if it exists
     */
    ClrDatagridPagination.prototype.next = function () {
        this.page.next();
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            return this.page.firstItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            return this.page.lastItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "middlePages", {
        /**
         * Conditionally adds page numbers before and after the current page
         */
        get: function () {
            var middlePages = [];
            if (this.page.current > 1) {
                middlePages.push(this.page.current - 1);
            }
            middlePages.push(this.page.current);
            if (this.page.current < this.page.last) {
                middlePages.push(this.page.current + 1);
            }
            return middlePages;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     */
    ClrDatagridPagination.prototype.updateCurrentPage = function (event) {
        var parsed = parseInt(event.target.value, 10);
        // if the input value, is not a number, we don't update the page
        if (!isNaN(parsed)) {
            if (parsed < 1) {
                this.page.current = 1;
            }
            else if (parsed > this.page.last) {
                this.page.current = this.page.last;
            }
            else {
                this.page.current = parsed;
            }
        }
        /**
         * Set the input's value to the new current page. This is needed because the code
         * above may have changed the value from what the user entered in.
         */
        this.currentPageInputRef.nativeElement.value = this.page.current;
    };
    tslib_1.__decorate([
        ContentChild(ClrDatagridPageSize, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridPageSize)
    ], ClrDatagridPagination.prototype, "_pageSizeComponent", void 0);
    tslib_1.__decorate([
        ViewChild('currentPageInput', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], ClrDatagridPagination.prototype, "currentPageInputRef", void 0);
    tslib_1.__decorate([
        Input('clrDgPageSize'),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], ClrDatagridPagination.prototype, "pageSize", null);
    tslib_1.__decorate([
        Input('clrDgTotalItems'),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], ClrDatagridPagination.prototype, "totalItems", null);
    tslib_1.__decorate([
        Input('clrDgLastPage'),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], ClrDatagridPagination.prototype, "lastPage", null);
    tslib_1.__decorate([
        Input('clrDgPage'),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], ClrDatagridPagination.prototype, "currentPage", null);
    tslib_1.__decorate([
        Output('clrDgPageChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrDatagridPagination.prototype, "currentChanged", void 0);
    ClrDatagridPagination = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-pagination',
            template: "\n    <div class=\"pagination-size\" *ngIf=\"_pageSizeComponent\">\n      <ng-content select=\"clr-dg-page-size\"></ng-content>\n    </div>\n    <div class=\"pagination-description\">\n      <ng-content></ng-content>\n    </div>\n    <div class=\"pagination-list\" *ngIf=\"page.last > 1\">\n      <button\n        type=\"button\" \n        class=\"pagination-first\" \n        [disabled]=\"page.current <= 1\" \n        (click)=\"page.current = 1\"\n        [attr.aria-label]=\"commonStrings.keys.firstPage\"\n        >\n        <clr-icon shape=\"step-forward-2 down\"></clr-icon>\n      </button>\n      <button \n        type=\"button\"\n        class=\"pagination-previous\" \n        [disabled]=\"page.current <= 1\" \n        (click)=\"page.current = page.current - 1\"\n        [attr.aria-label]=\"commonStrings.keys.previousPage\"\n        >\n        <clr-icon shape=\"angle left\"></clr-icon>\n      </button>\n      <input \n        #currentPageInput \n        type=\"text\" \n        class=\"pagination-current\" \n        [size]=\"page.last.toString().length\" \n        [value]=\"page.current\"\n        (keydown.enter)=\"updateCurrentPage($event)\" \n        (blur)=\"updateCurrentPage($event)\"\n        [attr.aria-label]=\"commonStrings.keys.currentPage\"\n        />\n        &nbsp;/&nbsp;<span [attr.aria-label]=\"commonStrings.keys.totalPages\">{{page.last}}</span>\n      <button \n        type=\"button\"\n        class=\"pagination-next\" \n        [disabled]=\"page.current >= page.last\" \n        (click)=\"page.current = page.current + 1\"\n        [attr.aria-label]=\"commonStrings.keys.nextPage\"\n        >\n        <clr-icon shape=\"angle right\"></clr-icon>\n      </button>\n      <button \n        type=\"button\" \n        class=\"pagination-last\" \n        [disabled]=\"page.current >= page.last\" \n        (click)=\"page.current = page.last\"\n        [attr.aria-label]=\"commonStrings.keys.lastPage\"\n        >\n        <clr-icon shape=\"step-forward-2 up\"></clr-icon>\n      </button>\n    </div>\n    ",
            host: { '[class.pagination]': 'true' }
        }),
        tslib_1.__metadata("design:paramtypes", [Page, ClrCommonStringsService])
    ], ClrDatagridPagination);
    return ClrDatagridPagination;
}());
export { ClrDatagridPagination };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBK0RsRjtJQU1FLCtCQUFtQixJQUFVLEVBQVMsYUFBc0M7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQXdGakQsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXZGMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3Q0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFUQzs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBQ3BHLENB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VCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSw2L0RBd0RQO1lBQ0gsSUFBSSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFO1NBQ3ZDLENBQUM7aURBT3lCLElBQUksRUFBd0IsdUJBQXVCO09BTmpFLHFCQUFxQixDQW1LakM7SUFBRCw0QkFBQztDQUFBLEFBbktELElBbUtDO1NBbktZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tc2l6ZVwiICpuZ0lmPVwiX3BhZ2VTaXplQ29tcG9uZW50XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnZS1zaXplXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1maXJzdFwiIFxuICAgICAgICBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiBcbiAgICAgICAgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IDFcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5maXJzdFBhZ2VcIlxuICAgICAgICA+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIGRvd25cIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJwYWdpbmF0aW9uLXByZXZpb3VzXCIgXG4gICAgICAgIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIFxuICAgICAgICAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50IC0gMVwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLnByZXZpb3VzUGFnZVwiXG4gICAgICAgID5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgbGVmdFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxpbnB1dCBcbiAgICAgICAgI2N1cnJlbnRQYWdlSW5wdXQgXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1jdXJyZW50XCIgXG4gICAgICAgIFtzaXplXT1cInBhZ2UubGFzdC50b1N0cmluZygpLmxlbmd0aFwiIFxuICAgICAgICBbdmFsdWVdPVwicGFnZS5jdXJyZW50XCJcbiAgICAgICAgKGtleWRvd24uZW50ZXIpPVwidXBkYXRlQ3VycmVudFBhZ2UoJGV2ZW50KVwiIFxuICAgICAgICAoYmx1cik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuY3VycmVudFBhZ2VcIlxuICAgICAgICAvPlxuICAgICAgICAmbmJzcDsvJm5ic3A7PHNwYW4gW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMudG90YWxQYWdlc1wiPnt7cGFnZS5sYXN0fX08L3NwYW4+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIiBcbiAgICAgICAgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiBcbiAgICAgICAgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UuY3VycmVudCArIDFcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5uZXh0UGFnZVwiXG4gICAgICAgID5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgcmlnaHRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1sYXN0XCIgXG4gICAgICAgIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPj0gcGFnZS5sYXN0XCIgXG4gICAgICAgIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmxhc3RcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5sYXN0UGFnZVwiXG4gICAgICAgID5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgdXBcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnBhZ2luYXRpb25dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBhZ2VTaXplLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgX3BhZ2VTaXplQ29tcG9uZW50OiBDbHJEYXRhZ3JpZFBhZ2VTaXplO1xuICBAVmlld0NoaWxkKCdjdXJyZW50UGFnZUlucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1cnJlbnRQYWdlSW5wdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2U6IFBhZ2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSkge1xuICAgIHRoaXMucGFnZS5hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBQYWdlIHNlcnZpY2UgZm9yIHBhZ2UgY2hhbmdlcy5cbiAgICogTm90ZTogdGhpcyBvbmx5IGVtaXRzIGFmdGVyIHRoZSBkYXRhZ3JpZCBpcyBpbml0aWFsaXplZC9zdGFiYWxpemVkIGFuZCB0aGUgcGFnZSBjaGFuZ2VzLlxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLypcbiAgICAgKiBEZWZhdWx0IHBhZ2Ugc2l6ZSBpcyAxMC5cbiAgICAgKiBUaGUgcmVhc29uIHdlIHNldCBpdCBoZXJlIGFuZCBub3QgaW4gdGhlIHByb3ZpZGVyIGl0c2VsZiBpcyBiZWNhdXNlXG4gICAgICogd2UgZG9uJ3Qgd2FudCBwYWdpbmF0aW9uIGlmIHRoaXMgY29tcG9uZW50IGlzbid0IHByZXNlbnQgaW4gdGhlIGRhdGFncmlkLlxuICAgICAqL1xuICAgIGlmICghdGhpcy5wYWdlLnNpemUpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gMTA7XG4gICAgfVxuICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnBhZ2UuY2hhbmdlLnN1YnNjcmliZShjdXJyZW50ID0+IHRoaXMuY3VycmVudENoYW5nZWQuZW1pdChjdXJyZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBwYWdlIHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfcGFnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucGFnZS5yZXNldFBhZ2VTaXplKCk7XG4gICAgaWYgKHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFnZSBzaXplXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5zaXplO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2VTaXplJylcbiAgcHVibGljIHNldCBwYWdlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvdGFsIGl0ZW1zIChuZWVkZWQgdG8gZ3Vlc3MgdGhlIGxhc3QgcGFnZSlcbiAgICovXG4gIHB1YmxpYyBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UudG90YWxJdGVtcztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdUb3RhbEl0ZW1zJylcbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHRvdGFsID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnRvdGFsSXRlbXMgPSB0b3RhbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGFzdCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0xhc3RQYWdlJylcbiAgcHVibGljIHNldCBsYXN0UGFnZShsYXN0OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UubGFzdCA9IGxhc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlJylcbiAgcHVibGljIHNldCBjdXJyZW50UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdQYWdlQ2hhbmdlJykgY3VycmVudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICB0aGlzLnBhZ2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgdGhpcy5wYWdlLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMCwgLTEgaWYgbm9uZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5maXJzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMCwgLTEgaWYgbm9uZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmRpdGlvbmFsbHkgYWRkcyBwYWdlIG51bWJlcnMgYmVmb3JlIGFuZCBhZnRlciB0aGUgY3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1pZGRsZVBhZ2VzKCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBtaWRkbGVQYWdlczogbnVtYmVyW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPiAxKSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50IC0gMSk7XG4gICAgfVxuICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQpO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA8IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50ICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBtaWRkbGVQYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBvbmx5IHVwZGF0ZSB0aGUgcGFnaW5hdGlvbidzIGN1cnJlbnQgcGFnZSBvbiBibHVyIG9mIHRoZSBpbnB1dCBmaWVsZCwgb3JcbiAgICogd2hlbiB0aGV5IHByZXNzIGVudGVyLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUN1cnJlbnRQYWdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKTtcblxuICAgIC8vIGlmIHRoZSBpbnB1dCB2YWx1ZSwgaXMgbm90IGEgbnVtYmVyLCB3ZSBkb24ndCB1cGRhdGUgdGhlIHBhZ2VcbiAgICBpZiAoIWlzTmFOKHBhcnNlZCkpIHtcbiAgICAgIGlmIChwYXJzZWQgPCAxKSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gMTtcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VkID4gdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSB0aGlzLnBhZ2UubGFzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFyc2VkO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaW5wdXQncyB2YWx1ZSB0byB0aGUgbmV3IGN1cnJlbnQgcGFnZS4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgY29kZVxuICAgICAqIGFib3ZlIG1heSBoYXZlIGNoYW5nZWQgdGhlIHZhbHVlIGZyb20gd2hhdCB0aGUgdXNlciBlbnRlcmVkIGluLlxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudFBhZ2VJbnB1dFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cbn1cbiJdfQ==