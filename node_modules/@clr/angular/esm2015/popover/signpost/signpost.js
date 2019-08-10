import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ElementRef } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { ClrSignpostTrigger } from './signpost-trigger';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SignpostIdService } from './providers/signpost-id.service';
let ClrSignpost = 
/*********
 *
 * @class ClrSignpost
 *
 * @description
 * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
 * It supports the clrPosition with a 'right-middle' default.
 *
 */
class ClrSignpost {
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        /**********
         * @property useCustomTrigger
         *
         * @description
         * Flag used to determine if we need to use the default trigger or a user supplied trigger element.
         *
         */
        this.useCustomTrigger = false;
    }
    /**********
     * @property signPostTrigger
     *
     * @description
     * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
     *
     */
    set customTrigger(trigger) {
        this.useCustomTrigger = !!trigger;
    }
};
tslib_1.__decorate([
    ContentChild(ClrSignpostTrigger, { static: false }),
    tslib_1.__metadata("design:type", ClrSignpostTrigger),
    tslib_1.__metadata("design:paramtypes", [ClrSignpostTrigger])
], ClrSignpost.prototype, "customTrigger", null);
ClrSignpost = tslib_1.__decorate([
    Component({
        selector: 'clr-signpost',
        template: `
        <ng-container *ngIf="!useCustomTrigger">
            <button
                type="button"
                class="signpost-action btn btn-small btn-link"
                clrSignpostTrigger>
                <clr-icon shape="info" [attr.title]="commonStrings.keys.info"></clr-icon>
            </button>
        </ng-container>
        
        <ng-content></ng-content>
    `,
        host: { '[class.signpost]': 'true' },
        providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }, SignpostIdService]
    })
    /*********
     *
     * @class ClrSignpost
     *
     * @description
     * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
     * It supports the clrPosition with a 'right-middle' default.
     *
     */
    ,
    tslib_1.__metadata("design:paramtypes", [ClrCommonStringsService])
], ClrSignpost);
export { ClrSignpost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL3NpZ25wb3N0L3NpZ25wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQTZCcEUsSUFBYSxXQUFXO0FBVHhCOzs7Ozs7OztHQVFHO0FBQ0gsTUFBYSxXQUFXO0lBQ3RCLFlBQW1CLGFBQXNDO1FBQXRDLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUV6RDs7Ozs7O1dBTUc7UUFDSSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7SUFUbUIsQ0FBQztJQVc3RDs7Ozs7O09BTUc7SUFFSCxJQUFJLGFBQWEsQ0FBQyxPQUEyQjtRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUN6QixrQkFBa0I7NkNBQWxCLGtCQUFrQjtnREFFNUM7QUF0QlUsV0FBVztJQTNCdkIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztLQVdQO1FBQ0gsSUFBSSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFO1FBQ3BDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEVBQUUsaUJBQWlCLENBQUM7S0FDekcsQ0FBQztJQUVGOzs7Ozs7OztPQVFHOzs2Q0FFaUMsdUJBQXVCO0dBRDlDLFdBQVcsQ0F1QnZCO1NBdkJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBPUE9WRVJfSE9TVF9BTkNIT1IgfSBmcm9tICcuLi9jb21tb24vcG9wb3Zlci1ob3N0LWFuY2hvci50b2tlbic7XG5cbmltcG9ydCB7IENsclNpZ25wb3N0VHJpZ2dlciB9IGZyb20gJy4vc2lnbnBvc3QtdHJpZ2dlcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBTaWducG9zdElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3NpZ25wb3N0LWlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItc2lnbnBvc3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXVzZUN1c3RvbVRyaWdnZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInNpZ25wb3N0LWFjdGlvbiBidG4gYnRuLXNtYWxsIGJ0bi1saW5rXCJcbiAgICAgICAgICAgICAgICBjbHJTaWducG9zdFRyaWdnZXI+XG4gICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiaW5mb1wiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mua2V5cy5pbmZvXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3Muc2lnbnBvc3RdJzogJ3RydWUnIH0sXG4gIHByb3ZpZGVyczogW0lmT3BlblNlcnZpY2UsIHsgcHJvdmlkZTogUE9QT1ZFUl9IT1NUX0FOQ0hPUiwgdXNlRXhpc3Rpbmc6IEVsZW1lbnRSZWYgfSwgU2lnbnBvc3RJZFNlcnZpY2VdLFxufSlcblxuLyoqKioqKioqKlxuICpcbiAqIEBjbGFzcyBDbHJTaWducG9zdFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ2xhc3MgdXNlZCB0byBjb25maWd1cmUgYW5kIGNvbnRyb2wgdGhlIHN0YXRlIG9mIGEgQ2xyU2lnbnBvc3QgYW5kIGl0cyBhc3NvY2lhdGVkIENsclNpZ25wb3N0Q29udGVudC5cbiAqIEl0IHN1cHBvcnRzIHRoZSBjbHJQb3NpdGlvbiB3aXRoIGEgJ3JpZ2h0LW1pZGRsZScgZGVmYXVsdC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDbHJTaWducG9zdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSkge31cblxuICAvKioqKioqKioqKlxuICAgKiBAcHJvcGVydHkgdXNlQ3VzdG9tVHJpZ2dlclxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogRmxhZyB1c2VkIHRvIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIHVzZSB0aGUgZGVmYXVsdCB0cmlnZ2VyIG9yIGEgdXNlciBzdXBwbGllZCB0cmlnZ2VyIGVsZW1lbnQuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgdXNlQ3VzdG9tVHJpZ2dlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBzaWduUG9zdFRyaWdnZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFVzZXMgQ29udGVudENoaWxkIHRvIGNoZWNrIGZvciBhIHVzZXIgc3VwcGxpZWQgZWxlbWVudCB3aXRoIHRoZSBDbHJTaWducG9zdFRyaWdnZXIgb24gaXQuXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENsclNpZ25wb3N0VHJpZ2dlciwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBjdXN0b21UcmlnZ2VyKHRyaWdnZXI6IENsclNpZ25wb3N0VHJpZ2dlcikge1xuICAgIHRoaXMudXNlQ3VzdG9tVHJpZ2dlciA9ICEhdHJpZ2dlcjtcbiAgfVxufVxuIl19