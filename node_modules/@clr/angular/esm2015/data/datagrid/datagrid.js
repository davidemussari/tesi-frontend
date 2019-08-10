import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { DisplayModeService } from './providers/display-mode.service';
import { FiltersProvider } from './providers/filters';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { Items } from './providers/items';
import { Page } from './providers/page';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { Sort } from './providers/sort';
import { StateDebouncer } from './providers/state-debouncer.provider';
import { StateProvider } from './providers/state.provider';
import { TableSizeService } from './providers/table-size.service';
import { DatagridRenderOrganizer } from './render/render-organizer';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SelectionType } from './enums/selection-type';
import { ColumnsService } from './providers/columns.service';
let ClrDatagrid = class ClrDatagrid {
    constructor(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, page, commonStrings) {
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.displayMode = displayMode;
        this.renderer = renderer;
        this.el = el;
        this.page = page;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        /**
         * Output emitted whenever the data needs to be refreshed, based on user action or external ones
         */
        this.refresh = new EventEmitter(false);
        this.selectedChanged = new EventEmitter(false);
        this.singleSelectedChanged = new EventEmitter(false);
        this.clrDgSingleSelectionAriaLabel = this.commonStrings.keys.singleSelectionAriaLabel;
        this.clrDgSingleActionableAriaLabel = this.commonStrings.keys.singleActionableAriaLabel;
        this.clrDetailExpandableAriaLabel = this.commonStrings.keys.detailExpandableAriaLabel;
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    /**
     * Freezes the datagrid while data is loading
     */
    get loading() {
        return this.items.loading;
    }
    set loading(value) {
        this.items.loading = value;
    }
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    dataChanged() {
        this.items.refresh();
    }
    /**
     * Array of all selected items
     */
    set selected(value) {
        if (value) {
            this.selection.selectionType = SelectionType.Multi;
        }
        else {
            this.selection.selectionType = SelectionType.None;
        }
        this.selection.updateCurrent(value, false);
    }
    /**
     * Selected item in single-select mode
     */
    set singleSelected(value) {
        this.selection.selectionType = SelectionType.Single;
        // the clrDgSingleSelected is updated in one of two cases:
        // 1. an explicit value is passed
        // 2. is being set to null or undefined, where previously it had a value
        if (value) {
            this.selection.currentSingle = value;
        }
        else if (this.selection.currentSingle) {
            this.selection.currentSingle = null;
        }
    }
    /**
     * @deprecated since 2.0, remove in 3.0
     *
     * Selection/Deselection on row click mode
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * Indicates if all currently displayed items are selected
     */
    get allSelected() {
        return this.selection.isAllSelected();
    }
    /**
     * Selects/deselects all currently displayed items
     * @param value
     */
    set allSelected(value) {
        /*
             * This is a setter but we ignore the value.
             * It's strange, but it lets us have an indeterminate state where only
             * some of the items are selected.
             */
        this.selection.toggleAll();
    }
    ngAfterContentInit() {
        if (!this.items.smart) {
            this.items.all = this.rows.map((row) => row.item);
        }
        this._subscriptions.push(this.rows.changes.subscribe(() => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((row) => row.item);
            }
            this.rows.forEach(row => {
                this._displayedRows.insert(row._view);
            });
        }));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(state => this.refresh.emit(state)), this.selection.change.subscribe(s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit(s);
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit(s);
            }
        }), this.page.change.subscribe(() => {
            this.datagridTable.nativeElement.focus();
        }), 
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe(viewChange => {
            // Remove any projected columns from the projectedDisplayColumns container
            for (let i = this._projectedDisplayColumns.length; i > 0; i--) {
                this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (let i = this._projectedCalculationColumns.length; i > 0; i--) {
                this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (let i = this._calculationRows.length; i > 0; i--) {
                this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (let i = this._displayedRows.length; i > 0; i--) {
                this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach(column => {
                    this._projectedDisplayColumns.insert(column._view);
                });
                this.rows.forEach(row => {
                    this._displayedRows.insert(row._view);
                });
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                this.renderer.addClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach(column => {
                    this._projectedCalculationColumns.insert(column._view);
                });
                this.rows.forEach(row => {
                    this._calculationRows.insert(row._view);
                });
            }
        }));
    }
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
    resize() {
        this.organizer.resize();
    }
};
tslib_1.__decorate([
    Input('clrDgLoading'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagrid.prototype, "loading", null);
tslib_1.__decorate([
    Output('clrDgRefresh'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagrid.prototype, "refresh", void 0);
tslib_1.__decorate([
    ContentChild(ClrDatagridItems, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridItems)
], ClrDatagrid.prototype, "iterator", void 0);
tslib_1.__decorate([
    Input('clrDgSelected'),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], ClrDatagrid.prototype, "selected", null);
tslib_1.__decorate([
    Output('clrDgSelectedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagrid.prototype, "selectedChanged", void 0);
tslib_1.__decorate([
    Input('clrDgSingleSelected'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDatagrid.prototype, "singleSelected", null);
tslib_1.__decorate([
    Output('clrDgSingleSelectedChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagrid.prototype, "singleSelectedChanged", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ClrDatagrid.prototype, "clrDgSingleSelectionAriaLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ClrDatagrid.prototype, "clrDgSingleActionableAriaLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ClrDatagrid.prototype, "clrDetailExpandableAriaLabel", void 0);
tslib_1.__decorate([
    Input('clrDgRowSelection'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagrid.prototype, "rowSelectionMode", null);
tslib_1.__decorate([
    ContentChild(ClrDatagridPlaceholder, { static: false }),
    tslib_1.__metadata("design:type", ClrDatagridPlaceholder)
], ClrDatagrid.prototype, "placeholder", void 0);
tslib_1.__decorate([
    ContentChildren(ClrDatagridColumn),
    tslib_1.__metadata("design:type", QueryList)
], ClrDatagrid.prototype, "columns", void 0);
tslib_1.__decorate([
    ContentChildren(ClrDatagridRow),
    tslib_1.__metadata("design:type", QueryList)
], ClrDatagrid.prototype, "rows", void 0);
tslib_1.__decorate([
    ViewChild('scrollableColumns', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "scrollableColumns", void 0);
tslib_1.__decorate([
    ViewChild('datagridTable', { static: false, read: ElementRef }),
    tslib_1.__metadata("design:type", ElementRef)
], ClrDatagrid.prototype, "datagridTable", void 0);
tslib_1.__decorate([
    ViewChild('projectedDisplayColumns', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_projectedDisplayColumns", void 0);
tslib_1.__decorate([
    ViewChild('projectedCalculationColumns', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_projectedCalculationColumns", void 0);
tslib_1.__decorate([
    ViewChild('displayedRows', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_displayedRows", void 0);
tslib_1.__decorate([
    ViewChild('calculationRows', { static: false, read: ViewContainerRef }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_calculationRows", void 0);
ClrDatagrid = tslib_1.__decorate([
    Component({
        selector: 'clr-datagrid',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid\" #datagrid>\n    <div class=\"datagrid-table-wrapper\">\n      <div role=\"grid\" class=\"datagrid-table\" tabindex=\"-1\" #datagridTable>\n        <div role=\"rowgroup\" class=\"datagrid-header\">\n          <div role=\"row\" class=\"datagrid-row\">\n            <div class=\"datagrid-row-master datagrid-row-flex\">\n              <div class=\"datagrid-row-sticky\">\n                <!-- Sticky elements here -->\n              </div>\n              <div class=\"datagrid-row-scrollable\">\n                <!--header for datagrid where you can select multiple rows -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                            <span class=\"datagrid-column-title\">\n                                <input clrCheckbox type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                       [attr.aria-label]=\"commonStrings.keys.selectAll\">\n                            </span>\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for datagrid where you can select one row only -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\" [attr.aria-label]=\"clrDgSingleSelectionAriaLabel\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for single row action; only displayType if we have at least one actionable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                     *ngIf=\"rowActionService.hasActionableRow\" [attr.aria-label]=\"clrDgSingleActionableAriaLabel\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for carets; only displayType if we have at least one expandable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                     *ngIf=\"expandableRows.hasExpandableRow\" [attr.aria-label]=\"clrDetailExpandableAriaLabel\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <ng-container #projectedDisplayColumns></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-container #displayedRows></ng-container>\n        <!-- Custom placeholder overrides the default empty one -->\n        <ng-content select=\"clr-dg-placeholder\"></ng-content>\n        <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n      </div>\n    </div>\n</div>\n<ng-content select=\"clr-dg-footer\"></ng-content>\n<div class=\"datagrid-spinner\" *ngIf=\"loading\">\n    <clr-spinner clrMedium>Loading</clr-spinner>\n</div>\n\n<div class=\"datagrid-calculation-table\">\n    <div class=\"datagrid-calculation-header\">\n        <ng-container #projectedCalculationColumns></ng-container>\n    </div>\n    <ng-container #calculationRows></ng-container>\n</div>\n",
        providers: [
            Selection,
            Sort,
            FiltersProvider,
            Page,
            Items,
            DatagridRenderOrganizer,
            RowActionService,
            ExpandableRowsCount,
            StateDebouncer,
            StateProvider,
            TableSizeService,
            ColumnsService,
            DisplayModeService,
        ],
        host: { '[class.datagrid-host]': 'true' }
    }),
    tslib_1.__metadata("design:paramtypes", [DatagridRenderOrganizer,
        Items,
        ExpandableRowsCount,
        Selection,
        RowActionService,
        StateProvider,
        DisplayModeService,
        Renderer2,
        ElementRef,
        Page,
        ClrCommonStringsService])
], ClrDatagrid);
export { ClrDatagrid };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUdMLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxD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QURDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3NDQUN0RCxnQkFBZ0I7bURBQUM7QUFFakM7SUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3NDQUN0RCxnQkFBZ0I7cURBQUM7QUEzT3hCLFdBQVc7SUFwQnZCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLHVoSEFBOEI7UUFDOUIsU0FBUyxFQUFFO1lBQ1QsU0FBUztZQUNULElBQUk7WUFDSixlQUFlO1lBQ2YsSUFBSTtZQUNKLEtBQUs7WUFDTCx1QkFBdUI7WUFDdkIsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2Qsa0JBQWtCO1NBQ25CO1FBQ0QsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFO0tBQzFDLENBQUM7NkNBR3FCLHVCQUF1QjtRQUM1QixLQUFLO1FBQ0ksbUJBQW1CO1FBQ3hCLFNBQVM7UUFDRixnQkFBZ0I7UUFDbEIsYUFBYTtRQUNmLGtCQUFrQjtRQUNyQixTQUFTO1FBQ2YsVUFBVTtRQUNSLElBQUk7UUFDSSx1QkFBdUI7R0FacEMsV0FBVyxDQTRPdkI7U0E1T1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uJztcbmltcG9ydCB7IENsckRhdGFncmlkSXRlbXMgfSBmcm9tICcuL2RhdGFncmlkLWl0ZW1zJztcbmltcG9ydCB7IENsckRhdGFncmlkUGxhY2Vob2xkZXIgfSBmcm9tICcuL2RhdGFncmlkLXBsYWNlaG9sZGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkUm93IH0gZnJvbSAnLi9kYXRhZ3JpZC1yb3cnO1xuaW1wb3J0IHsgRGF0YWdyaWREaXNwbGF5TW9kZSB9IGZyb20gJy4vZW51bXMvZGlzcGxheS1tb2RlLmVudW0nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGlzcGxheU1vZGVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGlzcGxheS1tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlUm93c0NvdW50IH0gZnJvbSAnLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vcHJvdmlkZXJzL2l0ZW1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcbmltcG9ydCB7IFN0YXRlUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlcic7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXIvcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kYXRhZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhZ3JpZC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2VsZWN0aW9uLFxuICAgIFNvcnQsXG4gICAgRmlsdGVyc1Byb3ZpZGVyLFxuICAgIFBhZ2UsXG4gICAgSXRlbXMsXG4gICAgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgUm93QWN0aW9uU2VydmljZSxcbiAgICBFeHBhbmRhYmxlUm93c0NvdW50LFxuICAgIFN0YXRlRGVib3VuY2VyLFxuICAgIFN0YXRlUHJvdmlkZXIsXG4gICAgVGFibGVTaXplU2VydmljZSxcbiAgICBDb2x1bW5zU2VydmljZSxcbiAgICBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gIF0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5kYXRhZ3JpZC1ob3N0XSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwdWJsaWMgaXRlbXM6IEl0ZW1zPFQ+LFxuICAgIHB1YmxpYyBleHBhbmRhYmxlUm93czogRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb248VD4sXG4gICAgcHVibGljIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdGF0ZVByb3ZpZGVyOiBTdGF0ZVByb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge31cblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIEZyZWV6ZXMgdGhlIGRhdGFncmlkIHdoaWxlIGRhdGEgaXMgbG9hZGluZ1xuICAgKi9cbiAgcHVibGljIGdldCBsb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmxvYWRpbmc7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnTG9hZGluZycpXG4gIHB1YmxpYyBzZXQgbG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuaXRlbXMubG9hZGluZyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE91dHB1dCBlbWl0dGVkIHdoZW5ldmVyIHRoZSBkYXRhIG5lZWRzIHRvIGJlIHJlZnJlc2hlZCwgYmFzZWQgb24gdXNlciBhY3Rpb24gb3IgZXh0ZXJuYWwgb25lc1xuICAgKi9cbiAgQE91dHB1dCgnY2xyRGdSZWZyZXNoJykgcHVibGljIHJlZnJlc2ggPSBuZXcgRXZlbnRFbWl0dGVyPENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4+KGZhbHNlKTtcblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byByZS10cmlnZ2VyIHRoZSBjb21wdXRhdGlvbiBvZiBkaXNwbGF5ZWQgaXRlbXMgbWFudWFsbHlcbiAgICovXG4gIHB1YmxpYyBkYXRhQ2hhbmdlZCgpIHtcbiAgICB0aGlzLml0ZW1zLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBncmFiIHRoZSBzbWFydCBpdGVyYXRvciBmcm9tIHByb2plY3RlZCBjb250ZW50XG4gICAqL1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkSXRlbXMsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgaXRlcmF0b3I6IENsckRhdGFncmlkSXRlbXM8VD47XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGFsbCBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgQElucHV0KCdjbHJEZ1NlbGVjdGVkJylcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUW10pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLk11bHRpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5Ob25lO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbi51cGRhdGVDdXJyZW50KHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUW10+KGZhbHNlKTtcblxuICAvKipcbiAgICogU2VsZWN0ZWQgaXRlbSBpbiBzaW5nbGUtc2VsZWN0IG1vZGVcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTaW5nbGVTZWxlY3RlZCcpXG4gIHNldCBzaW5nbGVTZWxlY3RlZCh2YWx1ZTogVCkge1xuICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLlNpbmdsZTtcbiAgICAvLyB0aGUgY2xyRGdTaW5nbGVTZWxlY3RlZCBpcyB1cGRhdGVkIGluIG9uZSBvZiB0d28gY2FzZXM6XG4gICAgLy8gMS4gYW4gZXhwbGljaXQgdmFsdWUgaXMgcGFzc2VkXG4gICAgLy8gMi4gaXMgYmVpbmcgc2V0IHRvIG51bGwgb3IgdW5kZWZpbmVkLCB3aGVyZSBwcmV2aW91c2x5IGl0IGhhZCBhIHZhbHVlXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NpbmdsZVNlbGVjdGVkQ2hhbmdlJykgc2luZ2xlU2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUPihmYWxzZSk7XG5cbiAgQElucHV0KCkgY2xyRGdTaW5nbGVTZWxlY3Rpb25BcmlhTGFiZWw6IHN0cmluZyA9IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLnNpbmdsZVNlbGVjdGlvbkFyaWFMYWJlbDtcbiAgQElucHV0KCkgY2xyRGdTaW5nbGVBY3Rpb25hYmxlQXJpYUxhYmVsOiBzdHJpbmcgPSB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5zaW5nbGVBY3Rpb25hYmxlQXJpYUxhYmVsO1xuICBASW5wdXQoKSBjbHJEZXRhaWxFeHBhbmRhYmxlQXJpYUxhYmVsOiBzdHJpbmcgPSB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5kZXRhaWxFeHBhbmRhYmxlQXJpYUxhYmVsO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBzaW5jZSAyLjAsIHJlbW92ZSBpbiAzLjBcbiAgICpcbiAgICogU2VsZWN0aW9uL0Rlc2VsZWN0aW9uIG9uIHJvdyBjbGljayBtb2RlXG4gICAqL1xuICBASW5wdXQoJ2NsckRnUm93U2VsZWN0aW9uJylcbiAgc2V0IHJvd1NlbGVjdGlvbk1vZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNlbGVjdGlvbi5yb3dTZWxlY3Rpb25Nb2RlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGdldCBhbGxTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uaXNBbGxTZWxlY3RlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMvZGVzZWxlY3RzIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW1zXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldCBhbGxTZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIC8qXG4gICAgICAgICAqIFRoaXMgaXMgYSBzZXR0ZXIgYnV0IHdlIGlnbm9yZSB0aGUgdmFsdWUuXG4gICAgICAgICAqIEl0J3Mgc3RyYW5nZSwgYnV0IGl0IGxldHMgdXMgaGF2ZSBhbiBpbmRldGVybWluYXRlIHN0YXRlIHdoZXJlIG9ubHlcbiAgICAgICAgICogc29tZSBvZiB0aGUgaXRlbXMgYXJlIHNlbGVjdGVkLlxuICAgICAgICAgKi9cbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGVBbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXN0b20gcGxhY2Vob2xkZXIgZGV0ZWN0aW9uXG4gICAqL1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkUGxhY2Vob2xkZXIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcGxhY2Vob2xkZXI6IENsckRhdGFncmlkUGxhY2Vob2xkZXI8VD47XG5cbiAgLyoqXG4gICAqIEhpZGVhYmxlIENvbHVtbiBkYXRhIHNvdXJjZSAvIGRldGVjdGlvbi5cbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyRGF0YWdyaWRDb2x1bW4pIHB1YmxpYyBjb2x1bW5zOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDb2x1bW48VD4+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBkYXRhZ3JpZCBpcyB1c2VyLW1hbmFnZWQgd2l0aG91dCB0aGUgc21hcnQgaXRlcmF0b3IsIHdlIGdldCB0aGUgaXRlbXMgZGlzcGxheWVkXG4gICAqIGJ5IHF1ZXJ5aW5nIHRoZSBwcm9qZWN0ZWQgY29udGVudC4gVGhpcyBpcyBuZWVkZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgbW9kZWxzIGN1cnJlbnRseVxuICAgKiBkaXNwbGF5ZWQsIHR5cGljYWxseSBmb3Igc2VsZWN0aW9uLlxuICAgKi9cblxuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkUm93KSByb3dzOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRSb3c8VD4+O1xuICBAVmlld0NoaWxkKCdzY3JvbGxhYmxlQ29sdW1ucycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBzY3JvbGxhYmxlQ29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcblxuICBAVmlld0NoaWxkKCdkYXRhZ3JpZFRhYmxlJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGRhdGFncmlkVGFibGU6IEVsZW1lbnRSZWY7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghdGhpcy5pdGVtcy5zbWFydCkge1xuICAgICAgdGhpcy5pdGVtcy5hbGwgPSB0aGlzLnJvd3MubWFwKChyb3c6IENsckRhdGFncmlkUm93PFQ+KSA9PiByb3cuaXRlbSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5yb3dzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zLnNtYXJ0KSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5hbGwgPSB0aGlzLnJvd3MubWFwKChyb3c6IENsckRhdGFncmlkUm93PFQ+KSA9PiByb3cuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9kaXNwbGF5ZWRSb3dzLmluc2VydChyb3cuX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXIgc2V0dXAgaGFwcGVucyBpbiB0aGUgdmlldyBvZiBzb21lIG9mIG91ciBjb21wb25lbnRzLCBzbyB3ZSB3YWl0IGZvciBpdCB0byBiZSBkb25lIGJlZm9yZSBzdGFydGluZ1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFRPRE86IGRldGVybWluZSBpZiB3ZSBjYW4gZ2V0IHJpZCBvZiBwcm92aWRlciB3aXJpbmcgaW4gdmlldyBpbml0IHNvIHRoYXQgc3Vic2NyaXB0aW9ucyBjYW4gYmUgZG9uZSBlYXJsaWVyXG4gICAgdGhpcy5yZWZyZXNoLmVtaXQodGhpcy5zdGF0ZVByb3ZpZGVyLnN0YXRlKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnN0YXRlUHJvdmlkZXIuY2hhbmdlLnN1YnNjcmliZShzdGF0ZSA9PiB0aGlzLnJlZnJlc2guZW1pdChzdGF0ZSkpLFxuICAgICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlLnN1YnNjcmliZShzID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3RlZENoYW5nZWQuZW1pdCg8VD5zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQuZW1pdCg8VFtdPnMpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHRoaXMucGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5kYXRhZ3JpZFRhYmxlLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0pLFxuICAgICAgLy8gQSBzdWJzY3JpcHRpb24gdGhhdCBsaXN0ZW5zIGZvciBkaXNwbGF5TW9kZSBjaGFuZ2VzIG9uIHRoZSBkYXRhZ3JpZFxuICAgICAgdGhpcy5kaXNwbGF5TW9kZS52aWV3LnN1YnNjcmliZSh2aWV3Q2hhbmdlID0+IHtcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgY29sdW1ucyBmcm9tIHRoZSBwcm9qZWN0ZWREaXNwbGF5Q29sdW1ucyBjb250YWluZXJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMuX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIGNvbHVtbnMgZnJvbSB0aGUgcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zIGNvbnRhaW5lclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCByb3dzIGZyb20gdGhlIGNhbGN1bGF0aW9uUm93cyBjb250YWluZXJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NhbGN1bGF0aW9uUm93cy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9jYWxjdWxhdGlvblJvd3MuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgcm93cyBmcm9tIHRoZSBkaXNwbGF5ZWRSb3dzIGNvbnRhaW5lclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZGlzcGxheWVkUm93cy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9kaXNwbGF5ZWRSb3dzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3Q2hhbmdlID09PSBEYXRhZ3JpZERpc3BsYXlNb2RlLkRJU1BMQVkpIHtcbiAgICAgICAgICAvLyBTZXQgc3RhdGUsIHN0eWxlIGZvciB0aGUgZGF0YWdyaWQgdG8gRElTUExBWSBhbmQgaW5zZXJ0IHJvdyAmIGNvbHVtbnMgaW50byBjb250YWluZXJzXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1jYWxjdWxhdGUtbW9kZScpO1xuICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5pbnNlcnQoY29sdW1uLl92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheWVkUm93cy5pbnNlcnQocm93Ll92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZXQgc3RhdGUsIHN0eWxlIGZvciB0aGUgZGF0YWdyaWQgdG8gQ0FMQ1VMQVRFIGFuZCBpbnNlcnQgcm93ICYgY29sdW1ucyBpbnRvIGNvbnRhaW5lcnNcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLWNhbGN1bGF0ZS1tb2RlJyk7XG4gICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5pbnNlcnQoY29sdW1uLl92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRpb25Sb3dzLmluc2VydChyb3cuX3ZpZXcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgncHJvamVjdGVkRGlzcGxheUNvbHVtbnMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdwcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZGlzcGxheWVkUm93cycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfZGlzcGxheWVkUm93czogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY2FsY3VsYXRpb25Sb3dzJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9jYWxjdWxhdGlvblJvd3M6IFZpZXdDb250YWluZXJSZWY7XG59XG4iXX0=