/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID, Renderer2, SkipSelf } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IfOpenService } from '../../../utils/conditional/if-open.service';
import { customFocusableItemProvider } from '../../../utils/focus/focusable-item/custom-focusable-item-provider';
import { UNIQUE_ID } from '../../../utils/id-generator/id-generator.service';
import { ArrowKeyDirection } from '../../../utils/focus/arrow-key-direction.enum';
import { FocusService } from '../../../utils/focus/focus.service';
import { linkParent, linkVertical } from '../../../utils/focus/focusable-item/linkers';
import { wrapObservable } from '../../../utils/focus/wrap-observable';
import { take } from 'rxjs/operators';
var DropdownFocusHandler = /** @class */ (function () {
    function DropdownFocusHandler(id, renderer, parent, ifOpenService, focusService, platformId) {
        this.id = id;
        this.renderer = renderer;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.focusService = focusService;
        this.platformId = platformId;
        this._unlistenFuncs = [];
        this.focusBackOnTrigger = false;
        this.resetChildren();
        this.moveToFirstItemWhenOpen();
        if (!this.parent) {
            this.handleRootFocus();
        }
    }
    /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     */
    DropdownFocusHandler.prototype.moveToFirstItemWhenOpen = function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe(function (open) {
            if (open && _this.ifOpenService.originalEvent) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to move focus to first item.
                setTimeout(function () {
                    _this.focusService.moveTo(_this);
                    if (_this.parent) {
                        _this.focusService.move(ArrowKeyDirection.RIGHT);
                    }
                    else {
                        _this.focusService.move(ArrowKeyDirection.DOWN);
                    }
                });
            }
        });
    };
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    DropdownFocusHandler.prototype.handleRootFocus = function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe(function (open) {
            if (!open) {
                // We reset the state of the focus service both on initialization and when closing.
                _this.focusService.reset(_this);
                // But we only actively focus the trigger when closing, not on initialization.
                if (_this.focusBackOnTrigger) {
                    _this.focus();
                }
            }
            _this.focusBackOnTrigger = open;
        });
    };
    Object.defineProperty(DropdownFocusHandler.prototype, "trigger", {
        get: function () {
            return this._trigger;
        },
        set: function (el) {
            var _this = this;
            this._trigger = el;
            this.renderer.setAttribute(el, 'id', this.id);
            if (this.parent) {
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
            }
            else {
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
                this.focusService.listenToArrowKeys(el);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownFocusHandler.prototype, "container", {
        get: function () {
            return this._container;
        },
        set: function (el) {
            var _this = this;
            this._container = el;
            // whether root container or not, tab key should always toggle (i.e. close) the container
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.tab', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
            if (this.parent) {
                // if it's a nested container, pressing esc has the same effect as pressing left key, which closes the current
                // popup and moves up to its parent. Here, we stop propagation so that the parent container
                // doesn't receive the esc keydown
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.esc', function (event) {
                    _this.focusService.move(ArrowKeyDirection.LEFT, event);
                    event.stopPropagation();
                }));
            }
            else {
                // The root container is the only one we register to the focus service, others do not need focus
                this.focusService.registerContainer(el);
                // The root container will simply close the container when esc key is pressed
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.esc', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
                // When the user moves focus outside of the menu, we close the dropdown
                this._unlistenFuncs.push(this.renderer.listen(el, 'blur', function (event) {
                    // we clear out any existing focus on the items
                    _this.children.pipe(take(1)).subscribe(function (items) { return items.forEach(function (item) { return item.blur(); }); });
                    // event.relatedTarget is null in IE11. In that case we use document.activeElement which correctly points
                    // to the element we want to check. Note that other browsers might point document.activeElement to the
                    // wrong element. This is ok, because all the other browsers we support relies on event.relatedTarget.
                    var target = event.relatedTarget || document.activeElement;
                    // If the user clicks on an item which triggers the blur, we don't want to close it since it may open a submenu.
                    // In the case of needing to close it (i.e. user selected an item and the dropdown menu is set to close on
                    // selection), dropdown-item.ts handles it.
                    if (target && isPlatformBrowser(_this.platformId)) {
                        if (el.contains(target) || target === _this.trigger) {
                            return;
                        }
                    }
                    // We let the user move focus to where the want, we don't force the focus back on the trigger
                    _this.focusBackOnTrigger = false;
                    _this.ifOpenService.open = false;
                }));
            }
        },
        enumerable: true,
        configurable: true
    });
    DropdownFocusHandler.prototype.focus = function () {
        if (this.trigger && isPlatformBrowser(this.platformId)) {
            this.trigger.focus();
        }
    };
    DropdownFocusHandler.prototype.blur = function () {
        if (this.trigger && isPlatformBrowser(this.platformId)) {
            this.trigger.blur();
        }
    };
    DropdownFocusHandler.prototype.activate = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.trigger.click();
        }
    };
    DropdownFocusHandler.prototype.openAndGetChildren = function () {
        var _this = this;
        return wrapObservable(this.children, function () { return (_this.ifOpenService.open = true); });
    };
    DropdownFocusHandler.prototype.closeAndGetThis = function () {
        var _this = this;
        return wrapObservable(of(this), function () { return (_this.ifOpenService.open = false); });
    };
    DropdownFocusHandler.prototype.resetChildren = function () {
        this.children = new ReplaySubject(1);
        if (this.parent) {
            this.right = this.openAndGetChildren().pipe(map(function (all) { return all[0]; }));
        }
        else {
            this.down = this.openAndGetChildren().pipe(map(function (all) { return all[0]; }));
            this.up = this.openAndGetChildren().pipe(map(function (all) { return all[all.length - 1]; }));
        }
    };
    DropdownFocusHandler.prototype.addChildren = function (children) {
        linkVertical(children);
        if (this.parent) {
            linkParent(children, this.closeAndGetThis(), ArrowKeyDirection.LEFT);
        }
        this.children.next(children);
    };
    DropdownFocusHandler.prototype.ngOnDestroy = function () {
        this._unlistenFuncs.forEach(function (unlisten) { return unlisten(); });
        this.focusService.detachListeners();
    };
    DropdownFocusHandler = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(UNIQUE_ID)),
        tslib_1.__param(2, SkipSelf()),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(5, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [String, Renderer2,
            DropdownFocusHandler,
            IfOpenService,
            FocusService,
            Object])
    ], DropdownFocusHandler);
    return DropdownFocusHandler;
}());
export { DropdownFocusHandler };
export var DROPDOWN_FOCUS_HANDLER_PROVIDER = customFocusableItemProvider(DropdownFocusHandler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9kcm9wZG93bi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBYyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDakgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEM7SUFDRSw4QkFDNEIsRUFBVSxFQUM1QixRQUFtQixFQUduQixNQUE0QixFQUM1QixhQUE0QixFQUM1QixZQUEwQixFQUNMLFVBQWtCO1FBUHJCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFD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Q0FBQTtRQUVqQixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBSVYsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3lEQU5GLFNBQVM7WUFHWCxvQkFBb0I7WUFDYixhQUFhO1lBQ2QsWUFBWTtZQUNPLE1BQU07T0FUdEMsb0JBQW9CLENBK0xoQztJQUFELDJCQUFDO0NBQUEsQUEvTEQsSUErTEM7U0EvTFksb0JBQW9CO0FBaU1qQyxNQUFNLENBQUMsSUFBTSwrQkFBK0IsR0FBRywyQkFBMkIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUmVuZGVyZXIyLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3VzdG9tRm9jdXNhYmxlSXRlbVByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZm9jdXMvZm9jdXNhYmxlLWl0ZW0vY3VzdG9tLWZvY3VzYWJsZS1pdGVtLXByb3ZpZGVyJztcbmltcG9ydCB7IFVOSVFVRV9JRCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBBcnJvd0tleURpcmVjdGlvbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2Fycm93LWtleS1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzYWJsZUl0ZW0gfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5pbXBvcnQgeyBsaW5rUGFyZW50LCBsaW5rVmVydGljYWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9saW5rZXJzJztcbmltcG9ydCB7IHdyYXBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZm9jdXMvd3JhcC1vYnNlcnZhYmxlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkZvY3VzSGFuZGxlciBpbXBsZW1lbnRzIEZvY3VzYWJsZUl0ZW0ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBTa2lwU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcml2YXRlIHBhcmVudDogRHJvcGRvd25Gb2N1c0hhbmRsZXIsXG4gICAgcHJpdmF0ZSBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gICAgdGhpcy5yZXNldENoaWxkcmVuKCk7XG4gICAgdGhpcy5tb3ZlVG9GaXJzdEl0ZW1XaGVuT3BlbigpO1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMuaGFuZGxlUm9vdEZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdW5saXN0ZW5GdW5jcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZCBieSBjbGlja2luZyBvbiB0aGUgdHJpZ2dlciwgd2UgYXV0b21hdGljYWxseSBtb3ZlIHRvIHRoZSBmaXJzdCBpdGVtXG4gICAqL1xuICBtb3ZlVG9GaXJzdEl0ZW1XaGVuT3BlbigpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlbiA9PiB7XG4gICAgICBpZiAob3BlbiAmJiB0aGlzLmlmT3BlblNlcnZpY2Uub3JpZ2luYWxFdmVudCkge1xuICAgICAgICAvLyBFdmVuIGlmIHdlIHByb3Blcmx5IHdhaXRlZCBmb3IgbmdBZnRlclZpZXdJbml0LCB0aGUgY29udGFpbmVyIHN0aWxsIHdvdWxkbid0IGJlIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gICAgICAgIC8vIFNvIHNldFRpbWVvdXQgaXMgdGhlIG9ubHkgd2F5IHRvIHdhaXQgZm9yIHRoZSBjb250YWluZXIgdG8gYmUgcmVhZHkgdG8gbW92ZSBmb2N1cyB0byBmaXJzdCBpdGVtLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmZvY3VzU2VydmljZS5tb3ZlVG8odGhpcyk7XG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzU2VydmljZS5tb3ZlKEFycm93S2V5RGlyZWN0aW9uLlJJR0hUKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UubW92ZShBcnJvd0tleURpcmVjdGlvbi5ET1dOKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0JhY2tPblRyaWdnZXIgPSBmYWxzZTtcblxuICAvKipcbiAgICogRm9jdXMgb24gdGhlIG1lbnUgd2hlbiBpdCBvcGVucywgYW5kIGZvY3VzIGJhY2sgb24gdGhlIHJvb3QgdHJpZ2dlciB3aGVuIHRoZSB3aG9sZSBkcm9wZG93biBiZWNvbWVzIGNsb3NlZFxuICAgKi9cbiAgaGFuZGxlUm9vdEZvY3VzKCkge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgIGlmICghb3Blbikge1xuICAgICAgICAvLyBXZSByZXNldCB0aGUgc3RhdGUgb2YgdGhlIGZvY3VzIHNlcnZpY2UgYm90aCBvbiBpbml0aWFsaXphdGlvbiBhbmQgd2hlbiBjbG9zaW5nLlxuICAgICAgICB0aGlzLmZvY3VzU2VydmljZS5yZXNldCh0aGlzKTtcbiAgICAgICAgLy8gQnV0IHdlIG9ubHkgYWN0aXZlbHkgZm9jdXMgdGhlIHRyaWdnZXIgd2hlbiBjbG9zaW5nLCBub3Qgb24gaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIGlmICh0aGlzLmZvY3VzQmFja09uVHJpZ2dlcikge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mb2N1c0JhY2tPblRyaWdnZXIgPSBvcGVuO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG4gIGdldCB0cmlnZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLl90cmlnZ2VyO1xuICB9XG4gIHNldCB0cmlnZ2VyKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3RyaWdnZXIgPSBlbDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ2lkJywgdGhpcy5pZCk7XG5cbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX3VubGlzdGVuRnVuY3MucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93cmlnaHQnLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3VubGlzdGVuRnVuY3MucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93dXAnLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSlcbiAgICAgICk7XG4gICAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5hcnJvd2Rvd24nLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSlcbiAgICAgICk7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5saXN0ZW5Ub0Fycm93S2V5cyhlbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgZ2V0IGNvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICB9XG4gIHNldCBjb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZWw7XG5cbiAgICAvLyB3aGV0aGVyIHJvb3QgY29udGFpbmVyIG9yIG5vdCwgdGFiIGtleSBzaG91bGQgYWx3YXlzIHRvZ2dsZSAoaS5lLiBjbG9zZSkgdGhlIGNvbnRhaW5lclxuICAgIHRoaXMuX3VubGlzdGVuRnVuY3MucHVzaChcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi50YWInLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAvLyBpZiBpdCdzIGEgbmVzdGVkIGNvbnRhaW5lciwgcHJlc3NpbmcgZXNjIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXMgcHJlc3NpbmcgbGVmdCBrZXksIHdoaWNoIGNsb3NlcyB0aGUgY3VycmVudFxuICAgICAgLy8gcG9wdXAgYW5kIG1vdmVzIHVwIHRvIGl0cyBwYXJlbnQuIEhlcmUsIHdlIHN0b3AgcHJvcGFnYXRpb24gc28gdGhhdCB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAgLy8gZG9lc24ndCByZWNlaXZlIHRoZSBlc2Mga2V5ZG93blxuICAgICAgdGhpcy5fdW5saXN0ZW5GdW5jcy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uZXNjJywgZXZlbnQgPT4ge1xuICAgICAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uTEVGVCwgZXZlbnQpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlIHJvb3QgY29udGFpbmVyIGlzIHRoZSBvbmx5IG9uZSB3ZSByZWdpc3RlciB0byB0aGUgZm9jdXMgc2VydmljZSwgb3RoZXJzIGRvIG5vdCBuZWVkIGZvY3VzXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5yZWdpc3RlckNvbnRhaW5lcihlbCk7XG5cbiAgICAgIC8vIFRoZSByb290IGNvbnRhaW5lciB3aWxsIHNpbXBseSBjbG9zZSB0aGUgY29udGFpbmVyIHdoZW4gZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5lc2MnLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSlcbiAgICAgICk7XG5cbiAgICAgIC8vIFdoZW4gdGhlIHVzZXIgbW92ZXMgZm9jdXMgb3V0c2lkZSBvZiB0aGUgbWVudSwgd2UgY2xvc2UgdGhlIGRyb3Bkb3duXG4gICAgICB0aGlzLl91bmxpc3RlbkZ1bmNzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnYmx1cicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyB3ZSBjbGVhciBvdXQgYW55IGV4aXN0aW5nIGZvY3VzIG9uIHRoZSBpdGVtc1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoaXRlbXMgPT4gaXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYmx1cigpKSk7XG5cbiAgICAgICAgICAvLyBldmVudC5yZWxhdGVkVGFyZ2V0IGlzIG51bGwgaW4gSUUxMS4gSW4gdGhhdCBjYXNlIHdlIHVzZSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHdoaWNoIGNvcnJlY3RseSBwb2ludHNcbiAgICAgICAgICAvLyB0byB0aGUgZWxlbWVudCB3ZSB3YW50IHRvIGNoZWNrLiBOb3RlIHRoYXQgb3RoZXIgYnJvd3NlcnMgbWlnaHQgcG9pbnQgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB0byB0aGVcbiAgICAgICAgICAvLyB3cm9uZyBlbGVtZW50LiBUaGlzIGlzIG9rLCBiZWNhdXNlIGFsbCB0aGUgb3RoZXIgYnJvd3NlcnMgd2Ugc3VwcG9ydCByZWxpZXMgb24gZXZlbnQucmVsYXRlZFRhcmdldC5cbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgdXNlciBjbGlja3Mgb24gYW4gaXRlbSB3aGljaCB0cmlnZ2VycyB0aGUgYmx1ciwgd2UgZG9uJ3Qgd2FudCB0byBjbG9zZSBpdCBzaW5jZSBpdCBtYXkgb3BlbiBhIHN1Ym1lbnUuXG4gICAgICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgbmVlZGluZyB0byBjbG9zZSBpdCAoaS5lLiB1c2VyIHNlbGVjdGVkIGFuIGl0ZW0gYW5kIHRoZSBkcm9wZG93biBtZW51IGlzIHNldCB0byBjbG9zZSBvblxuICAgICAgICAgIC8vIHNlbGVjdGlvbiksIGRyb3Bkb3duLWl0ZW0udHMgaGFuZGxlcyBpdC5cbiAgICAgICAgICBpZiAodGFyZ2V0ICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmIChlbC5jb250YWlucyh0YXJnZXQpIHx8IHRhcmdldCA9PT0gdGhpcy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gV2UgbGV0IHRoZSB1c2VyIG1vdmUgZm9jdXMgdG8gd2hlcmUgdGhlIHdhbnQsIHdlIGRvbid0IGZvcmNlIHRoZSBmb2N1cyBiYWNrIG9uIHRoZSB0cmlnZ2VyXG4gICAgICAgICAgdGhpcy5mb2N1c0JhY2tPblRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMudHJpZ2dlci5mb2N1cygpO1xuICAgIH1cbiAgfVxuICBibHVyKCkge1xuICAgIGlmICh0aGlzLnRyaWdnZXIgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy50cmlnZ2VyLmJsdXIoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy50cmlnZ2VyLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGlsZHJlbjogUmVwbGF5U3ViamVjdDxGb2N1c2FibGVJdGVtW10+O1xuICByaWdodD86IE9ic2VydmFibGU8Rm9jdXNhYmxlSXRlbT47XG4gIGRvd24/OiBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xuICB1cD86IE9ic2VydmFibGU8Rm9jdXNhYmxlSXRlbT47XG5cbiAgcHJpdmF0ZSBvcGVuQW5kR2V0Q2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHdyYXBPYnNlcnZhYmxlKHRoaXMuY2hpbGRyZW4sICgpID0+ICh0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IHRydWUpKTtcbiAgfVxuICBwcml2YXRlIGNsb3NlQW5kR2V0VGhpcygpIHtcbiAgICByZXR1cm4gd3JhcE9ic2VydmFibGUob2YodGhpcyksICgpID0+ICh0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlKSk7XG4gIH1cblxuICByZXNldENoaWxkcmVuKCkge1xuICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgUmVwbGF5U3ViamVjdDxGb2N1c2FibGVJdGVtW10+KDEpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5yaWdodCA9IHRoaXMub3BlbkFuZEdldENoaWxkcmVuKCkucGlwZShtYXAoYWxsID0+IGFsbFswXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvd24gPSB0aGlzLm9wZW5BbmRHZXRDaGlsZHJlbigpLnBpcGUobWFwKGFsbCA9PiBhbGxbMF0pKTtcbiAgICAgIHRoaXMudXAgPSB0aGlzLm9wZW5BbmRHZXRDaGlsZHJlbigpLnBpcGUobWFwKGFsbCA9PiBhbGxbYWxsLmxlbmd0aCAtIDFdKSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2hpbGRyZW4oY2hpbGRyZW46IEZvY3VzYWJsZUl0ZW1bXSkge1xuICAgIGxpbmtWZXJ0aWNhbChjaGlsZHJlbik7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICBsaW5rUGFyZW50KGNoaWxkcmVuLCB0aGlzLmNsb3NlQW5kR2V0VGhpcygpLCBBcnJvd0tleURpcmVjdGlvbi5MRUZUKTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbi5uZXh0KGNoaWxkcmVuKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3VubGlzdGVuRnVuY3MuZm9yRWFjaCgodW5saXN0ZW46ICgpID0+IHZvaWQpID0+IHVubGlzdGVuKCkpO1xuICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmRldGFjaExpc3RlbmVycygpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9GT0NVU19IQU5ETEVSX1BST1ZJREVSID0gY3VzdG9tRm9jdXNhYmxlSXRlbVByb3ZpZGVyKERyb3Bkb3duRm9jdXNIYW5kbGVyKTtcbiJdfQ==