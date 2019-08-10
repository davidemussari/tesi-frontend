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
const POSITIONS = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
const SIZES = ['xs', 'sm', 'md', 'lg'];
let ClrTooltipContent = class ClrTooltipContent extends AbstractPopover {
    constructor(injector, parentHost) {
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        super(injector, parentHost);
        // Defaults
        this.position = 'right';
        this.size = 'sm';
    }
    get position() {
        return this._position;
    }
    set position(position) {
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
    }
    get size() {
        return this._size;
    }
    set size(size) {
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
    }
};
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
        template: `
        <ng-content></ng-content>
    `,
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
export { ClrTooltipContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Rvb2x0aXAtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTFFLE1BQU0sU0FBUyxHQUFhLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUV0RyxNQUFNLEtBQUssR0FBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBY2pELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsZUFBZTtJQUNwRCxZQUNFLFFBQWtCLEVBR2xCLFVBQXNCO1FBRXRCLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7U0FDcEY7UUFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLFdBQVc7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBSUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFHRCxJQUFJLFFBQVEsQ0FB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REMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7OzZDQVdoQjtBQXBGVSxpQkFBaUI7SUFaN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixRQUFRLEVBQUU7O0tBRVA7UUFDSCxJQUFJLEVBQUU7WUFDSix5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLDhFQUE4RTtZQUM5RSxzQ0FBc0M7WUFDdEMsaUJBQWlCLEVBQUUsR0FBRztTQUN2QjtLQUNGLENBQUM7SUFJRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLG1CQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBOzZDQUZsQixRQUFRO1FBR04sVUFBVTtHQUxiLGlCQUFpQixDQXFGN0I7U0FyRlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdG9yLCBJbnB1dCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0UG9wb3ZlciB9IGZyb20gJy4uL2NvbW1vbi9hYnN0cmFjdC1wb3BvdmVyJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXInO1xuaW1wb3J0IHsgUE9QT1ZFUl9IT1NUX0FOQ0hPUiB9IGZyb20gJy4uL2NvbW1vbi9wb3BvdmVyLWhvc3QtYW5jaG9yLnRva2VuJztcblxuY29uc3QgUE9TSVRJT05TOiBzdHJpbmdbXSA9IFsnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcsICdyaWdodCcsICdsZWZ0J107XG5cbmNvbnN0IFNJWkVTOiBzdHJpbmdbXSA9IFsneHMnLCAnc20nLCAnbWQnLCAnbGcnXTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRvb2x0aXAtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy50b29sdGlwLWNvbnRlbnRdJzogJ3RydWUnLFxuICAgIC8vIEknbSBnaXZpbmcgdXAgb24gYW5pbWF0aW9uLCB0aGV5IGRpZCBub3Qgd29yayBiZWZvcmUgYW5kIHdpbGwgbm90IHdvcmsgbm93LlxuICAgIC8vIFRvbyBtYW55IGNvbmZsaWN0cyB3aXRoIENsYXJpdHkgVUkuXG4gICAgJ1tzdHlsZS5vcGFjaXR5XSc6ICcxJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVG9vbHRpcENvbnRlbnQgZXh0ZW5kcyBBYnN0cmFjdFBvcG92ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KFBPUE9WRVJfSE9TVF9BTkNIT1IpXG4gICAgcGFyZW50SG9zdDogRWxlbWVudFJlZlxuICApIHtcbiAgICBpZiAoIXBhcmVudEhvc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyLXRvb2x0aXAtY29udGVudCBzaG91bGQgb25seSBiZSB1c2VkIGluc2lkZSBvZiBhIGNsci10b29sdGlwJyk7XG4gICAgfVxuICAgIHN1cGVyKGluamVjdG9yLCBwYXJlbnRIb3N0KTtcbiAgICAvLyBEZWZhdWx0c1xuICAgIHRoaXMucG9zaXRpb24gPSAncmlnaHQnO1xuICAgIHRoaXMuc2l6ZSA9ICdzbSc7XG4gIH1cblxuICBwcml2YXRlIF9wb3NpdGlvbjogc3RyaW5nO1xuXG4gIGdldCBwb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBASW5wdXQoJ2NsclBvc2l0aW9uJylcbiAgc2V0IHBvc2l0aW9uKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICAvLyBVZ2hcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Rvb2x0aXAtJyArIHRoaXMucG9zaXRpb24pO1xuICAgIGlmIChwb3NpdGlvbiAmJiBQT1NJVElPTlMuaW5kZXhPZihwb3NpdGlvbikgPiAtMSkge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSAncmlnaHQnO1xuICAgIH1cbiAgICAvLyBVZ2hcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Rvb2x0aXAtJyArIHRoaXMucG9zaXRpb24pO1xuXG4gICAgLy8gc2V0IHRoZSBwb3BvdmVyIHZhbHVlcyBiYXNlZCBvbiBkaXJlY3Rpb25cbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICBjYXNlICd0b3AtcmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuVE9QX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AtbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5UT1BfQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fQ0VOVEVSO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5SSUdIVF9DRU5URVI7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5MRUZUX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlJJR0hUX0NFTlRFUjtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2l6ZTogc3RyaW5nO1xuXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQElucHV0KCdjbHJTaXplJylcbiAgc2V0IHNpemUoc2l6ZTogc3RyaW5nKSB7XG4gICAgLy8gVWdoXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b29sdGlwLScgKyB0aGlzLnNpemUpO1xuICAgIGlmIChzaXplICYmIFNJWkVTLmluZGV4T2Yoc2l6ZSkgPiAtMSkge1xuICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NpemUgPSAnc20nO1xuICAgIH1cbiAgICAvLyBVZ2hcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Rvb2x0aXAtJyArIHRoaXMuc2l6ZSk7XG4gIH1cbn1cbiJdfQ==