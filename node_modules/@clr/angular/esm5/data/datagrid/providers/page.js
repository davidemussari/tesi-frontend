import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateDebouncer } from './state-debouncer.provider';
var Page = /** @class */ (function () {
    function Page(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this.activated = false;
        /**
         * Page size, a value of 0 means no pagination
         */
        this._size = 0;
        /**
         * The Observable that lets other classes subscribe to page changes
         */
        this._change = new Subject();
        this._sizeChange = new Subject();
        /**
         * Current page
         */
        this._current = 1;
    }
    Object.defineProperty(Page.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            var oldSize = this._size;
            if (size !== oldSize) {
                this.stateDebouncer.changeStart();
                this._size = size;
                if (size === 0) {
                    this._current = 1;
                }
                else {
                    // Yeap. That's the formula to keep the first item from the old page still
                    // displayed in the new one.
                    this._current = Math.floor(oldSize / size * (this._current - 1)) + 1;
                }
                // We always emit an event even if the current page index didn't change, because
                // the size changing means the items inside the page are different
                this._change.next(this._current);
                this._sizeChange.next(this._size);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalItems", {
        get: function () {
            return this._totalItems || 0; // remains 0 if not set to avoid breaking change
        },
        set: function (total) {
            this._totalItems = total;
            // If we have less items than before, we might need to change the current page
            if (this.current > this.last) {
                this.current = this.last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "last", {
        get: function () {
            if (this._last) {
                return this._last;
            }
            // If the last page isn't known, we compute it from the last item's index
            if (this.size > 0 && this.totalItems) {
                return Math.ceil(this.totalItems / this.size);
            }
            return 1;
        },
        set: function (page) {
            this._last = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sizeChange", {
        get: function () {
            return this._sizeChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (page) {
            if (page !== this._current) {
                this.stateDebouncer.changeStart();
                this._current = page;
                this._change.next(page);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    Page.prototype.previous = function () {
        if (this.current > 1) {
            this.current--;
        }
    };
    /**
     * Moves to the next page if it exists
     */
    Page.prototype.next = function () {
        if (this.current < this.last) {
            this.current++;
        }
    };
    Object.defineProperty(Page.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            if (this._totalItems === 0) {
                return -1;
            }
            if (this.size === 0) {
                return 0;
            }
            return (this.current - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            if (this._totalItems === 0) {
                return -1;
            }
            if (this.size === 0) {
                return this.totalItems - 1;
            }
            var lastInPage = this.current * this.size - 1;
            if (this.totalItems) {
                lastInPage = Math.min(lastInPage, this.totalItems - 1);
            }
            return lastInPage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the page size to 0
     */
    Page.prototype.resetPageSize = function () {
        this.size = 0;
    };
    Page = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [StateDebouncer])
    ], Page);
    return Page;
}());
export { Page };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzVEO0lBQ0UsY0FBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRTNDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFekI7O1dBRUc7UUFDSyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBeURsQjs7V0FFRztRQUNLLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTWhDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQU01Qzs7V0FFRztRQUNLLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFsRmdDLENBQUM7SUFRdEQsc0JBQVcsc0JBQUk7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBQ0QsVUFBZ0IsSUFBWTtZQUMxQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsMEVBQTBFO29CQUMxRSw0QkFBNEI7b0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUss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QUMsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLENBQUM7YUFDVjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVywwQkFBUTtRQUhuQjs7V0FFRzthQUNIO1lBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNYO1lBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUM1QjtZQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN4RDtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7SUFDSSw0QkFBYSxHQUFwQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUF2SlUsSUFBSTtRQURoQixVQUFVLEVBQUU7aURBRXlCLGNBQWM7T0FEdkMsSUFBSSxDQXdKaEI7SUFBRCxXQUFDO0NBQUEsQUF4SkQsSUF3SkM7U0F4SlksSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVEZWJvdW5jZXI6IFN0YXRlRGVib3VuY2VyKSB7fVxuXG4gIHB1YmxpYyBhY3RpdmF0ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogUGFnZSBzaXplLCBhIHZhbHVlIG9mIDAgbWVhbnMgbm8gcGFnaW5hdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfc2l6ZSA9IDA7XG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG4gIHB1YmxpYyBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBvbGRTaXplID0gdGhpcy5fc2l6ZTtcbiAgICBpZiAoc2l6ZSAhPT0gb2xkU2l6ZSkge1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFllYXAuIFRoYXQncyB0aGUgZm9ybXVsYSB0byBrZWVwIHRoZSBmaXJzdCBpdGVtIGZyb20gdGhlIG9sZCBwYWdlIHN0aWxsXG4gICAgICAgIC8vIGRpc3BsYXllZCBpbiB0aGUgbmV3IG9uZS5cbiAgICAgICAgdGhpcy5fY3VycmVudCA9IE1hdGguZmxvb3Iob2xkU2l6ZSAvIHNpemUgKiAodGhpcy5fY3VycmVudCAtIDEpKSArIDE7XG4gICAgICB9XG4gICAgICAvLyBXZSBhbHdheXMgZW1pdCBhbiBldmVudCBldmVuIGlmIHRoZSBjdXJyZW50IHBhZ2UgaW5kZXggZGlkbid0IGNoYW5nZSwgYmVjYXVzZVxuICAgICAgLy8gdGhlIHNpemUgY2hhbmdpbmcgbWVhbnMgdGhlIGl0ZW1zIGluc2lkZSB0aGUgcGFnZSBhcmUgZGlmZmVyZW50XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLl9jdXJyZW50KTtcbiAgICAgIHRoaXMuX3NpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwcml2YXRlIF90b3RhbEl0ZW1zPzogbnVtYmVyO1xuICBwdWJsaWMgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxJdGVtcyB8fCAwOyAvLyByZW1haW5zIDAgaWYgbm90IHNldCB0byBhdm9pZCBicmVha2luZyBjaGFuZ2VcbiAgfVxuICBwdWJsaWMgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3RvdGFsSXRlbXMgPSB0b3RhbDtcbiAgICAvLyBJZiB3ZSBoYXZlIGxlc3MgaXRlbXMgdGhhbiBiZWZvcmUsIHdlIG1pZ2h0IG5lZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IHBhZ2VcbiAgICBpZiAodGhpcy5jdXJyZW50ID4gdGhpcy5sYXN0KSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmxhc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfbGFzdDogbnVtYmVyO1xuICBwdWJsaWMgZ2V0IGxhc3QoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fbGFzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gICAgfVxuICAgIC8vIElmIHRoZSBsYXN0IHBhZ2UgaXNuJ3Qga25vd24sIHdlIGNvbXB1dGUgaXQgZnJvbSB0aGUgbGFzdCBpdGVtJ3MgaW5kZXhcbiAgICBpZiAodGhpcy5zaXplID4gMCAmJiB0aGlzLnRvdGFsSXRlbXMpIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5zaXplKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcHVibGljIHNldCBsYXN0KHBhZ2U6IG51bWJlcikge1xuICAgIHRoaXMuX2xhc3QgPSBwYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBwYWdlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zaXplQ2hhbmdlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIHB1YmxpYyBnZXQgc2l6ZUNoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9zaXplQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudCA9IDE7XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudChwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSAhPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgICAgdGhpcy5fY3VycmVudCA9IHBhZ2U7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dChwYWdlKTtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50ID4gMSkge1xuICAgICAgdGhpcy5jdXJyZW50LS07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50IDwgdGhpcy5sYXN0KSB7XG4gICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDAsIC0xIGlmIG5vbmUgZGlzcGxheWVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl90b3RhbEl0ZW1zID09PSAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5jdXJyZW50IC0gMSkgKiB0aGlzLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMCwgLTEgaWYgbm9uZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fdG90YWxJdGVtcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnRvdGFsSXRlbXMgLSAxO1xuICAgIH1cbiAgICBsZXQgbGFzdEluUGFnZSA9IHRoaXMuY3VycmVudCAqIHRoaXMuc2l6ZSAtIDE7XG4gICAgaWYgKHRoaXMudG90YWxJdGVtcykge1xuICAgICAgbGFzdEluUGFnZSA9IE1hdGgubWluKGxhc3RJblBhZ2UsIHRoaXMudG90YWxJdGVtcyAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbGFzdEluUGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHBhZ2Ugc2l6ZSB0byAwXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQYWdlU2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNpemUgPSAwO1xuICB9XG59XG4iXX0=