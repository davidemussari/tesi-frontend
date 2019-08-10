import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Inject, Injector, Input, Optional } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { Point } from '../common/popover';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
var POSITIONS = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
var SIZES = ['xs', 'sm', 'md', 'lg'];
var ClrTooltipContent = /** @class */ (function (_super) {
    tslib_1.__extends(ClrTooltipContent, _super);
    function ClrTooltipContent(injector, parentHost) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        _this = _super.call(this, injector, parentHost) || this;
        // Defaults
        _this.position = 'right';
        _this.size = 'sm';
        return _this;
    }
    Object.defineProperty(ClrTooltipContent.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            // Ugh
            this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);
            if (position && POSITIONS.indexOf(position) > -1) {
                this._position = position;
            }
            else {
                this._position = 'right';
            }
            // Ugh
            this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.position);
            // set the popover values based on direction
            switch (position) {
                case 'top-right':
                    this.anchorPoint = Point.TOP_CENTER;
                    this.popoverPoint = Point.LEFT_BOTTOM;
                    break;
                case 'top-left':
                    this.anchorPoint = Point.TOP_CENTER;
                    this.popoverPoint = Point.RIGHT_BOTTOM;
                    break;
                case 'bottom-right':
                    this.anchorPoint = Point.BOTTOM_CENTER;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
                case 'bottom-left':
                    this.anchorPoint = Point.BOTTOM_CENTER;
                    this.popoverPoint = Point.RIGHT_TOP;
                    break;
                case 'right':
                    this.anchorPoint = Point.RIGHT_CENTER;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
                case 'left':
                    this.anchorPoint = Point.LEFT_CENTER;
                    this.popoverPoint = Point.RIGHT_TOP;
                    break;
                default:
                    this.anchorPoint = Point.RIGHT_CENTER;
                    this.popoverPoint = Point.LEFT_TOP;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTooltipContent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            // Ugh
            this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);
            if (size && SIZES.indexOf(size) > -1) {
                this._size = size;
            }
            else {
                this._size = 'sm';
            }
            // Ugh
            this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.size);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input('clrPosition'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTooltipContent.prototype, "position", null);
    tslib_1.__decorate([
        Input('clrSize'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTooltipContent.prototype, "size", null);
    ClrTooltipContent = tslib_1.__decorate([
        Component({
            selector: 'clr-tooltip-content',
            template: "\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.tooltip-content]': 'true',
                // I'm giving up on animation, they did not work before and will not work now.
                // Too many conflicts with Clarity UI.
                '[style.opacity]': '1',
            }
        }),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(1, Inject(POPOVER_HOST_ANCHOR)),
        tslib_1.__metadata("design:paramtypes", [Injector,
            ElementRef])
    ], ClrTooltipContent);
    return ClrTooltipContent;
}(AbstractPopover));
export { ClrTooltipContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTFFLElBQU0sU0FBUyxHQUFhLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUV0RyxJQUFNLEtBQUssR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBY2pEO0lBQXVDLDZDQUFlO0lBQ3BELDJCQUNFLFFBQWtCLEVBR2xCLFVBQXNCO1FBSnhCLGlCQWFDO1FBUEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztTQUNwRjtRQUNELFFBQUEsa0JBQU0sUUFBUSxFQUFFLFVBQVUsQ0FBQyxTQUFDO1FBQzVCLFdBQVc7UUFDWCxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDbkIsQ0FBQztJQUlELHNCQUFJLHVDQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzthQUdELFVBQWEsUUFBZ0I7WUFDM0IsTUFB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QyxLQUFLLENBQUMsU0FBUyxDQUFDOzs7aURBV2hCO0lBcEZVLGlCQUFpQjtRQVo3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSwyQ0FFUDtZQUNILElBQUksRUFBRTtnQkFDSix5QkFBeUIsRUFBRSxNQUFNO2dCQUNqQyw4RUFBOEU7Z0JBQzlFLHNDQUFzQztnQkFDdEMsaUJBQWlCLEVBQUUsR0FBRzthQUN2QjtTQUNGLENBQUM7UUFJRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO2lEQUZsQixRQUFRO1lBR04sVUFBVTtPQUxiLGlCQUFpQixDQXFGN0I7SUFBRCx3QkFBQztDQUFBLEFBckZELENBQXVDLGVBQWUsR0FxRnJEO1NBckZZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RvciwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFBvcG92ZXIgfSBmcm9tICcuLi9jb21tb24vYWJzdHJhY3QtcG9wb3Zlcic7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL2NvbW1vbi9wb3BvdmVyJztcbmltcG9ydCB7IFBPUE9WRVJfSE9TVF9BTkNIT1IgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlci1ob3N0LWFuY2hvci50b2tlbic7XG5cbmNvbnN0IFBPU0lUSU9OUzogc3RyaW5nW10gPSBbJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLCAncmlnaHQnLCAnbGVmdCddO1xuXG5jb25zdCBTSVpFUzogc3RyaW5nW10gPSBbJ3hzJywgJ3NtJywgJ21kJywgJ2xnJ107XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10b29sdGlwLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudG9vbHRpcC1jb250ZW50XSc6ICd0cnVlJyxcbiAgICAvLyBJJ20gZ2l2aW5nIHVwIG9uIGFuaW1hdGlvbiwgdGhleSBkaWQgbm90IHdvcmsgYmVmb3JlIGFuZCB3aWxsIG5vdCB3b3JrIG5vdy5cbiAgICAvLyBUb28gbWFueSBjb25mbGljdHMgd2l0aCBDbGFyaXR5IFVJLlxuICAgICdbc3R5bGUub3BhY2l0eV0nOiAnMScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRvb2x0aXBDb250ZW50IGV4dGVuZHMgQWJzdHJhY3RQb3BvdmVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChQT1BPVkVSX0hPU1RfQU5DSE9SKVxuICAgIHBhcmVudEhvc3Q6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgaWYgKCFwYXJlbnRIb3N0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci10b29sdGlwLWNvbnRlbnQgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHItdG9vbHRpcCcpO1xuICAgIH1cbiAgICBzdXBlcihpbmplY3RvciwgcGFyZW50SG9zdCk7XG4gICAgLy8gRGVmYXVsdHNcbiAgICB0aGlzLnBvc2l0aW9uID0gJ3JpZ2h0JztcbiAgICB0aGlzLnNpemUgPSAnc20nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcG9zaXRpb246IHN0cmluZztcblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG5cbiAgQElucHV0KCdjbHJQb3NpdGlvbicpXG4gIHNldCBwb3NpdGlvbihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgLy8gVWdoXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b29sdGlwLScgKyB0aGlzLnBvc2l0aW9uKTtcbiAgICBpZiAocG9zaXRpb24gJiYgUE9TSVRJT05TLmluZGV4T2YocG9zaXRpb24pID4gLTEpIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gJ3JpZ2h0JztcbiAgICB9XG4gICAgLy8gVWdoXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b29sdGlwLScgKyB0aGlzLnBvc2l0aW9uKTtcblxuICAgIC8vIHNldCB0aGUgcG9wb3ZlciB2YWx1ZXMgYmFzZWQgb24gZGlyZWN0aW9uXG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlRPUF9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuVE9QX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tLXJpZ2h0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkJPVFRPTV9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tLWxlZnQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuUklHSFRfQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuTEVGVF9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5SSUdIVF9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU2l6ZScpXG4gIHNldCBzaXplKHNpemU6IHN0cmluZykge1xuICAgIC8vIFVnaFxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9vbHRpcC0nICsgdGhpcy5zaXplKTtcbiAgICBpZiAoc2l6ZSAmJiBTSVpFUy5pbmRleE9mKHNpemUpID4gLTEpIHtcbiAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zaXplID0gJ3NtJztcbiAgICB9XG4gICAgLy8gVWdoXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b29sdGlwLScgKyB0aGlzLnNpemUpO1xuICB9XG59XG4iXX0=