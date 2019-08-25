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
let ClrAlert = class ClrAlert {
    constructor(iconService, cdr, multiAlertService, commonStrings) {
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
    set alertType(val) {
        this.iconService.alertType = val;
    }
    get alertType() {
        return this.iconService.alertType;
    }
    /**
     * There is an order on how the attributes will take effect.
     * Assertive, Off, Polite.
     *
     * Polite is default if non is passed.
     *
     * In the case of setting all of them to true. Assertive will be used.
     *
     */
    get setAriaLive() {
        if (isBooleanAttributeSet(this.assertive)) {
            return 'assertive';
        }
        if (isBooleanAttributeSet(this.off)) {
            return 'off';
        }
        return 'polite';
    }
    set alertIconShape(value) {
        this.iconService.alertIconShape = value;
    }
    get alertClass() {
        return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
    }
    detectChangesIfNeeded() {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    }
    get isHidden() {
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
    }
    close() {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    }
    open() {
        this._closed = false;
        this._closedChanged.emit(false);
    }
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
export { ClrAlert };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJlbXBoYXNpcy9hbGVydC9hbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLFlBQVk7QUFDWixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVFsRixJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBQ25CLFlBQ1MsV0FBcUMsRUFDckMsR0FBc0IsRUFDVixpQkFBb0MsRUFDaEQsYUFBc0M7UUFIdEMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO1FBQ3JDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNoRCxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFHbkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUMxQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFdkQsT0FBTztRQUNFLDRCQUF1QixHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDO1FBRXBFLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFVekc7Ozs7V0FJRztRQUNpQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBK0JuQyxxQkFBZ0IsR0FB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SyxDQUFDLGdCQUFnQixDQUFDOzt5Q0FBMEI7QUFDbEI7SUFBL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDO3NDQUFpQixZQUFZO2dEQUE2QztBQUd6RztJQURDLEtBQUssQ0FBQyxjQUFjLENBQUM7Ozt5Q0FHckI7QUFVbUI7SUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7d0NBQXdCO0FBQ3BCO0lBQXRCLEtBQUssQ0FBQyxjQUFjLENBQUM7OzJDQUFvQjtBQUN6QjtJQUFoQixLQUFLLENBQUMsUUFBUSxDQUFDOztxQ0FBYztBQXFCOUI7SUFEQyxLQUFLLENBQUMsY0FBYyxDQUFDOzs7OENBR3JCO0FBeERVLFFBQVE7SUFOcEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDckMsK3lCQUEyQjtpQkFDbEIsMkJBQTJCO0tBQ3JDLENBQUM7SUFLRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FGUyx3QkFBd0I7UUFDaEMsaUJBQWlCO1FBQ1MsaUJBQWlCO1FBQ2pDLHVCQUF1QjtHQUxwQyxRQUFRLENBMEdwQjtTQTFHWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3B0aW9uYWwsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBwcm92aWRlcnNcbmltcG9ydCB7IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2ljb24tYW5kLXR5cGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTXVsdGlBbGVydFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbXBvbmVudC9pcy1ib29sZWFuLWF0dHJpYnV0ZS1zZXQnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnQnLFxuICBwcm92aWRlcnM6IFtBbGVydEljb25BbmRUeXBlc1NlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuaHRtbCcsXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9J10sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGljb25TZXJ2aWNlOiBBbGVydEljb25BbmRUeXBlc1NlcnZpY2UsXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIG11bHRpQWxlcnRTZXJ2aWNlOiBNdWx0aUFsZXJ0U2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2VcbiAgKSB7fVxuXG4gIEBJbnB1dCgnY2xyQWxlcnRTaXplU21hbGwnKSBpc1NtYWxsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyQWxlcnRDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJBbGVydEFwcExldmVsJykgaXNBcHBMZXZlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIEFyaWFcbiAgQElucHV0KCkgY2xyQ2xvc2VCdXR0b25BcmlhTGFiZWw6IHN0cmluZyA9IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmFsZXJ0Q2xvc2VCdXR0b25BcmlhTGFiZWw7XG5cbiAgQElucHV0KCdjbHJBbGVydENsb3NlZCcpIF9jbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyQWxlcnRDbG9zZWRDaGFuZ2UnKSBfY2xvc2VkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjbHJBbGVydFR5cGUnKVxuICBzZXQgYWxlcnRUeXBlKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5pY29uU2VydmljZS5hbGVydFR5cGUgPSB2YWw7XG4gIH1cbiAgZ2V0IGFsZXJ0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjbHJQb2xpdGUgaXMgbm90IHVzZWQgaW4gdGhlIGNvZGUuIElzIGhlcmUganVzdCB0byBwcm92aWRlXG4gICAqIGNvZGUgY29tcGxpdGlvbiBhbmQgYWxzbyBtYXJrIGNvbXBvbmVudCB3aGF0IHR5cGUgQXJpYUxpdmVcbiAgICogd2lsbCBiZSB1c2VkLlxuICAgKi9cbiAgQElucHV0KCdjbHJQb2xpdGUnKSBwb2xpdGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ2NsckFzc2VydGl2ZScpIGFzc2VydGl2ZTogYm9vbGVhbjtcbiAgQElucHV0KCdjbHJPZmYnKSBvZmY6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhbiBvcmRlciBvbiBob3cgdGhlIGF0dHJpYnV0ZXMgd2lsbCB0YWtlIGVmZmVjdC5cbiAgICogQXNzZXJ0aXZlLCBPZmYsIFBvbGl0ZS5cbiAgICpcbiAgICogUG9saXRlIGlzIGRlZmF1bHQgaWYgbm9uIGlzIHBhc3NlZC5cbiAgICpcbiAgICogSW4gdGhlIGNhc2Ugb2Ygc2V0dGluZyBhbGwgb2YgdGhlbSB0byB0cnVlLiBBc3NlcnRpdmUgd2lsbCBiZSB1c2VkLlxuICAgKlxuICAgKi9cbiAgZ2V0IHNldEFyaWFMaXZlKCk6IHN0cmluZyB7XG4gICAgaWYgKGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh0aGlzLmFzc2VydGl2ZSkpIHtcbiAgICAgIHJldHVybiAnYXNzZXJ0aXZlJztcbiAgICB9XG4gICAgaWYgKGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh0aGlzLm9mZikpIHtcbiAgICAgIHJldHVybiAnb2ZmJztcbiAgICB9XG4gICAgcmV0dXJuICdwb2xpdGUnO1xuICB9XG5cbiAgQElucHV0KCdjbHJBbGVydEljb24nKVxuICBzZXQgYWxlcnRJY29uU2hhcGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRJY29uU2hhcGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhbGVydENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSkuY3NzQ2xhc3M7XG4gIH1cblxuICBwcml2YXRlIHByZXZpb3VzbHlIaWRkZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBoaWRkZW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGRldGVjdENoYW5nZXNJZk5lZWRlZCgpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c2x5SGlkZGVuICE9PSB0aGlzLmhpZGRlbikge1xuICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gdGhpcy5oaWRkZW47XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIGlzc3VlIGluIHByb2R1Y3Rpb24gbW9kZSBjYXVzZXMgY3VycmVudEFsZXJ0IHRvIGJlIHVuZGVmaW5lZCB3aGVuIG9ubHkgdGhlIGZpcnN0IGFsZXJ0IGV4aXN0c1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNDMwXG4gICAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPT09IHRoaXMgfHwgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jb3VudCA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzbHlIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNJZk5lZWRlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhpZGRlbjtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbG9zYWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jbG9zZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nsb3NlZENoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VkID0gZmFsc2U7XG4gICAgdGhpcy5fY2xvc2VkQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIl19