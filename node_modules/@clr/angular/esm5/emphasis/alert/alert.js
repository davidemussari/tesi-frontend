import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
// providers
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
import { MultiAlertService } from './providers/multi-alert.service';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var ClrAlert = /** @class */ (function () {
    function ClrAlert(iconService, cdr, multiAlertService, commonStrings) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        // Aria
        this.clrCloseButtonAriaLabel = this.commonStrings.keys.alertCloseButtonAriaLabel;
        this._closed = false;
        this._closedChanged = new EventEmitter(false);
        /**
         * clrPolite is not used in the code. Is here just to provide
         * code complition and also mark component what type AriaLive
         * will be used.
         */
        this.polite = true;
        this.previouslyHidden = false;
        this.hidden = false;
    }
    Object.defineProperty(ClrAlert.prototype, "alertType", {
        get: function () {
            return this.iconService.alertType;
        },
        set: function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "setAriaLive", {
        /**
         * There is an order on how the attributes will take effect.
         * Assertive, Off, Polite.
         *
         * Polite is default if non is passed.
         *
         * In the case of setting all of them to true. Assertive will be used.
         *
         */
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
    Object.defineProperty(ClrAlert.prototype, "alertIconShape", {
        set: function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertClass", {
        get: function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.detectChangesIfNeeded = function () {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    };
    Object.defineProperty(ClrAlert.prototype, "isHidden", {
        get: function () {
            if (this.multiAlertService) {
                // change detection issue in production mode causes currentAlert to be undefined when only the first alert exists
                // https://github.com/vmware/clarity/issues/2430
                if (this.multiAlertService.currentAlert === this || this.multiAlertService.count === 0) {
                    if (this.hidden === true) {
                        this.previouslyHidden = true;
                        this.hidden = false;
                    }
                }
                else if (this.hidden === false) {
                    this.previouslyHidden = false;
                    this.hidden = true;
                }
                this.detectChangesIfNeeded();
            }
            return this.hidden;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.close = function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    };
    ClrAlert.prototype.open = function () {
        this._closed = false;
        this._closedChanged.emit(false);
    };
    tslib_1.__decorate([
        Input('clrAlertSizeSmall'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "isSmall", void 0);
    tslib_1.__decorate([
        Input('clrAlertClosable'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "closable", void 0);
    tslib_1.__decorate([
        Input('clrAlertAppLevel'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "isAppLevel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ClrAlert.prototype, "clrCloseButtonAriaLabel", void 0);
    tslib_1.__decorate([
        Input('clrAlertClosed'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "_closed", void 0);
    tslib_1.__decorate([
        Output('clrAlertClosedChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrAlert.prototype, "_closedChanged", void 0);
    tslib_1.__decorate([
        Input('clrAlertType'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrAlert.prototype, "alertType", null);
    tslib_1.__decorate([
        Input('clrPolite'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "polite", void 0);
    tslib_1.__decorate([
        Input('clrAssertive'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "assertive", void 0);
    tslib_1.__decorate([
        Input('clrOff'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrAlert.prototype, "off", void 0);
    tslib_1.__decorate([
        Input('clrAlertIcon'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrAlert.prototype, "alertIconShape", null);
    ClrAlert = tslib_1.__decorate([
        Component({
            selector: 'clr-alert',
            providers: [AlertIconAndTypesService],
            template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    [attr.aria-live]=\"setAriaLive\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button \n        type=\"button\" \n        class=\"close\" \n        *ngIf=\"closable\" \n        (click)=\"close()\" \n        [attr.aria-label]=\"clrCloseButtonAriaLabel\"\n        >\n        <clr-icon shape=\"close\"></clr-icon>\n    </button>\n</div>\n",
            styles: [':host { display: block; }']
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [AlertIconAndTypesService,
            ChangeDetectorRef,
            MultiAlertService,
            ClrCommonStringsService])
    ], ClrAlert);
    return ClrAlert;
}());
export { ClrAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJlbXBoYXNpcy9hbGVydC9hbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLFlBQVk7QUFDWixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVFsRjtJQUNFLGtCQUNTLFdBQXFDLEVBQ3JDLEdBQXNCLEVBQ1YsaUJBQW9DLEVBQ2hELGFBQXNDO1FBSHRDLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUNyQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDaEQsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBR25CLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDMUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBRXZELE9BQU87UUFDRSw0QkFBdUIsR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztRQUVwRSxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBVXpHOzs7O1dBSUc7UUFDaUIsV0FBTSxHQUFZLElBQUksQ0FBQztRQStCbkMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FB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O2dEQUE2QjtJQUc5QztRQUFSLEtBQUssRUFBRTs7NkRBQXFGO0lBRXBFO1FBQXhCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7NkNBQTBCO0lBQ2xCO1FBQS9CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzswQ0FBaUIsWUFBWTtvREFBNkM7SUFHekc7UUFEQyxLQUFLLENBQUMsY0FBYyxDQUFDOzs7NkNBR3JCO0lBVW1CO1FBQW5CLEtBQUssQ0FBQyxXQUFXLENBQUM7OzRDQUF3QjtJQUNwQjtRQUF0QixLQUFLLENBQUMsY0FBYyxDQUFDOzsrQ0FBb0I7SUFDekI7UUFBaEIsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7eUNBQWM7SUFxQjlCO1FBREMsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7O2tEQUdyQjtJQXhEVSxRQUFRO1FBTnBCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLCt5QkFBMkI7cUJBQ2xCLDJCQUEyQjtTQUNyQyxDQUFDO1FBS0csbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBRlMsd0JBQXdCO1lBQ2hDLGlCQUFpQjtZQUNTLGlCQUFpQjtZQUNqQyx1QkFBdUI7T0FMcEMsUUFBUSxDQTBHcEI7SUFBRCxlQUFDO0NBQUEsQUExR0QsSUEwR0M7U0ExR1ksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9wdGlvbmFsLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gcHJvdmlkZXJzXG5pbXBvcnQgeyBBbGVydEljb25BbmRUeXBlc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE11bHRpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbXVsdGktYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQgfSBmcm9tICcuLi8uLi91dGlscy9jb21wb25lbnQvaXMtYm9vbGVhbi1hdHRyaWJ1dGUtc2V0JztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWFsZXJ0JyxcbiAgcHJvdmlkZXJzOiBbQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0Lmh0bWwnLFxuICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfSddLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBbGVydCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpY29uU2VydmljZTogQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBtdWx0aUFsZXJ0U2VydmljZTogTXVsdGlBbGVydFNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge31cblxuICBASW5wdXQoJ2NsckFsZXJ0U2l6ZVNtYWxsJykgaXNTbWFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2FibGUnKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xyQWxlcnRBcHBMZXZlbCcpIGlzQXBwTGV2ZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBBcmlhXG4gIEBJbnB1dCgpIGNsckNsb3NlQnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgPSB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5hbGVydENsb3NlQnV0dG9uQXJpYUxhYmVsO1xuXG4gIEBJbnB1dCgnY2xyQWxlcnRDbG9zZWQnKSBfY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2NsckFsZXJ0Q2xvc2VkQ2hhbmdlJykgX2Nsb3NlZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyQWxlcnRUeXBlJylcbiAgc2V0IGFsZXJ0VHlwZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRUeXBlID0gdmFsO1xuICB9XG4gIGdldCBhbGVydFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pY29uU2VydmljZS5hbGVydFR5cGU7XG4gIH1cblxuICAvKipcbiAgICogY2xyUG9saXRlIGlzIG5vdCB1c2VkIGluIHRoZSBjb2RlLiBJcyBoZXJlIGp1c3QgdG8gcHJvdmlkZVxuICAgKiBjb2RlIGNvbXBsaXRpb24gYW5kIGFsc28gbWFyayBjb21wb25lbnQgd2hhdCB0eXBlIEFyaWFMaXZlXG4gICAqIHdpbGwgYmUgdXNlZC5cbiAgICovXG4gIEBJbnB1dCgnY2xyUG9saXRlJykgcG9saXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJBc3NlcnRpdmUnKSBhc3NlcnRpdmU6IGJvb2xlYW47XG4gIEBJbnB1dCgnY2xyT2ZmJykgb2ZmOiBib29sZWFuO1xuICAvKipcbiAgICogVGhlcmUgaXMgYW4gb3JkZXIgb24gaG93IHRoZSBhdHRyaWJ1dGVzIHdpbGwgdGFrZSBlZmZlY3QuXG4gICAqIEFzc2VydGl2ZSwgT2ZmLCBQb2xpdGUuXG4gICAqXG4gICAqIFBvbGl0ZSBpcyBkZWZhdWx0IGlmIG5vbiBpcyBwYXNzZWQuXG4gICAqXG4gICAqIEluIHRoZSBjYXNlIG9mIHNldHRpbmcgYWxsIG9mIHRoZW0gdG8gdHJ1ZS4gQXNzZXJ0aXZlIHdpbGwgYmUgdXNlZC5cbiAgICpcbiAgICovXG4gIGdldCBzZXRBcmlhTGl2ZSgpOiBzdHJpbmcge1xuICAgIGlmIChpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodGhpcy5hc3NlcnRpdmUpKSB7XG4gICAgICByZXR1cm4gJ2Fzc2VydGl2ZSc7XG4gICAgfVxuICAgIGlmIChpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodGhpcy5vZmYpKSB7XG4gICAgICByZXR1cm4gJ29mZic7XG4gICAgfVxuICAgIHJldHVybiAncG9saXRlJztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyQWxlcnRJY29uJylcbiAgc2V0IGFsZXJ0SWNvblNoYXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25TZXJ2aWNlLmFsZXJ0SWNvblNoYXBlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgYWxlcnRDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmljb25TZXJ2aWNlLmljb25JbmZvRnJvbVR5cGUodGhpcy5pY29uU2VydmljZS5hbGVydFR5cGUpLmNzc0NsYXNzO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2aW91c2x5SGlkZGVuID0gZmFsc2U7XG4gIHByaXZhdGUgaGlkZGVuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBkZXRlY3RDaGFuZ2VzSWZOZWVkZWQoKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNseUhpZGRlbiAhPT0gdGhpcy5oaWRkZW4pIHtcbiAgICAgIHRoaXMucHJldmlvdXNseUhpZGRlbiA9IHRoaXMuaGlkZGVuO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0hpZGRlbigpIHtcbiAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZSkge1xuICAgICAgLy8gY2hhbmdlIGRldGVjdGlvbiBpc3N1ZSBpbiBwcm9kdWN0aW9uIG1vZGUgY2F1c2VzIGN1cnJlbnRBbGVydCB0byBiZSB1bmRlZmluZWQgd2hlbiBvbmx5IHRoZSBmaXJzdCBhbGVydCBleGlzdHNcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjQzMFxuICAgICAgaWYgKHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0ID09PSB0aGlzIHx8IHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY291bnQgPT09IDApIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByZXZpb3VzbHlIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzSWZOZWVkZWQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oaWRkZW47XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xvc2FibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2xvc2VkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZSkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jbG9zZSgpO1xuICAgIH1cbiAgICB0aGlzLl9jbG9zZWRDaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nsb3NlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Nsb3NlZENoYW5nZWQuZW1pdChmYWxzZSk7XG4gIH1cbn1cbiJdfQ==