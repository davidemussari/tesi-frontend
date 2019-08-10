/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injector, Input, Optional, Output, PLATFORM_ID, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FocusService } from '../common/providers/focus.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrDateContainer } from './date-container';
import { DayModel } from './model/day.model';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { datesAreEqual } from './utils/date-utils';
// There are four ways the datepicker value is set
// 1. Value set by user typing into text input as a string ex: '01/28/2015'
// 2. Value set explicitly by Angular Forms APIs as a string ex: '01/28/2015'
// 3. Value set by user via datepicker UI as a Date Object
// 4. Value set via `clrDate` input as a Date Object
let ClrDateInput = class ClrDateInput extends WrappedFormControl {
    constructor(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
        super(viewContainerRef, ClrDateContainer, injector, control, renderer, el);
        this.el = el;
        this.renderer = renderer;
        this.control = control;
        this.container = container;
        this.dateIOService = dateIOService;
        this.dateNavigationService = dateNavigationService;
        this.datepickerEnabledService = datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        this.focusService = focusService;
        this.datepickerFocusService = datepickerFocusService;
        this.dateChange = new EventEmitter(false);
        this.index = 1;
    }
    set date(date) {
        if (this.previousDateChange !== date) {
            this.updateDate(this.getValidDateValueFromDate(date));
        }
        if (!this.initialClrDateInputValue) {
            this.initialClrDateInputValue = date;
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    }
    ngAfterViewInit() {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    }
    setFocusStates() {
        this.setFocus(true);
    }
    triggerValidation() {
        super.triggerValidation();
        this.setFocus(false);
    }
    get placeholderText() {
        return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
    }
    get inputType() {
        return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
    }
    onValueChange(target) {
        const validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            const [year, month, day] = target.value.split('-');
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    }
    usingClarityDatepicker() {
        return this.datepickerEnabledService.isEnabled;
    }
    usingNativeDatepicker() {
        return !this.datepickerEnabledService.isEnabled;
    }
    setFocus(focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    }
    populateServicesFromContainerComponent() {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    }
    processInitialInputs() {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    }
    updateDate(value, setByUserInteraction = false) {
        const date = this.getValidDateValueFromDate(value);
        if (setByUserInteraction) {
            this.emitDateOutput(date);
        }
        else {
            this.previousDateChange = date;
        }
        if (this.dateNavigationService) {
            this.dateNavigationService.selectedDay = date
                ? new DayModel(date.getFullYear(), date.getMonth(), date.getDate())
                : null;
        }
        this.updateInput(date);
    }
    updateInput(date) {
        if (date) {
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            if (this.datepickerHasFormControl() && dateString !== this.control.value) {
                this.control.control.setValue(dateString);
            }
            else if (this.usingNativeDatepicker()) {
                this.renderer.setProperty(this.el.nativeElement, 'valueAsDate', date);
            }
            else {
                this.renderer.setProperty(this.el.nativeElement, 'value', dateString);
            }
        }
        else {
            this.renderer.setProperty(this.el.nativeElement, 'value', '');
        }
    }
    getValidDateValueFromDate(date) {
        if (this.dateIOService) {
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    }
    emitDateOutput(date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    }
    datepickerHasFormControl() {
        return !!this.control;
    }
    listenForControlValueChanges() {
        return of(this.datepickerHasFormControl())
            .pipe(filter(hasControl => hasControl), switchMap(() => this.control.valueChanges), 
        // only update date value if not being set by user
        filter(() => !this.datepickerFocusService.elementIsFocused(this.el.nativeElement)))
            .subscribe((value) => this.updateDate(this.dateIOService.getDateValueFromDateString(value)));
    }
    listenForUserSelectedDayChanges() {
        return this.dateNavigationService.selectedDayChange.subscribe(dayModel => this.updateDate(dayModel.toDate(), true));
    }
    listenForTouchChanges() {
        return this.dateFormControlService.touchedChange
            .pipe(filter(() => this.datepickerHasFormControl()))
            .subscribe(() => this.control.control.markAsTouched());
    }
    listenForDirtyChanges() {
        return this.dateFormControlService.dirtyChange
            .pipe(filter(() => this.datepickerHasFormControl()))
            .subscribe(() => this.control.control.markAsDirty());
    }
    listenForInputRefocus() {
        return this.dateNavigationService.selectedDayChange
            .pipe(filter(date => !!date))
            .subscribe(v => this.datepickerFocusService.focusInput(this.el.nativeElement));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ClrDateInput.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Output('clrDateChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrDateInput.prototype, "dateChange", void 0);
tslib_1.__decorate([
    Input('clrDate'),
    tslib_1.__metadata("design:type", Date),
    tslib_1.__metadata("design:paramtypes", [Date])
], ClrDateInput.prototype, "date", null);
tslib_1.__decorate([
    HostListener('focus'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrDateInput.prototype, "setFocusStates", null);
tslib_1.__decorate([
    HostListener('blur'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrDateInput.prototype, "triggerValidation", null);
tslib_1.__decorate([
    HostBinding('attr.placeholder'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [])
], ClrDateInput.prototype, "placeholderText", null);
tslib_1.__decorate([
    HostBinding('attr.type'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [])
], ClrDateInput.prototype, "inputType", null);
tslib_1.__decorate([
    HostListener('change', ['$event.target']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [HTMLInputElement]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrDateInput.prototype, "onValueChange", null);
ClrDateInput = tslib_1.__decorate([
    Directive({
        selector: '[clrDate]',
        host: {
            '[class.clr-input]': 'true',
        },
        providers: [DatepickerFocusService],
    }),
    tslib_1.__param(4, Self()),
    tslib_1.__param(4, Optional()),
    tslib_1.__param(5, Optional()),
    tslib_1.__param(6, Optional()),
    tslib_1.__param(7, Optional()),
    tslib_1.__param(8, Optional()),
    tslib_1.__param(9, Optional()),
    tslib_1.__param(10, Inject(PLATFORM_ID)),
    tslib_1.__param(11, Optional()),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        ElementRef,
        Renderer2,
        NgControl,
        ClrDateContainer,
        DateIOService,
        DateNavigationService,
        DatepickerEnabledService,
        DateFormControlService,
        Object,
        FocusService,
        DatepickerFocusService])
], ClrDateInput);
export { ClrDateInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxJQUFJLEVBQ0osZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXND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OzZDQUFKLElBQUk7d0NBUWxCO0FBbUREO0lBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OztrREFHckI7QUFHRDtJQURDLFlBQVksQ0FBQyxNQUFNLENBQUM7Ozs7cURBSXBCO0FBR0Q7SUFEQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7OzttREFHL0I7QUFHRDtJQURDLFdBQVcsQ0FBQyxXQUFXLENBQUM7Ozs2Q0FHeEI7QUFHRDtJQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7NkNBQ3BCLGdCQUFnQjs7aURBVXJDO0FBOUZVLFlBQVk7SUFQeEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsSUFBSSxFQUFFO1lBQ0osbUJBQW1CLEVBQUUsTUFBTTtTQUM1QjtRQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0tBQ3BDLENBQUM7SUF3QkcsbUJBQUEsSUFBSSxFQUFFLENBQUE7SUFDTixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUVWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixvQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbkIsb0JBQUEsUUFBUSxFQUFFLENBQUE7NkNBYk8sZ0JBQWdCO1FBQ3hCLFFBQVE7UUFDSixVQUFVO1FBQ0osU0FBUztRQUdWLFNBQVM7UUFDRyxnQkFBZ0I7UUFDWixhQUFhO1FBQ0wscUJBQXFCO1FBQ2xCLHdCQUF3QjtRQUMxQixzQkFBc0I7UUFDekIsTUFBTTtRQUNiLFlBQVk7UUFDZCxzQkFBc0I7R0FqQzdDLFlBQVksQ0F3TnhCO1NBeE5ZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBDbHJEYXRlQ29udGFpbmVyIH0gZnJvbSAnLi9kYXRlLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vbW9kZWwvZGF5Lm1vZGVsJztcbmltcG9ydCB7IERhdGVGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWZvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVJT1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlc0FyZUVxdWFsIH0gZnJvbSAnLi91dGlscy9kYXRlLXV0aWxzJztcblxuLy8gVGhlcmUgYXJlIGZvdXIgd2F5cyB0aGUgZGF0ZXBpY2tlciB2YWx1ZSBpcyBzZXRcbi8vIDEuIFZhbHVlIHNldCBieSB1c2VyIHR5cGluZyBpbnRvIHRleHQgaW5wdXQgYXMgYSBzdHJpbmcgZXg6ICcwMS8yOC8yMDE1J1xuLy8gMi4gVmFsdWUgc2V0IGV4cGxpY2l0bHkgYnkgQW5ndWxhciBGb3JtcyBBUElzIGFzIGEgc3RyaW5nIGV4OiAnMDEvMjgvMjAxNSdcbi8vIDMuIFZhbHVlIHNldCBieSB1c2VyIHZpYSBkYXRlcGlja2VyIFVJIGFzIGEgRGF0ZSBPYmplY3Rcbi8vIDQuIFZhbHVlIHNldCB2aWEgYGNsckRhdGVgIGlucHV0IGFzIGEgRGF0ZSBPYmplY3RcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRhdGVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWlucHV0XSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbRGF0ZXBpY2tlckZvY3VzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVJbnB1dCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJEYXRlQ29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIGRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oZmFsc2UpO1xuICBASW5wdXQoJ2NsckRhdGUnKVxuICBzZXQgZGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlICE9PSBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5nZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKGRhdGUpKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlKSB7XG4gICAgICB0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSA9IGRhdGU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGluZGV4ID0gMTtcbiAgcHJpdmF0ZSBpbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWU6IERhdGU7XG4gIHByaXZhdGUgcHJldmlvdXNEYXRlQ2hhbmdlOiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcm90ZWN0ZWQgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDbHJEYXRlQ29udGFpbmVyLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUlPU2VydmljZTogRGF0ZUlPU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlOiBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlRm9ybUNvbnRyb2xTZXJ2aWNlOiBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHZpZXdDb250YWluZXJSZWYsIENsckRhdGVDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLnBvcHVsYXRlU2VydmljZXNGcm9tQ29udGFpbmVyQ29tcG9uZW50KCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JDb250cm9sVmFsdWVDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvclRvdWNoQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9ySW5wdXRSZWZvY3VzKClcbiAgICApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gSWYgSSBkbyBub3QgMiBpc3N1ZXMgb2NjdXI6XG4gICAgLy8gMS4gVGhlIElucHV0IHNldHRlciBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0LiBuZ09uSW5pdCBpbml0aWFsaXplcyB0aGUgc2VydmljZXMgd2l0aG91dCB3aGljaCB0aGUgc2V0dGVyIGZhaWxzLlxuICAgIC8vIDIuIFRoZSBSZW5kZXJlciBkb2Vzbid0IHdvcmsgYmVmb3JlIG5nQWZ0ZXJWaWV3SW5pdCAoSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCB3ZSByZWZsZWN0IGl0IHdpdGggdGhlIHJpZ2h0IGRhdGUgb24gdGhlIGlucHV0IGZpZWxkIHVzaW5nIHRoZSBJTyBzZXJ2aWNlLiBJIGFtIG5vdCBzdXJlIGlmXG4gICAgLy8gdGhlc2UgYXJlIG1ham9yIGlzc3VlcyBvciBub3QgYnV0IGp1c3Qgbm90aW5nIHRoZW0gZG93biBoZXJlLlxuICAgIHRoaXMucHJvY2Vzc0luaXRpYWxJbnB1dHMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgc2V0Rm9jdXNTdGF0ZXMoKSB7XG4gICAgdGhpcy5zZXRGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci50cmlnZ2VyVmFsaWRhdGlvbigpO1xuICAgIHRoaXMuc2V0Rm9jdXMoZmFsc2UpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnBsYWNlaG9sZGVyJylcbiAgZ2V0IHBsYWNlaG9sZGVyVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyID8gdGhpcy5wbGFjZWhvbGRlciA6IHRoaXMuZGF0ZUlPU2VydmljZS5wbGFjZWhvbGRlclRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudHlwZScpXG4gIGdldCBpbnB1dFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpID8gJ2RhdGUnIDogJ3RleHQnO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsaWREYXRlVmFsdWUgPSB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGFyZ2V0LnZhbHVlKTtcbiAgICBpZiAodGhpcy51c2luZ0NsYXJpdHlEYXRlcGlja2VyKCkgJiYgdmFsaWREYXRlVmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh2YWxpZERhdGVWYWx1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpKSB7XG4gICAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB0YXJnZXQudmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZShuZXcgRGF0ZSgreWVhciwgK21vbnRoIC0gMSwgK2RheSksIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXNpbmdDbGFyaXR5RGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSB1c2luZ05hdGl2ZURhdGVwaWNrZXIoKSB7XG4gICAgcmV0dXJuICF0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZm9jdXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmRhdGVJT1NlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlSU9TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZU5hdmlnYXRpb25TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVGb3JtQ29udHJvbFNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0luaXRpYWxJbnB1dHMoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGhpcy5jb250cm9sLnZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEYXRlKHZhbHVlOiBEYXRlLCBzZXRCeVVzZXJJbnRlcmFjdGlvbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAoc2V0QnlVc2VySW50ZXJhY3Rpb24pIHtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF0ZVxuICAgICAgICA/IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpXG4gICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUlucHV0KGRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJbnB1dChkYXRlOiBEYXRlKSB7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGUpO1xuXG4gICAgICBpZiAodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSAmJiBkYXRlU3RyaW5nICE9PSB0aGlzLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cmluZyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZUFzRGF0ZScsIGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGRhdGVTdHJpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuZGF0ZUlPU2VydmljZSkge1xuICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZSk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKGRhdGVTdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXREYXRlT3V0cHV0KGRhdGU6IERhdGUpIHtcbiAgICBpZiAoIWRhdGVzQXJlRXF1YWwoZGF0ZSwgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UpKSB7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKCFkYXRlICYmIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlKSB7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChudWxsKTtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmNvbnRyb2w7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckNvbnRyb2xWYWx1ZUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIG9mKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGhhc0NvbnRyb2wgPT4gaGFzQ29udHJvbCksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzKSxcbiAgICAgICAgLy8gb25seSB1cGRhdGUgZGF0ZSB2YWx1ZSBpZiBub3QgYmVpbmcgc2V0IGJ5IHVzZXJcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZWxlbWVudElzRm9jdXNlZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4gdGhpcy51cGRhdGVEYXRlKHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh2YWx1ZSkpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2Uuc3Vic2NyaWJlKGRheU1vZGVsID0+IHRoaXMudXBkYXRlRGF0ZShkYXlNb2RlbC50b0RhdGUoKSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JUb3VjaENoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS50b3VjaGVkQ2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckRpcnR5Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc0RpcnR5KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JJbnB1dFJlZm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5Q2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoZGF0ZSA9PiAhIWRhdGUpKVxuICAgICAgLnN1YnNjcmliZSh2ID0+IHRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0lucHV0KHRoaXMuZWwubmF0aXZlRWxlbWVudCkpO1xuICB9XG59XG4iXX0=