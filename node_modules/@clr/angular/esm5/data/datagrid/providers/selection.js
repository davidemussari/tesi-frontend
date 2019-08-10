import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltersProvider } from './filters';
import { Items } from './items';
import { SelectionType } from '../enums/selection-type';
var nbSelection = 0;
var Selection = /** @class */ (function () {
    function Selection(_items, _filters) {
        var _this = this;
        this._items = _items;
        this._filters = _filters;
        this.prevSelectionRefs = []; // Refs of selected items
        this._selectionType = SelectionType.None;
        /** @deprecated since 2.0, remove in 3.0 */
        this.rowSelectionMode = false;
        /**
         * Ignore items changes in the same change detection cycle.
         */
        // tslint:disable-next-line
        this.debounce = false;
        /**
         * Subscriptions to the other providers changes.
         */
        this.subscriptions = [];
        /**
         * The Observable that lets other classes subscribe to selection changes
         */
        this._change = new Subject();
        this.id = 'clr-dg-selection' + nbSelection++;
        this.subscriptions.push(this._filters.change.subscribe(function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(function (updatedItems) {
            switch (_this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    var newSingle_1;
                    var trackBy_1 = _this._items.trackBy;
                    var selectionUpdated_1 = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.currentSingle && !_this.prevSingleSelectionRef) {
                        if (_this._items.all && _this._items.trackBy) {
                            var lookup = _this._items.all.findIndex(function (maybe) { return maybe === _this.currentSingle; });
                            _this.prevSingleSelectionRef = _this._items.trackBy(lookup, _this.currentSingle);
                        }
                    }
                    updatedItems.forEach(function (item, index) {
                        var ref = trackBy_1(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (_this.prevSingleSelectionRef === ref) {
                            newSingle_1 = item;
                            selectionUpdated_1 = true;
                        }
                    });
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (_this._items.smart && !newSingle_1) {
                        selectionUpdated_1 = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout(function () {
                        if (selectionUpdated_1) {
                            _this.currentSingle = newSingle_1;
                        }
                    }, 0);
                    break;
                }
                case SelectionType.Multi: {
                    var leftOver_1 = _this.current.slice();
                    var trackBy_2 = _this._items.trackBy;
                    var selectionUpdated_2 = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.current.length > 0 && _this.prevSelectionRefs.length !== _this.current.length) {
                        if (_this._items.all && _this._items.trackBy) {
                            _this.prevSelectionRefs = [];
                            _this.current.forEach(function (item) {
                                var lookup = _this._items.all.findIndex(function (maybe) { return maybe === item; });
                                _this.prevSelectionRefs.push(_this._items.trackBy(lookup, item));
                            });
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver_1.length > 0) {
                        updatedItems.forEach(function (item, index) {
                            var ref = trackBy_2(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            var selectedIndex = _this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver_1[selectedIndex] = item;
                                selectionUpdated_2 = true;
                            }
                        });
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (_this._items.smart) {
                            leftOver_1 = leftOver_1.filter(function (selected) { return updatedItems.indexOf(selected) > -1; });
                            if (_this.current.length !== leftOver_1.length) {
                                selectionUpdated_2 = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout(function () {
                            if (selectionUpdated_2) {
                                _this.current = leftOver_1;
                            }
                        }, 0);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }));
    }
    Selection.prototype.clearSelection = function () {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    };
    Object.defineProperty(Selection.prototype, "selectionType", {
        get: function () {
            return this._selectionType;
        },
        set: function (value) {
            if (value === this.selectionType) {
                return;
            }
            this._selectionType = value;
            if (value === SelectionType.None) {
                delete this.current;
            }
            else {
                this.updateCurrent([], false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "_selectable", {
        get: function () {
            return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up our subscriptions to other providers
     */
    Selection.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(Selection.prototype, "currentSingle", {
        get: function () {
            return this._currentSingle;
        },
        set: function (value) {
            var _this = this;
            if (value === this._currentSingle) {
                return;
            }
            this._currentSingle = value;
            if (this._items.all && this._items.trackBy && value) {
                var lookup = this._items.all.findIndex(function (maybe) { return maybe === value; });
                this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
            }
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this.updateCurrent(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Selection.prototype.updateCurrent = function (value, emit) {
        var _this = this;
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        }
    };
    Selection.prototype.emitChange = function () {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    };
    Object.defineProperty(Selection.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if an item is currently selected
     */
    Selection.prototype.isSelected = function (item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    };
    /**
     * Selects an item
     */
    Selection.prototype.selectItem = function (item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            var lookup = this._items.all.findIndex(function (maybe) { return maybe === item; });
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    };
    /**
     * Deselects an item
     */
    Selection.prototype.deselectItem = function (indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    };
    /**
     * Selects or deselects an item
     */
    Selection.prototype.setSelected = function (item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                var index = this.current.indexOf(item);
                if (index >= 0 && !selected) {
                    this.deselectItem(index);
                    this.emitChange();
                }
                else if (index < 0 && selected) {
                    this.selectItem(item);
                    this.emitChange();
                }
                break;
            default:
                break;
        }
    };
    /**
     * Checks if all currently displayed items are selected
     */
    Selection.prototype.isAllSelected = function () {
        var _this = this;
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        var displayedItems = this._items.displayed;
        var nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        var temp = displayedItems.filter(function (item) { return _this.current.indexOf(item) > -1; });
        return temp.length === displayedItems.length;
    };
    /**
     * Selects or deselects all currently displayed items
     */
    Selection.prototype.toggleAll = function () {
        var _this = this;
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
             * If every currently displayed item is already selected, we clear them.
             * If at least one item isn't selected, we select every currently displayed item.
             */
        if (this.isAllSelected()) {
            this._items.displayed.forEach(function (item) {
                var currentIndex = _this.current.indexOf(item);
                if (currentIndex > -1) {
                    _this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.selectItem(item);
                }
            });
        }
        this.emitChange();
    };
    Selection = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Items, FiltersProvider])
    ], Selection);
    return Selection;
}());
export { Selection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxJQUFJLFdBQVcsR0FBVyxDQUFDLENBQUM7QUFHNUI7SUFLRSxtQkFBb0IsTUFBZ0IsRUFBVSxRQUE0QjtRQUExRSxpQkF1SEM7UUF2SG1CLFdBQU0sR0FBTixNQUFNLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUhsRSxzQkFBaUIsR0FBUSxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7UUFvSXRELG1CQUFjLEdBQWtCLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFnQjNELDJDQUEyQztRQUNwQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFLekM7O1dBRUc7UUFDSCwyQkFBMkI7UUFDbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUVsQzs7V0FFRztRQUNLLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQXNEM0M7O1dBRUc7UUFDSyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQXhOdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FB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LGdCQUFDO0NBQUEsQUFsVkQsSUFrVkM7U0FsVlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFRyYWNrQnlGdW5jdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vaXRlbXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uL2VudW1zL3NlbGVjdGlvbi10eXBlJztcblxubGV0IG5iU2VsZWN0aW9uOiBudW1iZXIgPSAwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uPFQgPSBhbnk+IHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJldlNlbGVjdGlvblJlZnM6IFRbXSA9IFtdOyAvLyBSZWZzIG9mIHNlbGVjdGVkIGl0ZW1zXG4gIHByaXZhdGUgcHJldlNpbmdsZVNlbGVjdGlvblJlZjogVDsgLy8gUmVmIG9mIHNpbmdsZSBzZWxlY3RlZCBpdGVtXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlbXM6IEl0ZW1zPFQ+LCBwcml2YXRlIF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4pIHtcbiAgICB0aGlzLmlkID0gJ2Nsci1kZy1zZWxlY3Rpb24nICsgbmJTZWxlY3Rpb24rKztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fZmlsdGVycy5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faXRlbXMuYWxsQ2hhbmdlcy5zdWJzY3JpYmUodXBkYXRlZEl0ZW1zID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGlvblR5cGUpIHtcbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTm9uZToge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZToge1xuICAgICAgICAgICAgbGV0IG5ld1NpbmdsZTogYW55O1xuICAgICAgICAgICAgY29uc3QgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFQ+ID0gdGhpcy5faXRlbXMudHJhY2tCeTtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50U2luZ2xlIGhhcyBiZWVuIHNldCBiZWZvcmUgZGF0YSB3YXMgbG9hZGVkLCB3ZSBsb29rIHVwIGFuZCBzYXZlIHRoZSByZWYgZnJvbSBjdXJyZW50IGRhdGEgc2V0XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2luZ2xlICYmICF0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gdGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPSB0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgdGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cGRhdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gdHJhY2tCeShpbmRleCwgaXRlbSk7XG4gICAgICAgICAgICAgIC8vIElmIG9uZSBvZiB0aGUgdXBkYXRlZCBpdGVtcyBpcyB0aGUgcHJldmlvdXNseSBzZWxlY3RlZFNpbmdsZSwgc2V0IGl0IGFzIHRoZSBuZXcgb25lXG4gICAgICAgICAgICAgIGlmICh0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPT09IHJlZikge1xuICAgICAgICAgICAgICAgIG5ld1NpbmdsZSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSB1c2luZyBzbWFydCBkYXRhZ3JpZHMsIHdlIGV4cGVjdCBhbGwgaXRlbXMgdG8gYmUgcHJlc2VudCBpbiB0aGUgdXBkYXRlZEl0ZW1zIGFycmF5LlxuICAgICAgICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBzaG91bGQgZGVsZXRlIHRoZSBjdXJyZW50U2luZ2xlIGlmIGl0IHVzZWQgdG8gYmUgZGVmaW5lZCBidXQgZG9lc24ndCBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgLy8gTm8gZXhwbGljaXQgXCJkZWxldGVcIiBpcyByZXF1aXJlZCwgc2luY2UgbmV3U2luZ2xlIHdvdWxkIGJlIHVuZGVmaW5lZCBhdCB0aGlzIHBvaW50LlxuICAgICAgICAgICAgLy8gTWFya2luZyBpdCBhcyBzZWxlY3Rpb25VcGRhdGVkIGhlcmUgd2lsbCBzZXQgY3VycmVudFNpbmdsZSB0byB1bmRlZmluZWQgYmVsb3cgaW4gdGhlIHNldFRpbWVvdXQuXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuc21hcnQgJiYgIW5ld1NpbmdsZSkge1xuICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogRGlzY3Vzc2VkIHRoaXMgd2l0aCBFdWRlcyBhbmQgdGhpcyBpcyBmaW5lIGZvciBub3cuXG4gICAgICAgICAgICAvLyBCdXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgZGlmZmVyZW50IHBhdHRlcm4gZm9yIHRoZVxuICAgICAgICAgICAgLy8gY2hpbGQgdHJpZ2dlcmluZyB0aGUgcGFyZW50IGNoYW5nZSBkZXRlY3Rpb24gcHJvYmxlbS5cbiAgICAgICAgICAgIC8vIFVzaW5nIHNldFRpbWVvdXQgZm9yIG5vdyB0byBmaXggdGhpcy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNpbmdsZSA9IG5ld1NpbmdsZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTXVsdGk6IHtcbiAgICAgICAgICAgIGxldCBsZWZ0T3ZlcjogYW55W10gPSB0aGlzLmN1cnJlbnQuc2xpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxhbnk+ID0gdGhpcy5faXRlbXMudHJhY2tCeTtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGhhcyBiZWVuIHNldCBiZWZvcmUgZGF0YSB3YXMgbG9hZGVkLCB3ZSBsb29rIHVwIGFuZCBzYXZlIHRoZSByZWYgZnJvbSBjdXJyZW50IGRhdGEgc2V0XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Lmxlbmd0aCA+IDAgJiYgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGggIT09IHRoaXMuY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gaXRlbSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnB1c2godGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiByZXZpc2l0IHRoaXMgd2hlbiB3ZSB3b3JrIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjM0MlxuICAgICAgICAgICAgLy8gY3VycmVudGx5LCB0aGUgc2VsZWN0aW9uIGlzIGNsZWFyZWQgd2hlbiBmaWx0ZXIgaXMgYXBwbGllZCwgc28gdGhlIGxvZ2ljIGluc2lkZVxuICAgICAgICAgICAgLy8gdGhlIGlmIHN0YXRlbWVudCBiZWxvdyByZXN1bHRzIGluIGJyb2tlbiBiZWhhdmlvci5cbiAgICAgICAgICAgIGlmIChsZWZ0T3Zlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZiA9IHRyYWNrQnkoaW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIExvb2sgaW4gY3VycmVudCBzZWxlY3RlZCByZWZzIGFycmF5IGlmIGl0ZW0gaXMgc2VsZWN0ZWQsIGFuZCB1cGRhdGUgYWN0dWFsIHZhbHVlXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMucHJldlNlbGVjdGlvblJlZnMuaW5kZXhPZihyZWYpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGxlZnRPdmVyW3NlbGVjdGVkSW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBhbnkgdW5tYXRjaGVkIGl0ZW1zIGlmIHdlJ3JlIHVzaW5nIHNtYXJ0IGRhdGFncmlkcyB3aGVyZSB3ZSBleHBlY3QgYWxsIGl0ZW1zIHRvIGJlXG4gICAgICAgICAgICAgIC8vIHByZXNlbnRcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLnNtYXJ0KSB7XG4gICAgICAgICAgICAgICAgbGVmdE92ZXIgPSBsZWZ0T3Zlci5maWx0ZXIoc2VsZWN0ZWQgPT4gdXBkYXRlZEl0ZW1zLmluZGV4T2Yoc2VsZWN0ZWQpID4gLTEpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQubGVuZ3RoICE9PSBsZWZ0T3Zlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFRPRE86IERpc2N1c3NlZCB0aGlzIHdpdGggRXVkZXMgYW5kIHRoaXMgaXMgZmluZSBmb3Igbm93LlxuICAgICAgICAgICAgICAvLyBCdXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgZGlmZmVyZW50IHBhdHRlcm4gZm9yIHRoZVxuICAgICAgICAgICAgICAvLyBjaGlsZCB0cmlnZ2VyaW5nIHRoZSBwYXJlbnQgY2hhbmdlIGRldGVjdGlvbiBwcm9ibGVtLlxuICAgICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0IGZvciBub3cgdG8gZml4IHRoaXMuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25VcGRhdGVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBsZWZ0T3ZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcyA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSBudWxsO1xuICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IG51bGw7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5Ob25lO1xuICBwdWJsaWMgZ2V0IHNlbGVjdGlvblR5cGUoKTogU2VsZWN0aW9uVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGU7XG4gIH1cbiAgcHVibGljIHNldCBzZWxlY3Rpb25UeXBlKHZhbHVlOiBTZWxlY3Rpb25UeXBlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLnNlbGVjdGlvblR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0aW9uVHlwZSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICBkZWxldGUgdGhpcy5jdXJyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnQoW10sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLCByZW1vdmUgaW4gMy4wICovXG4gIHB1YmxpYyByb3dTZWxlY3Rpb25Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBnZXQgX3NlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkgfHwgdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGU7XG4gIH1cbiAgLyoqXG4gICAqIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBkZWJvdW5jZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBvdGhlciBwcm92aWRlcnMgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogQ2xlYW5zIHVwIG91ciBzdWJzY3JpcHRpb25zIHRvIG90aGVyIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZWxlY3Rpb24gaW4gc2luZ2xlIHNlbGVjdGlvbiB0eXBlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50U2luZ2xlOiBUO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRTaW5nbGUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaW5nbGU7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50U2luZ2xlKHZhbHVlOiBUKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl9jdXJyZW50U2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkgJiYgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IHZhbHVlKTtcbiAgICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCB2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIC8vIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAgLy8gQFRPRE8gVGhpcyBjYW4gbGlrZWx5IGJlIHJlbW92ZWQhXG4gICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5kZWJvdW5jZSA9IGZhbHNlKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50OiBUW107XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudCh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50KHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50KHZhbHVlOiBUW10sIGVtaXQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgLy8gSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAgIC8vIEBUT0RPIFRoaXMgY2FuIGxpa2VseSBiZSByZW1vdmVkIVxuICAgICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmRlYm91bmNlID0gZmFsc2UpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHNlbGVjdGlvbiBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxUW10gfCBUPigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5jdXJyZW50KTtcbiAgICB9XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFRbXSB8IFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzU2VsZWN0ZWQoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNpbmdsZSA9PT0gaXRlbTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+PSAwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwcml2YXRlIHNlbGVjdEl0ZW0oaXRlbTogVCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5wdXNoKGl0ZW0pO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAvLyBQdXNoIHNlbGVjdGVkIHJlZiBvbnRvIGFycmF5XG4gICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSBpdGVtKTtcbiAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMucHVzaCh0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgaXRlbSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBkZXNlbGVjdEl0ZW0oaW5kZXhPZkl0ZW06IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5zcGxpY2UoaW5kZXhPZkl0ZW0sIDEpO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5ICYmIGluZGV4T2ZJdGVtIDwgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGgpIHtcbiAgICAgIC8vIEtlZXAgc2VsZWN0ZWQgcmVmcyBhcnJheSBpbiBzeW5jXG4gICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnNwbGljZShpbmRleE9mSXRlbSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3IgZGVzZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzZXRTZWxlY3RlZChpdGVtOiBULCBzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIHN3aXRjaCAodGhpcy5fc2VsZWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk5vbmU6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZTpcbiAgICAgICAgLy8gaW4gc2luZ2xlIHNlbGVjdGlvbiwgc2V0IGN1cnJlbnRTaW5nbGUgbWV0aG9kIHNob3VsZCBiZSB1c2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk11bHRpOlxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiAhc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbShpbmRleCk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwICYmIHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc0FsbFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlICE9PSBTZWxlY3Rpb25UeXBlLk11bHRpIHx8ICF0aGlzLl9pdGVtcy5kaXNwbGF5ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGlzcGxheWVkSXRlbXM6IFRbXSA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZDtcbiAgICBjb25zdCBuYkRpc3BsYXllZCA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5sZW5ndGg7XG4gICAgaWYgKG5iRGlzcGxheWVkIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0ZW1wOiBUW10gPSBkaXNwbGF5ZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+IC0xKTtcbiAgICByZXR1cm4gdGVtcC5sZW5ndGggPT09IGRpc3BsYXllZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIG9yIGRlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKi9cbiAgcHVibGljIHRvZ2dsZUFsbCgpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lIHx8IHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qXG4gICAgICAgICAqIElmIGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbSBpcyBhbHJlYWR5IHNlbGVjdGVkLCB3ZSBjbGVhciB0aGVtLlxuICAgICAgICAgKiBJZiBhdCBsZWFzdCBvbmUgaXRlbSBpc24ndCBzZWxlY3RlZCwgd2Ugc2VsZWN0IGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbS5cbiAgICAgICAgICovXG4gICAgaWYgKHRoaXMuaXNBbGxTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPiAtMSkge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKGN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG59XG4iXX0=