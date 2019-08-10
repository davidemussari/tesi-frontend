import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
let ClrTooltipTrigger = class ClrTooltipTrigger {
    constructor(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    showTooltip() {
        this.ifOpenService.open = true;
    }
    hideTooltip() {
        this.ifOpenService.open = false;
    }
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
export { ClrTooltipTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd4RSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUM1QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFHLENBQUM7SUFJcEQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBSUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQTtBQVRDO0lBRkMsWUFBWSxDQUFDLFlBQVksQ0FBQztJQUMxQixZQUFZLENBQUMsT0FBTyxDQUFDOzs7O29EQUdyQjtBQUlEO0lBRkMsWUFBWSxDQUFDLFlBQVksQ0FBQztJQUMxQixZQUFZLENBQUMsTUFBTSxDQUFDOzs7O29EQUdwQjtBQWJVLGlCQUFpQjtJQUQ3QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7NkNBRS9FLGFBQWE7R0FEckMsaUJBQWlCLENBYzdCO1NBZFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyVG9vbHRpcFRyaWdnZXJdJywgaG9zdDogeyAnW2F0dHIudGFiaW5kZXhdJzogJzAnLCAnW2NsYXNzLnRvb2x0aXAtdHJpZ2dlcl0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENsclRvb2x0aXBUcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNob3dUb29sdGlwKCk6IHZvaWQge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgaGlkZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgfVxufVxuIl19