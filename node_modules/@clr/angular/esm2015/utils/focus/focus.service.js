/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional, Renderer2, SkipSelf } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { ArrowKeyDirection } from './arrow-key-direction.enum';
let FocusService = class FocusService {
    constructor(renderer) {
        this.renderer = renderer;
        this._unlistenFuncs = [];
    }
    get current() {
        return this._current;
    }
    reset(first) {
        this._current = first;
    }
    listenToArrowKeys(el) {
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', event => !this.move(ArrowKeyDirection.UP, event)));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', event => !this.move(ArrowKeyDirection.DOWN, event)));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowleft', event => !this.move(ArrowKeyDirection.LEFT, event)));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', event => !this.move(ArrowKeyDirection.RIGHT, event)));
    }
    registerContainer(el) {
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.space', () => !this.activateCurrent()));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.enter', () => !this.activateCurrent()));
    }
    moveTo(item) {
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    }
    move(direction, event = undefined) {
        if (this.current) {
            // We want to prevent default behavior that results from the keydown,
            // which may undesirably move the cursor around when using a screen reader
            if (event) {
                event.preventDefault();
            }
            const next = this.current[direction];
            if (next) {
                // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
                // If performance ever matters for this, we can refactor using additional private methods.
                const nextObs = isObservable(next) ? next : of(next);
                nextObs.subscribe(item => {
                    this.moveTo(item);
                    return true;
                });
            }
        }
        return false;
    }
    activateCurrent() {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    }
    detachListeners() {
        this._unlistenFuncs.forEach((unlisten) => unlisten());
    }
};
FocusService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Renderer2])
], FocusService);
export { FocusService };
export function clrFocusServiceFactory(existing, renderer) {
    return existing || new FocusService(renderer);
}
export const FOCUS_SERVICE_PROVIDER = {
    provide: FocusService,
    useFactory: clrFocusServiceFactory,
    deps: [[new Optional(), new SkipSelf(), FocusService], Renderer2],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSS9ELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDdkIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUUvQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztJQUZjLENBQUM7SUFJM0MsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQW9CO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFlO1FBQy9CLDZGQUE2RjtRQUM3Rix3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDOUYsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFD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TyxDQUFDLENBQUMsUUFBb0IsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0YsQ0FBQTtBQWhGWSxZQUFZO0lBRHhCLFVBQVUsRUFBRTs2Q0FFbUIsU0FBUztHQUQ1QixZQUFZLENBZ0Z4QjtTQWhGWSxZQUFZO0FBa0Z6QixNQUFNLFVBQVUsc0JBQXNCLENBQUMsUUFBc0IsRUFBRSxRQUFtQjtJQUNoRixPQUFPLFFBQVEsSUFBSSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLFlBQVk7SUFDckIsVUFBVSxFQUFFLHNCQUFzQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUM7Q0FDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXJyb3dLZXlEaXJlY3Rpb24gfSBmcm9tICcuL2Fycm93LWtleS1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb2N1c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBfdW5saXN0ZW5GdW5jcyA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50OiBGb2N1c2FibGVJdGVtO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cblxuICByZXNldChmaXJzdDogRm9jdXNhYmxlSXRlbSkge1xuICAgIHRoaXMuX2N1cnJlbnQgPSBmaXJzdDtcbiAgfVxuXG4gIGxpc3RlblRvQXJyb3dLZXlzKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgbGlzdGVuZXJzIHJldHVybiBmYWxzZSB3aGVuIHRoZXJlIHdhcyBhbiBhY3Rpb24gdG8gdGFrZSBmb3IgdGhlIGtleSBwcmVzc2VkLFxuICAgIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhhdCBrZXkuXG4gICAgdGhpcy5fdW5saXN0ZW5GdW5jcy5wdXNoKFxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93dXAnLCBldmVudCA9PiAhdGhpcy5tb3ZlKEFycm93S2V5RGlyZWN0aW9uLlVQLCBldmVudCkpXG4gICAgKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dkb3duJywgZXZlbnQgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5ET1dOLCBldmVudCkpXG4gICAgKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dsZWZ0JywgZXZlbnQgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5MRUZULCBldmVudCkpXG4gICAgKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dyaWdodCcsIGV2ZW50ID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uUklHSFQsIGV2ZW50KSlcbiAgICApO1xuICB9XG5cbiAgcmVnaXN0ZXJDb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICcwJyk7XG4gICAgdGhpcy5saXN0ZW5Ub0Fycm93S2V5cyhlbCk7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgcmV0dXJuIGZhbHNlIHdoZW4gdGhlcmUgd2FzIGFuIGFjdGlvbiB0byB0YWtlIGZvciB0aGUga2V5IHByZXNzZWQsXG4gICAgLy8gaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGF0IGtleS5cbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLnNwYWNlJywgKCkgPT4gIXRoaXMuYWN0aXZhdGVDdXJyZW50KCkpKTtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmVudGVyJywgKCkgPT4gIXRoaXMuYWN0aXZhdGVDdXJyZW50KCkpKTtcbiAgfVxuXG4gIG1vdmVUbyhpdGVtOiBGb2N1c2FibGVJdGVtKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50LmJsdXIoKTtcbiAgICB9XG4gICAgaXRlbS5mb2N1cygpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSBpdGVtO1xuICB9XG5cbiAgbW92ZShkaXJlY3Rpb246IEFycm93S2V5RGlyZWN0aW9uLCBldmVudDogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgLy8gV2Ugd2FudCB0byBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3IgdGhhdCByZXN1bHRzIGZyb20gdGhlIGtleWRvd24sXG4gICAgICAvLyB3aGljaCBtYXkgdW5kZXNpcmFibHkgbW92ZSB0aGUgY3Vyc29yIGFyb3VuZCB3aGVuIHVzaW5nIGEgc2NyZWVuIHJlYWRlclxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHQgPSB0aGlzLmN1cnJlbnRbZGlyZWN0aW9uXTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFR1cm5pbmcgdGhlIHZhbHVlIGludG8gYW4gT2JzZXJ2YWJsZSBpc24ndCBncmVhdCwgYnV0IGl0J3MgdGhlIGZhc3Rlc3Qgd2F5IHRvIGF2b2lkIGNvZGUgZHVwbGljYXRpb24uXG4gICAgICAgIC8vIElmIHBlcmZvcm1hbmNlIGV2ZXIgbWF0dGVycyBmb3IgdGhpcywgd2UgY2FuIHJlZmFjdG9yIHVzaW5nIGFkZGl0aW9uYWwgcHJpdmF0ZSBtZXRob2RzLlxuICAgICAgICBjb25zdCBuZXh0T2JzID0gaXNPYnNlcnZhYmxlKG5leHQpID8gbmV4dCA6IG9mKG5leHQpO1xuICAgICAgICBuZXh0T2JzLnN1YnNjcmliZShpdGVtID0+IHtcbiAgICAgICAgICB0aGlzLm1vdmVUbyhpdGVtKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFjdGl2YXRlQ3VycmVudCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC5hY3RpdmF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50LmFjdGl2YXRlKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGRldGFjaExpc3RlbmVycygpIHtcbiAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLmZvckVhY2goKHVubGlzdGVuOiAoKSA9PiB2b2lkKSA9PiB1bmxpc3RlbigpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xyRm9jdXNTZXJ2aWNlRmFjdG9yeShleGlzdGluZzogRm9jdXNTZXJ2aWNlLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIHJldHVybiBleGlzdGluZyB8fCBuZXcgRm9jdXNTZXJ2aWNlKHJlbmRlcmVyKTtcbn1cblxuZXhwb3J0IGNvbnN0IEZPQ1VTX1NFUlZJQ0VfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEZvY3VzU2VydmljZSxcbiAgdXNlRmFjdG9yeTogY2xyRm9jdXNTZXJ2aWNlRmFjdG9yeSxcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIEZvY3VzU2VydmljZV0sIFJlbmRlcmVyMl0sXG59O1xuIl19