/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var DateFormControlService = /** @class */ (function () {
    function DateFormControlService() {
        this._touchedChange = new Subject();
        this._dirtyChange = new Subject();
    }
    Object.defineProperty(DateFormControlService.prototype, "touchedChange", {
        get: function () {
            return this._touchedChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFormControlService.prototype, "dirtyChange", {
        get: function () {
            return this._dirtyChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateFormControlService.prototype.markAsTouched = function () {
        this._touchedChange.next();
    };
    DateFormControlService.prototype.markAsDirty = function () {
        this._dirtyChange.next();
    };
    DateFormControlService = tslib_1.__decorate([
        Injectable()
    ], DateFormControlService);
    return DateFormControlService;
}());
export { DateFormControlService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0M7SUFEQTtRQUVVLG1CQUFjLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFNcEQsaUJBQVksR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQWE1RCxDQUFDO0lBakJDLHNCQUFJLGlEQUFhO2FBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBSUQsc0JBQUksK0NBQVc7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVELDhDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBbkJVLHNCQUFzQjtRQURsQyxVQUFVLEVBQUU7T0FDQSxzQkFBc0IsQ0FvQmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVGb3JtQ29udHJvbFNlcnZpY2Uge1xuICBwcml2YXRlIF90b3VjaGVkQ2hhbmdlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBnZXQgdG91Y2hlZENoYW5nZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fdG91Y2hlZENoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RpcnR5Q2hhbmdlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBnZXQgZGlydHlDaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpcnR5Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbWFya0FzVG91Y2hlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl90b3VjaGVkQ2hhbmdlLm5leHQoKTtcbiAgfVxuXG4gIG1hcmtBc0RpcnR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2RpcnR5Q2hhbmdlLm5leHQoKTtcbiAgfVxufVxuIl19