/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, Optional } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
var ClrControlError = /** @class */ (function () {
    function ClrControlError(controlIdService) {
        this.controlIdService = controlIdService;
    }
    ClrControlError = tslib_1.__decorate([
        Component({
            selector: 'clr-control-error',
            template: "\n    <ng-content></ng-content>\n    ",
            host: {
                '[class.clr-subtext]': 'true',
                '[attr.aria-live]': '"polite"',
                '[id]': 'controlIdService?.id + "-error"',
            }
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [ControlIdService])
    ], ClrControlError);
    return ClrControlError;
}());
export { ClrControlError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQWFsRTtJQUNFLHlCQUErQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFEMUQsZUFBZTtRQVgzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSx1Q0FFUDtZQUNILElBQUksRUFBRTtnQkFDSixxQkFBcUIsRUFBRSxNQUFNO2dCQUM3QixrQkFBa0IsRUFBRSxVQUFVO2dCQUM5QixNQUFNLEVBQUUsaUNBQWlDO2FBQzFDO1NBQ0YsQ0FBQztRQUVhLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUEwQixnQkFBZ0I7T0FEdEQsZUFBZSxDQUUzQjtJQUFELHNCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY29udHJvbC1lcnJvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1zdWJ0ZXh0XSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1saXZlXSc6ICdcInBvbGl0ZVwiJyxcbiAgICAnW2lkXSc6ICdjb250cm9sSWRTZXJ2aWNlPy5pZCArIFwiLWVycm9yXCInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDb250cm9sRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwdWJsaWMgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZSkge31cbn1cbiJdfQ==