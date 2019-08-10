import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SignpostIdService } from './providers/signpost-id.service';
var ClrSignpostTrigger = /** @class */ (function () {
    function ClrSignpostTrigger(ifOpenService, renderer, el, commonStrings, signpostIdService, platformId) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        this.signpostIdService = signpostIdService;
        this.platformId = platformId;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe(function (isOpen) {
            if (isOpen) {
                _this.renderer.addClass(_this.el.nativeElement, 'active');
            }
            else {
                _this.renderer.removeClass(_this.el.nativeElement, 'active');
                if (isPlatformBrowser(_this.platformId)) {
                    _this.el.nativeElement.focus();
                }
            }
            _this.ariaExpanded = isOpen;
        }), this.signpostIdService.id.subscribe(function (idChange) { return (_this.ariaControl = idChange); }));
    }
    ClrSignpostTrigger.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    ClrSignpostTrigger.prototype.onSignpostTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrSignpostTrigger.prototype, "onSignpostTriggerClick", null);
    ClrSignpostTrigger = tslib_1.__decorate([
        Directive({
            selector: '[clrSignpostTrigger]',
            host: {
                class: 'signpost-trigger',
                '[attr.aria-label]': 'commonStrings.keys.signpostToggle',
                '[attr.aria-expanded]': 'ariaExpanded',
                '[attr.aria-controls]': 'ariaControl',
            },
        })
        /*********
         *
         * @description
         * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
         * ClrSignpostContent.
         *
         */
        ,
        tslib_1.__param(5, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [IfOpenService,
            Renderer2,
            ElementRef,
            ClrCommonStringsService,
            SignpostIdService,
            Object])
    ], ClrSignpostTrigger);
    return ClrSignpostTrigger;
}());
export { ClrSignpostTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFtQnBFO0lBS0UsNEJBQ1UsYUFBNEIsRUFDNUIsUUFBbUIsRUFDbkIsRUFBYyxFQUNmLGFBQXNDLEVBQ3JDLGlCQUFvQyxFQUNmLFVBQWtCO1FBTmpELGlCQXNCQztRQXJCUyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDckMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNmLGVBQVUsR0FBVixVQUFVLENBQVE7UUFWekMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBWXpDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFlO1lBQ3RELElBQUksTUFBTSxFQUFFO2dCQUNWLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDdEMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixDQUFDLENBQUMsRUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUMvRSxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQWlCLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVILG1EQUFzQixHQUF0QixVQUF1QixLQUFZO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFGRDtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7aURBQ0osS0FBSzs7b0VBRWxDO0lBekNVLGtCQUFrQjtRQWpCOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtnQkFDekIsbUJBQW1CLEVBQUUsbUNBQW1DO2dCQUN4RCxzQkFBc0IsRUFBRSxjQUFjO2dCQUN0QyxzQkFBc0IsRUFBRSxhQUFhO2FBQ3RDO1NBQ0YsQ0FBQztRQUVGOzs7Ozs7V0FNRzs7UUFZRSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBTEcsYUFBYTtZQUNsQixTQUFTO1lBQ2YsVUFBVTtZQUNBLHVCQUF1QjtZQUNsQixpQkFBaUI7WUFDSCxNQUFNO09BWHRDLGtCQUFrQixDQTBDOUI7SUFBRCx5QkFBQztDQUFBLEFBMUNELElBMENDO1NBMUNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2lnbnBvc3RJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9zaWducG9zdC1pZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclNpZ25wb3N0VHJpZ2dlcl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdzaWducG9zdC10cmlnZ2VyJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnY29tbW9uU3RyaW5ncy5rZXlzLnNpZ25wb3N0VG9nZ2xlJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnYXJpYUV4cGFuZGVkJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnYXJpYUNvbnRyb2wnLFxuICB9LFxufSlcblxuLyoqKioqKioqKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBEaXJlY3RpdmUgYWRkZWQgdG8gdGhlIENsclNpZ25wb3N0IFRyaWdnZXIgYnV0dG9uIHRoYXQgd2lsbCBjYWxsIHRoZSBDbHJTaWducG9zdC50b2dnbGUoKSBmdW5jdGlvbiB0byBoaWRlL3Nob3cgdGhlXG4gKiBDbHJTaWducG9zdENvbnRlbnQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xyU2lnbnBvc3RUcmlnZ2VyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwdWJsaWMgYXJpYUV4cGFuZGVkOiBib29sZWFuO1xuICBwdWJsaWMgYXJpYUNvbnRyb2w6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2lnbnBvc3RJZFNlcnZpY2U6IFNpZ25wb3N0SWRTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKChpc09wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJpYUV4cGFuZGVkID0gaXNPcGVuO1xuICAgICAgfSksXG4gICAgICB0aGlzLnNpZ25wb3N0SWRTZXJ2aWNlLmlkLnN1YnNjcmliZShpZENoYW5nZSA9PiAodGhpcy5hcmlhQ29udHJvbCA9IGlkQ2hhbmdlKSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogY2xpY2sgaGFuZGxlciBmb3IgdGhlIENsclNpZ25wb3N0IHRyaWdnZXIgYnV0dG9uIHVzZWQgdG8gaGlkZS9zaG93IENsclNpZ25wb3N0Q29udGVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25TaWducG9zdFRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIl19