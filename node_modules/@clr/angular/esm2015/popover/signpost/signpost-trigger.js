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
let ClrSignpostTrigger = 
/*********
 *
 * @description
 * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
 * ClrSignpostContent.
 *
 */
class ClrSignpostTrigger {
    constructor(ifOpenService, renderer, el, commonStrings, signpostIdService, platformId) {
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        this.signpostIdService = signpostIdService;
        this.platformId = platformId;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((isOpen) => {
            if (isOpen) {
                this.renderer.addClass(this.el.nativeElement, 'active');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'active');
                if (isPlatformBrowser(this.platformId)) {
                    this.el.nativeElement.focus();
                }
            }
            this.ariaExpanded = isOpen;
        }), this.signpostIdService.id.subscribe(idChange => (this.ariaControl = idChange)));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    onSignpostTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
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
export { ClrSignpostTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QtdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFtQnBFLElBQWEsa0JBQWtCO0FBUC9COzs7Ozs7R0FNRztBQUNILE1BQWEsa0JBQWtCO0lBSzdCLFlBQ1UsYUFBNEIsRUFDNUIsUUFBbUIsRUFDbkIsRUFBYyxFQUNmLGFBQXNDLEVBQ3JDLGlCQUFvQyxFQUNmLFVBQWtCO1FBTHZDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQVZ6QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFZekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQWUsRUFBRSxFQUFFO1lBQzFELElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUM3QixDQUFDLENBQUMsRUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUMvRSxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWlCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsc0JBQXNCLENBQUMsS0FBWTtRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs2Q0FDSixLQUFLOztnRUFFbEM7QUF6Q1Usa0JBQWtCO0lBakI5QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsbUJBQW1CLEVBQUUsbUNBQW1DO1lBQ3hELHNCQUFzQixFQUFFLGNBQWM7WUFDdEMsc0JBQXNCLEVBQUUsYUFBYTtTQUN0QztLQUNGLENBQUM7SUFFRjs7Ozs7O09BTUc7O0lBWUUsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZDQUxHLGFBQWE7UUFDbEIsU0FBUztRQUNmLFVBQVU7UUFDQSx1QkFBdUI7UUFDbEIsaUJBQWlCO1FBQ0gsTUFBTTtHQVh0QyxrQkFBa0IsQ0EwQzlCO1NBMUNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2lnbnBvc3RJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9zaWducG9zdC1pZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclNpZ25wb3N0VHJpZ2dlcl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdzaWducG9zdC10cmlnZ2VyJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnY29tbW9uU3RyaW5ncy5rZXlzLnNpZ25wb3N0VG9nZ2xlJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnYXJpYUV4cGFuZGVkJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnYXJpYUNvbnRyb2wnLFxuICB9LFxufSlcblxuLyoqKioqKioqKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBEaXJlY3RpdmUgYWRkZWQgdG8gdGhlIENsclNpZ25wb3N0IFRyaWdnZXIgYnV0dG9uIHRoYXQgd2lsbCBjYWxsIHRoZSBDbHJTaWducG9zdC50b2dnbGUoKSBmdW5jdGlvbiB0byBoaWRlL3Nob3cgdGhlXG4gKiBDbHJTaWducG9zdENvbnRlbnQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xyU2lnbnBvc3RUcmlnZ2VyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwdWJsaWMgYXJpYUV4cGFuZGVkOiBib29sZWFuO1xuICBwdWJsaWMgYXJpYUNvbnRyb2w6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2lnbnBvc3RJZFNlcnZpY2U6IFNpZ25wb3N0SWRTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKChpc09wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJpYUV4cGFuZGVkID0gaXNPcGVuO1xuICAgICAgfSksXG4gICAgICB0aGlzLnNpZ25wb3N0SWRTZXJ2aWNlLmlkLnN1YnNjcmliZShpZENoYW5nZSA9PiAodGhpcy5hcmlhQ29udHJvbCA9IGlkQ2hhbmdlKSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogY2xpY2sgaGFuZGxlciBmb3IgdGhlIENsclNpZ25wb3N0IHRyaWdnZXIgYnV0dG9uIHVzZWQgdG8gaGlkZS9zaG93IENsclNpZ25wb3N0Q29udGVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25TaWducG9zdFRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIl19