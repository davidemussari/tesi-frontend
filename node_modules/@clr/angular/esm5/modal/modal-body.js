/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener } from '@angular/core';
/**
 * Allows modal overflow area to be scrollable via keyboard.
 * The modal body will focus with keyboard navigation only.
 * This allows inner focusable items to be focused without
 * the overflow scroll being focused.
 */
var ClrModalBody = /** @class */ (function () {
    function ClrModalBody() {
        this._mouseDown = false;
    }
    ClrModalBody.prototype.focus = function (event) {
        if (this._mouseDown) {
            event.target.blur();
        }
    };
    ClrModalBody.prototype.mouseDown = function () {
        this._mouseDown = true;
    };
    ClrModalBody.prototype.mouseUp = function () {
        this._mouseDown = false;
    };
    tslib_1.__decorate([
        HostListener('focus', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrModalBody.prototype, "focus", null);
    tslib_1.__decorate([
        HostListener('mousedown'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrModalBody.prototype, "mouseDown", null);
    tslib_1.__decorate([
        HostListener('mouseup'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrModalBody.prototype, "mouseUp", null);
    ClrModalBody = tslib_1.__decorate([
        Directive({
            selector: '.modal-body',
            host: {
                '[attr.tabindex]': '"0"',
            },
        })
    ], ClrModalBody);
    return ClrModalBody;
}());
export { ClrModalBody };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYm9keS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLWJvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RDs7Ozs7R0FLRztBQU9IO0lBTkE7UUFPVSxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBa0I3QixDQUFDO0lBZkMsNEJBQUssR0FBTCxVQUFNLEtBQUs7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFHRCxnQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUdELDhCQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBZEQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7NkNBS2pDO0lBR0Q7UUFEQyxZQUFZLENBQUMsV0FBVyxDQUFDOzs7O2lEQUd6QjtJQUdEO1FBREMsWUFBWSxDQUFDLFNBQVMsQ0FBQzs7OzsrQ0FHdkI7SUFsQlUsWUFBWTtRQU54QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixJQUFJLEVBQUU7Z0JBQ0osaUJBQWlCLEVBQUUsS0FBSzthQUN6QjtTQUNGLENBQUM7T0FDVyxZQUFZLENBbUJ4QjtJQUFELG1CQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBbGxvd3MgbW9kYWwgb3ZlcmZsb3cgYXJlYSB0byBiZSBzY3JvbGxhYmxlIHZpYSBrZXlib2FyZC5cbiAqIFRoZSBtb2RhbCBib2R5IHdpbGwgZm9jdXMgd2l0aCBrZXlib2FyZCBuYXZpZ2F0aW9uIG9ubHkuXG4gKiBUaGlzIGFsbG93cyBpbm5lciBmb2N1c2FibGUgaXRlbXMgdG8gYmUgZm9jdXNlZCB3aXRob3V0XG4gKiB0aGUgb3ZlcmZsb3cgc2Nyb2xsIGJlaW5nIGZvY3VzZWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJy5tb2RhbC1ib2R5JyxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50YWJpbmRleF0nOiAnXCIwXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJNb2RhbEJvZHkge1xuICBwcml2YXRlIF9tb3VzZURvd24gPSBmYWxzZTtcblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pXG4gIGZvY3VzKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX21vdXNlRG93bikge1xuICAgICAgZXZlbnQudGFyZ2V0LmJsdXIoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nKVxuICBtb3VzZURvd24oKSB7XG4gICAgdGhpcy5fbW91c2VEb3duID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnKVxuICBtb3VzZVVwKCkge1xuICAgIHRoaXMuX21vdXNlRG93biA9IGZhbHNlO1xuICB9XG59XG4iXX0=