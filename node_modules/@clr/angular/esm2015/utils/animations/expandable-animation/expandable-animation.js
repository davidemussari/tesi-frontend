/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
let ClrExpandableAnimation = class ClrExpandableAnimation {
    constructor(element, domAdapter) {
        this.element = element;
        this.domAdapter = domAdapter;
        this.startHeight = 0;
    }
    get expandAnimation() {
        return { value: this.clrExpandTrigger, params: { startHeight: this.startHeight } };
    }
    animationDone() {
        // A "safe" auto-update of the height ensuring basic OOTB user experience .
        // Prone to small jumps in initial animation height if data was changed in the meantime, window was resized, etc.
        // For optimal behavior call manually updateStartHeight() from the parent component before initiating the update.
        this.updateStartHeight();
    }
    updateStartHeight() {
        this.startHeight = this.domAdapter.computedHeight(this.element.nativeElement) || 0;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ClrExpandableAnimation.prototype, "clrExpandTrigger", void 0);
tslib_1.__decorate([
    HostBinding('@expandAnimation'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], ClrExpandableAnimation.prototype, "expandAnimation", null);
tslib_1.__decorate([
    HostListener('@expandAnimation.done'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrExpandableAnimation.prototype, "animationDone", null);
ClrExpandableAnimation = tslib_1.__decorate([
    Component({
        selector: 'clr-expandable-animation',
        template: `
    <ng-content></ng-content>
  `,
        animations: [
            trigger('expandAnimation', [
                transition('void => *', []),
                transition('* => *', [
                    style({ height: '{{startHeight}}px', overflow: 'hidden' }),
                    animate('0.2s ease-in-out', style({ height: '*' })),
                ]),
            ]),
        ],
        providers: [DomAdapter],
        styles: [`
    :host {
      display: block;
    }
  `]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef, DomAdapter])
], ClrExpandableAnimation);
export { ClrExpandableAnimation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kYWJsZS1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9hbmltYXRpb25zL2V4cGFuZGFibGUtYW5pbWF0aW9uL2V4cGFuZGFibGUtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQXlCM0QsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFLakMsWUFBb0IsT0FBbUIsRUFBVSxVQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUZ2RSxnQkFBVyxHQUFXLENBQUMsQ0FBQztJQUVrRCxDQUFDO0lBRzNFLElBQUksZUFBZTtRQUNqQixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7SUFDckYsQ0FBQztJQUdELGFBQWE7UUFDWCwyRUFBMkU7UUFDM0UsaUhBQWlIO1FBQ2pILGlIQUFpSDtRQUNqSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0YsQ0FBQTtBQXRCVTtJQUFSLEtBQUssRUFBRTs7Z0VBQXVCO0FBTy9CO0lBREMsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzs7NkRBRy9CO0FBR0Q7SUFEQyxZQUFZLENBQUMsdUJBQXVCLENBQUM7Ozs7MkRBTXJDO0FBbEJVLHNCQUFzQjtJQXZCbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxRQUFRLEVBQUU7O0dBRVQ7UUFRRCxVQUFVLEVBQUU7WUFDVixPQUFPLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3pCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2dCQUMzQixVQUFVLENBQUMsUUFBUSxFQUFFO29CQUNuQixLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO29CQUMxRCxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQ3BELENBQUM7YUFDSCxDQUFDO1NBQ0g7UUFDRCxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBZnJCOzs7O0dBSUQ7S0FZRixDQUFDOzZDQU02QixVQUFVLEVBQXNCLFVBQVU7R0FMNUQsc0JBQXNCLENBdUJsQztTQXZCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1leHBhbmRhYmxlLWFuaW1hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICBgLFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZXhwYW5kQW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW10pLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiAqJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogJ3t7c3RhcnRIZWlnaHR9fXB4Jywgb3ZlcmZsb3c6ICdoaWRkZW4nIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0Jywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICBdKSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbRG9tQWRhcHRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIENsckV4cGFuZGFibGVBbmltYXRpb24ge1xuICBASW5wdXQoKSBjbHJFeHBhbmRUcmlnZ2VyOiBhbnk7XG5cbiAgc3RhcnRIZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIpIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdAZXhwYW5kQW5pbWF0aW9uJylcbiAgZ2V0IGV4cGFuZEFuaW1hdGlvbigpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdGhpcy5jbHJFeHBhbmRUcmlnZ2VyLCBwYXJhbXM6IHsgc3RhcnRIZWlnaHQ6IHRoaXMuc3RhcnRIZWlnaHQgfSB9O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignQGV4cGFuZEFuaW1hdGlvbi5kb25lJylcbiAgYW5pbWF0aW9uRG9uZSgpIHtcbiAgICAvLyBBIFwic2FmZVwiIGF1dG8tdXBkYXRlIG9mIHRoZSBoZWlnaHQgZW5zdXJpbmcgYmFzaWMgT09UQiB1c2VyIGV4cGVyaWVuY2UgLlxuICAgIC8vIFByb25lIHRvIHNtYWxsIGp1bXBzIGluIGluaXRpYWwgYW5pbWF0aW9uIGhlaWdodCBpZiBkYXRhIHdhcyBjaGFuZ2VkIGluIHRoZSBtZWFudGltZSwgd2luZG93IHdhcyByZXNpemVkLCBldGMuXG4gICAgLy8gRm9yIG9wdGltYWwgYmVoYXZpb3IgY2FsbCBtYW51YWxseSB1cGRhdGVTdGFydEhlaWdodCgpIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnQgYmVmb3JlIGluaXRpYXRpbmcgdGhlIHVwZGF0ZS5cbiAgICB0aGlzLnVwZGF0ZVN0YXJ0SGVpZ2h0KCk7XG4gIH1cblxuICB1cGRhdGVTdGFydEhlaWdodCgpIHtcbiAgICB0aGlzLnN0YXJ0SGVpZ2h0ID0gdGhpcy5kb21BZGFwdGVyLmNvbXB1dGVkSGVpZ2h0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB8fCAwO1xuICB9XG59XG4iXX0=