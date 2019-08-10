/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
var ClrExpandableAnimation = /** @class */ (function () {
    function ClrExpandableAnimation(element, domAdapter) {
        this.element = element;
        this.domAdapter = domAdapter;
        this.startHeight = 0;
    }
    Object.defineProperty(ClrExpandableAnimation.prototype, "expandAnimation", {
        get: function () {
            return { value: this.clrExpandTrigger, params: { startHeight: this.startHeight } };
        },
        enumerable: true,
        configurable: true
    });
    ClrExpandableAnimation.prototype.animationDone = function () {
        // A "safe" auto-update of the height ensuring basic OOTB user experience .
        // Prone to small jumps in initial animation height if data was changed in the meantime, window was resized, etc.
        // For optimal behavior call manually updateStartHeight() from the parent component before initiating the update.
        this.updateStartHeight();
    };
    ClrExpandableAnimation.prototype.updateStartHeight = function () {
        this.startHeight = this.domAdapter.computedHeight(this.element.nativeElement) || 0;
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
            template: "\n    <ng-content></ng-content>\n  ",
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
            styles: ["\n    :host {\n      display: block;\n    }\n  "]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, DomAdapter])
    ], ClrExpandableAnimation);
    return ClrExpandableAnimation;
}());
export { ClrExpandableAnimation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kYWJsZS1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9hbmltYXRpb25zL2V4cGFuZGFibGUtYW5pbWF0aW9uL2V4cGFuZGFibGUtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQXlCM0Q7SUFLRSxnQ0FBb0IsT0FBbUIsRUFBVSxVQUFzQjtRQUFuRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUZ2RSxnQkFBVyxHQUFXLENBQUMsQ0FBQztJQUVrRCxDQUFDO0lBRzNFLHNCQUFJLG1EQUFlO2FBQW5CO1lBQ0UsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBQ3JGLENBQUM7OztPQUFBO0lBR0QsOENBQWEsR0FBYjtRQUNFLDJFQUEyRTtRQUMzRSxpSEFBaUg7UUFDakgsaUhBQWlIO1FBQ2pILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrREFBaUIsR0FBakI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFyQlE7UUFBUixLQUFLLEVBQUU7O29FQUF1QjtJQU8vQjtRQURDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQzs7O2lFQUcvQjtJQUdEO1FBREMsWUFBWSxDQUFDLHVCQUF1QixDQUFDOzs7OytEQU1yQztJQWxCVSxzQkFBc0I7UUF2QmxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsUUFBUSxFQUFFLHFDQUVUO1lBUUQsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtvQkFDekIsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7b0JBQzNCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7d0JBQzFELE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztxQkFDcEQsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7WUFDRCxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7cUJBZnJCLGlEQUlEO1NBWUYsQ0FBQztpREFNNkIsVUFBVSxFQUFzQixVQUFVO09BTDVELHNCQUFzQixDQXVCbEM7SUFBRCw2QkFBQztDQUFBLEFBdkJELElBdUJDO1NBdkJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWV4cGFuZGFibGUtYW5pbWF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIGAsXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdleHBhbmRBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IConLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAne3tzdGFydEhlaWdodH19cHgnLCBvdmVyZmxvdzogJ2hpZGRlbicgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxuICBwcm92aWRlcnM6IFtEb21BZGFwdGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRXhwYW5kYWJsZUFuaW1hdGlvbiB7XG4gIEBJbnB1dCgpIGNsckV4cGFuZFRyaWdnZXI6IGFueTtcblxuICBzdGFydEhlaWdodDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcikge31cblxuICBASG9zdEJpbmRpbmcoJ0BleHBhbmRBbmltYXRpb24nKVxuICBnZXQgZXhwYW5kQW5pbWF0aW9uKCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB0aGlzLmNsckV4cGFuZFRyaWdnZXIsIHBhcmFtczogeyBzdGFydEhlaWdodDogdGhpcy5zdGFydEhlaWdodCB9IH07XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdAZXhwYW5kQW5pbWF0aW9uLmRvbmUnKVxuICBhbmltYXRpb25Eb25lKCkge1xuICAgIC8vIEEgXCJzYWZlXCIgYXV0by11cGRhdGUgb2YgdGhlIGhlaWdodCBlbnN1cmluZyBiYXNpYyBPT1RCIHVzZXIgZXhwZXJpZW5jZSAuXG4gICAgLy8gUHJvbmUgdG8gc21hbGwganVtcHMgaW4gaW5pdGlhbCBhbmltYXRpb24gaGVpZ2h0IGlmIGRhdGEgd2FzIGNoYW5nZWQgaW4gdGhlIG1lYW50aW1lLCB3aW5kb3cgd2FzIHJlc2l6ZWQsIGV0Yy5cbiAgICAvLyBGb3Igb3B0aW1hbCBiZWhhdmlvciBjYWxsIG1hbnVhbGx5IHVwZGF0ZVN0YXJ0SGVpZ2h0KCkgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudCBiZWZvcmUgaW5pdGlhdGluZyB0aGUgdXBkYXRlLlxuICAgIHRoaXMudXBkYXRlU3RhcnRIZWlnaHQoKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXJ0SGVpZ2h0KCkge1xuICAgIHRoaXMuc3RhcnRIZWlnaHQgPSB0aGlzLmRvbUFkYXB0ZXIuY29tcHV0ZWRIZWlnaHQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHx8IDA7XG4gIH1cbn1cbiJdfQ==