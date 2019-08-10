import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateDebouncer } from './state-debouncer.provider';
let Page = class Page {
    constructor(stateDebouncer) {
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
    get size() {
        return this._size;
    }
    set size(size) {
        const oldSize = this._size;
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
    }
    get totalItems() {
        return this._totalItems || 0; // remains 0 if not set to avoid breaking change
    }
    set totalItems(total) {
        this._totalItems = total;
        // If we have less items than before, we might need to change the current page
        if (this.current > this.last) {
            this.current = this.last;
        }
    }
    get last() {
        if (this._last) {
            return this._last;
        }
        // If the last page isn't known, we compute it from the last item's index
        if (this.size > 0 && this.totalItems) {
            return Math.ceil(this.totalItems / this.size);
        }
        return 1;
    }
    set last(page) {
        this._last = page;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    get sizeChange() {
        return this._sizeChange.asObservable();
    }
    get current() {
        return this._current;
    }
    set current(page) {
        if (page !== this._current) {
            this.stateDebouncer.changeStart();
            this._current = page;
            this._change.next(page);
            this.stateDebouncer.changeDone();
        }
    }
    /**
     * Moves to the previous page if it exists
     */
    previous() {
        if (this.current > 1) {
            this.current--;
        }
    }
    /**
     * Moves to the next page if it exists
     */
    next() {
        if (this.current < this.last) {
            this.current++;
        }
    }
    /**
     * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
     */
    get firstItem() {
        if (this._totalItems === 0) {
            return -1;
        }
        if (this.size === 0) {
            return 0;
        }
        return (this.current - 1) * this.size;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
     */
    get lastItem() {
        if (this._totalItems === 0) {
            return -1;
        }
        if (this.size === 0) {
            return this.totalItems - 1;
        }
        let lastInPage = this.current * this.size - 1;
        if (this.totalItems) {
            lastInPage = Math.min(lastInPage, this.totalItems - 1);
        }
        return lastInPage;
    }
    /**
     * Resets the page size to 0
     */
    resetPageSize() {
        this.size = 0;
    }
};
Page = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [StateDebouncer])
], Page);
export { Page };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzVELElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7SUFDZixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFM0MsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUV6Qjs7V0FFRztRQUNLLFVBQUssR0FBRyxDQUFDLENBQUM7UUF5RGxCOztXQUVHO1FBQ0ssWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFNaEMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTTVDOztXQUVHO1FBQ0ssYUFBUSxHQUFHLENBQUMsQ0FBQztJQWxGZ0MsQ0FBQztJQVF0RCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQVcsSUFBSSxDQUFDLElBQVk7UUFDMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsMEVBQTBFO2dCQUMxRSw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxR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TyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxRQUFRO1FBQ2pCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxhQUFhO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBeEpZLElBQUk7SUFEaEIsVUFBVSxFQUFFOzZDQUV5QixjQUFjO0dBRHZDLElBQUksQ0F3SmhCO1NBeEpZLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlRGVib3VuY2VyOiBTdGF0ZURlYm91bmNlcikge31cblxuICBwdWJsaWMgYWN0aXZhdGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZSwgYSB2YWx1ZSBvZiAwIG1lYW5zIG5vIHBhZ2luYXRpb25cbiAgICovXG4gIHByaXZhdGUgX3NpemUgPSAwO1xuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgb2xkU2l6ZSA9IHRoaXMuX3NpemU7XG4gICAgaWYgKHNpemUgIT09IG9sZFNpemUpIHtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgaWYgKHNpemUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBZZWFwLiBUaGF0J3MgdGhlIGZvcm11bGEgdG8ga2VlcCB0aGUgZmlyc3QgaXRlbSBmcm9tIHRoZSBvbGQgcGFnZSBzdGlsbFxuICAgICAgICAvLyBkaXNwbGF5ZWQgaW4gdGhlIG5ldyBvbmUuXG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBNYXRoLmZsb29yKG9sZFNpemUgLyBzaXplICogKHRoaXMuX2N1cnJlbnQgLSAxKSkgKyAxO1xuICAgICAgfVxuICAgICAgLy8gV2UgYWx3YXlzIGVtaXQgYW4gZXZlbnQgZXZlbiBpZiB0aGUgY3VycmVudCBwYWdlIGluZGV4IGRpZG4ndCBjaGFuZ2UsIGJlY2F1c2VcbiAgICAgIC8vIHRoZSBzaXplIGNoYW5naW5nIG1lYW5zIHRoZSBpdGVtcyBpbnNpZGUgdGhlIHBhZ2UgYXJlIGRpZmZlcmVudFxuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5fY3VycmVudCk7XG4gICAgICB0aGlzLl9zaXplQ2hhbmdlLm5leHQodGhpcy5fc2l6ZSk7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHJpdmF0ZSBfdG90YWxJdGVtcz86IG51bWJlcjtcbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsSXRlbXMgfHwgMDsgLy8gcmVtYWlucyAwIGlmIG5vdCBzZXQgdG8gYXZvaWQgYnJlYWtpbmcgY2hhbmdlXG4gIH1cbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl90b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgLy8gSWYgd2UgaGF2ZSBsZXNzIGl0ZW1zIHRoYW4gYmVmb3JlLCB3ZSBtaWdodCBuZWVkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBwYWdlXG4gICAgaWYgKHRoaXMuY3VycmVudCA+IHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5sYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2xhc3Q6IG51bWJlcjtcbiAgcHVibGljIGdldCBsYXN0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2xhc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sYXN0O1xuICAgIH1cbiAgICAvLyBJZiB0aGUgbGFzdCBwYWdlIGlzbid0IGtub3duLCB3ZSBjb21wdXRlIGl0IGZyb20gdGhlIGxhc3QgaXRlbSdzIGluZGV4XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDAgJiYgdGhpcy50b3RhbEl0ZW1zKSB7XG4gICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuc2l6ZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9XG4gIHB1YmxpYyBzZXQgbGFzdChwYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sYXN0ID0gcGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gcGFnZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IHNpemVDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZUNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnQgPSAxO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnQocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHBhZ2UgIT09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBwYWdlO1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQocGFnZSk7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCA+IDEpIHtcbiAgICAgIHRoaXMuY3VycmVudC0tO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCA8IHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwLCAtMSBpZiBub25lIGRpc3BsYXllZFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fdG90YWxJdGVtcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuY3VycmVudCAtIDEpICogdGhpcy5zaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBsYXN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDAsIC0xIGlmIG5vbmUgZGlzcGxheWVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX3RvdGFsSXRlbXMgPT09IDApIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zIC0gMTtcbiAgICB9XG4gICAgbGV0IGxhc3RJblBhZ2UgPSB0aGlzLmN1cnJlbnQgKiB0aGlzLnNpemUgLSAxO1xuICAgIGlmICh0aGlzLnRvdGFsSXRlbXMpIHtcbiAgICAgIGxhc3RJblBhZ2UgPSBNYXRoLm1pbihsYXN0SW5QYWdlLCB0aGlzLnRvdGFsSXRlbXMgLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGxhc3RJblBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBwYWdlIHNpemUgdG8gMFxuICAgKi9cbiAgcHVibGljIHJlc2V0UGFnZVNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgfVxufVxuIl19