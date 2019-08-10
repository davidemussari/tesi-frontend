/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavIconService } from './providers/vertical-nav-icon.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var ClrVerticalNav = /** @class */ (function () {
    function ClrVerticalNav(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        var _this = this;
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(function (value) {
            _this._collapsedChanged.emit(value);
        });
    }
    Object.defineProperty(ClrVerticalNav.prototype, "collapsible", {
        get: function () {
            return this._navService.collapsible;
        },
        set: function (value) {
            this._navService.collapsible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "collapsed", {
        get: function () {
            return this._navService.collapsed;
        },
        set: function (value) {
            this._navService.collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasNavGroups", {
        get: function () {
            return this._navGroupRegistrationService.navGroupCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasIcons", {
        get: function () {
            return this._navIconService.hasIcons;
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNav.prototype.toggleByButton = function () {
        this.collapsed = !this.collapsed;
    };
    ClrVerticalNav.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
    };
    tslib_1.__decorate([
        Input('clrVerticalNavCollapsible'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrVerticalNav.prototype, "collapsible", null);
    tslib_1.__decorate([
        Input('clrVerticalNavCollapsed'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrVerticalNav.prototype, "collapsed", null);
    tslib_1.__decorate([
        Output('clrVerticalNavCollapsedChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrVerticalNav.prototype, "_collapsedChanged", void 0);
    ClrVerticalNav = tslib_1.__decorate([
        Component({
            selector: 'clr-vertical-nav',
            template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<button type=\"button\" class=\"nav-trigger\"\n        [class.on-collapse]=\"collapsed\"\n        (click)=\"toggleByButton()\"\n        *ngIf=\"collapsible\">\n    <clr-icon shape=\"angle-double\"\n              class=\"nav-trigger-icon\"\n              [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"\n              [attr.title]=\"(this.collapsed) ? commonStrings.keys.expand : commonStrings.keys.collapse\"></clr-icon>\n</button>\n<!-- Click handler on .nav-content is bad but required :-( -->\n<div class=\"nav-content\">\n    <ng-content></ng-content>\n    <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n</div>\n",
            providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
            host: {
                class: 'clr-vertical-nav',
                '[class.is-collapsed]': 'collapsed',
                '[class.has-nav-groups]': 'hasNavGroups',
                '[class.has-icons]': 'hasIcons',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [VerticalNavService,
            VerticalNavIconService,
            VerticalNavGroupRegistrationService,
            ClrCommonStringsService])
    ], ClrVerticalNav);
    return ClrVerticalNav;
}());
export { ClrVerticalNav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBYWxGO0lBZ0NFLHdCQUNVLFdBQStCLEVBQy9CLGVBQXVDLEVBQ3ZDLDRCQUFpRSxFQUNsRSxhQUFzQztRQUovQyxpQkFTQztRQVJTLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFxQztRQUNsRSxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFoQnZDLHNCQUFpQixHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQWtCakYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDM0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF4Q0Qsc0JBQUksdUNBQVc7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDdEMsQ0FBQzthQUdELFVBQWdCLEtBQWM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUM7OztPQUxBO0lBT0Qsc0JBQUkscUNBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDcEMsQ0FBQzthQUdELFVBQWMsS0FBYztZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDckMsQ0FBQzs7O09BTEE7SUFVRCxzQkFBSSx3Q0FBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQWVELHVDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTNDRDtRQURDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQzs7O3FEQUdsQztJQU9EO1FBREMsS0FBSyxDQUFDLHlCQUF5QixDQUFDOzs7bURBR2hDO0lBR0Q7UUFEQyxNQUFNLENBQUMsK0JBQStCLENBQUM7MENBQ2IsWUFBWTs2REFBNEM7SUFwQnhFLGNBQWM7UUFYMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QiwrNEJBQWtDO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLG1DQUFtQyxDQUFDO1lBQzVGLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixzQkFBc0IsRUFBRSxXQUFXO2dCQUNuQyx3QkFBd0IsRUFBRSxjQUFjO2dCQUN4QyxtQkFBbUIsRUFBRSxVQUFVO2FBQ2hDO1NBQ0YsQ0FBQztpREFrQ3VCLGtCQUFrQjtZQUNkLHNCQUFzQjtZQUNULG1DQUFtQztZQUNuRCx1QkFBdUI7T0FwQ3BDLGNBQWMsQ0FrRDFCO0lBQUQscUJBQUM7Q0FBQSxBQWxERCxJQWtEQztTQWxEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYtZ3JvdXAtcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmVydGljYWxOYXZJY29uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1pY29uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmVydGljYWxOYXZTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdmVydGljYWwtbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLW5hdi5odG1sJyxcbiAgcHJvdmlkZXJzOiBbVmVydGljYWxOYXZTZXJ2aWNlLCBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlLCBWZXJ0aWNhbE5hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2Nsci12ZXJ0aWNhbC1uYXYnLFxuICAgICdbY2xhc3MuaXMtY29sbGFwc2VkXSc6ICdjb2xsYXBzZWQnLFxuICAgICdbY2xhc3MuaGFzLW5hdi1ncm91cHNdJzogJ2hhc05hdkdyb3VwcycsXG4gICAgJ1tjbGFzcy5oYXMtaWNvbnNdJzogJ2hhc0ljb25zJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVmVydGljYWxOYXYgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBnZXQgY29sbGFwc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2libGU7XG4gIH1cblxuICBASW5wdXQoJ2NsclZlcnRpY2FsTmF2Q29sbGFwc2libGUnKVxuICBzZXQgY29sbGFwc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNpYmxlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyVmVydGljYWxOYXZDb2xsYXBzZWQnKVxuICBzZXQgY29sbGFwc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsclZlcnRpY2FsTmF2Q29sbGFwc2VkQ2hhbmdlJylcbiAgcHJpdmF0ZSBfY29sbGFwc2VkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBnZXQgaGFzTmF2R3JvdXBzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UubmF2R3JvdXBDb3VudCA+IDA7XG4gIH1cblxuICBnZXQgaGFzSWNvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdkljb25TZXJ2aWNlLmhhc0ljb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbmF2U2VydmljZTogVmVydGljYWxOYXZTZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkljb25TZXJ2aWNlOiBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZTogVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuX3N1YiA9IHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkQ2hhbmdlZC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5lbWl0KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZUJ5QnV0dG9uKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==