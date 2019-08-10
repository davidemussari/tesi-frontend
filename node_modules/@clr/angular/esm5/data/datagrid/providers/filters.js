import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Page } from './page';
import { StateDebouncer } from './state-debouncer.provider';
var FiltersProvider = /** @class */ (function () {
    function FiltersProvider(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        /**
         * This subject is the list of filters that changed last, not the whole list.
         * We emit a list rather than just one filter to allow batch changes to several at once.
         */
        this._change = new Subject();
        /**
         * List of all filters, whether they're active or not
         */
        this._all = [];
    }
    Object.defineProperty(FiltersProvider.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if at least one filter is currently active
     */
    FiltersProvider.prototype.hasActiveFilters = function () {
        var e_1, _a;
        try {
            // We do not use getActiveFilters() because this function will be called much more often
            // and stopping the loop early might be relevant.
            for (var _b = tslib_1.__values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive()) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * Returns a list of all currently active filters
     */
    FiltersProvider.prototype.getActiveFilters = function () {
        var e_2, _a;
        var ret = [];
        try {
            for (var _b = tslib_1.__values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive()) {
                    ret.push(filter);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    /**
     * Registers a filter, and returns a deregistration function
     */
    FiltersProvider.prototype.add = function (filter) {
        var _this = this;
        var index = this._all.length;
        var subscription = filter.changes.subscribe(function () { return _this.resetPageAndEmitFilterChange([filter]); });
        var hasUnregistered = false;
        var registered = new RegisteredFilter(filter, function () {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            _this._all.splice(index, 1);
            if (filter.isActive()) {
                _this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
        this._all.push(registered);
        if (filter.isActive()) {
            this.resetPageAndEmitFilterChange([filter]);
        }
        return registered;
    };
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    FiltersProvider.prototype.accepts = function (item) {
        var e_3, _a;
        try {
            for (var _b = tslib_1.__values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive() && !filter.accepts(item)) {
                    return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return true;
    };
    FiltersProvider.prototype.resetPageAndEmitFilterChange = function (filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    };
    FiltersProvider = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Page, StateDebouncer])
    ], FiltersProvider);
    return FiltersProvider;
}());
export { FiltersProvider };
var RegisteredFilter = /** @class */ (function () {
    function RegisteredFilter(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
    return RegisteredFilter;
}());
export { RegisteredFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL2ZpbHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHNUQ7SUFDRSx5QkFBb0IsS0FBVyxFQUFVLGNBQThCO1FBQW5ELFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDdkU7OztXQUdHO1FBQ0ssWUFBTyxHQUFHLElBQUksT0FBTyxFQUFtQyxDQUFDO1FBTWpFOztXQUVHO1FBQ0ssU0FBSSxHQUF5RCxFQUFFLENBQUM7SUFkRSxDQUFDO0lBTzNFLHNCQUFXLG1DQUFNO1FBRGpCLHFGQUFxRjthQUNyRjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQU9EOztPQUVHO0lBQ0ksMENBQWdCLEdBQXZCOzs7WUFDRSx3RkFBd0Y7WUFDeEYsaURBQWlEO1lBQ2pELEtBQXlCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFBLGdCQUFBLDRCQUFFO2dCQUF2QixJQUFBLHdCQUFNO2dCQUNqQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQy9CLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMENBQWdCLEdBQXZCOztRQUNFLElBQU0sR0FBRyxH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UmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsdGVyc1Byb3ZpZGVyPFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBzdGF0ZURlYm91bmNlcjogU3RhdGVEZWJvdW5jZXIpIHt9XG4gIC8qKlxuICAgKiBUaGlzIHN1YmplY3QgaXMgdGhlIGxpc3Qgb2YgZmlsdGVycyB0aGF0IGNoYW5nZWQgbGFzdCwgbm90IHRoZSB3aG9sZSBsaXN0LlxuICAgKiBXZSBlbWl0IGEgbGlzdCByYXRoZXIgdGhhbiBqdXN0IG9uZSBmaWx0ZXIgdG8gYWxsb3cgYmF0Y2ggY2hhbmdlcyB0byBzZXZlcmFsIGF0IG9uY2UuXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPltdPigpO1xuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8Q2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBhbGwgZmlsdGVycywgd2hldGhlciB0aGV5J3JlIGFjdGl2ZSBvciBub3RcbiAgICovXG4gIHByaXZhdGUgX2FsbDogUmVnaXN0ZXJlZEZpbHRlcjxULCBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPj5bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhdCBsZWFzdCBvbmUgZmlsdGVyIGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICovXG4gIHB1YmxpYyBoYXNBY3RpdmVGaWx0ZXJzKCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGRvIG5vdCB1c2UgZ2V0QWN0aXZlRmlsdGVycygpIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBtdWNoIG1vcmUgb2Z0ZW5cbiAgICAvLyBhbmQgc3RvcHBpbmcgdGhlIGxvb3AgZWFybHkgbWlnaHQgYmUgcmVsZXZhbnQuXG4gICAgZm9yIChjb25zdCB7IGZpbHRlciB9IG9mIHRoaXMuX2FsbCkge1xuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBjdXJyZW50bHkgYWN0aXZlIGZpbHRlcnNcbiAgICovXG4gIHB1YmxpYyBnZXRBY3RpdmVGaWx0ZXJzKCk6IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+W10ge1xuICAgIGNvbnN0IHJldDogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgeyBmaWx0ZXIgfSBvZiB0aGlzLl9hbGwpIHtcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgcmV0LnB1c2goZmlsdGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBmaWx0ZXIsIGFuZCByZXR1cm5zIGEgZGVyZWdpc3RyYXRpb24gZnVuY3Rpb25cbiAgICovXG4gIHB1YmxpYyBhZGQ8RiBleHRlbmRzIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PihmaWx0ZXI6IEYpOiBSZWdpc3RlcmVkRmlsdGVyPFQsIEY+IHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2FsbC5sZW5ndGg7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gZmlsdGVyLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVzZXRQYWdlQW5kRW1pdEZpbHRlckNoYW5nZShbZmlsdGVyXSkpO1xuICAgIGxldCBoYXNVbnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICBjb25zdCByZWdpc3RlcmVkID0gbmV3IFJlZ2lzdGVyZWRGaWx0ZXIoZmlsdGVyLCAoKSA9PiB7XG4gICAgICBpZiAoaGFzVW5yZWdpc3RlcmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fYWxsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBpZiAoZmlsdGVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgdGhpcy5yZXNldFBhZ2VBbmRFbWl0RmlsdGVyQ2hhbmdlKFtdKTtcbiAgICAgIH1cbiAgICAgIGhhc1VucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgfSk7XG4gICAgdGhpcy5fYWxsLnB1c2gocmVnaXN0ZXJlZCk7XG4gICAgaWYgKGZpbHRlci5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLnJlc2V0UGFnZUFuZEVtaXRGaWx0ZXJDaGFuZ2UoW2ZpbHRlcl0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGFuIGl0ZW0gaWYgaXQgaXMgYWNjZXB0ZWQgYnkgYWxsIGN1cnJlbnRseSBhY3RpdmUgZmlsdGVyc1xuICAgKi9cbiAgcHVibGljIGFjY2VwdHMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgeyBmaWx0ZXIgfSBvZiB0aGlzLl9hbGwpIHtcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmlzQWN0aXZlKCkgJiYgIWZpbHRlci5hY2NlcHRzKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UGFnZUFuZEVtaXRGaWx0ZXJDaGFuZ2UoZmlsdGVyczogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXSkge1xuICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAvLyBmaWx0ZXJpbmcgbWF5IGNoYW5nZSB0aGUgcGFnZSBudW1iZXIgc3VjaCB0aGF0IGN1cnJlbnQgcGFnZSBudW1iZXIgZG9lc24ndCBleGlzdCBpbiB0aGUgZmlsdGVyZWQgZGF0YXNldC5cbiAgICAvLyBTbyBoZXJlIHdlIGFsd2F5cyBzZXQgdGhlIGN1cnJlbnQgcGFnZSB0byAxIHNvIHRoYXQgaXQnbGwgZmV0Y2ggZmlyc3QgcGFnZSdzIGRhdGEgd2l0aCB0aGUgZ2l2ZW4gZmlsdGVyLlxuICAgIHRoaXMuX3BhZ2UuY3VycmVudCA9IDE7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQoZmlsdGVycyk7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyZWRGaWx0ZXI8VCwgRiBleHRlbmRzIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEYsIHB1YmxpYyB1bnJlZ2lzdGVyOiAoKSA9PiB2b2lkKSB7fVxufVxuIl19