import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';
var ClrProgressBar = /** @class */ (function () {
    function ClrProgressBar() {
        this.externalId = '';
        // Progress
        this.max = 100;
        this.value = 0;
    }
    Object.defineProperty(ClrProgressBar.prototype, "id", {
        get: function () {
            return this._ID;
        },
        set: function (value) {
            this._ID = value;
            this.externalId = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "progressClass", {
        // Styles
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "labeledClass", {
        get: function () {
            return this._labeled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrLabeled", {
        set: function (value) {
            this._labeled = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "fadeClass", {
        get: function () {
            return this._fade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrFade", {
        set: function (value) {
            this._fade = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "loopClass", {
        get: function () {
            return this._loop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrLoop", {
        set: function (value) {
            this._loop = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "successClass", {
        get: function () {
            return this._success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrSuccess", {
        set: function (value) {
            this._success = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "dangerClass", {
        get: function () {
            return this._danger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrDanger", {
        set: function (value) {
            this._danger = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "flashClass", {
        get: function () {
            return this._flash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrFlash", {
        set: function (value) {
            this._flash = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "flashDangerClass", {
        get: function () {
            return this._flashDanger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrFlashDanger", {
        set: function (value) {
            this._flashDanger = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "displayValue", {
        /**
         * Make sure that we always will have something that is readable
         * for the screen reader
         */
        get: function () {
            if (this.displayval) {
                return this.displayval;
            }
            return this.value + "%";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Display aria-live only when there is value and it's not 0 or equal to the max value
     */
    ClrProgressBar.prototype.displayAriaLive = function () {
        return (this.value !== undefined || this.value !== 0) && this.value !== this.max;
    };
    Object.defineProperty(ClrProgressBar.prototype, "ariaLive", {
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
        HostBinding('attr.id'),
        tslib_1.__metadata("design:type", String)
    ], ClrProgressBar.prototype, "externalId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrProgressBar.prototype, "id", null);
    tslib_1.__decorate([
        Input('clrMax'),
        tslib_1.__metadata("design:type", Number)
    ], ClrProgressBar.prototype, "max", void 0);
    tslib_1.__decorate([
        Input('clrValue'),
        tslib_1.__metadata("design:type", Number)
    ], ClrProgressBar.prototype, "value", void 0);
    tslib_1.__decorate([
        Input('clrDisplayval'),
        tslib_1.__metadata("design:type", String)
    ], ClrProgressBar.prototype, "displayval", void 0);
    tslib_1.__decorate([
        HostBinding('class.progress'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "progressClass", null);
    tslib_1.__decorate([
        HostBinding('class.labeled'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "labeledClass", null);
    tslib_1.__decorate([
        Input('clrLabeled'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrLabeled", null);
    tslib_1.__decorate([
        HostBinding('class.progress-fade'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "fadeClass", null);
    tslib_1.__decorate([
        Input('clrFade'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrFade", null);
    tslib_1.__decorate([
        HostBinding('class.loop'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "loopClass", null);
    tslib_1.__decorate([
        Input('clrLoop'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrLoop", null);
    tslib_1.__decorate([
        HostBinding('class.success'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "successClass", null);
    tslib_1.__decorate([
        Input('clrSuccess'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrSuccess", null);
    tslib_1.__decorate([
        HostBinding('class.danger'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "dangerClass", null);
    tslib_1.__decorate([
        Input('clrDanger'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrDanger", null);
    tslib_1.__decorate([
        HostBinding('class.flash'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "flashClass", null);
    tslib_1.__decorate([
        Input('clrFlash'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrFlash", null);
    tslib_1.__decorate([
        HostBinding('class.flash-danger'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrProgressBar.prototype, "flashDangerClass", null);
    tslib_1.__decorate([
        Input('clrFlashDanger'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrProgressBar.prototype, "clrFlashDanger", null);
    tslib_1.__decorate([
        Input('clrAssertive'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrProgressBar.prototype, "assertive", void 0);
    tslib_1.__decorate([
        Input('clrOff'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrProgressBar.prototype, "off", void 0);
    ClrProgressBar = tslib_1.__decorate([
        Component({
            selector: 'clr-progress-bar',
            template: "\n    <progress [id]=\"id\" [attr.max]=\"max\" [attr.value]=\"value\" [attr.data-displayval]=\"displayValue\"></progress>\n    <span *ngIf=\"displayAriaLive()\" [attr.aria-live]=\"ariaLive\">{{ displayValue }}</span>\n  "
        })
    ], ClrProgressBar);
    return ClrProgressBar;
}());
export { ClrProgressBar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3MvcHJvZ3Jlc3MtYmFycy9wcm9ncmVzcy1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFTdkY7SUFQQTtRQVkwQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBVWhELFdBQVc7UUFDTSxRQUFHLEdBQVcsR0FBRyxDQUFDO1FBQ2hCLFVBQUssR0FBVyxDQUFDLENBQUM7SUFxSHZDLENBQUM7SUEvSEMsc0JBQUksOEJBQUU7YUFJTjtZQUNFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDO2FBTkQsVUFBTyxLQUFhO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBWUQsc0JBQUkseUNBQWE7UUFGakIsU0FBUzthQUVUO1lBQ0UsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLHdDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksc0NBQVU7YUFBZCxVQUFlLEtBQXVCO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFJRCxzQkFBSSxxQ0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksbUNBQU87YUFBWCxVQUFZLEtBQXVCO1lBQ2pD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Q0FBQzs7O21EQUdsQztJQUdEO1FBREMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7O2lEQUdoQjtJQUlEO1FBREMsV0FBVyxDQUFDLFlBQVksQ0FBQzs7O21EQUd6QjtJQUdEO1FBREMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7O2lEQUdoQjtJQUlEO1FBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs7O3NEQUc1QjtJQUdEO1FBREMsS0FBSyxDQUFDLFlBQVksQ0FBQzs7O29EQUduQjtJQUlEO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzs7O3FEQUczQjtJQUdEO1FBREMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O21EQUdsQjtJQUlEO1FBREMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7O29EQUcxQjtJQUdEO1FBREMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7O2tEQUdqQjtJQUlEO1FBREMsV0FBVyxDQUFDLG9CQUFvQixDQUFDOzs7MERBR2pDO0lBR0Q7UUFEQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Ozt3REFHdkI7SUFHc0I7UUFBdEIsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7cURBQW9CO0lBQ3pCO1FBQWhCLEtBQUssQ0FBQyxRQUFRLENBQUM7OytDQUFjO0lBekduQixjQUFjO1FBUDFCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLDhOQUdUO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0FzSTFCO0lBQUQscUJBQUM7Q0FBQSxBQXRJRCxJQXNJQztTQXRJWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbXBvbmVudC9pcy1ib29sZWFuLWF0dHJpYnV0ZS1zZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItcHJvZ3Jlc3MtYmFyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cHJvZ3Jlc3MgW2lkXT1cImlkXCIgW2F0dHIubWF4XT1cIm1heFwiIFthdHRyLnZhbHVlXT1cInZhbHVlXCIgW2F0dHIuZGF0YS1kaXNwbGF5dmFsXT1cImRpc3BsYXlWYWx1ZVwiPjwvcHJvZ3Jlc3M+XG4gICAgPHNwYW4gKm5nSWY9XCJkaXNwbGF5QXJpYUxpdmUoKVwiIFthdHRyLmFyaWEtbGl2ZV09XCJhcmlhTGl2ZVwiPnt7IGRpc3BsYXlWYWx1ZSB9fTwvc3Bhbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyUHJvZ3Jlc3NCYXIge1xuICAvKipcbiAgICogSGFuZGxlIGNvbXBvbmVudCBJRFxuICAgKi9cbiAgcHJpdmF0ZSBfSUQ6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgZXh0ZXJuYWxJZDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fSUQgPSB2YWx1ZTtcbiAgICB0aGlzLmV4dGVybmFsSWQgPSBudWxsO1xuICB9XG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fSUQ7XG4gIH1cblxuICAvLyBQcm9ncmVzc1xuICBASW5wdXQoJ2Nsck1heCcpIG1heDogbnVtYmVyID0gMTAwO1xuICBASW5wdXQoJ2NsclZhbHVlJykgdmFsdWU6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgnY2xyRGlzcGxheXZhbCcpIGRpc3BsYXl2YWw6IHN0cmluZztcblxuICAvLyBTdHlsZXNcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wcm9ncmVzcycpXG4gIGdldCBwcm9ncmVzc0NsYXNzKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGFiZWxlZDogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sYWJlbGVkJylcbiAgZ2V0IGxhYmVsZWRDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWxlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyTGFiZWxlZCcpXG4gIHNldCBjbHJMYWJlbGVkKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fbGFiZWxlZCA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9mYWRlOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnByb2dyZXNzLWZhZGUnKVxuICBnZXQgZmFkZUNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9mYWRlO1xuICB9XG5cbiAgQElucHV0KCdjbHJGYWRlJylcbiAgc2V0IGNsckZhZGUodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9mYWRlID0gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvb3A6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3MubG9vcCcpXG4gIGdldCBsb29wQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3A7XG4gIH1cblxuICBASW5wdXQoJ2Nsckxvb3AnKVxuICBzZXQgY2xyTG9vcCh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuX2xvb3AgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3VjY2VzczogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdWNjZXNzJylcbiAgZ2V0IHN1Y2Nlc3NDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VjY2VzcztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU3VjY2VzcycpXG4gIHNldCBjbHJTdWNjZXNzKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc3VjY2VzcyA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9kYW5nZXI6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGFuZ2VyJylcbiAgZ2V0IGRhbmdlckNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9kYW5nZXI7XG4gIH1cblxuICBASW5wdXQoJ2NsckRhbmdlcicpXG4gIHNldCBjbHJEYW5nZXIodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9kYW5nZXIgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhc2g6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxhc2gnKVxuICBnZXQgZmxhc2hDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZmxhc2g7XG4gIH1cblxuICBASW5wdXQoJ2NsckZsYXNoJylcbiAgc2V0IGNsckZsYXNoKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fZmxhc2ggPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhc2hEYW5nZXI6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxhc2gtZGFuZ2VyJylcbiAgZ2V0IGZsYXNoRGFuZ2VyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXNoRGFuZ2VyO1xuICB9XG5cbiAgQElucHV0KCdjbHJGbGFzaERhbmdlcicpXG4gIHNldCBjbHJGbGFzaERhbmdlcih2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuX2ZsYXNoRGFuZ2VyID0gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEFyaWEgTGl2ZVxuICBASW5wdXQoJ2NsckFzc2VydGl2ZScpIGFzc2VydGl2ZTogYm9vbGVhbjtcbiAgQElucHV0KCdjbHJPZmYnKSBvZmY6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyB3aWxsIGhhdmUgc29tZXRoaW5nIHRoYXQgaXMgcmVhZGFibGVcbiAgICogZm9yIHRoZSBzY3JlZW4gcmVhZGVyXG4gICAqL1xuICBnZXQgZGlzcGxheVZhbHVlKCkge1xuICAgIGlmICh0aGlzLmRpc3BsYXl2YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXl2YWw7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfSVgO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXkgYXJpYS1saXZlIG9ubHkgd2hlbiB0aGVyZSBpcyB2YWx1ZSBhbmQgaXQncyBub3QgMCBvciBlcXVhbCB0byB0aGUgbWF4IHZhbHVlXG4gICAqL1xuICBkaXNwbGF5QXJpYUxpdmUoKSB7XG4gICAgcmV0dXJuICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQgfHwgdGhpcy52YWx1ZSAhPT0gMCkgJiYgdGhpcy52YWx1ZSAhPT0gdGhpcy5tYXg7XG4gIH1cblxuICBnZXQgYXJpYUxpdmUoKSB7XG4gICAgaWYgKGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh0aGlzLmFzc2VydGl2ZSkpIHtcbiAgICAgIHJldHVybiAnYXNzZXJ0aXZlJztcbiAgICB9XG4gICAgaWYgKGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh0aGlzLm9mZikpIHtcbiAgICAgIHJldHVybiAnb2ZmJztcbiAgICB9XG4gICAgcmV0dXJuICdwb2xpdGUnO1xuICB9XG59XG4iXX0=