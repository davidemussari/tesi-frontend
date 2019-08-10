/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../icon/icon.module';
import { ClrFocusTrapModule } from '../utils/focus-trap/focus-trap.module';
import { ClrModal } from './modal';
import { ClrModalBody } from './modal-body';
export var CLR_MODAL_DIRECTIVES = [ClrModal, ClrModalBody];
var ClrModalModule = /** @class */ (function () {
    function ClrModalModule() {
    }
    ClrModalModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
            declarations: [CLR_MODAL_DIRECTIVES],
            exports: [CLR_MODAL_DIRECTIVES],
        })
    ], ClrModalModule);
    return ClrModalModule;
}());
export { ClrModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kYWwvbW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1QyxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFPMUU7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztZQUMxRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUNoQyxDQUFDO09BQ1csY0FBYyxDQUFHO0lBQUQscUJBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyRm9jdXNUcmFwTW9kdWxlIH0gZnJvbSAnLi4vdXRpbHMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IHsgQ2xyTW9kYWxCb2R5IH0gZnJvbSAnLi9tb2RhbC1ib2R5JztcblxuZXhwb3J0IGNvbnN0IENMUl9NT0RBTF9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtDbHJNb2RhbCwgQ2xyTW9kYWxCb2R5XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xySWNvbk1vZHVsZSwgQ2xyRm9jdXNUcmFwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX01PREFMX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbQ0xSX01PREFMX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJNb2RhbE1vZHVsZSB7fVxuIl19