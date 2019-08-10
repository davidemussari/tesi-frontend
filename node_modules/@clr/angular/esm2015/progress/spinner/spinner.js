import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';
let ClrSpinner = class ClrSpinner {
    /**
     * Default class for all spinners. This class is always true
     */
    get spinnerClass() {
        return true;
    }
    get inlineClass() {
        return this._inline;
    }
    set clrInline(value) {
        this._inline = isBooleanAttributeSet(value);
    }
    get inverseClass() {
        return this._inverse;
    }
    set clrInverse(value) {
        this._inverse = isBooleanAttributeSet(value);
    }
    get smallClass() {
        return this._small;
    }
    set clrSmall(value) {
        this._small = isBooleanAttributeSet(value);
    }
    get mediumClass() {
        if (this._small) {
            return false;
        }
        return this._medium;
    }
    set clrMedium(value) {
        this._medium = isBooleanAttributeSet(value);
    }
    get setAriaLive() {
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
        template: `
    <ng-content></ng-content>
  `,
        host: {
            '[attr.aria-live]': 'setAriaLive',
            '[attr.aria-busy]': 'true',
        }
    })
], ClrSpinner);
export { ClrSpinner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb2dyZXNzL3NwaW5uZXIvc3Bpbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQVl2RixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQ3JCOztPQUVHO0lBRUgsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBS0QsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFHRCxJQUFJLFNBQVMsQ0FBQyxLQUF1QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFJRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUdELElBQUksVUFBVSxDQUFDLEtBQXVCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQWFELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBR0QsSUFBSSxRQUFRLENBQUMsS0FBdUI7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBZUQsSUFBSSxXQUFXO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBR0QsSUFBSSxTQUFTLENBQUMsS0FBdUI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBb0JELElBQUksV0FBVztRQUNiLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRixDQUFBO0FBbkdDO0lBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs7OzhDQUc1QjtBQUtEO0lBREMsV0FBVyxDQUFDLHNCQUFzQixDQUFDOzs7NkNBR25DO0FBR0Q7SUFEQyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7MkNBR2xCO0FBSUQ7SUFEQyxXQUFXLENBQUMsdUJBQXVCLENBQUM7Ozs4Q0FHcEM7QUFHRDtJQURDLEtBQUssQ0FBQyxZQUFZLENBQUM7Ozs0Q0FHbkI7QUFhRDtJQURDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQzs7OzRDQUcvQjtBQUdEO0lBREMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7OzBDQUdqQjtBQWVEO0lBREMsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzs7NkNBTS9CO0FBR0Q7SUFEQyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7MkNBR2xCO0FBaUJzQjtJQUF0QixLQUFLLENBQUMsY0FBYyxDQUFDOzs2Q0FBb0I7QUFDekI7SUFBaEIsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7dUNBQWM7QUE3Rm5CLFVBQVU7SUFWdEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFOztHQUVUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osa0JBQWtCLEVBQUUsYUFBYTtZQUNqQyxrQkFBa0IsRUFBRSxNQUFNO1NBQzNCO0tBQ0YsQ0FBQztHQUNXLFVBQVUsQ0F3R3RCO1NBeEdZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNCb29sZWFuQXR0cmlidXRlU2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tcG9uZW50L2lzLWJvb2xlYW4tYXR0cmlidXRlLXNldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuYXJpYS1saXZlXSc6ICdzZXRBcmlhTGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtYnVzeV0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclNwaW5uZXIge1xuICAvKipcbiAgICogRGVmYXVsdCBjbGFzcyBmb3IgYWxsIHNwaW5uZXJzLiBUaGlzIGNsYXNzIGlzIGFsd2F5cyB0cnVlXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNwaW5uZXInKVxuICBnZXQgc3Bpbm5lckNsYXNzKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gU3R5bGVcbiAgcHJpdmF0ZSBfaW5saW5lOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNwaW5uZXItaW5saW5lJylcbiAgZ2V0IGlubGluZUNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmxpbmU7XG4gIH1cblxuICBASW5wdXQoJ2NscklubGluZScpXG4gIHNldCBjbHJJbmxpbmUodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbmxpbmUgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW52ZXJzZTogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zcGlubmVyLWludmVyc2UnKVxuICBnZXQgaW52ZXJzZUNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnZlcnNlO1xuICB9XG5cbiAgQElucHV0KCdjbHJJbnZlcnNlJylcbiAgc2V0IGNsckludmVyc2UodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbnZlcnNlID0gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNpemVcbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgYWxsIHNwaW5uZXJzIGFyZSBMYXJnZS4gKHNwaW5uZXItbGcpXG4gICAqIFRvIGNoYW5nZSB0aGUgc2l6ZSB5b3UgbmVlZCB0byB1c2Ugc2V0IGNsclNtYWxsIG9yIGNsck1lZGl1bSB0byBUUlVFL1xuICAgKi9cblxuICAvKipcbiAgICogU21hbGxcbiAgICovXG4gIHByaXZhdGUgX3NtYWxsOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNwaW5uZXItc20nKVxuICBnZXQgc21hbGxDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc21hbGw7XG4gIH1cblxuICBASW5wdXQoJ2NsclNtYWxsJylcbiAgc2V0IGNsclNtYWxsKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc21hbGwgPSBpc0Jvb2xlYW5BdHRyaWJ1dGVTZXQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2xyU21hbGwgJiBjbHJNZWRpdW0gYXJlIHNldCBib3RoIHRvIHRydWUuXG4gICAqIFRoZSBDU1Mgd2l0aCBoaWdoIHByaW9yaXR5IHdpbGwgYmUgc21hbGwgLSBzbyBtZWRpdW0gc2l6ZSB3aWxsIGJlIGlnbm9yZWQuXG4gICAqXG4gICAqIEZvciB0aGlzIHJlYXNvbiBpZiBjbHJTbWFsbCBpcyBzZXQgd2Ugd29uJ3QgYWRkIGNsck1lZGl1bSBjbGFzcy5cbiAgICpcbiAgICogTk9URTogVGhpcyBpcyBkaWN0YXRlZCBieSB0aGUgQ1NTIHJ1bGVzLlxuICAgKiBET04nVCBVU0UgY2xyU21hbGwgJiBjbHJNZWRpdW0gdG8gdG9nZ2xlIGNsYXNzZXMuIFRoaXMgY291bGQgY2hhbmdlIHdpdGhvdXQgbm90aWNlLlxuICAgKlxuICAgKiBBbHNvIHRoZXJlIGlzIG5vIGxvZ2ljYWwgbmVlZCB0byBoYXZlIGJvdGggb2YgdGhlbSBzZXQgdG8gVFJVRSBvciBGQUxTRS5cbiAgICovXG4gIHByaXZhdGUgX21lZGl1bTogYm9vbGVhbjtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zcGlubmVyLW1kJylcbiAgZ2V0IG1lZGl1bUNsYXNzKCkge1xuICAgIGlmICh0aGlzLl9zbWFsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWVkaXVtO1xuICB9XG5cbiAgQElucHV0KCdjbHJNZWRpdW0nKVxuICBzZXQgY2xyTWVkaXVtKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fbWVkaXVtID0gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEFyaWEgTGl2ZVxuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0IGFyaWEtbGl2ZSB3aWxsIGJlIHNldCB0byBgcG9saXRlYCAuXG4gICAqIFRvIGNoYW5nZSBpcyBpdCB5b3UgbmVlZCB0byBzZXQgY2xyQXNzZXJ0aXZlIG9yIGNsck9mZiB0byBUUlVFXG4gICAqXG4gICAqIFRoZXJlIGlzIHByaW9yaXR5OlxuICAgKiAgIERlZmF1bHQ6IHBvbGl0ZVxuICAgKiAgIEFzZXJ0aXZlXG4gICAqICAgT2ZmXG4gICAqXG4gICAqIEluIGNhc2Ugd2hlbiBmb3Igc29tZSByZWFzb24geW91IGhhdmUgY2xyQXNzZXJ0aXZlPVRSVUUgYW5kIGNsck9mZj1UUlVFLFxuICAgKiB3ZSBnb25uYSBzZXQgYGFzc2VydGl2ZWAgYXMgdmFsdWUgb2YgYXJpYS1saXZlLlxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJBc3NlcnRpdmUnKSBhc3NlcnRpdmU6IGJvb2xlYW47XG4gIEBJbnB1dCgnY2xyT2ZmJykgb2ZmOiBib29sZWFuO1xuXG4gIGdldCBzZXRBcmlhTGl2ZSgpIHtcbiAgICBpZiAoaXNCb29sZWFuQXR0cmlidXRlU2V0KHRoaXMuYXNzZXJ0aXZlKSkge1xuICAgICAgcmV0dXJuICdhc3NlcnRpdmUnO1xuICAgIH1cbiAgICBpZiAoaXNCb29sZWFuQXR0cmlidXRlU2V0KHRoaXMub2ZmKSkge1xuICAgICAgcmV0dXJuICdvZmYnO1xuICAgIH1cbiAgICByZXR1cm4gJ3BvbGl0ZSc7XG4gIH1cbn1cbiJdfQ==