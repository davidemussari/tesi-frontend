import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, EventEmitter, Input, Output, ViewContainerRef, ChangeDetectionStrategy, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { DatagridPropertyComparator } from './built-in/comparators/datagrid-property-comparator';
import { DatagridPropertyStringFilter } from './built-in/filters/datagrid-property-string-filter';
import { DatagridPropertyNumericFilter } from './built-in/filters/datagrid-property-numeric-filter';
import { DatagridStringFilterImpl } from './built-in/filters/datagrid-string-filter-impl';
import { DatagridNumericFilterImpl } from './built-in/filters/datagrid-numeric-filter-impl';
import { ClrDatagridSortOrder } from './enums/sort-order.enum';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { Sort } from './providers/sort';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { WrappedColumn } from './wrapped-column';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
let ClrDatagridColumn = class ClrDatagridColumn extends DatagridFilterRegistrar {
    constructor(_sort, filters, vcr, commonStrings) {
        super(filters);
        this._sort = _sort;
        this.vcr = vcr;
        this.commonStrings = commonStrings;
        /*
          * What type is this column?  This defaults to STRING, but can also be
          * set to NUMBER.  Unsupported types default to STRING. Users can set it
          * via the [clrDgColType] input by setting it to 'string' or 'number'.
          */
        // TODO: We might want to make this an enum in the future
        this.colType = 'string';
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
    }
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    get field() {
        return this._field;
    }
    set field(field) {
        if (typeof field === 'string') {
            this._field = field;
            if (!this.customFilter) {
                if (this.colType === 'number') {
                    this.setFilter(new DatagridNumericFilterImpl(new DatagridPropertyNumericFilter(field)));
                }
                else {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    get sortBy() {
        return this._sortBy;
    }
    set sortBy(comparator) {
        if (typeof comparator === 'string') {
            this._sortBy = new DatagridPropertyComparator(comparator);
        }
        else {
            if (comparator) {
                this._sortBy = comparator;
            }
            else {
                if (this._field) {
                    this._sortBy = new DatagridPropertyComparator(this._field);
                }
                else {
                    delete this._sortBy;
                }
            }
        }
    }
    /**
     * Indicates if the column is sortable
     */
    get sortable() {
        return !!this._sortBy;
    }
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(value) {
        if (typeof value === 'undefined') {
            return;
        }
        // only if the incoming order is different from the current one
        if (this._sortOrder === value) {
            return;
        }
        switch (value) {
            // the Unsorted case happens when the current state is either Asc or Desc
            default:
            case ClrDatagridSortOrder.UNSORTED:
                this._sort.clear();
                break;
            case ClrDatagridSortOrder.ASC:
                this.sort(false);
                break;
            case ClrDatagridSortOrder.DESC:
                this.sort(true);
                break;
        }
    }
    get ariaSort() {
        switch (this._sortOrder) {
            default:
            case ClrDatagridSortOrder.UNSORTED:
                return 'none';
            case ClrDatagridSortOrder.ASC:
                return 'ascending';
            case ClrDatagridSortOrder.DESC:
                return 'descending';
        }
    }
    /**
     * Sorts the datagrid based on this column
     */
    sort(reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        // Sets the correct icon for current sort order
        this.sortIcon = this._sortOrder === ClrDatagridSortOrder.DESC ? 'arrow down' : 'arrow';
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    get filterValue() {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            return this.filter.value;
        }
    }
    set updateFilterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (this.filter instanceof DatagridStringFilterImpl) {
            if (!newValue || typeof newValue !== 'string') {
                newValue = '';
            }
            if (newValue !== this.filter.value) {
                this.filter.value = newValue;
            }
        }
        else if (this.filter instanceof DatagridNumericFilterImpl) {
            if (!newValue || !(newValue instanceof Array)) {
                newValue = [null, null];
            }
            if (newValue.length === 2 && (newValue[0] !== this.filter.value[0] || newValue[1] !== this.filter.value[1])) {
                this.filter.value = newValue;
            }
        }
    }
    set filterValue(newValue) {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        }
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
    }
};
tslib_1.__decorate([
    Input('clrDgField'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrDatagridColumn.prototype, "field", null);
tslib_1.__decorate([
    Input('clrDgSortBy'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "sortBy", null);
tslib_1.__decorate([
    Input('clrDgColType'),
    tslib_1.__metadata("design:type", String)
], ClrDatagridColumn.prototype, "colType", void 0);
tslib_1.__decorate([
    Input('clrDgSorted'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridColumn.prototype, "sorted", null);
tslib_1.__decorate([
    Output('clrDgSortedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridColumn.prototype, "sortedChange", void 0);
tslib_1.__decorate([
    Input('clrDgSortOrder'),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], ClrDatagridColumn.prototype, "sortOrder", null);
tslib_1.__decorate([
    Output('clrDgSortOrderChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridColumn.prototype, "sortOrderChange", void 0);
tslib_1.__decorate([
    ContentChild(CustomFilter, { static: false }),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "projectedFilter", null);
tslib_1.__decorate([
    Input('clrFilterValue'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "updateFilterValue", null);
tslib_1.__decorate([
    Output('clrFilterValueChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridColumn.prototype, "filterValueChange", void 0);
ClrDatagridColumn = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-column',
        template: `
      <div class="datagrid-column-flex">
          <!-- I'm really not happy with that select since it's not very scalable -->
          <ng-content select="clr-dg-filter, clr-dg-string-filter, clr-dg-numeric-filter"></ng-content>

          <clr-dg-string-filter
                  *ngIf="field && !customFilter && (colType=='string')"
                  [clrDgStringFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-string-filter>
          
          <clr-dg-numeric-filter
                  *ngIf="field && !customFilter && (colType=='number')"
                  [clrDgNumericFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-numeric-filter>

          <ng-template #columnTitle>
              <ng-content></ng-content>
          </ng-template>

          <button 
            class="datagrid-column-title" 
            [attr.aria-label]="commonStrings.keys.sortColumn"
            *ngIf="sortable" 
            (click)="sort()" 
            type="button">
              <ng-container  *ngTemplateOutlet="columnTitle"></ng-container>
              <clr-icon
                      *ngIf="sortIcon"
                      [attr.shape]="sortIcon"
                      class="sort-icon"></clr-icon>
          </button>

          <span class="datagrid-column-title" *ngIf="!sortable">
              <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
          </span>

            <clr-dg-column-separator></clr-dg-column-separator>
        </div>
    `,
        providers: [ClrPopoverPositionService, ClrPopoverEventsService, ClrPopoverToggleService],
        host: {
            '[class.datagrid-column]': 'true',
            '[attr.aria-sort]': 'ariaSort',
            role: 'columnheader',
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [Sort,
        FiltersProvider,
        ViewContainerRef,
        ClrCommonStringsService])
], ClrDatagridColumn);
export { ClrDatagridColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBRVosS0FBSyxFQUdMLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsdUJBQXVCLEdBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUU1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDbkcsT0FBTyxFQUFF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QVksQ0FBQzs7OzhDQWVuQjtBQWFEO0lBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7OytDQWVwQjtBQVNzQjtJQUF0QixLQUFLLENBQUMsY0FBYyxDQUFDOztrREFBeUM7QUF3Qi9EO0lBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7OytDQVFwQjtBQUs0QjtJQUE1QixNQUFNLENBQUMsbUJBQW1CLENBQUM7O3VEQUFtRDtBQWEvRTtJQURDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7O2tEQXdCdkI7QUFjK0I7SUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzswREFBbUU7QUFnQ2xHO0lBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O3dEQU03QztBQVNEO0lBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7MERBb0J2QjtBQVMrQjtJQUEvQixNQUFNLENBQUMsc0JBQXNCLENBQUM7OzREQUF3QztBQS9QNUQsaUJBQWlCO0lBakQ3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NQO1FBQ0gsU0FBUyxFQUFFLENBQUMseUJBQXlCLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLENBQUM7UUFDeEYsSUFBSSxFQUFFO1lBQ0oseUJBQXlCLEVBQUUsTUFBTTtZQUNqQyxrQkFBa0IsRUFBRSxVQUFVO1lBQzlCLElBQUksRUFBRSxjQUFjO1NBQ3JCO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQzs2Q0FJaUIsSUFBSTtRQUNWLGVBQWU7UUFDWCxnQkFBZ0I7UUFDUCx1QkFBdUI7R0FOcEMsaUJBQWlCLENBMFE3QjtTQTFRWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yIH0gZnJvbSAnLi9idWlsdC1pbi9jb21wYXJhdG9ycy9kYXRhZ3JpZC1wcm9wZXJ0eS1jb21wYXJhdG9yJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlTdHJpbmdGaWx0ZXIgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktc3RyaW5nLWZpbHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlciB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1wcm9wZXJ0eS1udW1lcmljLWZpbHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtc3RyaW5nLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGwgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFNvcnRPcmRlciB9IGZyb20gJy4vZW51bXMvc29ydC1vcmRlci5lbnVtJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb21wYXJhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vcHJvdmlkZXJzL3NvcnQnO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXcmFwcGVkQ29sdW1uIH0gZnJvbSAnLi93cmFwcGVkLWNvbHVtbic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1wb3NpdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItdG9nZ2xlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tZmxleFwiPlxuICAgICAgICAgIDwhLS0gSSdtIHJlYWxseSBub3QgaGFwcHkgd2l0aCB0aGF0IHNlbGVjdCBzaW5jZSBpdCdzIG5vdCB2ZXJ5IHNjYWxhYmxlIC0tPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1maWx0ZXIsIGNsci1kZy1zdHJpbmctZmlsdGVyLCBjbHItZGctbnVtZXJpYy1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgICA8Y2xyLWRnLXN0cmluZy1maWx0ZXJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmllbGQgJiYgIWN1c3RvbUZpbHRlciAmJiAoY29sVHlwZT09J3N0cmluZycpXCJcbiAgICAgICAgICAgICAgICAgIFtjbHJEZ1N0cmluZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCJcbiAgICAgICAgICAgICAgICAgIFsoY2xyRmlsdGVyVmFsdWUpXT1cImZpbHRlclZhbHVlXCI+PC9jbHItZGctc3RyaW5nLWZpbHRlcj5cbiAgICAgICAgICBcbiAgICAgICAgICA8Y2xyLWRnLW51bWVyaWMtZmlsdGVyXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImZpZWxkICYmICFjdXN0b21GaWx0ZXIgJiYgKGNvbFR5cGU9PSdudW1iZXInKVwiXG4gICAgICAgICAgICAgICAgICBbY2xyRGdOdW1lcmljRmlsdGVyXT1cInJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgICAgWyhjbHJGaWx0ZXJWYWx1ZSldPVwiZmlsdGVyVmFsdWVcIj48L2Nsci1kZy1udW1lcmljLWZpbHRlcj5cblxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY29sdW1uVGl0bGU+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLXRpdGxlXCIgXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNvbW1vblN0cmluZ3Mua2V5cy5zb3J0Q29sdW1uXCJcbiAgICAgICAgICAgICpuZ0lmPVwic29ydGFibGVcIiBcbiAgICAgICAgICAgIChjbGljayk9XCJzb3J0KClcIiBcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8Y2xyLWljb25cbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zaGFwZV09XCJzb3J0SWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzb3J0LWljb25cIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tdGl0bGVcIiAqbmdJZj1cIiFzb3J0YWJsZVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sdW1uVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgIDxjbHItZGctY29sdW1uLXNlcGFyYXRvcj48L2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBwcm92aWRlcnM6IFtDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlLCBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSwgQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb2x1bW5dJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLXNvcnRdJzogJ2FyaWFTb3J0JyxcbiAgICByb2xlOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zb3J0OiBTb3J0PFQ+LFxuICAgIGZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbiA9IF9zb3J0LmNoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICAvLyBXZSdyZSBvbmx5IGxpc3RlbmluZyB0byBtYWtlIHN1cmUgd2UgZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjb2x1bW4gZ29lcyBmcm9tIHNvcnRlZCB0byB1bnNvcnRlZFxuICAgICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuICAgICAgICAvLyByZW1vdmVzIHRoZSBzb3J0SWNvbiB3aGVuIGNvbHVtbiBiZWNvbWVzIHVuc29ydGVkXG4gICAgICAgIHRoaXMuc29ydEljb24gPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc29ydCBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIFNpbXBsZSBvYmplY3QgcHJvcGVydHkgc2hvcnRjdXQsIGFjdGl2YXRlcyBib3RoIHNvcnRpbmcgYW5kIGZpbHRlcmluZ1xuICAgICAqIGJhc2VkIG9uIG5hdGl2ZSBjb21wYXJpc29uIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIGl0ZW1zLlxuICAgICAqL1xuICBwcml2YXRlIF9maWVsZDogc3RyaW5nO1xuICBwdWJsaWMgZ2V0IGZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWVsZCcpXG4gIHB1YmxpYyBzZXQgZmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy5jb2xUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlcihmaWVsZCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKGZpZWxkKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgY29sdW1uXG4gICAqL1xuXG4gIHByaXZhdGUgX3NvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuXG4gIHB1YmxpYyBnZXQgc29ydEJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydEJ5JylcbiAgcHVibGljIHNldCBzb3J0QnkoY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBjb21wYXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGNvbXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKHRoaXMuX2ZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fc29ydEJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICAqIFdoYXQgdHlwZSBpcyB0aGlzIGNvbHVtbj8gIFRoaXMgZGVmYXVsdHMgdG8gU1RSSU5HLCBidXQgY2FuIGFsc28gYmVcbiAgICAqIHNldCB0byBOVU1CRVIuICBVbnN1cHBvcnRlZCB0eXBlcyBkZWZhdWx0IHRvIFNUUklORy4gVXNlcnMgY2FuIHNldCBpdFxuICAgICogdmlhIHRoZSBbY2xyRGdDb2xUeXBlXSBpbnB1dCBieSBzZXR0aW5nIGl0IHRvICdzdHJpbmcnIG9yICdudW1iZXInLlxuICAgICovXG5cbiAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byBtYWtlIHRoaXMgYW4gZW51bSBpbiB0aGUgZnV0dXJlXG4gIEBJbnB1dCgnY2xyRGdDb2xUeXBlJykgY29sVHlwZTogJ3N0cmluZycgfCAnbnVtYmVyJyA9ICdzdHJpbmcnO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBzb3J0YWJsZVxuICAgKi9cbiAgcHVibGljIGdldCBzb3J0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZCA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHNvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU29ydGVkJylcbiAgcHVibGljIHNldCBzb3J0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICF0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5zb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1NvcnRlZENoYW5nZScpIHB1YmxpYyBzb3J0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydE9yZGVyOiBDbHJEYXRhZ3JpZFNvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICBwdWJsaWMgZ2V0IHNvcnRPcmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRPcmRlcicpXG4gIHB1YmxpYyBzZXQgc29ydE9yZGVyKHZhbHVlOiBDbHJEYXRhZ3JpZFNvcnRPcmRlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb25seSBpZiB0aGUgaW5jb21pbmcgb3JkZXIgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKHRoaXMuX3NvcnRPcmRlciA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAvLyB0aGUgVW5zb3J0ZWQgY2FzZSBoYXBwZW5zIHdoZW4gdGhlIGN1cnJlbnQgc3RhdGUgaXMgZWl0aGVyIEFzYyBvciBEZXNjXG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICB0aGlzLnNvcnQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgdGhpcy5zb3J0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFyaWFTb3J0KCkge1xuICAgIHN3aXRjaCAodGhpcy5fc29ydE9yZGVyKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTb3J0T3JkZXJDaGFuZ2UnKSBwdWJsaWMgc29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFNvcnRPcmRlcj4oKTtcblxuICAvKipcbiAgICogU29ydHMgdGhlIGRhdGFncmlkIGJhc2VkIG9uIHRoaXMgY29sdW1uXG4gICAqL1xuICBwdWJsaWMgc29ydChyZXZlcnNlPzogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NvcnQudG9nZ2xlKHRoaXMuX3NvcnRCeSwgcmV2ZXJzZSk7XG5cbiAgICAvLyBzZXR0aW5nIHRoZSBwcml2YXRlIHZhcmlhYmxlIHRvIG5vdCByZXRyaWdnZXIgdGhlIHNldHRlciBsb2dpY1xuICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuX3NvcnQucmV2ZXJzZSA/IENsckRhdGFncmlkU29ydE9yZGVyLkRFU0MgOiBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M7XG4gICAgLy8gU2V0cyB0aGUgY29ycmVjdCBpY29uIGZvciBjdXJyZW50IHNvcnQgb3JkZXJcbiAgICB0aGlzLnNvcnRJY29uID0gdGhpcy5fc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDID8gJ2Fycm93IGRvd24nIDogJ2Fycm93JztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgcHVibGljIHNvcnRJY29uO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBmaWx0ZXIgZm9yIHRoaXMgY29sdW1uIHRoYXQgY2FuIGJlIHByb3ZpZGVkIGluIHRoZSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgcHVibGljIGN1c3RvbUZpbHRlciA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ3VzdG9tRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHNldCBwcm9qZWN0ZWRGaWx0ZXIoY3VzdG9tOiBhbnkpIHtcbiAgICBpZiAoY3VzdG9tKSB7XG4gICAgICB0aGlzLmRlbGV0ZUZpbHRlcigpO1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlsdGVyVmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIHx8IHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHVwZGF0ZUZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwpIHtcbiAgICAgIGlmICghbmV3VmFsdWUgfHwgdHlwZW9mIG5ld1ZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBuZXdWYWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICBpZiAoIW5ld1ZhbHVlIHx8ICEobmV3VmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbbnVsbCwgbnVsbF07XG4gICAgICB9XG4gICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID09PSAyICYmIChuZXdWYWx1ZVswXSAhPT0gdGhpcy5maWx0ZXIudmFsdWVbMF0gfHwgbmV3VmFsdWVbMV0gIT09IHRoaXMuZmlsdGVyLnZhbHVlWzFdKSkge1xuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZmlsdGVyVmFsdWUobmV3VmFsdWU6IHN0cmluZyB8IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfHwgdGhpcy5maWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlclZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXIudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckZpbHRlclZhbHVlQ2hhbmdlJykgZmlsdGVyVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDb2x1bW4sIHRoaXMudmNyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgX3ZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JhcHBlZEluamVjdG9yLmdldChXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcikuY29sdW1uVmlldztcbiAgfVxufVxuIl19