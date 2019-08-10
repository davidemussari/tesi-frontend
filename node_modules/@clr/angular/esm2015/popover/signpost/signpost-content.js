import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Inject, Injector, Input, Optional } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { SIGNPOST_POSITIONS } from './signpost-positions';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { SignpostIdService } from './providers/signpost-id.service';
// aka where the arrow / pointer is at in relation to the anchor
const POSITIONS = [
    'top-left',
    'top-middle',
    'top-right',
    'right-top',
    'right-middle',
    'right-bottom',
    'bottom-right',
    'bottom-middle',
    'bottom-left',
    'left-bottom',
    'left-middle',
    'left-top',
];
let ClrSignpostContent = class ClrSignpostContent extends AbstractPopover {
    constructor(injector, parentHost, commonStrings, signpostContentId, signpostIdService) {
        super(injector, parentHost);
        this.signpostContentId = signpostContentId;
        this.signpostIdService = signpostIdService;
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        this.commonStrings = commonStrings;
        // Defaults
        this.position = 'right-middle';
        this.closeOnOutsideClick = true;
        this.signpostIdService.setId(signpostContentId);
    }
    /**********
     *
     * @description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     */
    close() {
        this.ifOpenService.open = false;
    }
    get position() {
        return this._position;
    }
    /*********
     *
     * @description
     * A setter for the position of the ClrSignpostContent popover. This is a combination of the following:
     * - anchorPoint - where on the trigger to anchor the ClrSignpostContent
     * - popoverPoint - where on the ClrSignpostContent container to align with the anchorPoint
     * - offsetY - where on the Y axis to align the ClrSignpostContent so it meets specs
     * - offsetX - where on the X axis to align the ClrSignpostContent so it meets specs
     * There are 12 possible positions to place a ClrSignpostContent container:
     * - top-left
     * - top-middle
     * - top-right
     * - right-top
     * - right-middle
     * - right-bottom
     * - bottom-right
     * - bottom-middle
     * - bottom-left
     * - left-bottom
     * - left-middle
     * - left-top
     *
     * I think of it as follows for 'top-left' -> CONTAINER_SIDE-SIDE_POSITION. In this case CONTAINER_SIDE is 'top'
     * meaning the top of the trigger icon (above the icon that hides/shows) the ClrSignpostContent. And, SIDE_POSITION
     * is 'left' meaning two things: 1) the ClrSignpostContent container extends to the left and 2) the 'arrow/pointer'
     * linking the SingpostContent to the trigger points down at the horizontal center of the trigger icon.
     *
     * @param newPosition
     */
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, this.position);
        if (position && POSITIONS.indexOf(position) > -1) {
            this._position = position;
        }
        else {
            this._position = 'right-middle';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, this.position);
        const setPosition = SIGNPOST_POSITIONS[this.position];
        this.anchorPoint = setPosition.anchorPoint;
        this.popoverPoint = setPosition.popoverPoint;
        this.popoverOptions.offsetY = setPosition.offsetY;
        this.popoverOptions.offsetX = setPosition.offsetX;
    }
};
tslib_1.__decorate([
    Input('clrPosition'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrSignpostContent.prototype, "position", null);
ClrSignpostContent = tslib_1.__decorate([
    Component({
        selector: 'clr-signpost-content',
        template: `
      <div class="signpost-wrap">
          <div class="popover-pointer"></div>
          <div class="signpost-content-body">
              <ng-content></ng-content>
          </div>
          <div class="signpost-content-header">
              <button type="button" [attr.aria-label]="commonStrings.keys.signpostClose" class="signpost-action close"
                      (click)="close()" [attr.aria-controls]="signpostContentId">
                  <clr-icon shape="close" [attr.title]="commonStrings.keys.close"></clr-icon>
              </button>
          </div>
      </div>
  `,
        host: { '[class.signpost-content]': 'true', '[id]': 'signpostContentId' },
        providers: [UNIQUE_ID_PROVIDER]
    }),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(1, Inject(POPOVER_HOST_ANCHOR)),
    tslib_1.__param(3, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [Injector,
        ElementRef,
        ClrCommonStringsService, String, SignpostIdService])
], ClrSignpostContent);
export { ClrSignpostContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXBFLGdFQUFnRTtBQUNoRSxNQUFNLFNBQVMsR0FBYTtJQUMxQixVQUFVO0lBQ1YsWUFBWTtJQUNaLFdBQVc7SUFDWCxXQUFXO0lBQ1gsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZUFBZTtJQUNmLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtJQUNiLFVBQVU7Q0FDWCxDQUFDO0FBcUJGLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsZUFBZTtJQUNyRCxZQUNFLFFBQWtCLEVBR2xCLFVBQXNCLEVBQ3RCLGFBQXNDLEVBQ1osaUJBQXlCLEVBQzNDLGlCQUFvQztRQUU1QyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSEYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFHNUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUN0RjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLFdBQVc7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBSUQ7Ozs7O09BS0c7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFJRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBRUgsSUFBSSxRQUFRLENBQUMsUUFBZ0I7UUFDM0IsTUFBTTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1NBQzNCO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztTQUNqQztRQUNELE1BQU07UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0QsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFBO0FBakJDO0lBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7O2tEQWlCcEI7QUFyRlUsa0JBQWtCO0lBbkI5QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO1FBQ0QsSUFBSSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRTtRQUN6RSxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztLQUNoQyxDQUFDO0lBSUcsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUczQixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7NkNBTFIsUUFBUTtRQUdOLFVBQVU7UUFDUCx1QkFBdUIsVUFFWCxpQkFBaUI7R0FSbkMsa0JBQWtCLENBc0Y5QjtTQXRGWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0b3IsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdFBvcG92ZXIgfSBmcm9tICcuLi9jb21tb24vYWJzdHJhY3QtcG9wb3Zlcic7XG5pbXBvcnQgeyBQT1BPVkVSX0hPU1RfQU5DSE9SIH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXItaG9zdC1hbmNob3IudG9rZW4nO1xuXG5pbXBvcnQgeyBTSUdOUE9TVF9QT1NJVElPTlMgfSBmcm9tICcuL3NpZ25wb3N0LXBvc2l0aW9ucyc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBTaWducG9zdElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3NpZ25wb3N0LWlkLnNlcnZpY2UnO1xuXG4vLyBha2Egd2hlcmUgdGhlIGFycm93IC8gcG9pbnRlciBpcyBhdCBpbiByZWxhdGlvbiB0byB0aGUgYW5jaG9yXG5jb25zdCBQT1NJVElPTlM6IHN0cmluZ1tdID0gW1xuICAndG9wLWxlZnQnLFxuICAndG9wLW1pZGRsZScsXG4gICd0b3AtcmlnaHQnLFxuICAncmlnaHQtdG9wJyxcbiAgJ3JpZ2h0LW1pZGRsZScsIC8vIGRlZmF1bHRcbiAgJ3JpZ2h0LWJvdHRvbScsXG4gICdib3R0b20tcmlnaHQnLFxuICAnYm90dG9tLW1pZGRsZScsXG4gICdib3R0b20tbGVmdCcsXG4gICdsZWZ0LWJvdHRvbScsXG4gICdsZWZ0LW1pZGRsZScsXG4gICdsZWZ0LXRvcCcsXG5dO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItc2lnbnBvc3QtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2lnbnBvc3Qtd3JhcFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLXBvaW50ZXJcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lnbnBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lnbnBvc3QtY29udGVudC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMuc2lnbnBvc3RDbG9zZVwiIGNsYXNzPVwic2lnbnBvc3QtYWN0aW9uIGNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xvc2UoKVwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwic2lnbnBvc3RDb250ZW50SWRcIj5cbiAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5rZXlzLmNsb3NlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnNpZ25wb3N0LWNvbnRlbnRdJzogJ3RydWUnLCAnW2lkXSc6ICdzaWducG9zdENvbnRlbnRJZCcgfSxcbiAgcHJvdmlkZXJzOiBbVU5JUVVFX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU2lnbnBvc3RDb250ZW50IGV4dGVuZHMgQWJzdHJhY3RQb3BvdmVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChQT1BPVkVSX0hPU1RfQU5DSE9SKVxuICAgIHBhcmVudEhvc3Q6IEVsZW1lbnRSZWYsXG4gICAgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UsXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyBzaWducG9zdENvbnRlbnRJZDogc3RyaW5nLFxuICAgIHByaXZhdGUgc2lnbnBvc3RJZFNlcnZpY2U6IFNpZ25wb3N0SWRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGluamVjdG9yLCBwYXJlbnRIb3N0KTtcbiAgICBpZiAoIXBhcmVudEhvc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyLXNpZ25wb3N0LWNvbnRlbnQgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHItc2lnbnBvc3QnKTtcbiAgICB9XG4gICAgdGhpcy5jb21tb25TdHJpbmdzID0gY29tbW9uU3RyaW5ncztcbiAgICAvLyBEZWZhdWx0c1xuICAgIHRoaXMucG9zaXRpb24gPSAncmlnaHQtbWlkZGxlJztcbiAgICB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgPSB0cnVlO1xuICAgIHRoaXMuc2lnbnBvc3RJZFNlcnZpY2Uuc2V0SWQoc2lnbnBvc3RDb250ZW50SWQpO1xuICB9XG5cbiAgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2U7XG5cbiAgLyoqKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIENsb3NlIGZ1bmN0aW9uIHRoYXQgdXNlcyB0aGUgc2lnbnBvc3QgaW5zdGFuY2UgdG8gdG9nZ2xlIHRoZSBzdGF0ZSBvZiB0aGUgY29udGVudCBwb3BvdmVyLlxuICAgKlxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBzdHJpbmc7XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgc2V0dGVyIGZvciB0aGUgcG9zaXRpb24gb2YgdGhlIENsclNpZ25wb3N0Q29udGVudCBwb3BvdmVyLiBUaGlzIGlzIGEgY29tYmluYXRpb24gb2YgdGhlIGZvbGxvd2luZzpcbiAgICogLSBhbmNob3JQb2ludCAtIHdoZXJlIG9uIHRoZSB0cmlnZ2VyIHRvIGFuY2hvciB0aGUgQ2xyU2lnbnBvc3RDb250ZW50XG4gICAqIC0gcG9wb3ZlclBvaW50IC0gd2hlcmUgb24gdGhlIENsclNpZ25wb3N0Q29udGVudCBjb250YWluZXIgdG8gYWxpZ24gd2l0aCB0aGUgYW5jaG9yUG9pbnRcbiAgICogLSBvZmZzZXRZIC0gd2hlcmUgb24gdGhlIFkgYXhpcyB0byBhbGlnbiB0aGUgQ2xyU2lnbnBvc3RDb250ZW50IHNvIGl0IG1lZXRzIHNwZWNzXG4gICAqIC0gb2Zmc2V0WCAtIHdoZXJlIG9uIHRoZSBYIGF4aXMgdG8gYWxpZ24gdGhlIENsclNpZ25wb3N0Q29udGVudCBzbyBpdCBtZWV0cyBzcGVjc1xuICAgKiBUaGVyZSBhcmUgMTIgcG9zc2libGUgcG9zaXRpb25zIHRvIHBsYWNlIGEgQ2xyU2lnbnBvc3RDb250ZW50IGNvbnRhaW5lcjpcbiAgICogLSB0b3AtbGVmdFxuICAgKiAtIHRvcC1taWRkbGVcbiAgICogLSB0b3AtcmlnaHRcbiAgICogLSByaWdodC10b3BcbiAgICogLSByaWdodC1taWRkbGVcbiAgICogLSByaWdodC1ib3R0b21cbiAgICogLSBib3R0b20tcmlnaHRcbiAgICogLSBib3R0b20tbWlkZGxlXG4gICAqIC0gYm90dG9tLWxlZnRcbiAgICogLSBsZWZ0LWJvdHRvbVxuICAgKiAtIGxlZnQtbWlkZGxlXG4gICAqIC0gbGVmdC10b3BcbiAgICpcbiAgICogSSB0aGluayBvZiBpdCBhcyBmb2xsb3dzIGZvciAndG9wLWxlZnQnIC0+IENPTlRBSU5FUl9TSURFLVNJREVfUE9TSVRJT04uIEluIHRoaXMgY2FzZSBDT05UQUlORVJfU0lERSBpcyAndG9wJ1xuICAgKiBtZWFuaW5nIHRoZSB0b3Agb2YgdGhlIHRyaWdnZXIgaWNvbiAoYWJvdmUgdGhlIGljb24gdGhhdCBoaWRlcy9zaG93cykgdGhlIENsclNpZ25wb3N0Q29udGVudC4gQW5kLCBTSURFX1BPU0lUSU9OXG4gICAqIGlzICdsZWZ0JyBtZWFuaW5nIHR3byB0aGluZ3M6IDEpIHRoZSBDbHJTaWducG9zdENvbnRlbnQgY29udGFpbmVyIGV4dGVuZHMgdG8gdGhlIGxlZnQgYW5kIDIpIHRoZSAnYXJyb3cvcG9pbnRlcidcbiAgICogbGlua2luZyB0aGUgU2luZ3Bvc3RDb250ZW50IHRvIHRoZSB0cmlnZ2VyIHBvaW50cyBkb3duIGF0IHRoZSBob3Jpem9udGFsIGNlbnRlciBvZiB0aGUgdHJpZ2dlciBpY29uLlxuICAgKlxuICAgKiBAcGFyYW0gbmV3UG9zaXRpb25cbiAgICovXG4gIEBJbnB1dCgnY2xyUG9zaXRpb24nKVxuICBzZXQgcG9zaXRpb24ocG9zaXRpb246IHN0cmluZykge1xuICAgIC8vIFVnaFxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLnBvc2l0aW9uKTtcbiAgICBpZiAocG9zaXRpb24gJiYgUE9TSVRJT05TLmluZGV4T2YocG9zaXRpb24pID4gLTEpIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gJ3JpZ2h0LW1pZGRsZSc7XG4gICAgfVxuICAgIC8vIFVnaFxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLnBvc2l0aW9uKTtcblxuICAgIGNvbnN0IHNldFBvc2l0aW9uID0gU0lHTlBPU1RfUE9TSVRJT05TW3RoaXMucG9zaXRpb25dO1xuICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBzZXRQb3NpdGlvbi5hbmNob3JQb2ludDtcbiAgICB0aGlzLnBvcG92ZXJQb2ludCA9IHNldFBvc2l0aW9uLnBvcG92ZXJQb2ludDtcbiAgICB0aGlzLnBvcG92ZXJPcHRpb25zLm9mZnNldFkgPSBzZXRQb3NpdGlvbi5vZmZzZXRZO1xuICAgIHRoaXMucG9wb3Zlck9wdGlvbnMub2Zmc2V0WCA9IHNldFBvc2l0aW9uLm9mZnNldFg7XG4gIH1cbn1cbiJdfQ==