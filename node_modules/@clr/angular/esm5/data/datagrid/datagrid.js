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
var ClrDatagrid = /** @class */ (function () {
    function ClrDatagrid(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, page, commonStrings) {
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
    Object.defineProperty(ClrDatagrid.prototype, "loading", {
        /**
         * Freezes the datagrid while data is loading
         */
        get: function () {
            return this.items.loading;
        },
        set: function (value) {
            this.items.loading = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    ClrDatagrid.prototype.dataChanged = function () {
        this.items.refresh();
    };
    Object.defineProperty(ClrDatagrid.prototype, "selected", {
        /**
         * Array of all selected items
         */
        set: function (value) {
            if (value) {
                this.selection.selectionType = SelectionType.Multi;
            }
            else {
                this.selection.selectionType = SelectionType.None;
            }
            this.selection.updateCurrent(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "singleSelected", {
        /**
         * Selected item in single-select mode
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "rowSelectionMode", {
        /**
         * @deprecated since 2.0, remove in 3.0
         *
         * Selection/Deselection on row click mode
         */
        set: function (value) {
            this.selection.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "allSelected", {
        /**
         * Indicates if all currently displayed items are selected
         */
        get: function () {
            return this.selection.isAllSelected();
        },
        /**
         * Selects/deselects all currently displayed items
         * @param value
         */
        set: function (value) {
            /*
                 * This is a setter but we ignore the value.
                 * It's strange, but it lets us have an indeterminate state where only
                 * some of the items are selected.
                 */
            this.selection.toggleAll();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagrid.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.items.smart) {
            this.items.all = this.rows.map(function (row) { return row.item; });
        }
        this._subscriptions.push(this.rows.changes.subscribe(function () {
            if (!_this.items.smart) {
                _this.items.all = _this.rows.map(function (row) { return row.item; });
            }
            _this.rows.forEach(function (row) {
                _this._displayedRows.insert(row._view);
            });
        }));
    };
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ClrDatagrid.prototype.ngAfterViewInit = function () {
        var _this = this;
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(function (state) { return _this.refresh.emit(state); }), this.selection.change.subscribe(function (s) {
            if (_this.selection.selectionType === SelectionType.Single) {
                _this.singleSelectedChanged.emit(s);
            }
            else if (_this.selection.selectionType === SelectionType.Multi) {
                _this.selectedChanged.emit(s);
            }
        }), this.page.change.subscribe(function () {
            _this.datagridTable.nativeElement.focus();
        }), 
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe(function (viewChange) {
            // Remove any projected columns from the projectedDisplayColumns container
            for (var i = _this._projectedDisplayColumns.length; i > 0; i--) {
                _this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (var i = _this._projectedCalculationColumns.length; i > 0; i--) {
                _this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (var i = _this._calculationRows.length; i > 0; i--) {
                _this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (var i = _this._displayedRows.length; i > 0; i--) {
                _this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach(function (column) {
                    _this._projectedDisplayColumns.insert(column._view);
                });
                _this.rows.forEach(function (row) {
                    _this._displayedRows.insert(row._view);
                });
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach(function (column) {
                    _this._projectedCalculationColumns.insert(column._view);
                });
                _this.rows.forEach(function (row) {
                    _this._calculationRows.insert(row._view);
                });
            }
        }));
    };
    ClrDatagrid.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDatagrid.prototype.resize = function () {
        this.organizer.resize();
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
    return ClrDatagrid;
}());
export { ClrDatagrid };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUdMLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxD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QUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzswQ0FDdEQsZ0JBQWdCO3FFQUFDO0lBRS9DO1FBREMsU0FBUyxDQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUM7MENBQ3RELGdCQUFnQjt1REFBQztJQUVqQztRQURDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUM7MENBQ3RELGdCQUFnQjt5REFBQztJQTNPeEIsV0FBVztRQXBCdkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsdWhIQUE4QjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsU0FBUztnQkFDVCxJQUFJO2dCQUNKLGVBQWU7Z0JBQ2YsSUFBSTtnQkFDSixLQUFLO2dCQUNMLHVCQUF1QjtnQkFDdkIsZ0JBQWdCO2dCQUNoQixtQkFBbUI7Z0JBQ25CLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixnQkFBZ0I7Z0JBQ2hCLGNBQWM7Z0JBQ2Qsa0JBQWtCO2FBQ25CO1lBQ0QsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFO1NBQzFDLENBQUM7aURBR3FCLHVCQUF1QjtZQUM1QixLQUFLO1lBQ0ksbUJBQW1CO1lBQ3hCLFNBQVM7WUFDRixnQkFBZ0I7WUFDbEIsYUFBYTtZQUNmLGtCQUFrQjtZQUNyQixTQUFTO1lBQ2YsVUFBVTtZQUNSLElBQUk7WUFDSSx1QkFBdUI7T0FacEMsV0FBVyxDQTRPdkI7SUFBRCxrQkFBQztDQUFBLEFBNU9ELElBNE9DO1NBNU9ZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW4gfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEl0ZW1zIH0gZnJvbSAnLi9kYXRhZ3JpZC1pdGVtcyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyIH0gZnJvbSAnLi9kYXRhZ3JpZC1wbGFjZWhvbGRlcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFJvdyB9IGZyb20gJy4vZGF0YWdyaWQtcm93JztcbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuL2VudW1zL2Rpc3BsYXktbW9kZS5lbnVtJztcbmltcG9ydCB7IENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRXhwYW5kYWJsZVJvd3NDb3VudCB9IGZyb20gJy4vcHJvdmlkZXJzL2dsb2JhbC1leHBhbmRhYmxlLXJvd3MnO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuL3Byb3ZpZGVycy9pdGVtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9wcm92aWRlcnMvc29ydCc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vcHJvdmlkZXJzL3N0YXRlLWRlYm91bmNlci5wcm92aWRlcic7XG5pbXBvcnQgeyBTdGF0ZVByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RhdGUucHJvdmlkZXInO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YWdyaWQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIFNlbGVjdGlvbixcbiAgICBTb3J0LFxuICAgIEZpbHRlcnNQcm92aWRlcixcbiAgICBQYWdlLFxuICAgIEl0ZW1zLFxuICAgIERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIFJvd0FjdGlvblNlcnZpY2UsXG4gICAgRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBTdGF0ZURlYm91bmNlcixcbiAgICBTdGF0ZVByb3ZpZGVyLFxuICAgIFRhYmxlU2l6ZVNlcnZpY2UsXG4gICAgQ29sdW1uc1NlcnZpY2UsXG4gICAgRGlzcGxheU1vZGVTZXJ2aWNlLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuZGF0YWdyaWQtaG9zdF0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHVibGljIGl0ZW1zOiBJdGVtczxUPixcbiAgICBwdWJsaWMgZXhwYW5kYWJsZVJvd3M6IEV4cGFuZGFibGVSb3dzQ291bnQsXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uPFQ+LFxuICAgIHB1YmxpYyByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RhdGVQcm92aWRlcjogU3RhdGVQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHt9XG5cbiAgLyogcmVmZXJlbmNlIHRvIHRoZSBlbnVtIHNvIHRoYXQgdGVtcGxhdGUgY2FuIGFjY2VzcyAqL1xuICBwdWJsaWMgU0VMRUNUSU9OX1RZUEUgPSBTZWxlY3Rpb25UeXBlO1xuXG4gIC8qKlxuICAgKiBGcmVlemVzIHRoZSBkYXRhZ3JpZCB3aGlsZSBkYXRhIGlzIGxvYWRpbmdcbiAgICovXG4gIHB1YmxpYyBnZXQgbG9hZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5sb2FkaW5nO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0xvYWRpbmcnKVxuICBwdWJsaWMgc2V0IGxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLml0ZW1zLmxvYWRpbmcgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXRwdXQgZW1pdHRlZCB3aGVuZXZlciB0aGUgZGF0YSBuZWVkcyB0byBiZSByZWZyZXNoZWQsIGJhc2VkIG9uIHVzZXIgYWN0aW9uIG9yIGV4dGVybmFsIG9uZXNcbiAgICovXG4gIEBPdXRwdXQoJ2NsckRnUmVmcmVzaCcpIHB1YmxpYyByZWZyZXNoID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlPFQ+PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gcmUtdHJpZ2dlciB0aGUgY29tcHV0YXRpb24gb2YgZGlzcGxheWVkIGl0ZW1zIG1hbnVhbGx5XG4gICAqL1xuICBwdWJsaWMgZGF0YUNoYW5nZWQoKSB7XG4gICAgdGhpcy5pdGVtcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogV2UgZ3JhYiB0aGUgc21hcnQgaXRlcmF0b3IgZnJvbSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZEl0ZW1zLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGl0ZXJhdG9yOiBDbHJEYXRhZ3JpZEl0ZW1zPFQ+O1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBhbGwgc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTZWxlY3RlZCcpXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogVFtdKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5NdWx0aTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvblR5cGUuTm9uZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3Rpb24udXBkYXRlQ3VycmVudCh2YWx1ZSwgZmFsc2UpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTZWxlY3RlZENoYW5nZScpIHNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFNlbGVjdGVkIGl0ZW0gaW4gc2luZ2xlLXNlbGVjdCBtb2RlXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU2luZ2xlU2VsZWN0ZWQnKVxuICBzZXQgc2luZ2xlU2VsZWN0ZWQodmFsdWU6IFQpIHtcbiAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5TaW5nbGU7XG4gICAgLy8gdGhlIGNsckRnU2luZ2xlU2VsZWN0ZWQgaXMgdXBkYXRlZCBpbiBvbmUgb2YgdHdvIGNhc2VzOlxuICAgIC8vIDEuIGFuIGV4cGxpY2l0IHZhbHVlIGlzIHBhc3NlZFxuICAgIC8vIDIuIGlzIGJlaW5nIHNldCB0byBudWxsIG9yIHVuZGVmaW5lZCwgd2hlcmUgcHJldmlvdXNseSBpdCBoYWQgYSB2YWx1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY3VycmVudFNpbmdsZSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb24uY3VycmVudFNpbmdsZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY3VycmVudFNpbmdsZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTaW5nbGVTZWxlY3RlZENoYW5nZScpIHNpbmdsZVNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oZmFsc2UpO1xuXG4gIEBJbnB1dCgpIGNsckRnU2luZ2xlU2VsZWN0aW9uQXJpYUxhYmVsOiBzdHJpbmcgPSB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5zaW5nbGVTZWxlY3Rpb25BcmlhTGFiZWw7XG4gIEBJbnB1dCgpIGNsckRnU2luZ2xlQWN0aW9uYWJsZUFyaWFMYWJlbDogc3RyaW5nID0gdGhpcy5jb21tb25TdHJpbmdzLmtleXMuc2luZ2xlQWN0aW9uYWJsZUFyaWFMYWJlbDtcbiAgQElucHV0KCkgY2xyRGV0YWlsRXhwYW5kYWJsZUFyaWFMYWJlbDogc3RyaW5nID0gdGhpcy5jb21tb25TdHJpbmdzLmtleXMuZGV0YWlsRXhwYW5kYWJsZUFyaWFMYWJlbDtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLCByZW1vdmUgaW4gMy4wXG4gICAqXG4gICAqIFNlbGVjdGlvbi9EZXNlbGVjdGlvbiBvbiByb3cgY2xpY2sgbW9kZVxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1Jvd1NlbGVjdGlvbicpXG4gIHNldCByb3dTZWxlY3Rpb25Nb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24ucm93U2VsZWN0aW9uTW9kZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgYWxsU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLmlzQWxsU2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzL2Rlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXQgYWxsU2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAvKlxuICAgICAgICAgKiBUaGlzIGlzIGEgc2V0dGVyIGJ1dCB3ZSBpZ25vcmUgdGhlIHZhbHVlLlxuICAgICAgICAgKiBJdCdzIHN0cmFuZ2UsIGJ1dCBpdCBsZXRzIHVzIGhhdmUgYW4gaW5kZXRlcm1pbmF0ZSBzdGF0ZSB3aGVyZSBvbmx5XG4gICAgICAgICAqIHNvbWUgb2YgdGhlIGl0ZW1zIGFyZSBzZWxlY3RlZC5cbiAgICAgICAgICovXG4gICAgdGhpcy5zZWxlY3Rpb24udG9nZ2xlQWxsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VzdG9tIHBsYWNlaG9sZGVyIGRldGVjdGlvblxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyPFQ+O1xuXG4gIC8qKlxuICAgKiBIaWRlYWJsZSBDb2x1bW4gZGF0YSBzb3VyY2UgLyBkZXRlY3Rpb24uXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ29sdW1uKSBwdWJsaWMgY29sdW1uczogUXVlcnlMaXN0PENsckRhdGFncmlkQ29sdW1uPFQ+PjtcblxuICAvKipcbiAgICogV2hlbiB0aGUgZGF0YWdyaWQgaXMgdXNlci1tYW5hZ2VkIHdpdGhvdXQgdGhlIHNtYXJ0IGl0ZXJhdG9yLCB3ZSBnZXQgdGhlIGl0ZW1zIGRpc3BsYXllZFxuICAgKiBieSBxdWVyeWluZyB0aGUgcHJvamVjdGVkIGNvbnRlbnQuIFRoaXMgaXMgbmVlZGVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG1vZGVscyBjdXJyZW50bHlcbiAgICogZGlzcGxheWVkLCB0eXBpY2FsbHkgZm9yIHNlbGVjdGlvbi5cbiAgICovXG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZFJvdykgcm93czogUXVlcnlMaXN0PENsckRhdGFncmlkUm93PFQ+PjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYWJsZUNvbHVtbnMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgc2Nyb2xsYWJsZUNvbHVtbnM6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQFZpZXdDaGlsZCgnZGF0YWdyaWRUYWJsZScsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogRWxlbWVudFJlZiB9KVxuICBkYXRhZ3JpZFRhYmxlOiBFbGVtZW50UmVmO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXRlbXMuc21hcnQpIHtcbiAgICAgIHRoaXMuaXRlbXMuYWxsID0gdGhpcy5yb3dzLm1hcCgocm93OiBDbHJEYXRhZ3JpZFJvdzxUPikgPT4gcm93Lml0ZW0pO1xuICAgIH1cblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucm93cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pdGVtcy5zbWFydCkge1xuICAgICAgICAgIHRoaXMuaXRlbXMuYWxsID0gdGhpcy5yb3dzLm1hcCgocm93OiBDbHJEYXRhZ3JpZFJvdzxUPikgPT4gcm93Lml0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgdGhpcy5fZGlzcGxheWVkUm93cy5pbnNlcnQocm93Ll92aWV3KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogT3VyIHNldHVwIGhhcHBlbnMgaW4gdGhlIHZpZXcgb2Ygc29tZSBvZiBvdXIgY29tcG9uZW50cywgc28gd2Ugd2FpdCBmb3IgaXQgdG8gYmUgZG9uZSBiZWZvcmUgc3RhcnRpbmdcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUT0RPOiBkZXRlcm1pbmUgaWYgd2UgY2FuIGdldCByaWQgb2YgcHJvdmlkZXIgd2lyaW5nIGluIHZpZXcgaW5pdCBzbyB0aGF0IHN1YnNjcmlwdGlvbnMgY2FuIGJlIGRvbmUgZWFybGllclxuICAgIHRoaXMucmVmcmVzaC5lbWl0KHRoaXMuc3RhdGVQcm92aWRlci5zdGF0ZSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zdGF0ZVByb3ZpZGVyLmNoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5yZWZyZXNoLmVtaXQoc3RhdGUpKSxcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNoYW5nZS5zdWJzY3JpYmUocyA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgICAgIHRoaXMuc2luZ2xlU2VsZWN0ZWRDaGFuZ2VkLmVtaXQoPFQ+cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2VkLmVtaXQoPFRbXT5zKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB0aGlzLnBhZ2UuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGF0YWdyaWRUYWJsZS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9KSxcbiAgICAgIC8vIEEgc3Vic2NyaXB0aW9uIHRoYXQgbGlzdGVucyBmb3IgZGlzcGxheU1vZGUgY2hhbmdlcyBvbiB0aGUgZGF0YWdyaWRcbiAgICAgIHRoaXMuZGlzcGxheU1vZGUudmlldy5zdWJzY3JpYmUodmlld0NoYW5nZSA9PiB7XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIGNvbHVtbnMgZnJvbSB0aGUgcHJvamVjdGVkRGlzcGxheUNvbHVtbnMgY29udGFpbmVyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCBjb2x1bW5zIGZyb20gdGhlIHByb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucyBjb250YWluZXJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgcm93cyBmcm9tIHRoZSBjYWxjdWxhdGlvblJvd3MgY29udGFpbmVyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9jYWxjdWxhdGlvblJvd3MubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fY2FsY3VsYXRpb25Sb3dzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIHJvd3MgZnJvbSB0aGUgZGlzcGxheWVkUm93cyBjb250YWluZXJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2Rpc3BsYXllZFJvd3MubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fZGlzcGxheWVkUm93cy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlld0NoYW5nZSA9PT0gRGF0YWdyaWREaXNwbGF5TW9kZS5ESVNQTEFZKSB7XG4gICAgICAgICAgLy8gU2V0IHN0YXRlLCBzdHlsZSBmb3IgdGhlIGRhdGFncmlkIHRvIERJU1BMQVkgYW5kIGluc2VydCByb3cgJiBjb2x1bW5zIGludG8gY29udGFpbmVyc1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtY2FsY3VsYXRlLW1vZGUnKTtcbiAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgdGhpcy5fcHJvamVjdGVkRGlzcGxheUNvbHVtbnMuaW5zZXJ0KGNvbHVtbi5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXllZFJvd3MuaW5zZXJ0KHJvdy5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2V0IHN0YXRlLCBzdHlsZSBmb3IgdGhlIGRhdGFncmlkIHRvIENBTENVTEFURSBhbmQgaW5zZXJ0IHJvdyAmIGNvbHVtbnMgaW50byBjb250YWluZXJzXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1jYWxjdWxhdGUtbW9kZScpO1xuICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMuaW5zZXJ0KGNvbHVtbi5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0aW9uUm93cy5pbnNlcnQocm93Ll92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlcyBhbmQgcXVlcmllcyBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9yZ2FuaXplci5yZXNpemUoKTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3Byb2plY3RlZERpc3BsYXlDb2x1bW5zJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9wcm9qZWN0ZWREaXNwbGF5Q29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgncHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Rpc3BsYXllZFJvd3MnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX2Rpc3BsYXllZFJvd3M6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NhbGN1bGF0aW9uUm93cycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfY2FsY3VsYXRpb25Sb3dzOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19