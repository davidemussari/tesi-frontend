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
let ClrDatagridPagination = class ClrDatagridPagination {
    constructor(page, commonStrings) {
        this.page = page;
        this.commonStrings = commonStrings;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**********
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     */
    ngOnInit() {
        /*
         * Default page size is 10.
         * The reason we set it here and not in the provider itself is because
         * we don't want pagination if this component isn't present in the datagrid.
         */
        if (!this.page.size) {
            this.page.size = 10;
        }
        this._pageSubscription = this.page.change.subscribe(current => this.currentChanged.emit(current));
    }
    ngOnDestroy() {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    }
    /**
     * Page size
     */
    get pageSize() {
        return this.page.size;
    }
    set pageSize(size) {
        if (typeof size === 'number') {
            this.page.size = size;
        }
    }
    /**
     * Total items (needed to guess the last page)
     */
    get totalItems() {
        return this.page.totalItems;
    }
    set totalItems(total) {
        if (typeof total === 'number') {
            this.page.totalItems = total;
        }
    }
    /**
     * Last page
     */
    get lastPage() {
        return this.page.last;
    }
    set lastPage(last) {
        if (typeof last === 'number') {
            this.page.last = last;
        }
    }
    /**
     * Current page
     */
    get currentPage() {
        return this.page.current;
    }
    set currentPage(page) {
        if (typeof page === 'number') {
            this.page.current = page;
        }
    }
    /**
     * Moves to the previous page if it exists
     */
    previous() {
        this.page.previous();
    }
    /**
     * Moves to the next page if it exists
     */
    next() {
        this.page.next();
    }
    /**
     * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
     */
    get firstItem() {
        return this.page.firstItem;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
     */
    get lastItem() {
        return this.page.lastItem;
    }
    /**
     * Conditionally adds page numbers before and after the current page
     */
    get middlePages() {
        const middlePages = [];
        if (this.page.current > 1) {
            middlePages.push(this.page.current - 1);
        }
        middlePages.push(this.page.current);
        if (this.page.current < this.page.last) {
            middlePages.push(this.page.current + 1);
        }
        return middlePages;
    }
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     */
    updateCurrentPage(event) {
        const parsed = parseInt(event.target.value, 10);
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
    }
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
        template: `
    <div class="pagination-size" *ngIf="_pageSizeComponent">
      <ng-content select="clr-dg-page-size"></ng-content>
    </div>
    <div class="pagination-description">
      <ng-content></ng-content>
    </div>
    <div class="pagination-list" *ngIf="page.last > 1">
      <button
        type="button" 
        class="pagination-first" 
        [disabled]="page.current <= 1" 
        (click)="page.current = 1"
        [attr.aria-label]="commonStrings.keys.firstPage"
        >
        <clr-icon shape="step-forward-2 down"></clr-icon>
      </button>
      <button 
        type="button"
        class="pagination-previous" 
        [disabled]="page.current <= 1" 
        (click)="page.current = page.current - 1"
        [attr.aria-label]="commonStrings.keys.previousPage"
        >
        <clr-icon shape="angle left"></clr-icon>
      </button>
      <input 
        #currentPageInput 
        type="text" 
        class="pagination-current" 
        [size]="page.last.toString().length" 
        [value]="page.current"
        (keydown.enter)="updateCurrentPage($event)" 
        (blur)="updateCurrentPage($event)"
        [attr.aria-label]="commonStrings.keys.currentPage"
        />
        &nbsp;/&nbsp;<span [attr.aria-label]="commonStrings.keys.totalPages">{{page.last}}</span>
      <button 
        type="button"
        class="pagination-next" 
        [disabled]="page.current >= page.last" 
        (click)="page.current = page.current + 1"
        [attr.aria-label]="commonStrings.keys.nextPage"
        >
        <clr-icon shape="angle right"></clr-icon>
      </button>
      <button 
        type="button" 
        class="pagination-last" 
        [disabled]="page.current >= page.last" 
        (click)="page.current = page.last"
        [attr.aria-label]="commonStrings.keys.lastPage"
        >
        <clr-icon shape="step-forward-2 up"></clr-icon>
      </button>
    </div>
    `,
        host: { '[class.pagination]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [Page, ClrCommonStringsService])
], ClrDatagridPagination);
export { ClrDatagridPagination };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBK0RsRixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQU1oQyxZQUFtQixJQUFVLEVBQVMsYUFBc0M7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQXdGakQsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXZGMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ047Ozs7V0FJRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRyxD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Ozs7Ozs7OztLQXdEUDtRQUNILElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRTtLQUN2QyxDQUFDOzZDQU95QixJQUFJLEVBQXdCLHVCQUF1QjtHQU5qRSxxQkFBcUIsQ0FtS2pDO1NBbktZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tc2l6ZVwiICpuZ0lmPVwiX3BhZ2VTaXplQ29tcG9uZW50XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnZS1zaXplXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1maXJzdFwiIFxuICAgICAgICBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiBcbiAgICAgICAgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IDFcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5maXJzdFBhZ2VcIlxuICAgICAgICA+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIGRvd25cIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJwYWdpbmF0aW9uLXByZXZpb3VzXCIgXG4gICAgICAgIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIFxuICAgICAgICAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50IC0gMVwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLnByZXZpb3VzUGFnZVwiXG4gICAgICAgID5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgbGVmdFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxpbnB1dCBcbiAgICAgICAgI2N1cnJlbnRQYWdlSW5wdXQgXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1jdXJyZW50XCIgXG4gICAgICAgIFtzaXplXT1cInBhZ2UubGFzdC50b1N0cmluZygpLmxlbmd0aFwiIFxuICAgICAgICBbdmFsdWVdPVwicGFnZS5jdXJyZW50XCJcbiAgICAgICAgKGtleWRvd24uZW50ZXIpPVwidXBkYXRlQ3VycmVudFBhZ2UoJGV2ZW50KVwiIFxuICAgICAgICAoYmx1cik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuY3VycmVudFBhZ2VcIlxuICAgICAgICAvPlxuICAgICAgICAmbmJzcDsvJm5ic3A7PHNwYW4gW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMudG90YWxQYWdlc1wiPnt7cGFnZS5sYXN0fX08L3NwYW4+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIiBcbiAgICAgICAgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiBcbiAgICAgICAgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UuY3VycmVudCArIDFcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5uZXh0UGFnZVwiXG4gICAgICAgID5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgcmlnaHRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1sYXN0XCIgXG4gICAgICAgIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPj0gcGFnZS5sYXN0XCIgXG4gICAgICAgIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmxhc3RcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5sYXN0UGFnZVwiXG4gICAgICAgID5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgdXBcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnBhZ2luYXRpb25dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBhZ2VTaXplLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgX3BhZ2VTaXplQ29tcG9uZW50OiBDbHJEYXRhZ3JpZFBhZ2VTaXplO1xuICBAVmlld0NoaWxkKCdjdXJyZW50UGFnZUlucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1cnJlbnRQYWdlSW5wdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2U6IFBhZ2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSkge1xuICAgIHRoaXMucGFnZS5hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBQYWdlIHNlcnZpY2UgZm9yIHBhZ2UgY2hhbmdlcy5cbiAgICogTm90ZTogdGhpcyBvbmx5IGVtaXRzIGFmdGVyIHRoZSBkYXRhZ3JpZCBpcyBpbml0aWFsaXplZC9zdGFiYWxpemVkIGFuZCB0aGUgcGFnZSBjaGFuZ2VzLlxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLypcbiAgICAgKiBEZWZhdWx0IHBhZ2Ugc2l6ZSBpcyAxMC5cbiAgICAgKiBUaGUgcmVhc29uIHdlIHNldCBpdCBoZXJlIGFuZCBub3QgaW4gdGhlIHByb3ZpZGVyIGl0c2VsZiBpcyBiZWNhdXNlXG4gICAgICogd2UgZG9uJ3Qgd2FudCBwYWdpbmF0aW9uIGlmIHRoaXMgY29tcG9uZW50IGlzbid0IHByZXNlbnQgaW4gdGhlIGRhdGFncmlkLlxuICAgICAqL1xuICAgIGlmICghdGhpcy5wYWdlLnNpemUpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gMTA7XG4gICAgfVxuICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnBhZ2UuY2hhbmdlLnN1YnNjcmliZShjdXJyZW50ID0+IHRoaXMuY3VycmVudENoYW5nZWQuZW1pdChjdXJyZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBwYWdlIHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfcGFnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucGFnZS5yZXNldFBhZ2VTaXplKCk7XG4gICAgaWYgKHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFnZSBzaXplXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5zaXplO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2VTaXplJylcbiAgcHVibGljIHNldCBwYWdlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvdGFsIGl0ZW1zIChuZWVkZWQgdG8gZ3Vlc3MgdGhlIGxhc3QgcGFnZSlcbiAgICovXG4gIHB1YmxpYyBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UudG90YWxJdGVtcztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdUb3RhbEl0ZW1zJylcbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHRvdGFsID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnRvdGFsSXRlbXMgPSB0b3RhbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGFzdCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0xhc3RQYWdlJylcbiAgcHVibGljIHNldCBsYXN0UGFnZShsYXN0OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UubGFzdCA9IGxhc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlJylcbiAgcHVibGljIHNldCBjdXJyZW50UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdQYWdlQ2hhbmdlJykgY3VycmVudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICB0aGlzLnBhZ2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgdGhpcy5wYWdlLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMCwgLTEgaWYgbm9uZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5maXJzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMCwgLTEgaWYgbm9uZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmRpdGlvbmFsbHkgYWRkcyBwYWdlIG51bWJlcnMgYmVmb3JlIGFuZCBhZnRlciB0aGUgY3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1pZGRsZVBhZ2VzKCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBtaWRkbGVQYWdlczogbnVtYmVyW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPiAxKSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50IC0gMSk7XG4gICAgfVxuICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQpO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA8IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50ICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBtaWRkbGVQYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBvbmx5IHVwZGF0ZSB0aGUgcGFnaW5hdGlvbidzIGN1cnJlbnQgcGFnZSBvbiBibHVyIG9mIHRoZSBpbnB1dCBmaWVsZCwgb3JcbiAgICogd2hlbiB0aGV5IHByZXNzIGVudGVyLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUN1cnJlbnRQYWdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKTtcblxuICAgIC8vIGlmIHRoZSBpbnB1dCB2YWx1ZSwgaXMgbm90IGEgbnVtYmVyLCB3ZSBkb24ndCB1cGRhdGUgdGhlIHBhZ2VcbiAgICBpZiAoIWlzTmFOKHBhcnNlZCkpIHtcbiAgICAgIGlmIChwYXJzZWQgPCAxKSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gMTtcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VkID4gdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSB0aGlzLnBhZ2UubGFzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFyc2VkO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaW5wdXQncyB2YWx1ZSB0byB0aGUgbmV3IGN1cnJlbnQgcGFnZS4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgY29kZVxuICAgICAqIGFib3ZlIG1heSBoYXZlIGNoYW5nZWQgdGhlIHZhbHVlIGZyb20gd2hhdCB0aGUgdXNlciBlbnRlcmVkIGluLlxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudFBhZ2VJbnB1dFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cbn1cbiJdfQ==