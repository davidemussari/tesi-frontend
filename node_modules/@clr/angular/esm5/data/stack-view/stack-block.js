import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, HostBinding, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
var ClrStackBlock = /** @class */ (function () {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    function ClrStackBlock(parent, uniqueId, commonStrings) {
        this.parent = parent;
        this.uniqueId = uniqueId;
        this.commonStrings = commonStrings;
        this.expanded = false;
        this.expandedChange = new EventEmitter(false);
        this.expandable = false;
        this.focused = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    Object.defineProperty(ClrStackBlock.prototype, "getChangedValue", {
        get: function () {
            return this._changed || (this._changedChildren > 0 && !this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "setChangedValue", {
        set: function (value) {
            this._changed = value;
            if (this.parent && this._fullyInitialized) {
                if (value) {
                    this.parent._changedChildren++;
                }
                else {
                    this.parent._changedChildren--;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrStackBlock.prototype.ngOnInit = function () {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock has to be fully initialized at first.
        this._fullyInitialized = true;
    };
    ClrStackBlock.prototype.addChild = function () {
        this.expandable = true;
    };
    ClrStackBlock.prototype.toggleExpand = function () {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    Object.defineProperty(ClrStackBlock.prototype, "caretDirection", {
        get: function () {
            return this.expanded ? 'down' : 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "caretTitle", {
        get: function () {
            return this.expanded ? this.commonStrings.keys.collapse : this.commonStrings.keys.expand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "role", {
        get: function () {
            return this.expandable ? 'button' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "tabIndex", {
        get: function () {
            return this.expandable ? '0' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "onStackLabelFocus", {
        get: function () {
            return this.expandable && !this.expanded && this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "ariaExpanded", {
        get: function () {
            if (!this.expandable) {
                return null;
            }
            else {
                return this.expanded ? 'true' : 'false';
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        HostBinding('class.stack-block-expanded'),
        Input('clrSbExpanded'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrStackBlock.prototype, "expanded", void 0);
    tslib_1.__decorate([
        Output('clrSbExpandedChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrStackBlock.prototype, "expandedChange", void 0);
    tslib_1.__decorate([
        HostBinding('class.stack-block-expandable'),
        Input('clrSbExpandable'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrStackBlock.prototype, "expandable", void 0);
    tslib_1.__decorate([
        HostBinding('class.stack-block-changed'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrStackBlock.prototype, "getChangedValue", null);
    tslib_1.__decorate([
        Input('clrSbNotifyChange'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrStackBlock.prototype, "setChangedValue", null);
    tslib_1.__decorate([
        HostBinding('class.on-focus'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrStackBlock.prototype, "onStackLabelFocus", null);
    ClrStackBlock = tslib_1.__decorate([
        Component({
            selector: 'clr-stack-block',
            template: "\n    <dt class=\"stack-block-label\"\n        (click)=\"toggleExpand()\"\n        (keyup.enter)=\"toggleExpand()\"\n        (keyup.space)=\"toggleExpand()\"\n        (focus)=\"focused = true\"\n        (blur)=\"focused = false\"\n        [id]=\"uniqueId\"\n        [attr.role]=\"role\"\n        [attr.tabindex]=\"tabIndex\"\n        [attr.aria-expanded]=\"ariaExpanded\">\n      <clr-icon shape=\"caret\"\n                class=\"stack-block-caret\"\n                *ngIf=\"expandable\"\n                [attr.dir]=\"caretDirection\"\n                [attr.title]=\"caretTitle\"></clr-icon>\n      <span class=\"clr-sr-only\" *ngIf=\"getChangedValue\">{{commonStrings.keys.stackViewChanged}}</span>\n      <ng-content select=\"clr-stack-label\"></ng-content>\n    </dt>\n    <dd class=\"stack-block-content\">\n      <ng-content></ng-content>\n    </dd>\n    <clr-expandable-animation [@clrExpandTrigger]=\"expanded\" class=\"stack-children\">\n      <div [style.height]=\"expanded ? 'auto' : 0\">\n        <ng-content select=\"clr-stack-block\"></ng-content>\n      </div>\n    </clr-expandable-animation>\n  ",
            // Make sure the host has the proper class for styling purposes
            host: { '[class.stack-block]': 'true' },
            providers: [UNIQUE_ID_PROVIDER],
            styles: ["\n        :host { display: block; }\n    "]
        }),
        tslib_1.__param(0, SkipSelf()),
        tslib_1.__param(0, Optional()),
        tslib_1.__param(1, Inject(UNIQUE_ID)),
        tslib_1.__metadata("design:paramtypes", [ClrStackBlock, String, ClrCommonStringsService])
    ], ClrStackBlock);
    return ClrStackBlock;
}());
export { ClrStackBlock };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stYmxvY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2stYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBVSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUEwQzlGO0lBZ0NFOzs7O1NBSUs7SUFDTCx1QkFHVSxNQUFxQixFQUNILFFBQWdCLEVBQ25DLGFBQXNDO1FBRnJDLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDSCxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ25DLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQXZDL0MsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUNLLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBR3hHLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUNqQixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0Isc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFnQ2hDLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQWhDRCxzQkFBSSwwQ0FBZTthQUFuQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7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Q0EyQlQ7WUFPRCwrREFBK0Q7WUFDL0QsSUFBSSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3FCQU43QiwyQ0FFQztTQUtKLENBQUM7UUF1Q0csbUJBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUVWLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtpREFERixhQUFhLFVBRVAsdUJBQXVCO09BMUNwQyxhQUFhLENBOEZ6QjtJQUFELG9CQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0E5RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVU5JUVVFX0lELCBVTklRVUVfSURfUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItc3RhY2stYmxvY2snLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkdCBjbGFzcz1cInN0YWNrLWJsb2NrLWxhYmVsXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZCgpXCJcbiAgICAgICAgKGtleXVwLmVudGVyKT1cInRvZ2dsZUV4cGFuZCgpXCJcbiAgICAgICAgKGtleXVwLnNwYWNlKT1cInRvZ2dsZUV4cGFuZCgpXCJcbiAgICAgICAgKGZvY3VzKT1cImZvY3VzZWQgPSB0cnVlXCJcbiAgICAgICAgKGJsdXIpPVwiZm9jdXNlZCA9IGZhbHNlXCJcbiAgICAgICAgW2lkXT1cInVuaXF1ZUlkXCJcbiAgICAgICAgW2F0dHIucm9sZV09XCJyb2xlXCJcbiAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiSW5kZXhcIlxuICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImFyaWFFeHBhbmRlZFwiPlxuICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2FyZXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwic3RhY2stYmxvY2stY2FyZXRcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiZXhwYW5kYWJsZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGlyXT1cImNhcmV0RGlyZWN0aW9uXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJjYXJldFRpdGxlXCI+PC9jbHItaWNvbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY2xyLXNyLW9ubHlcIiAqbmdJZj1cImdldENoYW5nZWRWYWx1ZVwiPnt7Y29tbW9uU3RyaW5ncy5rZXlzLnN0YWNrVmlld0NoYW5nZWR9fTwvc3Bhbj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1zdGFjay1sYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8L2R0PlxuICAgIDxkZCBjbGFzcz1cInN0YWNrLWJsb2NrLWNvbnRlbnRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2RkPlxuICAgIDxjbHItZXhwYW5kYWJsZS1hbmltYXRpb24gW0BjbHJFeHBhbmRUcmlnZ2VyXT1cImV4cGFuZGVkXCIgY2xhc3M9XCJzdGFjay1jaGlsZHJlblwiPlxuICAgICAgPGRpdiBbc3R5bGUuaGVpZ2h0XT1cImV4cGFuZGVkID8gJ2F1dG8nIDogMFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItc3RhY2stYmxvY2tcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Nsci1leHBhbmRhYmxlLWFuaW1hdGlvbj5cbiAgYCxcbiAgLy8gQ3VzdG9tIGVsZW1lbnRzIGFyZSBpbmxpbmUgYnkgZGVmYXVsdFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgIDpob3N0IHsgZGlzcGxheTogYmxvY2s7IH1cbiAgICBgLFxuICBdLFxuICAvLyBNYWtlIHN1cmUgdGhlIGhvc3QgaGFzIHRoZSBwcm9wZXIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgaG9zdDogeyAnW2NsYXNzLnN0YWNrLWJsb2NrXSc6ICd0cnVlJyB9LFxuICBwcm92aWRlcnM6IFtVTklRVUVfSURfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJTdGFja0Jsb2NrIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGFjay1ibG9jay1leHBhbmRlZCcpXG4gIEBJbnB1dCgnY2xyU2JFeHBhbmRlZCcpXG4gIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2NsclNiRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhY2stYmxvY2stZXhwYW5kYWJsZScpXG4gIEBJbnB1dCgnY2xyU2JFeHBhbmRhYmxlJylcbiAgZXhwYW5kYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hhbmdlZENoaWxkcmVuOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9mdWxseUluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YWNrLWJsb2NrLWNoYW5nZWQnKVxuICBnZXQgZ2V0Q2hhbmdlZFZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkIHx8ICh0aGlzLl9jaGFuZ2VkQ2hpbGRyZW4gPiAwICYmICF0aGlzLmV4cGFuZGVkKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyU2JOb3RpZnlDaGFuZ2UnKVxuICBzZXQgc2V0Q2hhbmdlZFZhbHVlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2hhbmdlZCA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuX2Z1bGx5SW5pdGlhbGl6ZWQpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5fY2hhbmdlZENoaWxkcmVuKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudC5fY2hhbmdlZENoaWxkcmVuLS07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICAgKiBUaGlzIHdvdWxkIGJlIG1vcmUgZWZmaWNpZW50IHdpdGggQENvbnRlbnRDaGlsZHJlbiwgd2l0aCB0aGUgcGFyZW50IENsclN0YWNrQmxvY2tcbiAgICAgKiBxdWVyeWluZyBmb3IgY2hpbGRyZW4gU3RhY2tCbG9ja3MsIGJ1dCB0aGlzIGZlYXR1cmUgaXMgbm90IGF2YWlsYWJsZSB3aGVuIGRvd25ncmFkaW5nXG4gICAgICogdGhlIGNvbXBvbmVudCBmb3IgQW5ndWxhciAxLlxuICAgICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAU2tpcFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IENsclN0YWNrQmxvY2ssXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyB1bmlxdWVJZDogc3RyaW5nLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuYWRkQ2hpbGQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBpbiBvcmRlciB0byBhY2Nlc3MgdGhlIHBhcmVudCBDbHJTdGFja0Jsb2NrJ3MgcHJvcGVydGllcyxcbiAgICAvLyB0aGUgY2hpbGQgQ2xyU3RhY2tCbG9jayBoYXMgdG8gYmUgZnVsbHkgaW5pdGlhbGl6ZWQgYXQgZmlyc3QuXG4gICAgdGhpcy5fZnVsbHlJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBhZGRDaGlsZCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZGFibGUgPSB0cnVlO1xuICB9XG5cbiAgdG9nZ2xlRXhwYW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZGVkKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2FyZXREaXJlY3Rpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZCA/ICdkb3duJyA6ICdyaWdodCc7XG4gIH1cblxuICBnZXQgY2FyZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gdGhpcy5jb21tb25TdHJpbmdzLmtleXMuY29sbGFwc2UgOiB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5leHBhbmQ7XG4gIH1cblxuICBnZXQgcm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGUgPyAnYnV0dG9uJyA6IG51bGw7XG4gIH1cblxuICBnZXQgdGFiSW5kZXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlID8gJzAnIDogbnVsbDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Mub24tZm9jdXMnKVxuICBnZXQgb25TdGFja0xhYmVsRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kYWJsZSAmJiAhdGhpcy5leHBhbmRlZCAmJiB0aGlzLmZvY3VzZWQ7XG4gIH1cblxuICBnZXQgYXJpYUV4cGFuZGVkKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLmV4cGFuZGFibGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5leHBhbmRlZCA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuICB9XG59XG4iXX0=