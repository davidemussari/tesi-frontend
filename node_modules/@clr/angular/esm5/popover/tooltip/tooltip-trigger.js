import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
var ClrTooltipTrigger = /** @class */ (function () {
    function ClrTooltipTrigger(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    ClrTooltipTrigger.prototype.showTooltip = function () {
        this.ifOpenService.open = true;
    };
    ClrTooltipTrigger.prototype.hideTooltip = function () {
        this.ifOpenService.open = false;
    };
    tslib_1.__decorate([
        HostListener('mouseenter'),
        HostListener('focus'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrTooltipTrigger.prototype, "showTooltip", null);
    tslib_1.__decorate([
        HostListener('mouseleave'),
        HostListener('blur'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrTooltipTrigger.prototype, "hideTooltip", null);
    ClrTooltipTrigger = tslib_1.__decorate([
        Directive({ selector: '[clrTooltipTrigger]', host: { '[attr.tabindex]': '0', '[class.tooltip-trigger]': 'true' } }),
        tslib_1.__metadata("design:paramtypes", [IfOpenService])
    ], ClrTooltipTrigger);
    return ClrTooltipTrigger;
}());
export { ClrTooltipTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd4RTtJQUNFLDJCQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFHLENBQUM7SUFJcEQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBSUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBUkQ7UUFGQyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQzFCLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7d0RBR3JCO0lBSUQ7UUFGQyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQzFCLFlBQVksQ0FBQyxNQUFNLENBQUM7Ozs7d0RBR3BCO0lBYlUsaUJBQWlCO1FBRDdCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztpREFFL0UsYUFBYTtPQURyQyxpQkFBaUIsQ0FjN0I7SUFBRCx3QkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclRvb2x0aXBUcmlnZ2VyXScsIGhvc3Q6IHsgJ1thdHRyLnRhYmluZGV4XSc6ICcwJywgJ1tjbGFzcy50b29sdGlwLXRyaWdnZXJdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJUb29sdGlwVHJpZ2dlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSkge31cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBzaG93VG9vbHRpcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIGhpZGVUb29sdGlwKCk6IHZvaWQge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==