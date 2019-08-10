/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional, Renderer2, SkipSelf } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { ArrowKeyDirection } from './arrow-key-direction.enum';
var FocusService = /** @class */ (function () {
    function FocusService(renderer) {
        this.renderer = renderer;
        this._unlistenFuncs = [];
    }
    Object.defineProperty(FocusService.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    FocusService.prototype.reset = function (first) {
        this._current = first;
    };
    FocusService.prototype.listenToArrowKeys = function (el) {
        var _this = this;
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', function (event) { return !_this.move(ArrowKeyDirection.UP, event); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', function (event) { return !_this.move(ArrowKeyDirection.DOWN, event); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowleft', function (event) { return !_this.move(ArrowKeyDirection.LEFT, event); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', function (event) { return !_this.move(ArrowKeyDirection.RIGHT, event); }));
    };
    FocusService.prototype.registerContainer = function (el) {
        var _this = this;
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.space', function () { return !_this.activateCurrent(); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.enter', function () { return !_this.activateCurrent(); }));
    };
    FocusService.prototype.moveTo = function (item) {
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    };
    FocusService.prototype.move = function (direction, event) {
        var _this = this;
        if (event === void 0) { event = undefined; }
        if (this.current) {
            // We want to prevent default behavior that results from the keydown,
            // which may undesirably move the cursor around when using a screen reader
            if (event) {
                event.preventDefault();
            }
            var next = this.current[direction];
            if (next) {
                // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
                // If performance ever matters for this, we can refactor using additional private methods.
                var nextObs = isObservable(next) ? next : of(next);
                nextObs.subscribe(function (item) {
                    _this.moveTo(item);
                    return true;
                });
            }
        }
        return false;
    };
    FocusService.prototype.activateCurrent = function () {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    };
    FocusService.prototype.detachListeners = function () {
        this._unlistenFuncs.forEach(function (unlisten) { return unlisten(); });
    };
    FocusService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Renderer2])
    ], FocusService);
    return FocusService;
}());
export { FocusService };
export function clrFocusServiceFactory(existing, renderer) {
    return existing || new FocusService(renderer);
}
export var FOCUS_SERVICE_PROVIDER = {
    provide: FocusService,
    useFactory: clrFocusServiceFactory,
    deps: [[new Optional(), new SkipSelf(), FocusService], Renderer2],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSS9EO0lBQ0Usc0JBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFFL0IsbUJBQWMsR0FBRyxFQUFFLENBQUM7SUFGYyxDQUFDO0lBSTNDLHNCQUFXLGlDQUFPO2FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsNEJBQUssR0FBTCxVQUFNLEtBQW9CO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCx3Q0FBaUIsR0FBakIsVUFBa0IsRUFBZTtRQUFqQyxpQkFlQztRQWRDLDZGQUE2RjtRQUM3Rix3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FDOUYsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUs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QUU7WUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sc0NBQWUsR0FBdEI7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQW9CLElBQUssT0FBQSxRQUFRLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBL0VVLFlBQVk7UUFEeEIsVUFBVSxFQUFFO2lEQUVtQixTQUFTO09BRDVCLFlBQVksQ0FnRnhCO0lBQUQsbUJBQUM7Q0FBQSxBQWhGRCxJQWdGQztTQWhGWSxZQUFZO0FBa0Z6QixNQUFNLFVBQVUsc0JBQXNCLENBQUMsUUFBc0IsRUFBRSxRQUFtQjtJQUNoRixPQUFPLFFBQVEsSUFBSSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLFlBQVk7SUFDckIsVUFBVSxFQUFFLHNCQUFzQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUM7Q0FDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXJyb3dLZXlEaXJlY3Rpb24gfSBmcm9tICcuL2Fycm93LWtleS1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb2N1c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBfdW5saXN0ZW5GdW5jcyA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50OiBGb2N1c2FibGVJdGVtO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cblxuICByZXNldChmaXJzdDogRm9jdXNhYmxlSXRlbSkge1xuICAgIHRoaXMuX2N1cnJlbnQgPSBmaXJzdDtcbiAgfVxuXG4gIGxpc3RlblRvQXJyb3dLZXlzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgbGlzdGVuZXJzIHJldHVybiBmYWxzZSB3aGVuIHRoZXJlIHdhcyBhbiBhY3Rpb24gdG8gdGFrZSBmb3IgdGhlIGtleSBwcmVzc2VkLFxuICAgIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhhdCBrZXkuXG4gICAgdGhpcy5fdW5saXN0ZW5GdW5jcy5wdXNoKFxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93dXAnLCBldmVudCA9PiAhdGhpcy5tb3ZlKEFycm93S2V5RGlyZWN0aW9uLlVQLCBldmVudCkpXG4gICAgKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dkb3duJywgZXZlbnQgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5ET1dOLCBldmVudCkpXG4gICAgKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dsZWZ0JywgZXZlbnQgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5MRUZULCBldmVudCkpXG4gICAgKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dyaWdodCcsIGV2ZW50ID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uUklHSFQsIGV2ZW50KSlcbiAgICApO1xuICB9XG5cbiAgcmVnaXN0ZXJDb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICcwJyk7XG4gICAgdGhpcy5saXN0ZW5Ub0Fycm93S2V5cyhlbCk7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgcmV0dXJuIGZhbHNlIHdoZW4gdGhlcmUgd2FzIGFuIGFjdGlvbiB0byB0YWtlIGZvciB0aGUga2V5IHByZXNzZWQsXG4gICAgLy8gaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGF0IGtleS5cbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLnNwYWNlJywgKCkgPT4gIXRoaXMuYWN0aXZhdGVDdXJyZW50KCkpKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmVudGVyJywgKCkgPT4gIXRoaXMuYWN0aXZhdGVDdXJyZW50KCkpKTtcbiAgfVxuXG4gIG1vdmVUbyhpdGVtOiBGb2N1c2FibGVJdGVtKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50LmJsdXIoKTtcbiAgICB9XG4gICAgaXRlbS5mb2N1cygpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSBpdGVtO1xuICB9XG5cbiAgbW92ZShkaXJlY3Rpb246IEFycm93S2V5RGlyZWN0aW9uLCBldmVudDogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgLy8gV2Ugd2FudCB0byBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3IgdGhhdCByZXN1bHRzIGZyb20gdGhlIGtleWRvd24sXG4gICAgICAvLyB3aGljaCBtYXkgdW5kZXNpcmFibHkgbW92ZSB0aGUgY3Vyc29yIGFyb3VuZCB3aGVuIHVzaW5nIGEgc2NyZWVuIHJlYWRlclxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHQgPSB0aGlzLmN1cnJlbnRbZGlyZWN0aW9uXTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFR1cm5pbmcgdGhlIHZhbHVlIGludG8gYW4gT2JzZXJ2YWJsZSBpc24ndCBncmVhdCwgYnV0IGl0J3MgdGhlIGZhc3Rlc3Qgd2F5IHRvIGF2b2lkIGNvZGUgZHVwbGljYXRpb24uXG4gICAgICAgIC8vIElmIHBlcmZvcm1hbmNlIGV2ZXIgbWF0dGVycyBmb3IgdGhpcywgd2UgY2FuIHJlZmFjdG9yIHVzaW5nIGFkZGl0aW9uYWwgcHJpdmF0ZSBtZXRob2RzLlxuICAgICAgICBjb25zdCBuZXh0T2JzID0gaXNPYnNlcnZhYmxlKG5leHQpID8gbmV4dCA6IG9mKG5leHQpO1xuICAgICAgICBuZXh0T2JzLnN1YnNjcmliZShpdGVtID0+IHtcbiAgICAgICAgICB0aGlzLm1vdmVUbyhpdGVtKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFjdGl2YXRlQ3VycmVudCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC5hY3RpdmF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50LmFjdGl2YXRlKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGRldGFjaExpc3RlbmVycygpIHtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLmZvckVhY2goKHVubGlzdGVuOiAoKSA9PiB2b2lkKSA9PiB1bmxpc3RlbigpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xyRm9jdXNTZXJ2aWNlRmFjdG9yeShleGlzdGluZzogRm9jdXNTZXJ2aWNlLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIHJldHVybiBleGlzdGluZyB8fCBuZXcgRm9jdXNTZXJ2aWNlKHJlbmRlcmVyKTtcbn1cblxuZXhwb3J0IGNvbnN0IEZPQ1VTX1NFUlZJQ0VfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEZvY3VzU2VydmljZSxcbiAgdXNlRmFjdG9yeTogY2xyRm9jdXNTZXJ2aWNlRmFjdG9yeSxcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIEZvY3VzU2VydmljZV0sIFJlbmRlcmVyMl0sXG59O1xuIl19