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
let ClrModalBody = class ClrModalBody {
    /**
     * Allows modal overflow area to be scrollable via keyboard.
     * The modal body will focus with keyboard navigation only.
     * This allows inner focusable items to be focused without
     * the overflow scroll being focused.
     */
    constructor() {
        this._mouseDown = false;
    }
    focus(event) {
        if (this._mouseDown) {
            event.target.blur();
        }
    }
    mouseDown() {
        this._mouseDown = true;
    }
    mouseUp() {
        this._mouseDown = false;
    }
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
export { ClrModalBody };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYm9keS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLWJvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RDs7Ozs7R0FLRztBQU9ILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFaekI7Ozs7O09BS0c7SUFDSDtRQU9VLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFrQjdCLENBQUM7SUFmQyxLQUFLLENBQUMsS0FBSztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUdELFNBQVM7UUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBR0QsT0FBTztRQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFBO0FBZkM7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7eUNBS2pDO0FBR0Q7SUFEQyxZQUFZLENBQUMsV0FBVyxDQUFDOzs7OzZDQUd6QjtBQUdEO0lBREMsWUFBWSxDQUFDLFNBQVMsQ0FBQzs7OzsyQ0FHdkI7QUFsQlUsWUFBWTtJQU54QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixJQUFJLEVBQUU7WUFDSixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCO0tBQ0YsQ0FBQztHQUNXLFlBQVksQ0FtQnhCO1NBbkJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQWxsb3dzIG1vZGFsIG92ZXJmbG93IGFyZWEgdG8gYmUgc2Nyb2xsYWJsZSB2aWEga2V5Ym9hcmQuXG4gKiBUaGUgbW9kYWwgYm9keSB3aWxsIGZvY3VzIHdpdGgga2V5Ym9hcmQgbmF2aWdhdGlvbiBvbmx5LlxuICogVGhpcyBhbGxvd3MgaW5uZXIgZm9jdXNhYmxlIGl0ZW1zIHRvIGJlIGZvY3VzZWQgd2l0aG91dFxuICogdGhlIG92ZXJmbG93IHNjcm9sbCBiZWluZyBmb2N1c2VkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICcubW9kYWwtYm9keScsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ1wiMFwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTW9kYWxCb2R5IHtcbiAgcHJpdmF0ZSBfbW91c2VEb3duID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKVxuICBmb2N1cyhldmVudCkge1xuICAgIGlmICh0aGlzLl9tb3VzZURvd24pIHtcbiAgICAgIGV2ZW50LnRhcmdldC5ibHVyKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJylcbiAgbW91c2VEb3duKCkge1xuICAgIHRoaXMuX21vdXNlRG93biA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJylcbiAgbW91c2VVcCgpIHtcbiAgICB0aGlzLl9tb3VzZURvd24gPSBmYWxzZTtcbiAgfVxufVxuIl19