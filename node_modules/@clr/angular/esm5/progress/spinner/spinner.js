import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';
var ClrSpinner = /** @class */ (function () {
    function ClrSpinner() {
    }
    Object.defineProperty(ClrSpinner.prototype, "spinnerClass", {
        /**
         * Default class for all spinners. This class is always true
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "inlineClass", {
        get: function () {
            return this._inline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrInline", {
        set: function (value) {
            this._inline = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "inverseClass", {
        get: function () {
            return this._inverse;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrInverse", {
        set: function (value) {
            this._inverse = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "smallClass", {
        get: function () {
            return this._small;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrSmall", {
        set: function (value) {
            this._small = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "mediumClass", {
        get: function () {
            if (this._small) {
                return false;
            }
            return this._medium;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrMedium", {
        set: function (value) {
            this._medium = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "setAriaLive", {
        get: function () {
            if (isBooleanAttributeSet(this.assertive)) {
                return 'assertive';
            }
            if (isBooleanAttributeSet(this.off)) {
                return 'off';
            }
            return 'polite';
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        HostBinding('class.spinner'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrSpinner.prototype, "spinnerClass", null);
    tslib_1.__decorate([
        HostBinding('class.spinner-inline'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrSpinner.prototype, "inlineClass", null);
    tslib_1.__decorate([
        Input('clrInline'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrSpinner.prototype, "clrInline", null);
    tslib_1.__decorate([
        HostBinding('class.spinner-inverse'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrSpinner.prototype, "inverseClass", null);
    tslib_1.__decorate([
        Input('clrInverse'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrSpinner.prototype, "clrInverse", null);
    tslib_1.__decorate([
        HostBinding('class.spinner-sm'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrSpinner.prototype, "smallClass", null);
    tslib_1.__decorate([
        Input('clrSmall'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrSpinner.prototype, "clrSmall", null);
    tslib_1.__decorate([
        HostBinding('class.spinner-md'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrSpinner.prototype, "mediumClass", null);
    tslib_1.__decorate([
        Input('clrMedium'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrSpinner.prototype, "clrMedium", null);
    tslib_1.__decorate([
        Input('clrAssertive'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrSpinner.prototype, "assertive", void 0);
    tslib_1.__decorate([
        Input('clrOff'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrSpinner.prototype, "off", void 0);
    ClrSpinner = tslib_1.__decorate([
        Component({
            selector: 'clr-spinner',
            template: "\n    <ng-content></ng-content>\n  ",
            host: {
                '[attr.aria-live]': 'setAriaLive',
                '[attr.aria-busy]': 'true',
            }
        })
    ], ClrSpinner);
    return ClrSpinner;
}());
export { ClrSpinner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb2dyZXNzL3NwaW5uZXIvc3Bpbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQVl2RjtJQUFBO0lBd0dBLENBQUM7SUFuR0Msc0JBQUksb0NBQVk7UUFKaEI7O1dBRUc7YUFFSDtZQUNFLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxtQ0FBVzthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksaUNBQVM7YUFBYixVQUFjLEtBQXVCO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFJRCxzQkFBSSxvQ0FBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGtDQUFVO2FBQWQsVUFBZSxLQUF1QjtZQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBYUQsc0JBQUksa0NBQVU7YUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGdDQUFRO2FBQVosVUFBYSxLQUF1QjtZQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBZUQsc0JBQUksbUNBQVc7YUFBZjtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksaUNBQVM7YUFBYixVQUFjLEtBQXVCO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFvQkQsc0JBQUksbUNBQVc7YUFBZjtZQUNFLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN6QyxPQUFPLFdBQVcsQ0FBQzthQUNwQjtZQUNELElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFsR0Q7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzs7a0RBRzVCO0lBS0Q7UUFEQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7OztpREFHbkM7SUFHRDtRQURDLEtBQUssQ0FBQyxXQUFXLENBQUM7OzsrQ0FHbEI7SUFJRDtRQURDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQzs7O2tEQUdwQztJQUdEO1FBREMsS0FBSyxDQUFDLFlBQVksQ0FBQzs7O2dEQUduQjtJQWFEO1FBREMsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzs7Z0RBRy9CO0lBR0Q7UUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDOzs7OENBR2pCO0lBZUQ7UUFEQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7OztpREFNL0I7SUFHRDtRQURDLEtBQUssQ0FBQyxXQUFXLENBQUM7OzsrQ0FHbEI7SUFpQnNCO1FBQXRCLEtBQUssQ0FBQyxjQUFjLENBQUM7O2lEQUFvQjtJQUN6QjtRQUFoQixLQUFLLENBQUMsUUFBUSxDQUFDOzsyQ0FBYztJQTdGbkIsVUFBVTtRQVZ0QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUscUNBRVQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osa0JBQWtCLEVBQUUsYUFBYTtnQkFDakMsa0JBQWtCLEVBQUUsTUFBTTthQUMzQjtTQUNGLENBQUM7T0FDVyxVQUFVLENBd0d0QjtJQUFELGlCQUFDO0NBQUEsQUF4R0QsSUF3R0M7U0F4R1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQvaXMtYm9vbGVhbi1hdHRyaWJ1dGUtc2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXNwaW5uZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5hcmlhLWxpdmVdJzogJ3NldEFyaWFMaXZlJyxcbiAgICAnW2F0dHIuYXJpYS1idXN5XSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3Bpbm5lciB7XG4gIC8qKlxuICAgKiBEZWZhdWx0IGNsYXNzIGZvciBhbGwgc3Bpbm5lcnMuIFRoaXMgY2xhc3MgaXMgYWx3YXlzIHRydWVcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3Bpbm5lcicpXG4gIGdldCBzcGlubmVyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBTdHlsZVxuICBwcml2YXRlIF9pbmxpbmU6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3Bpbm5lci1pbmxpbmUnKVxuICBnZXQgaW5saW5lQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lubGluZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xySW5saW5lJylcbiAgc2V0IGNscklubGluZSh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuX2lubGluZSA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9pbnZlcnNlOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNwaW5uZXItaW52ZXJzZScpXG4gIGdldCBpbnZlcnNlQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2U7XG4gIH1cblxuICBASW5wdXQoJ2NsckludmVyc2UnKVxuICBzZXQgY2xySW52ZXJzZSh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuX2ludmVyc2UgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgLy8gU2l6ZVxuICAvKipcbiAgICogQnkgZGVmYXVsdCBhbGwgc3Bpbm5lcnMgYXJlIExhcmdlLiAoc3Bpbm5lci1sZylcbiAgICogVG8gY2hhbmdlIHRoZSBzaXplIHlvdSBuZWVkIHRvIHVzZSBzZXQgY2xyU21hbGwgb3IgY2xyTWVkaXVtIHRvIFRSVUUvXG4gICAqL1xuXG4gIC8qKlxuICAgKiBTbWFsbFxuICAgKi9cbiAgcHJpdmF0ZSBfc21hbGw6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3Bpbm5lci1zbScpXG4gIGdldCBzbWFsbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9zbWFsbDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU21hbGwnKVxuICBzZXQgY2xyU21hbGwodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9zbWFsbCA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjbHJTbWFsbCAmIGNsck1lZGl1bSBhcmUgc2V0IGJvdGggdG8gdHJ1ZS5cbiAgICogVGhlIENTUyB3aXRoIGhpZ2ggcHJpb3JpdHkgd2lsbCBiZSBzbWFsbCAtIHNvIG1lZGl1bSBzaXplIHdpbGwgYmUgaWdub3JlZC5cbiAgICpcbiAgICogRm9yIHRoaXMgcmVhc29uIGlmIGNsclNtYWxsIGlzIHNldCB3ZSB3b24ndCBhZGQgY2xyTWVkaXVtIGNsYXNzLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGlzIGRpY3RhdGVkIGJ5IHRoZSBDU1MgcnVsZXMuXG4gICAqIERPTidUIFVTRSBjbHJTbWFsbCAmIGNsck1lZGl1bSB0byB0b2dnbGUgY2xhc3Nlcy4gVGhpcyBjb3VsZCBjaGFuZ2Ugd2l0aG91dCBub3RpY2UuXG4gICAqXG4gICAqIEFsc28gdGhlcmUgaXMgbm8gbG9naWNhbCBuZWVkIHRvIGhhdmUgYm90aCBvZiB0aGVtIHNldCB0byBUUlVFIG9yIEZBTFNFLlxuICAgKi9cbiAgcHJpdmF0ZSBfbWVkaXVtOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNwaW5uZXItbWQnKVxuICBnZXQgbWVkaXVtQ2xhc3MoKSB7XG4gICAgaWYgKHRoaXMuX3NtYWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tZWRpdW07XG4gIH1cblxuICBASW5wdXQoJ2Nsck1lZGl1bScpXG4gIHNldCBjbHJNZWRpdW0odmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9tZWRpdW0gPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgLy8gQXJpYSBMaXZlXG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgYXJpYS1saXZlIHdpbGwgYmUgc2V0IHRvIGBwb2xpdGVgIC5cbiAgICogVG8gY2hhbmdlIGlzIGl0IHlvdSBuZWVkIHRvIHNldCBjbHJBc3NlcnRpdmUgb3IgY2xyT2ZmIHRvIFRSVUVcbiAgICpcbiAgICogVGhlcmUgaXMgcHJpb3JpdHk6XG4gICAqICAgRGVmYXVsdDogcG9saXRlXG4gICAqICAgQXNlcnRpdmVcbiAgICogICBPZmZcbiAgICpcbiAgICogSW4gY2FzZSB3aGVuIGZvciBzb21lIHJlYXNvbiB5b3UgaGF2ZSBjbHJBc3NlcnRpdmU9VFJVRSBhbmQgY2xyT2ZmPVRSVUUsXG4gICAqIHdlIGdvbm5hIHNldCBgYXNzZXJ0aXZlYCBhcyB2YWx1ZSBvZiBhcmlhLWxpdmUuXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NsckFzc2VydGl2ZScpIGFzc2VydGl2ZTogYm9vbGVhbjtcbiAgQElucHV0KCdjbHJPZmYnKSBvZmY6IGJvb2xlYW47XG5cbiAgZ2V0IHNldEFyaWFMaXZlKCkge1xuICAgIGlmIChpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodGhpcy5hc3NlcnRpdmUpKSB7XG4gICAgICByZXR1cm4gJ2Fzc2VydGl2ZSc7XG4gICAgfVxuICAgIGlmIChpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodGhpcy5vZmYpKSB7XG4gICAgICByZXR1cm4gJ29mZic7XG4gICAgfVxuICAgIHJldHVybiAncG9saXRlJztcbiAgfVxufVxuIl19