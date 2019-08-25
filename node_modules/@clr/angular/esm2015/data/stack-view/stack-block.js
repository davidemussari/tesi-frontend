import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, HostBinding, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
let ClrStackBlock = class ClrStackBlock {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    constructor(parent, uniqueId, commonStrings) {
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
    get getChangedValue() {
        return this._changed || (this._changedChildren > 0 && !this.expanded);
    }
    set setChangedValue(value) {
        this._changed = value;
        if (this.parent && this._fullyInitialized) {
            if (value) {
                this.parent._changedChildren++;
            }
            else {
                this.parent._changedChildren--;
            }
        }
    }
    ngOnInit() {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock has to be fully initialized at first.
        this._fullyInitialized = true;
    }
    addChild() {
        this.expandable = true;
    }
    toggleExpand() {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    get caretDirection() {
        return this.expanded ? 'down' : 'right';
    }
    get caretTitle() {
        return this.expanded ? this.commonStrings.keys.collapse : this.commonStrings.keys.expand;
    }
    get role() {
        return this.expandable ? 'button' : null;
    }
    get tabIndex() {
        return this.expandable ? '0' : null;
    }
    get onStackLabelFocus() {
        return this.expandable && !this.expanded && this.focused;
    }
    get ariaExpanded() {
        if (!this.expandable) {
            return null;
        }
        else {
            return this.expanded ? 'true' : 'false';
        }
    }
};
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
        template: `
    <dt class="stack-block-label"
        (click)="toggleExpand()"
        (keyup.enter)="toggleExpand()"
        (keyup.space)="toggleExpand()"
        (focus)="focused = true"
        (blur)="focused = false"
        [id]="uniqueId"
        [attr.role]="role"
        [attr.tabindex]="tabIndex"
        [attr.aria-expanded]="ariaExpanded">
      <clr-icon shape="caret"
                class="stack-block-caret"
                *ngIf="expandable"
                [attr.dir]="caretDirection"
                [attr.title]="caretTitle"></clr-icon>
      <span class="clr-sr-only" *ngIf="getChangedValue">{{commonStrings.keys.stackViewChanged}}</span>
      <ng-content select="clr-stack-label"></ng-content>
    </dt>
    <dd class="stack-block-content">
      <ng-content></ng-content>
    </dd>
    <clr-expandable-animation [@clrExpandTrigger]="expanded" class="stack-children">
      <div [style.height]="expanded ? 'auto' : 0">
        <ng-content select="clr-stack-block"></ng-content>
      </div>
    </clr-expandable-animation>
  `,
        // Make sure the host has the proper class for styling purposes
        host: { '[class.stack-block]': 'true' },
        providers: [UNIQUE_ID_PROVIDER],
        styles: [`
        :host { display: block; }
    `]
    }),
    tslib_1.__param(0, SkipSelf()),
    tslib_1.__param(0, Optional()),
    tslib_1.__param(1, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [ClrStackBlock, String, ClrCommonStringsService])
], ClrStackBlock);
export { ClrStackBlock };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stYmxvY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2stYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBVSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUEwQzlGLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFnQ3hCOzs7O1NBSUs7SUFDTCxZQUdVLE1BQXFCLEVBQ0gsUUFBZ0IsRUFDbkMsYUFBc0M7UUFGckMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNILGFBQVEsR0FBUixRQUFRLENBQVE7UUFDbkMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBdkMvQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQ0ssbUJBQWMsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFHeEcsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQWdDaEMsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBaENELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxD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QUFDLGtCQUFrQixDQUFDO2lCQU43Qjs7S0FFQztLQUtKLENBQUM7SUF1Q0csbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUVWLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FERixhQUFhLFVBRVAsdUJBQXVCO0dBMUNwQyxhQUFhLENBOEZ6QjtTQTlGWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbmplY3QsIElucHV0LCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zdGFjay1ibG9jaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGR0IGNsYXNzPVwic3RhY2stYmxvY2stbGFiZWxcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kKClcIlxuICAgICAgICAoa2V5dXAuZW50ZXIpPVwidG9nZ2xlRXhwYW5kKClcIlxuICAgICAgICAoa2V5dXAuc3BhY2UpPVwidG9nZ2xlRXhwYW5kKClcIlxuICAgICAgICAoZm9jdXMpPVwiZm9jdXNlZCA9IHRydWVcIlxuICAgICAgICAoYmx1cik9XCJmb2N1c2VkID0gZmFsc2VcIlxuICAgICAgICBbaWRdPVwidW5pcXVlSWRcIlxuICAgICAgICBbYXR0ci5yb2xlXT1cInJvbGVcIlxuICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJJbmRleFwiXG4gICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiYXJpYUV4cGFuZGVkXCI+XG4gICAgICA8Y2xyLWljb24gc2hhcGU9XCJjYXJldFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzdGFjay1ibG9jay1jYXJldFwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJleHBhbmRhYmxlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kaXJdPVwiY2FyZXREaXJlY3Rpb25cIlxuICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImNhcmV0VGl0bGVcIj48L2Nsci1pY29uPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjbHItc3Itb25seVwiICpuZ0lmPVwiZ2V0Q2hhbmdlZFZhbHVlXCI+e3tjb21tb25TdHJpbmdzLmtleXMuc3RhY2tWaWV3Q2hhbmdlZH19PC9zcGFuPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLXN0YWNrLWxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZHQ+XG4gICAgPGRkIGNsYXNzPVwic3RhY2stYmxvY2stY29udGVudFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGQ+XG4gICAgPGNsci1leHBhbmRhYmxlLWFuaW1hdGlvbiBbQGNsckV4cGFuZFRyaWdnZXJdPVwiZXhwYW5kZWRcIiBjbGFzcz1cInN0YWNrLWNoaWxkcmVuXCI+XG4gICAgICA8ZGl2IFtzdHlsZS5oZWlnaHRdPVwiZXhwYW5kZWQgPyAnYXV0bycgOiAwXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1zdGFjay1ibG9ja1wiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvY2xyLWV4cGFuZGFibGUtYW5pbWF0aW9uPlxuICBgLFxuICAvLyBDdXN0b20gZWxlbWVudHMgYXJlIGlubGluZSBieSBkZWZhdWx0XG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfVxuICAgIGAsXG4gIF0sXG4gIC8vIE1ha2Ugc3VyZSB0aGUgaG9zdCBoYXMgdGhlIHByb3BlciBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICBob3N0OiB7ICdbY2xhc3Muc3RhY2stYmxvY2tdJzogJ3RydWUnIH0sXG4gIHByb3ZpZGVyczogW1VOSVFVRV9JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsclN0YWNrQmxvY2sgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YWNrLWJsb2NrLWV4cGFuZGVkJylcbiAgQElucHV0KCdjbHJTYkV4cGFuZGVkJylcbiAgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyU2JFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGFjay1ibG9jay1leHBhbmRhYmxlJylcbiAgQElucHV0KCdjbHJTYkV4cGFuZGFibGUnKVxuICBleHBhbmRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jaGFuZ2VkQ2hpbGRyZW46IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2Z1bGx5SW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhY2stYmxvY2stY2hhbmdlZCcpXG4gIGdldCBnZXRDaGFuZ2VkVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQgfHwgKHRoaXMuX2NoYW5nZWRDaGlsZHJlbiA+IDAgJiYgIXRoaXMuZXhwYW5kZWQpO1xuICB9XG5cbiAgQElucHV0KCdjbHJTYk5vdGlmeUNoYW5nZScpXG4gIHNldCBzZXRDaGFuZ2VkVmFsdWUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jaGFuZ2VkID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5fZnVsbHlJbml0aWFsaXplZCkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Ll9jaGFuZ2VkQ2hpbGRyZW4rKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyZW50Ll9jaGFuZ2VkQ2hpbGRyZW4tLTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKlxuICAgICAqIFRoaXMgd291bGQgYmUgbW9yZSBlZmZpY2llbnQgd2l0aCBAQ29udGVudENoaWxkcmVuLCB3aXRoIHRoZSBwYXJlbnQgQ2xyU3RhY2tCbG9ja1xuICAgICAqIHF1ZXJ5aW5nIGZvciBjaGlsZHJlbiBTdGFja0Jsb2NrcywgYnV0IHRoaXMgZmVhdHVyZSBpcyBub3QgYXZhaWxhYmxlIHdoZW4gZG93bmdyYWRpbmdcbiAgICAgKiB0aGUgY29tcG9uZW50IGZvciBBbmd1bGFyIDEuXG4gICAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBTa2lwU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcml2YXRlIHBhcmVudDogQ2xyU3RhY2tCbG9jayxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIHVuaXF1ZUlkOiBzdHJpbmcsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlXG4gICkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5hZGRDaGlsZCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIGluIG9yZGVyIHRvIGFjY2VzcyB0aGUgcGFyZW50IENsclN0YWNrQmxvY2sncyBwcm9wZXJ0aWVzLFxuICAgIC8vIHRoZSBjaGlsZCBDbHJTdGFja0Jsb2NrIGhhcyB0byBiZSBmdWxseSBpbml0aWFsaXplZCBhdCBmaXJzdC5cbiAgICB0aGlzLl9mdWxseUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIGFkZENoaWxkKCk6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5kYWJsZSA9IHRydWU7XG4gIH1cblxuICB0b2dnbGVFeHBhbmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwYW5kYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kZWQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjYXJldERpcmVjdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gJ2Rvd24nIDogJ3JpZ2h0JztcbiAgfVxuXG4gIGdldCBjYXJldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kZWQgPyB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5jb2xsYXBzZSA6IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmV4cGFuZDtcbiAgfVxuXG4gIGdldCByb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kYWJsZSA/ICdidXR0b24nIDogbnVsbDtcbiAgfVxuXG4gIGdldCB0YWJJbmRleCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGFibGUgPyAnMCcgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vbi1mb2N1cycpXG4gIGdldCBvblN0YWNrTGFiZWxGb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlICYmICF0aGlzLmV4cGFuZGVkICYmIHRoaXMuZm9jdXNlZDtcbiAgfVxuXG4gIGdldCBhcmlhRXhwYW5kZWQoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuZXhwYW5kYWJsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==