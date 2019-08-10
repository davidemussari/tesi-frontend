import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridStringFilterImpl } from './datagrid-string-filter-impl';
var DatagridStringFilter = /** @class */ (function (_super) {
    tslib_1.__extends(DatagridStringFilter, _super);
    function DatagridStringFilter(filters, domAdapter) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    DatagridStringFilter_1 = DatagridStringFilter;
    Object.defineProperty(DatagridStringFilter.prototype, "customStringFilter", {
        /**
         * Customizable filter logic based on a search text
         */
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridStringFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridStringFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.filterContainer.openChanged.subscribe(function (open) {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(function () {
                    _this.domAdapter.focus(_this.input.nativeElement);
                });
            }
        });
    };
    Object.defineProperty(DatagridStringFilter.prototype, "value", {
        /**
         * Common setter for the input value
         */
        get: function () {
            return this.filter.value;
        },
        set: function (value) {
            if (!this.filter) {
                return;
            }
            if (!value) {
                value = '';
            }
            if (value !== this.filter.value) {
                this.filter.value = value;
                this.filterValueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridStringFilter.prototype.close = function () {
        this.open = false;
    };
    var DatagridStringFilter_1;
    tslib_1.__decorate([
        Input('clrDgStringFilter'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DatagridStringFilter.prototype, "customStringFilter", null);
    tslib_1.__decorate([
        ViewChild('input', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], DatagridStringFilter.prototype, "input", void 0);
    tslib_1.__decorate([
        ViewChild(ClrDatagridFilter, { static: false }),
        tslib_1.__metadata("design:type", ClrDatagridFilter)
    ], DatagridStringFilter.prototype, "filterContainer", void 0);
    tslib_1.__decorate([
        Input('clrFilterValue'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], DatagridStringFilter.prototype, "value", null);
    tslib_1.__decorate([
        Output('clrFilterValueChange'),
        tslib_1.__metadata("design:type", Object)
    ], DatagridStringFilter.prototype, "filterValueChange", void 0);
    DatagridStringFilter = DatagridStringFilter_1 = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-string-filter',
            providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter_1 }],
            template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <!--\n                Even though this *ngIf looks useless because the filter container already has one,\n                it prevents NgControlStatus and other directives automatically added by Angular\n                on inputs with NgModel from freaking out because of their host binding changing\n                mid-change detection when the input is destroyed.\n            -->\n            <input #input type=\"text\" name=\"search\" [(ngModel)]=\"value\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\" class=\"clr-input\" />\n        </clr-dg-filter>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [FiltersProvider, DomAdapter])
    ], DatagridStringFilter);
    return DatagridStringFilter;
}(DatagridFilterRegistrar));
export { DatagridStringFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtc3RyaW5nLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVoRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWtCekU7SUFBbUQsZ0RBQXVEO0lBRXhHLDhCQUFZLE9BQTJCLEVBQVUsVUFBc0I7UUFBdkUsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUZnRCxnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQWtCdkU7O1dBRUc7UUFDSSxVQUFJLEdBQVksS0FBSyxDQUFDO1FBNkNHLHVCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7O0lBaEV2RSxDQUFDOzZCQUpVLG9CQUFvQjtJQVUvQixzQkFBSSxvREFBa0I7UUFKdEI7O1dBRUc7YUFFSCxVQUNFLEtBQTZGO1lBRTdGLElBQUksS0FBSyxZQUFZLGdCQUFnQixFQUFFO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0gsQ0FBQzs7O09BQUE7SUFrQkQsOENBQWUsR0FBZjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBYTtZQUN2RCxJQUFJLElBQUksRUFBRTtnQkFDUix5RUFBeUU7Z0JBQ3pFLGlCQUFpQjtnQkFDakIsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFLRCxzQkFBVyx1Q0FBSztRQUhoQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ1o7WUFDRCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQzs7O09BYkE7SUFpQk0sb0NBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O0lBOUREO1FBREMsS0FBSyxDQUFDLG1CQUFtQixDQUFDOzs7a0VBUzFCO0lBV0Q7UUFEQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUN4QixVQUFVO3VEQUFDO0lBTXpCO1FBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUN4QixpQkFBaUI7aUVBQUk7SUFvQjdDO1FBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7cURBWXZCO0lBRStCO1FBQS9CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7bUVBQXdDO0lBcEU1RCxvQkFBb0I7UUFoQmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxzQkFBb0IsRUFBRSxDQUFDO1lBQ3pFLFFBQVEsRUFBRSw0ckJBV1A7U0FDSixDQUFDO2lEQUdxQixlQUFlLEVBQXlCLFVBQVU7T0FGNUQsb0JBQW9CLENBeUVoQztJQUFELDJCQUFDO0NBQUEsQUF6RUQsQ0FBbUQsdUJBQXVCLEdBeUV6RTtTQXpFWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVyIH0gZnJvbSAnLi4vLi4vZGF0YWdyaWQtZmlsdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9zdHJpbmctZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIsIFJlZ2lzdGVyZWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuLi8uLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcblxuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIH0gZnJvbSAnLi9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctc3RyaW5nLWZpbHRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogRGF0YWdyaWRTdHJpbmdGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxjbHItZGctZmlsdGVyIFtjbHJEZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCIgWyhjbHJEZ0ZpbHRlck9wZW4pXT1cIm9wZW5cIj5cbiAgICAgICAgICAgIDwhLS1cbiAgICAgICAgICAgICAgICBFdmVuIHRob3VnaCB0aGlzICpuZ0lmIGxvb2tzIHVzZWxlc3MgYmVjYXVzZSB0aGUgZmlsdGVyIGNvbnRhaW5lciBhbHJlYWR5IGhhcyBvbmUsXG4gICAgICAgICAgICAgICAgaXQgcHJldmVudHMgTmdDb250cm9sU3RhdHVzIGFuZCBvdGhlciBkaXJlY3RpdmVzIGF1dG9tYXRpY2FsbHkgYWRkZWQgYnkgQW5ndWxhclxuICAgICAgICAgICAgICAgIG9uIGlucHV0cyB3aXRoIE5nTW9kZWwgZnJvbSBmcmVha2luZyBvdXQgYmVjYXVzZSBvZiB0aGVpciBob3N0IGJpbmRpbmcgY2hhbmdpbmdcbiAgICAgICAgICAgICAgICBtaWQtY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBpbnB1dCBpcyBkZXN0cm95ZWQuXG4gICAgICAgICAgICAtLT5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiICpuZ0lmPVwib3BlblwiXG4gICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cImNsb3NlKClcIiAoa2V5dXAuZXNjYXBlKT1cImNsb3NlKClcIiBjbGFzcz1cImNsci1pbnB1dFwiIC8+XG4gICAgICAgIDwvY2xyLWRnLWZpbHRlcj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFN0cmluZ0ZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBDdXN0b21GaWx0ZXIsIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcikge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1c3RvbWl6YWJsZSBmaWx0ZXIgbG9naWMgYmFzZWQgb24gYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1N0cmluZ0ZpbHRlcicpXG4gIHNldCBjdXN0b21TdHJpbmdGaWx0ZXIoXG4gICAgdmFsdWU6IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlPFQ+IHwgUmVnaXN0ZXJlZEZpbHRlcjxULCBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGw8VD4+XG4gICkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZ2lzdGVyZWRGaWx0ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBkcm9wZG93biBpcyBvcGVuXG4gICAqL1xuICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRoZSBhY3R1YWwgaW5wdXQgZWxlbWVudCB0byBhdXRvbWF0aWNhbGx5IGZvY3VzIG9uIGl0XG4gICAqL1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFdlIGdyYWIgdGhlIENsckRhdGFncmlkRmlsdGVyIHdlIHdyYXAgdG8gcmVnaXN0ZXIgdGhpcyBTdHJpbmdGaWx0ZXIgdG8gaXQuXG4gICAqL1xuICBAVmlld0NoaWxkKENsckRhdGFncmlkRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGZpbHRlckNvbnRhaW5lcjogQ2xyRGF0YWdyaWRGaWx0ZXI8VD47XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZpbHRlckNvbnRhaW5lci5vcGVuQ2hhbmdlZC5zdWJzY3JpYmUoKG9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIHRpbWVvdXQgYmVjYXVzZSBhdCB0aGUgdGltZSB0aGlzIGV4ZWN1dGVzLCB0aGUgaW5wdXQgaXNuJ3RcbiAgICAgICAgLy8gZGlzcGxheWVkIHlldC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb21BZGFwdGVyLmZvY3VzKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBzZXR0ZXIgZm9yIHRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWU7XG4gIH1cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==