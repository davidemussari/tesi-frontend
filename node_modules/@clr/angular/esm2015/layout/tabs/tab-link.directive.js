import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, ViewContainerRef, } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from '../../utils/conditional/if-active.service';
import { TemplateRefContainer } from '../../utils/template-ref/template-ref-container';
import { TabsService } from './providers/tabs.service';
import { AriaService } from './providers/aria.service';
import { TABS_ID } from './tabs-id.provider';
import { TabsLayout } from './enums/tabs-layout.enum';
let nbTabLinkComponents = 0;
let ClrTabLink = class ClrTabLink {
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        if (!this.tabLinkId) {
            this.tabLinkId = 'clr-tab-link-' + nbTabLinkComponents++;
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        const factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    set inOverflow(inOverflow) {
        this._inOverflow = inOverflow;
    }
    get inOverflow() {
        return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
    }
    get addLinkClasses() {
        return !this.inOverflow;
    }
    get ariaControls() {
        return this.ariaService.ariaControls;
    }
    get tabLinkId() {
        return this.ariaService.ariaLabelledBy;
    }
    set tabLinkId(id) {
        this.ariaService.ariaLabelledBy = id;
    }
    activate() {
        this.ifActiveService.current = this.id;
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
};
tslib_1.__decorate([
    Input('clrTabLinkInOverflow'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrTabLink.prototype, "inOverflow", null);
tslib_1.__decorate([
    HostBinding('class.btn-link'),
    HostBinding('class.nav-link'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], ClrTabLink.prototype, "addLinkClasses", null);
tslib_1.__decorate([
    HostBinding('attr.aria-controls'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [])
], ClrTabLink.prototype, "ariaControls", null);
tslib_1.__decorate([
    HostBinding('id'),
    Input('id'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ClrTabLink.prototype, "tabLinkId", null);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrTabLink.prototype, "activate", null);
tslib_1.__decorate([
    HostBinding('class.active'),
    HostBinding('attr.aria-selected'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], ClrTabLink.prototype, "active", null);
ClrTabLink = tslib_1.__decorate([
    Directive({
        selector: '[clrTabLink]',
        host: {
            '[attr.aria-hidden]': 'false',
            '[class.btn]': 'true',
            role: 'tab',
            type: 'button',
        },
    }),
    tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
    tslib_1.__param(7, Inject(TABS_ID)),
    tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, AriaService,
        ElementRef,
        ComponentFactoryResolver,
        ViewContainerRef,
        TabsService, Number])
], ClrTabLink);
export { ClrTabLink };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsSUFBSSxtQkFBbUIsR0FBVyxDQUFDLENBQUM7QUFXcEMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQW9CckIsWUFDUyxlQUFnQyxFQUNULEVBQVUsRUFDaEMsV0FBd0IsRUFDeEIsRUFBYyxFQUNkLEdBQTZCLEVBQzdCLGdCQUFrQyxFQUNsQyxXQUF3QixFQUNSLE1BQWM7UUFQL0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1QsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNSLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztTQUMxRDtRQUVELHlHQUF5RztRQUN6RyxrR0FBa0c7UUFDbEcsd0ZBQXdGO1FBQ3hGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtZQUN2RixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDZCxDQUFDO0lBckNELElBQUksVUFBVSxDQUFDLFVBQVU7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQzdFLENBQUM7SUFJRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQTRCRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFJRCxJQUFJLFNBQVMsQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUlELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0NBQ0YsQ0FBQTtBQWhFQztJQURDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7OzRDQUc3QjtBQVFEO0lBRkMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0lBQzdCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs7O2dEQUc3QjtBQTRCRDtJQURDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7OzhDQUdqQztBQVFEO0lBRkMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDOzs7MkNBR1g7QUFHRDtJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7MENBR3JCO0FBSUQ7SUFGQyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBQzNCLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7O3dDQUdqQztBQW5FVSxVQUFVO0lBVHRCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLElBQUksRUFBRTtZQUNKLG9CQUFvQixFQUFFLE9BQU87WUFDN0IsYUFBYSxFQUFFLE1BQU07WUFDckIsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsUUFBUTtTQUNmO0tBQ0YsQ0FBQztJQXVCRyxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFNcEIsbUJBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBOzZDQVBRLGVBQWUsVUFFbEIsV0FBVztRQUNwQixVQUFVO1FBQ1Qsd0JBQXdCO1FBQ1gsZ0JBQWdCO1FBQ3JCLFdBQVc7R0EzQnZCLFVBQVUsQ0FvRXRCO1NBcEVZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZWZDb250YWluZXIgfSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZS1yZWYvdGVtcGxhdGUtcmVmLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5cbmltcG9ydCB7IEFyaWFTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYXJpYS5zZXJ2aWNlJztcbmltcG9ydCB7IFRBQlNfSUQgfSBmcm9tICcuL3RhYnMtaWQucHJvdmlkZXInO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5cbmxldCBuYlRhYkxpbmtDb21wb25lbnRzOiBudW1iZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyVGFiTGlua10nLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5idG5dJzogJ3RydWUnLFxuICAgIHJvbGU6ICd0YWInLFxuICAgIHR5cGU6ICdidXR0b24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJMaW5rIHtcbiAgcHJpdmF0ZSBfaW5PdmVyZmxvdzogYm9vbGVhbjtcblxuICBASW5wdXQoJ2NsclRhYkxpbmtJbk92ZXJmbG93JylcbiAgc2V0IGluT3ZlcmZsb3coaW5PdmVyZmxvdykge1xuICAgIHRoaXMuX2luT3ZlcmZsb3cgPSBpbk92ZXJmbG93O1xuICB9XG5cbiAgZ2V0IGluT3ZlcmZsb3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luT3ZlcmZsb3cgJiYgdGhpcy50YWJzU2VydmljZS5sYXlvdXQgIT09IFRhYnNMYXlvdXQuVkVSVElDQUw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmJ0bi1saW5rJylcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYXYtbGluaycpXG4gIGdldCBhZGRMaW5rQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gIXRoaXMuaW5PdmVyZmxvdztcbiAgfVxuXG4gIHRlbXBsYXRlUmVmQ29udGFpbmVyOiBUZW1wbGF0ZVJlZkNvbnRhaW5lcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIHByaXZhdGUgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIGFyaWFTZXJ2aWNlOiBBcmlhU2VydmljZSxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVEFCU19JRCkgcHVibGljIHRhYnNJZDogbnVtYmVyXG4gICkge1xuICAgIGlmICghdGhpcy50YWJMaW5rSWQpIHtcbiAgICAgIHRoaXMudGFiTGlua0lkID0gJ2Nsci10YWItbGluay0nICsgbmJUYWJMaW5rQ29tcG9uZW50cysrO1xuICAgIH1cblxuICAgIC8vIFRhYiBsaW5rcyBjYW4gYmUgcmVuZGVyZWQgaW4gb25lIG9mIHR3byBwbGFjZXM6IGluIHRoZSBtYWluIGFyZWEgb3IgaW5zaWRlIHRoZSBvdmVyZmxvdyBkcm9wZG93biBtZW51LlxuICAgIC8vIEhlcmUsIHdlIGNyZWF0ZSBhIGNvbnRhaW5lciBzbyB0aGF0IGl0cyB0ZW1wbGF0ZSBjYW4gYmUgdXNlZCB0byBjcmVhdGUgZW1iZWRkZWRWaWV3IG9uIHRoZSBmbHkuXG4gICAgLy8gU2VlIFRhYnNTZXJ2aWNlJ3MgcmVuZGVyVmlldygpIG1ldGhvZCBhbmQgaG93IGl0J3MgdXNlZCBpbiBUYWJzIGNsYXNzIGZvciBhbiBleGFtcGxlLlxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUZW1wbGF0ZVJlZkNvbnRhaW5lcik7XG4gICAgdGhpcy50ZW1wbGF0ZVJlZkNvbnRhaW5lciA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgMSwgdW5kZWZpbmVkLCBbXG4gICAgICBbdGhpcy5lbC5uYXRpdmVFbGVtZW50XSxcbiAgICBdKS5pbnN0YW5jZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWNvbnRyb2xzJylcbiAgZ2V0IGFyaWFDb250cm9scygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFDb250cm9scztcbiAgfVxuXG4gIGdldCB0YWJMaW5rSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhTGFiZWxsZWRCeTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnaWQnKVxuICBASW5wdXQoJ2lkJylcbiAgc2V0IHRhYkxpbmtJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hcmlhU2VydmljZS5hcmlhTGFiZWxsZWRCeSA9IGlkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID0gdGhpcy5pZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=