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
var ClrDateInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDateInput, _super);
    function ClrDateInput(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
        var _this = _super.call(this, viewContainerRef, ClrDateContainer, injector, control, renderer, el) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.control = control;
        _this.container = container;
        _this.dateIOService = dateIOService;
        _this.dateNavigationService = dateNavigationService;
        _this.datepickerEnabledService = datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this.focusService = focusService;
        _this.datepickerFocusService = datepickerFocusService;
        _this.dateChange = new EventEmitter(false);
        _this.index = 1;
        return _this;
    }
    Object.defineProperty(ClrDateInput.prototype, "date", {
        set: function (date) {
            if (this.previousDateChange !== date) {
                this.updateDate(this.getValidDateValueFromDate(date));
            }
            if (!this.initialClrDateInputValue) {
                this.initialClrDateInputValue = date;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDateInput.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    };
    ClrDateInput.prototype.ngAfterViewInit = function () {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    };
    ClrDateInput.prototype.setFocusStates = function () {
        this.setFocus(true);
    };
    ClrDateInput.prototype.triggerValidation = function () {
        _super.prototype.triggerValidation.call(this);
        this.setFocus(false);
    };
    Object.defineProperty(ClrDateInput.prototype, "placeholderText", {
        get: function () {
            return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDateInput.prototype, "inputType", {
        get: function () {
            return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
        },
        enumerable: true,
        configurable: true
    });
    ClrDateInput.prototype.onValueChange = function (target) {
        var validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            var _a = tslib_1.__read(target.value.split('-'), 3), year = _a[0], month = _a[1], day = _a[2];
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    };
    ClrDateInput.prototype.usingClarityDatepicker = function () {
        return this.datepickerEnabledService.isEnabled;
    };
    ClrDateInput.prototype.usingNativeDatepicker = function () {
        return !this.datepickerEnabledService.isEnabled;
    };
    ClrDateInput.prototype.setFocus = function (focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    };
    ClrDateInput.prototype.populateServicesFromContainerComponent = function () {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    };
    ClrDateInput.prototype.processInitialInputs = function () {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    };
    ClrDateInput.prototype.updateDate = function (value, setByUserInteraction) {
        if (setByUserInteraction === void 0) { setByUserInteraction = false; }
        var date = this.getValidDateValueFromDate(value);
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
    };
    ClrDateInput.prototype.updateInput = function (date) {
        if (date) {
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
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
    };
    ClrDateInput.prototype.getValidDateValueFromDate = function (date) {
        if (this.dateIOService) {
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    };
    ClrDateInput.prototype.emitDateOutput = function (date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    };
    ClrDateInput.prototype.datepickerHasFormControl = function () {
        return !!this.control;
    };
    ClrDateInput.prototype.listenForControlValueChanges = function () {
        var _this = this;
        return of(this.datepickerHasFormControl())
            .pipe(filter(function (hasControl) { return hasControl; }), switchMap(function () { return _this.control.valueChanges; }), 
        // only update date value if not being set by user
        filter(function () { return !_this.datepickerFocusService.elementIsFocused(_this.el.nativeElement); }))
            .subscribe(function (value) { return _this.updateDate(_this.dateIOService.getDateValueFromDateString(value)); });
    };
    ClrDateInput.prototype.listenForUserSelectedDayChanges = function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange.subscribe(function (dayModel) { return _this.updateDate(dayModel.toDate(), true); });
    };
    ClrDateInput.prototype.listenForTouchChanges = function () {
        var _this = this;
        return this.dateFormControlService.touchedChange
            .pipe(filter(function () { return _this.datepickerHasFormControl(); }))
            .subscribe(function () { return _this.control.control.markAsTouched(); });
    };
    ClrDateInput.prototype.listenForDirtyChanges = function () {
        var _this = this;
        return this.dateFormControlService.dirtyChange
            .pipe(filter(function () { return _this.datepickerHasFormControl(); }))
            .subscribe(function () { return _this.control.control.markAsDirty(); });
    };
    ClrDateInput.prototype.listenForInputRefocus = function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange
            .pipe(filter(function (date) { return !!date; }))
            .subscribe(function (v) { return _this.datepickerFocusService.focusInput(_this.el.nativeElement); });
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
    return ClrDateInput;
}(WrappedFormControl));
export { ClrDateInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxJQUFJLEVBQ0osZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXND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UUFBUTtZQUNKLFVBQVU7WUFDSixTQUFTO1lBR1YsU0FBUztZQUNHLGdCQUFnQjtZQUNaLGFBQWE7WUFDTCxxQkFBcUI7WUFDbEIsd0JBQXdCO1lBQzFCLHNCQUFzQjtZQUN6QixNQUFNO1lBQ2IsWUFBWTtZQUNkLHNCQUFzQjtPQWpDN0MsWUFBWSxDQXdOeEI7SUFBRCxtQkFBQztDQUFBLEFBeE5ELENBQWtDLGtCQUFrQixHQXdObkQ7U0F4TlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IGRhdGVzQXJlRXF1YWwgfSBmcm9tICcuL3V0aWxzL2RhdGUtdXRpbHMnO1xuXG4vLyBUaGVyZSBhcmUgZm91ciB3YXlzIHRoZSBkYXRlcGlja2VyIHZhbHVlIGlzIHNldFxuLy8gMS4gVmFsdWUgc2V0IGJ5IHVzZXIgdHlwaW5nIGludG8gdGV4dCBpbnB1dCBhcyBhIHN0cmluZyBleDogJzAxLzI4LzIwMTUnXG4vLyAyLiBWYWx1ZSBzZXQgZXhwbGljaXRseSBieSBBbmd1bGFyIEZvcm1zIEFQSXMgYXMgYSBzdHJpbmcgZXg6ICcwMS8yOC8yMDE1J1xuLy8gMy4gVmFsdWUgc2V0IGJ5IHVzZXIgdmlhIGRhdGVwaWNrZXIgVUkgYXMgYSBEYXRlIE9iamVjdFxuLy8gNC4gVmFsdWUgc2V0IHZpYSBgY2xyRGF0ZWAgaW5wdXQgYXMgYSBEYXRlIE9iamVjdFxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRGF0ZV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBAT3V0cHV0KCdjbHJEYXRlQ2hhbmdlJykgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKGRhdGU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgIT09IGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUoZGF0ZSkpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlID0gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5kZXggPSAxO1xuICBwcml2YXRlIGluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZTogRGF0ZTtcbiAgcHJpdmF0ZSBwcmV2aW91c0RhdGVDaGFuZ2U6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByb3RlY3RlZCBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENsckRhdGVDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGVwaWNrZXJGb2N1c1NlcnZpY2U6IERhdGVwaWNrZXJGb2N1c1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodmlld0NvbnRhaW5lclJlZiwgQ2xyRGF0ZUNvbnRhaW5lciwgaW5qZWN0b3IsIGNvbnRyb2wsIHJlbmRlcmVyLCBlbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMucG9wdWxhdGVTZXJ2aWNlc0Zyb21Db250YWluZXJDb21wb25lbnQoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5saXN0ZW5Gb3JVc2VyU2VsZWN0ZWREYXlDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvckNvbnRyb2xWYWx1ZUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yVG91Y2hDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvckRpcnR5Q2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JJbnB1dFJlZm9jdXMoKVxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gSSBkb24ndCBrbm93IHdoeSBJIGhhdmUgdG8gZG8gdGhpcyBidXQgYWZ0ZXIgdXNpbmcgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIEkgaGF2ZSB0byBkZWxheSB0aGUgcHJvY2Vzc2luZ1xuICAgIC8vIG9mIHRoZSBpbml0aWFsIElucHV0IHNldCBieSB0aGUgdXNlciB0byBoZXJlLiBJZiBJIGRvIG5vdCAyIGlzc3VlcyBvY2N1cjpcbiAgICAvLyAxLiBUaGUgSW5wdXQgc2V0dGVyIGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXQuIG5nT25Jbml0IGluaXRpYWxpemVzIHRoZSBzZXJ2aWNlcyB3aXRob3V0IHdoaWNoIHRoZSBzZXR0ZXIgZmFpbHMuXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0IChJdCB1c2VkIHRvIGJlZm9yZSB0aGUgbmV3IEhvc3RXcmFwcGluZyBNb2R1bGUgZm9yIHNvbWUgcmVhc29uKS5cbiAgICAvLyBJIG5lZWQgdGhlIHJlbmRlcmVyIHRvIHNldCB0aGUgdmFsdWUgcHJvcGVydHkgb24gdGhlIGlucHV0IHRvIG1ha2Ugc3VyZSB0aGF0IGlmIHRoZSB1c2VyIGhhcyBzdXBwbGllZCBhIERhdGVcbiAgICAvLyBpbnB1dCBvYmplY3QsIHdlIHJlZmxlY3QgaXQgd2l0aCB0aGUgcmlnaHQgZGF0ZSBvbiB0aGUgaW5wdXQgZmllbGQgdXNpbmcgdGhlIElPIHNlcnZpY2UuIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgdGhpcy5wcm9jZXNzSW5pdGlhbElucHV0cygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBzZXRGb2N1c1N0YXRlcygpIHtcbiAgICB0aGlzLnNldEZvY3VzKHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLnRyaWdnZXJWYWxpZGF0aW9uKCk7XG4gICAgdGhpcy5zZXRGb2N1cyhmYWxzZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucGxhY2Vob2xkZXInKVxuICBnZXQgcGxhY2Vob2xkZXJUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogdGhpcy5kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkgPyAnZGF0ZScgOiAndGV4dCc7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25WYWx1ZUNoYW5nZSh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCB2YWxpZERhdGVWYWx1ZSA9IHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh0YXJnZXQudmFsdWUpO1xuICAgIGlmICh0aGlzLnVzaW5nQ2xhcml0eURhdGVwaWNrZXIoKSAmJiB2YWxpZERhdGVWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHZhbGlkRGF0ZVZhbHVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkpIHtcbiAgICAgIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHRhcmdldC52YWx1ZS5zcGxpdCgnLScpO1xuICAgICAgdGhpcy51cGRhdGVEYXRlKG5ldyBEYXRlKCt5ZWFyLCArbW9udGggLSAxLCArZGF5KSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1c2luZ0NsYXJpdHlEYXRlcGlja2VyKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gIXRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXMoZm9jdXM6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSBmb2N1cztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlU2VydmljZXNGcm9tQ29udGFpbmVyQ29tcG9uZW50KCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMuZGF0ZUlPU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVJT1NlcnZpY2UpO1xuICAgICAgdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlTmF2aWdhdGlvblNlcnZpY2UpO1xuICAgICAgdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UpO1xuICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUZvcm1Db250cm9sU2VydmljZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzSW5pdGlhbElucHV0cygpIHtcbiAgICBpZiAodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh0aGlzLmNvbnRyb2wudmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURhdGUodmFsdWU6IERhdGUsIHNldEJ5VXNlckludGVyYWN0aW9uID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5nZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKHZhbHVlKTtcblxuICAgIGlmIChzZXRCeVVzZXJJbnRlcmFjdGlvbikge1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBkYXRlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXRlXG4gICAgICAgID8gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSlcbiAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSW5wdXQoZGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUlucHV0KGRhdGU6IERhdGUpIHtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZSk7XG5cbiAgICAgIGlmICh0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpICYmIGRhdGVTdHJpbmcgIT09IHRoaXMuY29udHJvbC52YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2wuY29udHJvbC5zZXRWYWx1ZShkYXRlU3RyaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlQXNEYXRlJywgZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgZGF0ZVN0cmluZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKGRhdGU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5kYXRlSU9TZXJ2aWNlKSB7XG4gICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhkYXRlKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcoZGF0ZVN0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdERhdGVPdXRwdXQoZGF0ZTogRGF0ZSkge1xuICAgIGlmICghZGF0ZXNBcmVFcXVhbChkYXRlLCB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSkpIHtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBkYXRlO1xuICAgIH0gZWxzZSBpZiAoIWRhdGUgJiYgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkge1xuICAgIHJldHVybiAhIXRoaXMuY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yQ29udHJvbFZhbHVlQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gb2YodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoaGFzQ29udHJvbCA9PiBoYXNDb250cm9sKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXMpLFxuICAgICAgICAvLyBvbmx5IHVwZGF0ZSBkYXRlIHZhbHVlIGlmIG5vdCBiZWluZyBzZXQgYnkgdXNlclxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5lbGVtZW50SXNGb2N1c2VkKHRoaXMuZWwubmF0aXZlRWxlbWVudCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogc3RyaW5nKSA9PiB0aGlzLnVwZGF0ZURhdGUodGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHZhbHVlKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JVc2VyU2VsZWN0ZWREYXlDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoZGF5TW9kZWwgPT4gdGhpcy51cGRhdGVEYXRlKGRheU1vZGVsLnRvRGF0ZSgpLCB0cnVlKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclRvdWNoQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yRGlydHlDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UuZGlydHlDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvcklucHV0UmVmb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcihkYXRlID0+ICEhZGF0ZSkpXG4gICAgICAuc3Vic2NyaWJlKHYgPT4gdGhpcy5kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzSW5wdXQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSk7XG4gIH1cbn1cbiJdfQ==