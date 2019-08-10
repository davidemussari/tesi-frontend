/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { FormatWidth, FormStyle, getLocaleDateFormat, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, TranslationWidth, } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
/**
 * This service extracts the Angular CLDR data needed by the datepicker.
 */
var LocaleHelperService = /** @class */ (function () {
    function LocaleHelperService(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    Object.defineProperty(LocaleHelperService.prototype, "firstDayOfWeek", {
        get: function () {
            return this._firstDayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDaysNarrow", {
        get: function () {
            return this._localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsAbbreviated", {
        get: function () {
            return this._localeMonthsAbbreviated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsWide", {
        get: function () {
            return this._localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDateFormat", {
        get: function () {
            return this._localeDateFormat;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the locale data.
     */
    LocaleHelperService.prototype.initializeLocaleData = function () {
        // Order in which these functions is called is very important.
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    };
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     */
    LocaleHelperService.prototype.initializeLocaleDaysNarrow = function () {
        // Get locale day names starting with Sunday
        var tempArr = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        var firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            var prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push.apply(tempArr, tslib_1.__spread(prevDays));
        }
        this._localeDaysNarrow = tempArr;
    };
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     */
    LocaleHelperService.prototype.initializeLocaleMonthsAbbreviated = function () {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated).slice();
    };
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     */
    LocaleHelperService.prototype.initializeLocaleMonthsWide = function () {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide).slice();
    };
    /**
     * Initializes the first day of the week based on the locale.
     */
    LocaleHelperService.prototype.initializeFirstDayOfWeek = function () {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    };
    LocaleHelperService.prototype.initializeLocaleDateFormat = function () {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    };
    LocaleHelperService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [String])
    ], LocaleHelperService);
    return LocaleHelperService;
}());
export { LocaleHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ25CLGdCQUFnQixHQUNqQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RDs7R0FFRztBQUVIO0lBQ0UsNkJBQXNDLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSTVDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBSGxDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFRRCxzQkFBSSwrQ0FBYzthQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlEQUFnQjthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0RBQXVCO2FBQTNCO1lBQ0UsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpREFBZ0I7YUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlEQUFnQjthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7SUFDSyxrREFBb0IsR0FBNUI7UUFDRSw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHdEQUEwQixHQUFsQztRQUNFLDRDQUE0QztRQUM1QyxJQUFNLE9BQU8sR0FBYSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEgsZ0RBQWdEO1FBQ2hELElBQU0sY0FBYyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDbkQscUZBQXFGO1FBQ3JGLElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFNLFFBQVEsR0FBYSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsSUFBSSxPQUFaLE9BQU8sbUJBQVMsUUFBUSxHQUFFO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssK0RBQWlDLEdBQXpDO1FBQ0UsSUFBSSxDQUFDLHdCQUF3QixHQUFHLG1CQUFtQixDQUNqRCxJQUFJLENBQUMsTUFBTSxFQUNYLFNBQVMsQ0FBQyxVQUFVLEVBQ3BCLGdCQUFnQixDQUFDLFdBQVcsQ0FDN0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7O09BR0c7SUFDSyx3REFBMEIsR0FBbEM7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pILENBQUM7SUFFRDs7T0FFRztJQUNLLHNEQUF3QixHQUFoQztRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyx3REFBMEIsR0FBbEM7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQXpGVSxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO1FBRUUsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBOztPQURuQixtQkFBbUIsQ0EwRi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTFGRCxJQTBGQztTQTFGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIEZvcm1hdFdpZHRoLFxuICBGb3JtU3R5bGUsXG4gIGdldExvY2FsZURhdGVGb3JtYXQsXG4gIGdldExvY2FsZURheU5hbWVzLFxuICBnZXRMb2NhbGVGaXJzdERheU9mV2VlayxcbiAgZ2V0TG9jYWxlTW9udGhOYW1lcyxcbiAgVHJhbnNsYXRpb25XaWR0aCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGV4dHJhY3RzIHRoZSBBbmd1bGFyIENMRFIgZGF0YSBuZWVkZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGVIZWxwZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHB1YmxpYyBsb2NhbGU6IHN0cmluZykge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxvY2FsZURhdGEoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpcnN0RGF5T2ZXZWVrOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9sb2NhbGVEYXlzTmFycm93OiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gIHByaXZhdGUgX2xvY2FsZU1vbnRoc0FiYnJldmlhdGVkOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gIHByaXZhdGUgX2xvY2FsZU1vbnRoc1dpZGU6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbG9jYWxlRGF0ZUZvcm1hdDogc3RyaW5nO1xuXG4gIGdldCBmaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdERheU9mV2VlaztcbiAgfVxuXG4gIGdldCBsb2NhbGVEYXlzTmFycm93KCk6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURheXNOYXJyb3c7XG4gIH1cblxuICBnZXQgbG9jYWxlTW9udGhzQWJicmV2aWF0ZWQoKTogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlTW9udGhzQWJicmV2aWF0ZWQ7XG4gIH1cblxuICBnZXQgbG9jYWxlTW9udGhzV2lkZSgpOiBSZWFkb25seUFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVNb250aHNXaWRlO1xuICB9XG5cbiAgZ2V0IGxvY2FsZURhdGVGb3JtYXQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0ZUZvcm1hdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbG9jYWxlIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVMb2NhbGVEYXRhKCk6IHZvaWQge1xuICAgIC8vIE9yZGVyIGluIHdoaWNoIHRoZXNlIGZ1bmN0aW9ucyBpcyBjYWxsZWQgaXMgdmVyeSBpbXBvcnRhbnQuXG4gICAgdGhpcy5pbml0aWFsaXplRmlyc3REYXlPZldlZWsoKTtcbiAgICB0aGlzLmluaXRpYWxpemVMb2NhbGVEYXRlRm9ybWF0KCk7XG4gICAgdGhpcy5pbml0aWFsaXplTG9jYWxlTW9udGhzQWJicmV2aWF0ZWQoKTtcbiAgICB0aGlzLmluaXRpYWxpemVMb2NhbGVNb250aHNXaWRlKCk7XG4gICAgdGhpcy5pbml0aWFsaXplTG9jYWxlRGF5c05hcnJvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgZGF5IG5hbWVzIGluIHRoZSBUcmFuc2xhdGlvbldpZHRoLk5hcnJvdyBmb3JtYXQgYmFzZWQgb24gdGhlIGxvY2FsZS5cbiAgICogZWc6IFtTLCBNLCBULi4uXSBmb3IgZW4tVVMuXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVMb2NhbGVEYXlzTmFycm93KCk6IHZvaWQge1xuICAgIC8vIEdldCBsb2NhbGUgZGF5IG5hbWVzIHN0YXJ0aW5nIHdpdGggU3VuZGF5XG4gICAgY29uc3QgdGVtcEFycjogc3RyaW5nW10gPSBnZXRMb2NhbGVEYXlOYW1lcyh0aGlzLmxvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguTmFycm93KS5zbGljZSgpO1xuICAgIC8vIEdldCBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgYmFzZWQgb24gdGhlIGxvY2FsZVxuICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICAgIC8vIFJlYXJyYW5nZSB0aGUgdGVtcEFyciB0byBzdGFydCB3aXRoIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgYmFzZWQgb24gdGhlIGxvY2FsZS5cbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPiAwKSB7XG4gICAgICBjb25zdCBwcmV2RGF5czogc3RyaW5nW10gPSB0ZW1wQXJyLnNwbGljZSgwLCBmaXJzdERheU9mV2Vlayk7XG4gICAgICB0ZW1wQXJyLnB1c2goLi4ucHJldkRheXMpO1xuICAgIH1cbiAgICB0aGlzLl9sb2NhbGVEYXlzTmFycm93ID0gdGVtcEFycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYXJyYXkgb2YgbW9udGggbmFtZXMgaW4gdGhlIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQgZm9ybWF0LlxuICAgKiBlLmcuIGBbSmFuLCBGZWIsIC4uLl1gIGZvciBlbi1VU1xuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplTG9jYWxlTW9udGhzQWJicmV2aWF0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fbG9jYWxlTW9udGhzQWJicmV2aWF0ZWQgPSBnZXRMb2NhbGVNb250aE5hbWVzKFxuICAgICAgdGhpcy5sb2NhbGUsXG4gICAgICBGb3JtU3R5bGUuU3RhbmRhbG9uZSxcbiAgICAgIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWRcbiAgICApLnNsaWNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGFycmF5IG9mIG1vbnRoIG5hbWVzIGluIHRoZSBUcmFuc2xhdGlvbldpZHRoLldpZGUgZm9ybWF0LlxuICAgKiBlLmcuIGBbSmFudWFyeSwgRmVicnVhcnksIC4uLl1gIGZvciBlbi1VU1xuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplTG9jYWxlTW9udGhzV2lkZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9sb2NhbGVNb250aHNXaWRlID0gZ2V0TG9jYWxlTW9udGhOYW1lcyh0aGlzLmxvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSkuc2xpY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrIGJhc2VkIG9uIHRoZSBsb2NhbGUuXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVGaXJzdERheU9mV2VlaygpOiB2b2lkIHtcbiAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrKHRoaXMubG9jYWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxvY2FsZURhdGVGb3JtYXQoKTogdm9pZCB7XG4gICAgdGhpcy5fbG9jYWxlRGF0ZUZvcm1hdCA9IGdldExvY2FsZURhdGVGb3JtYXQodGhpcy5sb2NhbGUsIEZvcm1hdFdpZHRoLlNob3J0KTtcbiAgfVxufVxuIl19