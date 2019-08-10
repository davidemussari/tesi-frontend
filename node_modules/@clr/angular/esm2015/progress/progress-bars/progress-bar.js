import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';
let ClrProgressBar = class ClrProgressBar {
    constructor() {
        this.externalId = '';
        // Progress
        this.max = 100;
        this.value = 0;
    }
    set id(value) {
        this._ID = value;
        this.externalId = null;
    }
    get id() {
        return this._ID;
    }
    // Styles
    get progressClass() {
        return true;
    }
    get labeledClass() {
        return this._labeled;
    }
    set clrLabeled(value) {
        this._labeled = isBooleanAttributeSet(value);
    }
    get fadeClass() {
        return this._fade;
    }
    set clrFade(value) {
        this._fade = isBooleanAttributeSet(value);
    }
    get loopClass() {
        return this._loop;
    }
    set clrLoop(value) {
        this._loop = isBooleanAttributeSet(value);
    }
    get successClass() {
        return this._success;
    }
    set clrSuccess(value) {
        this._success = isBooleanAttributeSet(value);
    }
    get dangerClass() {
        return this._danger;
    }
    set clrDanger(value) {
        this._danger = isBooleanAttributeSet(value);
    }
    get flashClass() {
        return this._flash;
    }
    set clrFlash(value) {
        this._flash = isBooleanAttributeSet(value);
    }
    get flashDangerClass() {
        return this._flashDanger;
    }
    set clrFlashDanger(value) {
        this._flashDanger = isBooleanAttributeSet(value);
    }
    /**
     * Make sure that we always will have something that is readable
     * for the screen reader
     */
    get displayValue() {
        if (this.displayval) {
            return this.displayval;
        }
        return `${this.value}%`;
    }
    /**
     * Display aria-live only when there is value and it's not 0 or equal to the max value
     */
    displayAriaLive() {
        return (this.value !== undefined || this.value !== 0) && this.value !== this.max;
    }
    get ariaLive() {
        if (isBooleanAttributeSet(this.assertive)) {
            return 'assertive';
        }
        if (isBooleanAttributeSet(this.off)) {
            return 'off';
        }
        return 'polite';
    }
};
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
        template: `
    <progress [id]="id" [attr.max]="max" [attr.value]="value" [attr.data-displayval]="displayValue"></progress>
    <span *ngIf="displayAriaLive()" [attr.aria-live]="ariaLive">{{ displayValue }}</span>
  `
    })
], ClrProgressBar);
export { ClrProgressBar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3MvcHJvZ3Jlc3MtYmFycy9wcm9ncmVzcy1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFTdkYsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQVAzQjtRQVkwQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBVWhELFdBQVc7UUFDTSxRQUFHLEdBQVcsR0FBRyxDQUFDO1FBQ2hCLFVBQUssR0FBVyxDQUFDLENBQUM7SUFxSHZDLENBQUM7SUEvSEMsSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFPRCxTQUFTO0lBRVQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBSUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxJQUFJLFVBQVUsQ0FBQyxLQUF1QjtRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFJRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUdELElBQUksT0FBTyxDQUFDLEtBQXVCO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFD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SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDOzs7aURBRzNCO0FBR0Q7SUFEQyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7K0NBR2xCO0FBSUQ7SUFEQyxXQUFXLENBQUMsYUFBYSxDQUFDOzs7Z0RBRzFCO0FBR0Q7SUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDOzs7OENBR2pCO0FBSUQ7SUFEQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7OztzREFHakM7QUFHRDtJQURDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7O29EQUd2QjtBQUdzQjtJQUF0QixLQUFLLENBQUMsY0FBYyxDQUFDOztpREFBb0I7QUFDekI7SUFBaEIsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7MkNBQWM7QUF6R25CLGNBQWM7SUFQMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUU7OztHQUdUO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0FzSTFCO1NBdElZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNCb29sZWFuQXR0cmlidXRlU2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tcG9uZW50L2lzLWJvb2xlYW4tYXR0cmlidXRlLXNldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1wcm9ncmVzcy1iYXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwcm9ncmVzcyBbaWRdPVwiaWRcIiBbYXR0ci5tYXhdPVwibWF4XCIgW2F0dHIudmFsdWVdPVwidmFsdWVcIiBbYXR0ci5kYXRhLWRpc3BsYXl2YWxdPVwiZGlzcGxheVZhbHVlXCI+PC9wcm9ncmVzcz5cbiAgICA8c3BhbiAqbmdJZj1cImRpc3BsYXlBcmlhTGl2ZSgpXCIgW2F0dHIuYXJpYS1saXZlXT1cImFyaWFMaXZlXCI+e3sgZGlzcGxheVZhbHVlIH19PC9zcGFuPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJQcm9ncmVzc0JhciB7XG4gIC8qKlxuICAgKiBIYW5kbGUgY29tcG9uZW50IElEXG4gICAqL1xuICBwcml2YXRlIF9JRDogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKSBleHRlcm5hbElkOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KClcbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9JRCA9IHZhbHVlO1xuICAgIHRoaXMuZXh0ZXJuYWxJZCA9IG51bGw7XG4gIH1cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9JRDtcbiAgfVxuXG4gIC8vIFByb2dyZXNzXG4gIEBJbnB1dCgnY2xyTWF4JykgbWF4OiBudW1iZXIgPSAxMDA7XG4gIEBJbnB1dCgnY2xyVmFsdWUnKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgQElucHV0KCdjbHJEaXNwbGF5dmFsJykgZGlzcGxheXZhbDogc3RyaW5nO1xuXG4gIC8vIFN0eWxlc1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnByb2dyZXNzJylcbiAgZ2V0IHByb2dyZXNzQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9sYWJlbGVkOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxhYmVsZWQnKVxuICBnZXQgbGFiZWxlZENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbGVkO1xuICB9XG5cbiAgQElucHV0KCdjbHJMYWJlbGVkJylcbiAgc2V0IGNsckxhYmVsZWQodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9sYWJlbGVkID0gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZhZGU6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3MucHJvZ3Jlc3MtZmFkZScpXG4gIGdldCBmYWRlQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZhZGU7XG4gIH1cblxuICBASW5wdXQoJ2NsckZhZGUnKVxuICBzZXQgY2xyRmFkZSh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuX2ZhZGUgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9vcDogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sb29wJylcbiAgZ2V0IGxvb3BDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9vcDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyTG9vcCcpXG4gIHNldCBjbHJMb29wKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fbG9vcCA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdWNjZXNzOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN1Y2Nlc3MnKVxuICBnZXQgc3VjY2Vzc0NsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9zdWNjZXNzO1xuICB9XG5cbiAgQElucHV0KCdjbHJTdWNjZXNzJylcbiAgc2V0IGNsclN1Y2Nlc3ModmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdWNjZXNzID0gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RhbmdlcjogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kYW5nZXInKVxuICBnZXQgZGFuZ2VyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhbmdlcjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGFuZ2VyJylcbiAgc2V0IGNsckRhbmdlcih2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIHRoaXMuX2RhbmdlciA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9mbGFzaDogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbGFzaCcpXG4gIGdldCBmbGFzaENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9mbGFzaDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmxhc2gnKVxuICBzZXQgY2xyRmxhc2godmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9mbGFzaCA9IGlzQm9vbGVhbkF0dHJpYnV0ZVNldCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9mbGFzaERhbmdlcjogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbGFzaC1kYW5nZXInKVxuICBnZXQgZmxhc2hEYW5nZXJDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZmxhc2hEYW5nZXI7XG4gIH1cblxuICBASW5wdXQoJ2NsckZsYXNoRGFuZ2VyJylcbiAgc2V0IGNsckZsYXNoRGFuZ2VyKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fZmxhc2hEYW5nZXIgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgLy8gQXJpYSBMaXZlXG4gIEBJbnB1dCgnY2xyQXNzZXJ0aXZlJykgYXNzZXJ0aXZlOiBib29sZWFuO1xuICBASW5wdXQoJ2Nsck9mZicpIG9mZjogYm9vbGVhbjtcblxuICAvKipcbiAgICogTWFrZSBzdXJlIHRoYXQgd2UgYWx3YXlzIHdpbGwgaGF2ZSBzb21ldGhpbmcgdGhhdCBpcyByZWFkYWJsZVxuICAgKiBmb3IgdGhlIHNjcmVlbiByZWFkZXJcbiAgICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheXZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheXZhbDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9JWA7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheSBhcmlhLWxpdmUgb25seSB3aGVuIHRoZXJlIGlzIHZhbHVlIGFuZCBpdCdzIG5vdCAwIG9yIGVxdWFsIHRvIHRoZSBtYXggdmFsdWVcbiAgICovXG4gIGRpc3BsYXlBcmlhTGl2ZSgpIHtcbiAgICByZXR1cm4gKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnZhbHVlICE9PSAwKSAmJiB0aGlzLnZhbHVlICE9PSB0aGlzLm1heDtcbiAgfVxuXG4gIGdldCBhcmlhTGl2ZSgpIHtcbiAgICBpZiAoaXNCb29sZWFuQXR0cmlidXRlU2V0KHRoaXMuYXNzZXJ0aXZlKSkge1xuICAgICAgcmV0dXJuICdhc3NlcnRpdmUnO1xuICAgIH1cbiAgICBpZiAoaXNCb29sZWFuQXR0cmlidXRlU2V0KHRoaXMub2ZmKSkge1xuICAgICAgcmV0dXJuICdvZmYnO1xuICAgIH1cbiAgICByZXR1cm4gJ3BvbGl0ZSc7XG4gIH1cbn1cbiJdfQ==