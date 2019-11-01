import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Inject, Input, Output, NgZone, PLATFORM_ID } from '@angular/core';
import { RowActionService } from './providers/row-action-service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { isPlatformBrowser } from '@angular/common';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrAxis } from '../../utils/popover/enums/axis.enum';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
let clrDgActionId = 0;
let ClrDatagridActionOverflow = class ClrDatagridActionOverflow {
    constructor(rowActionService, commonStrings, platformId, zone, smartToggleService, popoverId) {
        this.rowActionService = rowActionService;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.zone = zone;
        this.smartToggleService = smartToggleService;
        this.popoverId = popoverId;
        this.subscriptions = [];
        this.smartPosition = {
            axis: ClrAxis.HORIZONTAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.CENTER,
            content: ClrAlignment.CENTER,
        };
        this.openChange = new EventEmitter(false);
        this.rowActionService.register();
        this.subscriptions.push(this.smartToggleService.openChange.subscribe(openState => {
            this.open = openState;
            if (openState) {
                this.focusFirstButton();
            }
        }));
        this.popoverId = 'clr-action-menu' + clrDgActionId++;
    }
    ngOnDestroy() {
        this.rowActionService.unregister();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    get open() {
        return this.smartToggleService.open;
    }
    focusFirstButton() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    const firstButton = document.querySelector('button.action-item');
                    if (firstButton) {
                        firstButton.focus();
                    }
                });
            });
        }
    }
    set open(open) {
        if (!!open !== this.smartToggleService.open) {
            // prevents chocolate mess
            this.smartToggleService.open = !!open;
            this.openChange.emit(!!open);
        }
    }
};
tslib_1.__decorate([
    Input('clrDgActionOverflowOpen'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrDatagridActionOverflow.prototype, "open", null);
tslib_1.__decorate([
    Output('clrDgActionOverflowOpenChange'),
    tslib_1.__metadata("design:type", Object)
], ClrDatagridActionOverflow.prototype, "openChange", void 0);
ClrDatagridActionOverflow = tslib_1.__decorate([
    Component({
        selector: 'clr-dg-action-overflow',
        providers: [UNIQUE_ID_PROVIDER, ClrPopoverToggleService, ClrPopoverEventsService, ClrPopoverPositionService],
        template: `
      <button class="datagrid-action-toggle"
              type="button"
              role="button"
              aria-haspopup="true"
              #anchor
              [attr.aria-controls]="popoverId"
              [attr.aria-expanded]="open"
              [attr.aria-label]="commonStrings.keys.rowActions"
              clrPopoverAnchor
              clrPopoverOpenCloseButton>
          <clr-icon shape="ellipsis-vertical" [attr.title]="commonStrings.keys.rowActions"></clr-icon>
      </button>

      <div class="datagrid-action-overflow"
           role="menu" 
           [id]="popoverId"
           [attr.aria-hidden]="!open"
           [attr.id]="popoverId" 
           clrFocusTrap
           *clrPopoverContent="open at smartPosition; outsideClickToClose: true; scrollToClose: true">
          <ng-content></ng-content>
      </div>
  `
    }),
    tslib_1.__param(2, Inject(PLATFORM_ID)),
    tslib_1.__param(5, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [RowActionService,
        ClrCommonStringsService,
        Object,
        NgZone,
        ClrPopoverToggleService, String])
], ClrDatagridActionOverflow);
export { ClrDatagridActionOverflow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUduRyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUE4QnRCLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBU3BDLFlBQ1UsZ0JBQWtDLEVBQ25DLGFBQXNDLEVBQ2hCLFVBQWtCLEVBQ3ZDLElBQVksRUFDWixrQkFBMkMsRUFDekIsU0FBaUI7UUFMbkMscUJBQWdCLEdBQWhCLGdCQUFn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NkNBTFEsZ0JBQWdCO1FBQ3BCLHVCQUF1QjtRQUNKLE1BQU07UUFDakMsTUFBTTtRQUNRLHVCQUF1QjtHQWQxQyx5QkFBeUIsQ0E2RHJDO1NBN0RZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgTmdab25lLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFVOSVFVRV9JRCwgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJQb3NpdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvaW50ZXJmYWNlcy9wb3BvdmVyLXBvc2l0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDbHJBbGlnbm1lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wb3BvdmVyL2VudW1zL2FsaWdubWVudC5lbnVtJztcbmltcG9ydCB7IENsclNpZGUgfSBmcm9tICcuLi8uLi91dGlscy9wb3BvdmVyL2VudW1zL3NpZGUuZW51bSc7XG5pbXBvcnQgeyBDbHJBeGlzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9lbnVtcy9heGlzLmVudW0nO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9wb3BvdmVyL3Byb3ZpZGVycy9wb3BvdmVyLXRvZ2dsZS5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1wb3NpdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5sZXQgY2xyRGdBY3Rpb25JZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1hY3Rpb24tb3ZlcmZsb3cnLFxuICBwcm92aWRlcnM6IFtVTklRVUVfSURfUFJPVklERVIsIENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlLCBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSwgQ2xyUG9wb3ZlclBvc2l0aW9uU2VydmljZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGF0YWdyaWQtYWN0aW9uLXRvZ2dsZVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICAjYW5jaG9yXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwicG9wb3ZlcklkXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvcGVuXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLmtleXMucm93QWN0aW9uc1wiXG4gICAgICAgICAgICAgIGNsclBvcG92ZXJBbmNob3JcbiAgICAgICAgICAgICAgY2xyUG9wb3Zlck9wZW5DbG9zZUJ1dHRvbj5cbiAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJlbGxpcHNpcy12ZXJ0aWNhbFwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mua2V5cy5yb3dBY3Rpb25zXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93XCJcbiAgICAgICAgICAgcm9sZT1cIm1lbnVcIiBcbiAgICAgICAgICAgW2lkXT1cInBvcG92ZXJJZFwiXG4gICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIiFvcGVuXCJcbiAgICAgICAgICAgW2F0dHIuaWRdPVwicG9wb3ZlcklkXCIgXG4gICAgICAgICAgIGNsckZvY3VzVHJhcFxuICAgICAgICAgICAqY2xyUG9wb3ZlckNvbnRlbnQ9XCJvcGVuIGF0IHNtYXJ0UG9zaXRpb247IG91dHNpZGVDbGlja1RvQ2xvc2U6IHRydWU7IHNjcm9sbFRvQ2xvc2U6IHRydWVcIj5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRBY3Rpb25PdmVyZmxvdyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHVibGljIHNtYXJ0UG9zaXRpb246IENsclBvcG92ZXJQb3NpdGlvbiA9IHtcbiAgICBheGlzOiBDbHJBeGlzLkhPUklaT05UQUwsXG4gICAgc2lkZTogQ2xyU2lkZS5BRlRFUixcbiAgICBhbmNob3I6IENsckFsaWdubWVudC5DRU5URVIsXG4gICAgY29udGVudDogQ2xyQWxpZ25tZW50LkNFTlRFUixcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgc21hcnRUb2dnbGVTZXJ2aWNlOiBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIHBvcG92ZXJJZDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMucm93QWN0aW9uU2VydmljZS5yZWdpc3RlcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zbWFydFRvZ2dsZVNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlblN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5vcGVuID0gb3BlblN0YXRlO1xuICAgICAgICBpZiAob3BlblN0YXRlKSB7XG4gICAgICAgICAgdGhpcy5mb2N1c0ZpcnN0QnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnBvcG92ZXJJZCA9ICdjbHItYWN0aW9uLW1lbnUnICsgY2xyRGdBY3Rpb25JZCsrO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yb3dBY3Rpb25TZXJ2aWNlLnVucmVnaXN0ZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHVibGljIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLnNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0ZpcnN0QnV0dG9uKCk6IHZvaWQge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBmaXJzdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aW9uLWl0ZW0nKTtcbiAgICAgICAgICBpZiAoZmlyc3RCdXR0b24pIHtcbiAgICAgICAgICAgIGZpcnN0QnV0dG9uLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdBY3Rpb25PdmVyZmxvd09wZW4nKVxuICBwdWJsaWMgc2V0IG9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGlmICghIW9wZW4gIT09IHRoaXMuc21hcnRUb2dnbGVTZXJ2aWNlLm9wZW4pIHtcbiAgICAgIC8vIHByZXZlbnRzIGNob2NvbGF0ZSBtZXNzXG4gICAgICB0aGlzLnNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuID0gISFvcGVuO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoISFvcGVuKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0FjdGlvbk92ZXJmbG93T3BlbkNoYW5nZScpIHB1YmxpYyBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG59XG4iXX0=