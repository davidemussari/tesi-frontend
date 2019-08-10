/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Optional } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
let ClrControlError = class ClrControlError {
    constructor(controlIdService) {
        this.controlIdService = controlIdService;
    }
};
ClrControlError = tslib_1.__decorate([
    Component({
        selector: 'clr-control-error',
        template: `
    <ng-content></ng-content>
    `,
        host: {
            '[class.clr-subtext]': 'true',
            '[attr.aria-live]': '"polite"',
            '[id]': 'controlIdService?.id + "-error"',
        }
    }),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ControlIdService])
], ClrControlError);
export { ClrControlError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQWFsRSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBQzFCLFlBQStCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztDQUN0RSxDQUFBO0FBRlksZUFBZTtJQVgzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRTs7S0FFUDtRQUNILElBQUksRUFBRTtZQUNKLHFCQUFxQixFQUFFLE1BQU07WUFDN0Isa0JBQWtCLEVBQUUsVUFBVTtZQUM5QixNQUFNLEVBQUUsaUNBQWlDO1NBQzFDO0tBQ0YsQ0FBQztJQUVhLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQUEwQixnQkFBZ0I7R0FEdEQsZUFBZSxDQUUzQjtTQUZZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWNvbnRyb2wtZXJyb3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItc3VidGV4dF0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtbGl2ZV0nOiAnXCJwb2xpdGVcIicsXG4gICAgJ1tpZF0nOiAnY29udHJvbElkU2VydmljZT8uaWQgKyBcIi1lcnJvclwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ29udHJvbEVycm9yIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHVibGljIGNvbnRyb2xJZFNlcnZpY2U6IENvbnRyb2xJZFNlcnZpY2UpIHt9XG59XG4iXX0=