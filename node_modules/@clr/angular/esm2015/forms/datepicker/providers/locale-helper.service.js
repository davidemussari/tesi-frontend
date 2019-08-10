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
let LocaleHelperService = class LocaleHelperService {
    constructor(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    get localeDaysNarrow() {
        return this._localeDaysNarrow;
    }
    get localeMonthsAbbreviated() {
        return this._localeMonthsAbbreviated;
    }
    get localeMonthsWide() {
        return this._localeMonthsWide;
    }
    get localeDateFormat() {
        return this._localeDateFormat;
    }
    /**
     * Initializes the locale data.
     */
    initializeLocaleData() {
        // Order in which these functions is called is very important.
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    }
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     */
    initializeLocaleDaysNarrow() {
        // Get locale day names starting with Sunday
        const tempArr = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        const firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            const prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push(...prevDays);
        }
        this._localeDaysNarrow = tempArr;
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     */
    initializeLocaleMonthsAbbreviated() {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated).slice();
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     */
    initializeLocaleMonthsWide() {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide).slice();
    }
    /**
     * Initializes the first day of the week based on the locale.
     */
    initializeFirstDayOfWeek() {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    }
    initializeLocaleDateFormat() {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    }
};
LocaleHelperService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(LOCALE_ID)),
    tslib_1.__metadata("design:paramtypes", [String])
], LocaleHelperService);
export { LocaleHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ25CLGdCQUFnQixHQUNqQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RDs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQzlCLFlBQXNDLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSTVDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBSGxDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFRRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSx1QkFBdUI7UUFDekIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxvQkFBb0I7UUFDMUIsOERBQThEO1FBQzlELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSywwQkFBMEI7UUFDaEMsNENBQTRDO1FBQzVDLE1BQU0sT0FBTyxHQUFhLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoSCxnREFBZ0Q7UUFDaEQsTUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNuRCxxRkFBcUY7UUFDckYsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sUUFBUSxHQUFhLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGlDQUFpQztRQUN2QyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsbUJBQW1CLENBQ2pELElBQUksQ0FBQyxNQUFNLEVBQ1gsU0FBUyxDQUFDLFVBQVUsRUFDcEIsZ0JBQWdCLENBQUMsV0FBVyxDQUM3QixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7T0FHRztJQUNLLDBCQUEwQjtRQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pILENBQUM7SUFFRDs7T0FFRztJQUNLLHdCQUF3QjtRQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBQ0YsQ0FBQTtBQTFGWSxtQkFBbUI7SUFEL0IsVUFBVSxFQUFFO0lBRUUsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBOztHQURuQixtQkFBbUIsQ0EwRi9CO1NBMUZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgRm9ybWF0V2lkdGgsXG4gIEZvcm1TdHlsZSxcbiAgZ2V0TG9jYWxlRGF0ZUZvcm1hdCxcbiAgZ2V0TG9jYWxlRGF5TmFtZXMsXG4gIGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrLFxuICBnZXRMb2NhbGVNb250aE5hbWVzLFxuICBUcmFuc2xhdGlvbldpZHRoLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgZXh0cmFjdHMgdGhlIEFuZ3VsYXIgQ0xEUiBkYXRhIG5lZWRlZCBieSB0aGUgZGF0ZXBpY2tlci5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsZUhlbHBlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHVibGljIGxvY2FsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5pbml0aWFsaXplTG9jYWxlRGF0YSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlyc3REYXlPZldlZWs6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xvY2FsZURheXNOYXJyb3c6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbG9jYWxlTW9udGhzQWJicmV2aWF0ZWQ6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbG9jYWxlTW9udGhzV2lkZTogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICBwcml2YXRlIF9sb2NhbGVEYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgZ2V0IGZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgZ2V0IGxvY2FsZURheXNOYXJyb3coKTogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF5c05hcnJvdztcbiAgfVxuXG4gIGdldCBsb2NhbGVNb250aHNBYmJyZXZpYXRlZCgpOiBSZWFkb25seUFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVNb250aHNBYmJyZXZpYXRlZDtcbiAgfVxuXG4gIGdldCBsb2NhbGVNb250aHNXaWRlKCk6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZU1vbnRoc1dpZGU7XG4gIH1cblxuICBnZXQgbG9jYWxlRGF0ZUZvcm1hdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRlRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBsb2NhbGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxvY2FsZURhdGEoKTogdm9pZCB7XG4gICAgLy8gT3JkZXIgaW4gd2hpY2ggdGhlc2UgZnVuY3Rpb25zIGlzIGNhbGxlZCBpcyB2ZXJ5IGltcG9ydGFudC5cbiAgICB0aGlzLmluaXRpYWxpemVGaXJzdERheU9mV2VlaygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxvY2FsZURhdGVGb3JtYXQoKTtcbiAgICB0aGlzLmluaXRpYWxpemVMb2NhbGVNb250aHNBYmJyZXZpYXRlZCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxvY2FsZU1vbnRoc1dpZGUoKTtcbiAgICB0aGlzLmluaXRpYWxpemVMb2NhbGVEYXlzTmFycm93KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBkYXkgbmFtZXMgaW4gdGhlIFRyYW5zbGF0aW9uV2lkdGguTmFycm93IGZvcm1hdCBiYXNlZCBvbiB0aGUgbG9jYWxlLlxuICAgKiBlZzogW1MsIE0sIFQuLi5dIGZvciBlbi1VUy5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxvY2FsZURheXNOYXJyb3coKTogdm9pZCB7XG4gICAgLy8gR2V0IGxvY2FsZSBkYXkgbmFtZXMgc3RhcnRpbmcgd2l0aCBTdW5kYXlcbiAgICBjb25zdCB0ZW1wQXJyOiBzdHJpbmdbXSA9IGdldExvY2FsZURheU5hbWVzKHRoaXMubG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5OYXJyb3cpLnNsaWNlKCk7XG4gICAgLy8gR2V0IGZpcnN0IGRheSBvZiB0aGUgd2VlayBiYXNlZCBvbiB0aGUgbG9jYWxlXG4gICAgY29uc3QgZmlyc3REYXlPZldlZWs6IG51bWJlciA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgLy8gUmVhcnJhbmdlIHRoZSB0ZW1wQXJyIHRvIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayBiYXNlZCBvbiB0aGUgbG9jYWxlLlxuICAgIGlmIChmaXJzdERheU9mV2VlayA+IDApIHtcbiAgICAgIGNvbnN0IHByZXZEYXlzOiBzdHJpbmdbXSA9IHRlbXBBcnIuc3BsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKTtcbiAgICAgIHRlbXBBcnIucHVzaCguLi5wcmV2RGF5cyk7XG4gICAgfVxuICAgIHRoaXMuX2xvY2FsZURheXNOYXJyb3cgPSB0ZW1wQXJyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBhcnJheSBvZiBtb250aCBuYW1lcyBpbiB0aGUgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZCBmb3JtYXQuXG4gICAqIGUuZy4gYFtKYW4sIEZlYiwgLi4uXWAgZm9yIGVuLVVTXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVMb2NhbGVNb250aHNBYmJyZXZpYXRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9sb2NhbGVNb250aHNBYmJyZXZpYXRlZCA9IGdldExvY2FsZU1vbnRoTmFtZXMoXG4gICAgICB0aGlzLmxvY2FsZSxcbiAgICAgIEZvcm1TdHlsZS5TdGFuZGFsb25lLFxuICAgICAgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZFxuICAgICkuc2xpY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYXJyYXkgb2YgbW9udGggbmFtZXMgaW4gdGhlIFRyYW5zbGF0aW9uV2lkdGguV2lkZSBmb3JtYXQuXG4gICAqIGUuZy4gYFtKYW51YXJ5LCBGZWJydWFyeSwgLi4uXWAgZm9yIGVuLVVTXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVMb2NhbGVNb250aHNXaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2xvY2FsZU1vbnRoc1dpZGUgPSBnZXRMb2NhbGVNb250aE5hbWVzKHRoaXMubG9jYWxlLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5XaWRlKS5zbGljZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgYmFzZWQgb24gdGhlIGxvY2FsZS5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUZpcnN0RGF5T2ZXZWVrKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gZ2V0TG9jYWxlRmlyc3REYXlPZldlZWsodGhpcy5sb2NhbGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplTG9jYWxlRGF0ZUZvcm1hdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9sb2NhbGVEYXRlRm9ybWF0ID0gZ2V0TG9jYWxlRGF0ZUZvcm1hdCh0aGlzLmxvY2FsZSwgRm9ybWF0V2lkdGguU2hvcnQpO1xuICB9XG59XG4iXX0=