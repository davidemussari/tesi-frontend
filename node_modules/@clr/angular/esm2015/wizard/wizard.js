/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, Input, IterableDiffers, Output, QueryList, ViewChild, PLATFORM_ID, Inject, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ButtonHubService } from './providers/button-hub.service';
import { HeaderActionService } from './providers/header-actions.service';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardHeaderAction } from './wizard-header-action';
import { ClrWizardPage } from './wizard-page';
let ClrWizard = class ClrWizard {
    constructor(platformId, navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        this.platformId = platformId;
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this.headerActionService = headerActionService;
        this.elementRef = elementRef;
        /**
         * Set the modal size of the wizard. Set using `[clrWizardSize]` input.
         */
        this.size = 'xl';
        /**
         * Tells the modal part of the wizard whether it should have a close "X"
         * in the top right corner. Set using `[clrWizardClosable]` input.
         */
        this.closable = true;
        this._forceForward = false;
        this._open = false;
        this._stopNext = false;
        this._stopCancel = false;
        this._stopNavigation = false;
        this._disableStepnav = false;
        /**
         * Used to communicate to the underlying modal that animations are not
         * wanted. Primary use is for the display of static/inline wizards.
         * Set using `[clrWizardPreventModalAnimation]` input.
         */
        this._stopModalAnimations = false;
        /**
         * Emits when the wizard is opened or closed.
         * Listen via `(clrWizardOpenChange)` event.
         */
        this._openChanged = new EventEmitter(false);
        /**
         * Emits when the wizard is canceled. Listen via `(clrWizardOnCancel)` event.
         * Can be combined with the `[clrWizardPreventDefaultCancel]` input to create
         * wizard-level custom cancel routines.
         */
        this.onCancel = new EventEmitter(false);
        /**
         * Emits when the wizard is completed. Listen via `(clrWizardOnFinish)` event.
         * Can be combined with the `[clrWizardPreventDefaultNext]` input to create
         * wizard-level custom completion routines.
         */
        this.wizardFinished = new EventEmitter(false);
        /**
         * Emits when the wizard is reset. Listen via `(clrWizardOnReset)` event.
         */
        this.onReset = new EventEmitter(false);
        /**
         * Emits when the current page has changed. Listen via `(clrWizardCurrentPageChanged)` event.
         * output. Useful for non-blocking validation.
         */
        this.currentPageChanged = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the next page. Listen via `(clrWizardOnNext)` event.
         * Can be combined with the `[clrWizardPreventDefaultNext]` input to create
         * wizard-level custom navigation routines, which are useful for validation.
         */
        this.onMoveNext = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the previous page. Can be useful for validation.
         * Listen via `(clrWizardOnPrevious)` event.
         */
        this.onMovePrevious = new EventEmitter(false);
        this.subscriptions = [];
        this.subscriptions.push(this.listenForNextPageChanges(), this.listenForPreviousPageChanges(), this.listenForCancelChanges(), this.listenForFinishedChanges(), this.listenForPageChanges());
        this.differ = differs.find([]).create(null);
    }
    /**
     * Resets page completed states when navigating backwards.
     * Set using `[clrWizardForceForwardNavigation]` input.
     */
    set forceForward(value) {
        this._forceForward = !!value;
        this.navService.forceForwardNavigation = value;
    }
    get forceForward() {
        return this._forceForward;
    }
    /**
     * Toggles open/close of the wizard component.
     * Set using the `[clrWizardOpen]` input.
     */
    set clrWizardOpen(open) {
        if (open) {
            this.buttonService.buttonsReady = true;
        }
        this._open = open;
    }
    /**
     * Prevents ClrWizard from moving to the next page or closing itself on finishing.
     * Set using the `[clrWizardPreventDefaultNext]` input. Note that using stopNext
     * will require you to create your own calls to .next() and .finish() in your
     * host component to make the ClrWizard work as expected.
     */
    set stopNext(value) {
        this._stopNext = !!value;
        this.navService.wizardHasAltNext = value;
    }
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
     * Set using the `[clrWizardPreventDefaultCancel]` input.
     *
     * Note that using stopCancel will require you to create your own calls to `close()` in your host compone`nt
     * to make the ClrWizard work as expected. Useful for doing checks or prompts
     * before closing a ClrWizard.
     */
    set stopCancel(value) {
        this._stopCancel = !!value;
        this.navService.wizardHasAltCancel = value;
    }
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Prevents ClrWizard from performing any form of navigation away from the current
     * page. Set using the `[clrWizardPreventNavigation]` input.
     * Note that stopNavigation is meant to freeze the wizard in place, typically
     * during a long validation or background action where you want the wizard to
     * display loading content but not allow the user to execute navigation in
     * the stepnav, close X, or the  back, finish, or next buttons.
     */
    set stopNavigation(value) {
        this._stopNavigation = !!value;
        this.navService.wizardStopNavigation = value;
    }
    get stopNavigation() {
        return this._stopNavigation;
    }
    /**
     * Prevents clicks on the links in the stepnav from working.
     * Set using `[clrWizardDisableStepnav]` input.
     * A more granular bypassing of navigation which can be useful when your
     * ClrWizard is in a state of completion and you don't want users to be
     * able to jump backwards and change things.
     */
    set disableStepnav(value) {
        this._disableStepnav = !!value;
        this.navService.wizardDisableStepnav = value;
    }
    get disableStepnav() {
        return this._disableStepnav;
    }
    get stopModalAnimations() {
        return this._stopModalAnimations ? 'true' : 'false';
    }
    get currentPage() {
        return this.navService.currentPage;
    }
    set currentPage(page) {
        this.navService.goTo(page, true);
    }
    get isLast() {
        return this.navService.currentPageIsLast;
    }
    get isFirst() {
        return this.navService.currentPageIsFirst;
    }
    get isStatic() {
        return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
    }
    ngAfterContentInit() {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        this.initializeButtons();
    }
    ngDoCheck() {
        this.updateNavOnPageChanges();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    /**
     * Marks Wizard as finished. By default it does not execute event
     * emissions or checks before completing and closing. This method is commonly
     * used as part of an alternative navigation with `[clrWizardPreventDefaultNext]`.
     *
     * If `skipChecksAndEmits` is true, the wizard will complete and close
     * regardless of the state of its current page. This is useful for alternative
     * navigation where event emissions have already been done and firing them again
     * may cause an event loop.
     */
    finish(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    }
    /**
     * Marks the wizard as finished but does run checks and emissions.
     * Good for a last step in an alternate workflow. Does the same thing as
     * calling `ClrWizard.finish(true)` or `ClrWizard.finish()` without a parameter.
     */
    forceFinish() {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    }
    /**
     * Opens the wizard. If there is no current page defined, sets the first page in the wizard to be current.
     */
    open() {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    }
    /**
     * Closes the wizard. Call this directly instead of `cancel()` to implement alternative cancel functionality.
     */
    close() {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    }
    /**
     * Used to open and close the wizard. By default the wizard will
     * close if invoked with no parameter. If parameter is true wizard will open
     * else if false will close.
     */
    toggle(open) {
        if (open) {
            this.open();
        }
        else {
            this.close();
        }
    }
    /**
     * Moves the wizard to the previous page.
     */
    previous() {
        this.navService.previous();
    }
    /**
     * By default, `next()` does not execute event emissions.
     * This method is commonly called as part of an alternative navigation
     * with `[clrWizardPreventDefaultNext]`. The wizard will move to the next page
     * regardless of the state of its current page. This is useful for alternative
     * navigation where event emissions have already been done and firing them again
     * may cause an event loop.
     *
     * If `skipChecksAndEmits` is false, the wizard will execute default checks
     * and emit events as normal. This is useful for custom buttons or programmatic
     * workflows that are not executing the wizards default checks and emissions.
     * It is another way to navigate without having to rewrite the wizard’s default
     * functionality from scratch.
     */
    next(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    }
    /**
     * Moves the wizard to the next page without the checks and emissions.
     * Good for a last step in an alternate workflow.
     * Alias for `ClrWizard.next(true)` or `ClrWizard.next()`
     */
    forceNext() {
        this.navService.forceNext();
    }
    /**
     * Cancels and closes the wizard. Do not use this for an override of the cancel
     * the functionality with `[clrWizardPreventDefaultCancel]`, `[clrWizardPreventPageDefaultCancel]`,
     * or `[clrWizardPagePreventDefault]` because it will initiate the same checks
     * and event emissions that invoked your event handler. Use `ClrWizard.close()` instead.
     */
    cancel() {
        this.navService.cancel();
    }
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality. In most cases, use `ClrWizard.cancel()` instead.
     */
    modalCancel() {
        if (this.closable) {
            this.checkAndCancel();
        }
    }
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs `(clrWizardPageOnCancel)` and `(clrWizardOnCancel)`.
     */
    checkAndCancel() {
        const currentPage = this.currentPage;
        const currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
        if (this.stopNavigation) {
            return;
        }
        currentPage.pageOnCancel.emit();
        if (!currentPageHasOverrides) {
            this.onCancel.emit();
        }
        if (!this.stopCancel && !currentPageHasOverrides) {
            this.close();
        }
    }
    /**
     * Navigates to a given page in the Wizard. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with `clr-wizard-page-` and then either a
     * numeric ID or the ID specified for the `ClrWizardPage` component’s `id` input.
     */
    goTo(pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    }
    /**
     * Reset sets all WizardPages to incomplete and sets the first page in the `ClrWizard` to
     * be the current page, resetting the wizard navigation.
     * Use `(clrWizardOnReset)` event to reset the data or model of your wizard.
     */
    reset() {
        this.pageCollection.reset();
        this.onReset.next();
    }
    listenForNextPageChanges() {
        return this.navService.movedToNextPage.pipe(filter(() => isPlatformBrowser(this.platformId))).subscribe(() => {
            this.onMoveNext.emit();
            this.wizardTitle.nativeElement.focus();
        });
    }
    listenForPreviousPageChanges() {
        return this.navService.movedToPreviousPage.pipe(filter(() => isPlatformBrowser(this.platformId))).subscribe(() => {
            this.onMovePrevious.emit();
            this.wizardTitle.nativeElement.focus();
        });
    }
    listenForCancelChanges() {
        return this.navService.notifyWizardCancel.subscribe(() => this.checkAndCancel());
    }
    listenForFinishedChanges() {
        return this.navService.wizardFinished.subscribe(() => this.emitWizardFinished());
    }
    listenForPageChanges() {
        return this.navService.currentPageChanged.subscribe(() => this.currentPageChanged.emit());
    }
    updateNavOnPageChanges() {
        const changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(() => this.navService.updateNavigation());
            changes.forEachRemovedItem(() => this.navService.updateNavigation());
        }
    }
    initializeButtons() {
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    }
    emitWizardFinished() {
        if (!this.stopNext) {
            this.forceFinish();
        }
        this.wizardFinished.emit();
    }
};
tslib_1.__decorate([
    Input('clrWizardSize'),
    tslib_1.__metadata("design:type", Object)
], ClrWizard.prototype, "size", void 0);
tslib_1.__decorate([
    Input('clrWizardClosable'),
    tslib_1.__metadata("design:type", Object)
], ClrWizard.prototype, "closable", void 0);
tslib_1.__decorate([
    Input('clrWizardForceForwardNavigation'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "forceForward", null);
tslib_1.__decorate([
    Input('clrWizardOpen'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "clrWizardOpen", null);
tslib_1.__decorate([
    Input('clrWizardPreventDefaultNext'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "stopNext", null);
tslib_1.__decorate([
    Input('clrWizardPreventDefaultCancel'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "stopCancel", null);
tslib_1.__decorate([
    Input('clrWizardPreventNavigation'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "stopNavigation", null);
tslib_1.__decorate([
    Input('clrWizardDisableStepnav'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "disableStepnav", null);
tslib_1.__decorate([
    Input('clrWizardPreventModalAnimation'),
    tslib_1.__metadata("design:type", Boolean)
], ClrWizard.prototype, "_stopModalAnimations", void 0);
tslib_1.__decorate([
    Output('clrWizardOpenChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "_openChanged", void 0);
tslib_1.__decorate([
    Output('clrWizardOnCancel'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onCancel", void 0);
tslib_1.__decorate([
    Output('clrWizardOnFinish'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "wizardFinished", void 0);
tslib_1.__decorate([
    Output('clrWizardOnReset'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onReset", void 0);
tslib_1.__decorate([
    Output('clrWizardCurrentPageChanged'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "currentPageChanged", void 0);
tslib_1.__decorate([
    Output('clrWizardOnNext'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onMoveNext", void 0);
tslib_1.__decorate([
    Output('clrWizardOnPrevious'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onMovePrevious", void 0);
tslib_1.__decorate([
    ContentChildren(ClrWizardPage),
    tslib_1.__metadata("design:type", QueryList)
], ClrWizard.prototype, "pages", void 0);
tslib_1.__decorate([
    ContentChildren(ClrWizardHeaderAction),
    tslib_1.__metadata("design:type", QueryList)
], ClrWizard.prototype, "headerActions", void 0);
tslib_1.__decorate([
    ViewChild('wizardTitle', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ClrWizard.prototype, "wizardTitle", void 0);
ClrWizard = tslib_1.__decorate([
    Component({
        selector: 'clr-wizard',
        providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
        template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-modal\n    [clrModalOpen]=\"_open\"\n    [clrModalSize]=\"size\"\n    [clrModalClosable]=\"closable\"\n    [clrModalStaticBackdrop]=\"true\"\n    [clrModalSkipAnimation]=\"stopModalAnimations\"\n    [clrModalOverrideScrollService]=\"isStatic\"\n    [clrModalPreventClose]=\"true\"\n    (clrModalAlternateClose)=\"modalCancel()\">\n\n    <nav class=\"modal-nav clr-wizard-stepnav-wrapper\">\n        <h3 class=\"clr-wizard-title\"><ng-content select=\"clr-wizard-title\"></ng-content></h3>\n        <clr-wizard-stepnav></clr-wizard-stepnav>\n    </nav>\n\n    <h3 class=\"modal-title\">\n        <span tabindex=\"0\" #wizardTitle class=\"modal-title-text\">\n            <ng-template [ngTemplateOutlet]=\"navService.currentPageTitle\"></ng-template>\n        </span>\n\n        <div class=\"modal-header-actions-wrapper\" *ngIf=\"headerActionService.displayHeaderActionsWrapper\">\n            <div *ngIf=\"headerActionService.showWizardHeaderActions\">\n                <ng-content select=\"clr-wizard-header-action\"></ng-content>\n            </div>\n            <div *ngIf=\"headerActionService.currentPageHasHeaderActions\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.headerActions\"></ng-template>\n            </div>\n        </div>\n    </h3>\n\n    <div class=\"modal-body\">\n        <main clr-wizard-pages-wrapper class=\"clr-wizard-content\">\n            <ng-content></ng-content>\n        </main>\n    </div>\n    <div class=\"modal-footer clr-wizard-footer\">\n        <div class=\"clr-wizard-footer-buttons\">\n            <div *ngIf=\"navService.currentPage && !navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-content select=\"clr-wizard-button\"></ng-content>\n            </div>\n            <div *ngIf=\"navService.currentPage && navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.buttons\"></ng-template>\n            </div>\n        </div>\n    </div>\n</clr-modal>\n",
        host: {
            '[class.clr-wizard]': 'true',
            '[class.wizard-md]': "size == 'md'",
            '[class.wizard-lg]': "size == 'lg'",
            '[class.wizard-xl]': "size == 'xl'",
            '[class.lastPage]': 'navService.currentPageIsLast',
        }
    }),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [Object,
        WizardNavigationService,
        PageCollectionService,
        ButtonHubService,
        HeaderActionService,
        ElementRef,
        IterableDiffers])
], ClrWizard);
export { ClrWizard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3dpemFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztFQUlFOztBQUVGLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYzlDLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUErTHBCLFlBQytCLFVBQWtCLEVBQ3hDLFVBQW1DLEVBQ25DLGNBQXFDLEVBQ3JDLGFBQStCLEVBQy9CLG1CQUF3QyxFQUN2QyxVQUFzQixFQUM5QixPQUF3QjtRQU5LLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDeEMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ3JDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3ZDLGVB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QU0sQ0FBQyxxQkFBcUIsQ0FBQztzQ0FBaUIsWUFBWTtpREFBcUM7QUFFaEU7SUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQztzQ0FBUSxTQUFTO3dDQUFnQjtBQUN4QjtJQUF2QyxlQUFlLENBQUMscUJBQXFCLENBQUM7c0NBQWdCLFNBQVM7Z0RBQXdCO0FBRXhGO0lBREMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FDL0IsVUFBVTs4Q0FBQztBQXRLYixTQUFTO0lBWnJCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDO1FBQ2xHLGl6RUFBNEI7UUFDNUIsSUFBSSxFQUFFO1lBQ0osb0JBQW9CLEVBQUUsTUFBTTtZQUM1QixtQkFBbUIsRUFBRSxjQUFjO1lBQ25DLG1CQUFtQixFQUFFLGNBQWM7WUFDbkMsbUJBQW1CLEVBQUUsY0FBYztZQUNuQyxrQkFBa0IsRUFBRSw4QkFBOEI7U0FDbkQ7S0FDRixDQUFDO0lBaU1HLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs2Q0FBcUIsTUFBTTtRQUM1Qix1QkFBdUI7UUFDbkIscUJBQXFCO1FBQ3RCLGdCQUFnQjtRQUNWLG1CQUFtQjtRQUMzQixVQUFVO1FBQ3JCLGVBQWU7R0F0TWYsU0FBUyxDQW1jckI7U0FuY1ksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4qL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJ1dHRvbkh1YlNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9idXR0b24taHViLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVhZGVyQWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hlYWRlci1hY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy93aXphcmQtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENscldpemFyZEhlYWRlckFjdGlvbiB9IGZyb20gJy4vd2l6YXJkLWhlYWRlci1hY3Rpb24nO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZSB9IGZyb20gJy4vd2l6YXJkLXBhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItd2l6YXJkJyxcbiAgcHJvdmlkZXJzOiBbV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsIFBhZ2VDb2xsZWN0aW9uU2VydmljZSwgQnV0dG9uSHViU2VydmljZSwgSGVhZGVyQWN0aW9uU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi93aXphcmQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci13aXphcmRdJzogJ3RydWUnLFxuICAgICdbY2xhc3Mud2l6YXJkLW1kXSc6IFwic2l6ZSA9PSAnbWQnXCIsXG4gICAgJ1tjbGFzcy53aXphcmQtbGddJzogXCJzaXplID09ICdsZydcIixcbiAgICAnW2NsYXNzLndpemFyZC14bF0nOiBcInNpemUgPT0gJ3hsJ1wiLFxuICAgICdbY2xhc3MubGFzdFBhZ2VdJzogJ25hdlNlcnZpY2UuY3VycmVudFBhZ2VJc0xhc3QnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJXaXphcmQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsIERvQ2hlY2sge1xuICAvKipcbiAgICogU2V0IHRoZSBtb2RhbCBzaXplIG9mIHRoZSB3aXphcmQuIFNldCB1c2luZyBgW2NscldpemFyZFNpemVdYCBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkU2l6ZScpIHNpemUgPSAneGwnO1xuXG4gIC8qKlxuICAgKiBUZWxscyB0aGUgbW9kYWwgcGFydCBvZiB0aGUgd2l6YXJkIHdoZXRoZXIgaXQgc2hvdWxkIGhhdmUgYSBjbG9zZSBcIlhcIlxuICAgKiBpbiB0aGUgdG9wIHJpZ2h0IGNvcm5lci4gU2V0IHVzaW5nIGBbY2xyV2l6YXJkQ2xvc2FibGVdYCBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkQ2xvc2FibGUnKSBjbG9zYWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBwYWdlIGNvbXBsZXRlZCBzdGF0ZXMgd2hlbiBuYXZpZ2F0aW5nIGJhY2t3YXJkcy5cbiAgICogU2V0IHVzaW5nIGBbY2xyV2l6YXJkRm9yY2VGb3J3YXJkTmF2aWdhdGlvbl1gIGlucHV0LlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRGb3JjZUZvcndhcmROYXZpZ2F0aW9uJylcbiAgc2V0IGZvcmNlRm9yd2FyZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZvcmNlRm9yd2FyZCA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmZvcmNlRm9yd2FyZE5hdmlnYXRpb24gPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9mb3JjZUZvcndhcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGZvcmNlRm9yd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm9yY2VGb3J3YXJkO1xuICB9XG5cbiAgX29wZW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgb3Blbi9jbG9zZSBvZiB0aGUgd2l6YXJkIGNvbXBvbmVudC5cbiAgICogU2V0IHVzaW5nIHRoZSBgW2NscldpemFyZE9wZW5dYCBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkT3BlbicpXG4gIHNldCBjbHJXaXphcmRPcGVuKG9wZW46IGJvb2xlYW4pIHtcbiAgICBpZiAob3Blbikge1xuICAgICAgdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbnNSZWFkeSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX29wZW4gPSBvcGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIENscldpemFyZCBmcm9tIG1vdmluZyB0byB0aGUgbmV4dCBwYWdlIG9yIGNsb3NpbmcgaXRzZWxmIG9uIGZpbmlzaGluZy5cbiAgICogU2V0IHVzaW5nIHRoZSBgW2NscldpemFyZFByZXZlbnREZWZhdWx0TmV4dF1gIGlucHV0LiBOb3RlIHRoYXQgdXNpbmcgc3RvcE5leHRcbiAgICogd2lsbCByZXF1aXJlIHlvdSB0byBjcmVhdGUgeW91ciBvd24gY2FsbHMgdG8gLm5leHQoKSBhbmQgLmZpbmlzaCgpIGluIHlvdXJcbiAgICogaG9zdCBjb21wb25lbnQgdG8gbWFrZSB0aGUgQ2xyV2l6YXJkIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFByZXZlbnREZWZhdWx0TmV4dCcpXG4gIHNldCBzdG9wTmV4dCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0b3BOZXh0ID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkSGFzQWx0TmV4dCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3N0b3BOZXh0OiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzdG9wTmV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcE5leHQ7XG4gIH1cblxuICAvKipcbiAgICogUHJldmVudHMgQ2xyV2l6YXJkIGZyb20gY2xvc2luZyB3aGVuIHRoZSBjYW5jZWwgYnV0dG9uIG9yIGNsb3NlIFwiWFwiIGlzIGNsaWNrZWQuXG4gICAqIFNldCB1c2luZyB0aGUgYFtjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbF1gIGlucHV0LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdXNpbmcgc3RvcENhbmNlbCB3aWxsIHJlcXVpcmUgeW91IHRvIGNyZWF0ZSB5b3VyIG93biBjYWxscyB0byBgY2xvc2UoKWAgaW4geW91ciBob3N0IGNvbXBvbmVgbnRcbiAgICogdG8gbWFrZSB0aGUgQ2xyV2l6YXJkIHdvcmsgYXMgZXhwZWN0ZWQuIFVzZWZ1bCBmb3IgZG9pbmcgY2hlY2tzIG9yIHByb21wdHNcbiAgICogYmVmb3JlIGNsb3NpbmcgYSBDbHJXaXphcmQuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFByZXZlbnREZWZhdWx0Q2FuY2VsJylcbiAgc2V0IHN0b3BDYW5jZWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdG9wQ2FuY2VsID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkSGFzQWx0Q2FuY2VsID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfc3RvcENhbmNlbDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc3RvcENhbmNlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcENhbmNlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBDbHJXaXphcmQgZnJvbSBwZXJmb3JtaW5nIGFueSBmb3JtIG9mIG5hdmlnYXRpb24gYXdheSBmcm9tIHRoZSBjdXJyZW50XG4gICAqIHBhZ2UuIFNldCB1c2luZyB0aGUgYFtjbHJXaXphcmRQcmV2ZW50TmF2aWdhdGlvbl1gIGlucHV0LlxuICAgKiBOb3RlIHRoYXQgc3RvcE5hdmlnYXRpb24gaXMgbWVhbnQgdG8gZnJlZXplIHRoZSB3aXphcmQgaW4gcGxhY2UsIHR5cGljYWxseVxuICAgKiBkdXJpbmcgYSBsb25nIHZhbGlkYXRpb24gb3IgYmFja2dyb3VuZCBhY3Rpb24gd2hlcmUgeW91IHdhbnQgdGhlIHdpemFyZCB0b1xuICAgKiBkaXNwbGF5IGxvYWRpbmcgY29udGVudCBidXQgbm90IGFsbG93IHRoZSB1c2VyIHRvIGV4ZWN1dGUgbmF2aWdhdGlvbiBpblxuICAgKiB0aGUgc3RlcG5hdiwgY2xvc2UgWCwgb3IgdGhlICBiYWNrLCBmaW5pc2gsIG9yIG5leHQgYnV0dG9ucy5cbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUHJldmVudE5hdmlnYXRpb24nKVxuICBzZXQgc3RvcE5hdmlnYXRpb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdG9wTmF2aWdhdGlvbiA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLndpemFyZFN0b3BOYXZpZ2F0aW9uID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfc3RvcE5hdmlnYXRpb24gPSBmYWxzZTtcbiAgZ2V0IHN0b3BOYXZpZ2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zdG9wTmF2aWdhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBjbGlja3Mgb24gdGhlIGxpbmtzIGluIHRoZSBzdGVwbmF2IGZyb20gd29ya2luZy5cbiAgICogU2V0IHVzaW5nIGBbY2xyV2l6YXJkRGlzYWJsZVN0ZXBuYXZdYCBpbnB1dC5cbiAgICogQSBtb3JlIGdyYW51bGFyIGJ5cGFzc2luZyBvZiBuYXZpZ2F0aW9uIHdoaWNoIGNhbiBiZSB1c2VmdWwgd2hlbiB5b3VyXG4gICAqIENscldpemFyZCBpcyBpbiBhIHN0YXRlIG9mIGNvbXBsZXRpb24gYW5kIHlvdSBkb24ndCB3YW50IHVzZXJzIHRvIGJlXG4gICAqIGFibGUgdG8ganVtcCBiYWNrd2FyZHMgYW5kIGNoYW5nZSB0aGluZ3MuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZERpc2FibGVTdGVwbmF2JylcbiAgc2V0IGRpc2FibGVTdGVwbmF2KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVN0ZXBuYXYgPSAhIXZhbHVlO1xuICAgIHRoaXMubmF2U2VydmljZS53aXphcmREaXNhYmxlU3RlcG5hdiA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVTdGVwbmF2OiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlU3RlcG5hdigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVN0ZXBuYXY7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjb21tdW5pY2F0ZSB0byB0aGUgdW5kZXJseWluZyBtb2RhbCB0aGF0IGFuaW1hdGlvbnMgYXJlIG5vdFxuICAgKiB3YW50ZWQuIFByaW1hcnkgdXNlIGlzIGZvciB0aGUgZGlzcGxheSBvZiBzdGF0aWMvaW5saW5lIHdpemFyZHMuXG4gICAqIFNldCB1c2luZyBgW2NscldpemFyZFByZXZlbnRNb2RhbEFuaW1hdGlvbl1gIGlucHV0LlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQcmV2ZW50TW9kYWxBbmltYXRpb24nKSBfc3RvcE1vZGFsQW5pbWF0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc3RvcE1vZGFsQW5pbWF0aW9ucygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdG9wTW9kYWxBbmltYXRpb25zID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgaXMgb3BlbmVkIG9yIGNsb3NlZC5cbiAgICogTGlzdGVuIHZpYSBgKGNscldpemFyZE9wZW5DaGFuZ2UpYCBldmVudC5cbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9wZW5DaGFuZ2UnKSBfb3BlbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgaXMgY2FuY2VsZWQuIExpc3RlbiB2aWEgYChjbHJXaXphcmRPbkNhbmNlbClgIGV2ZW50LlxuICAgKiBDYW4gYmUgY29tYmluZWQgd2l0aCB0aGUgYFtjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbF1gIGlucHV0IHRvIGNyZWF0ZVxuICAgKiB3aXphcmQtbGV2ZWwgY3VzdG9tIGNhbmNlbCByb3V0aW5lcy5cbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uQ2FuY2VsJykgb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIGlzIGNvbXBsZXRlZC4gTGlzdGVuIHZpYSBgKGNscldpemFyZE9uRmluaXNoKWAgZXZlbnQuXG4gICAqIENhbiBiZSBjb21iaW5lZCB3aXRoIHRoZSBgW2NscldpemFyZFByZXZlbnREZWZhdWx0TmV4dF1gIGlucHV0IHRvIGNyZWF0ZVxuICAgKiB3aXphcmQtbGV2ZWwgY3VzdG9tIGNvbXBsZXRpb24gcm91dGluZXMuXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPbkZpbmlzaCcpIHdpemFyZEZpbmlzaGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHdpemFyZCBpcyByZXNldC4gTGlzdGVuIHZpYSBgKGNscldpemFyZE9uUmVzZXQpYCBldmVudC5cbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uUmVzZXQnKSBvblJlc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnQgcGFnZSBoYXMgY2hhbmdlZC4gTGlzdGVuIHZpYSBgKGNscldpemFyZEN1cnJlbnRQYWdlQ2hhbmdlZClgIGV2ZW50LlxuICAgKiBvdXRwdXQuIFVzZWZ1bCBmb3Igbm9uLWJsb2NraW5nIHZhbGlkYXRpb24uXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRDdXJyZW50UGFnZUNoYW5nZWQnKSBjdXJyZW50UGFnZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIG1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UuIExpc3RlbiB2aWEgYChjbHJXaXphcmRPbk5leHQpYCBldmVudC5cbiAgICogQ2FuIGJlIGNvbWJpbmVkIHdpdGggdGhlIGBbY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0XWAgaW5wdXQgdG8gY3JlYXRlXG4gICAqIHdpemFyZC1sZXZlbCBjdXN0b20gbmF2aWdhdGlvbiByb3V0aW5lcywgd2hpY2ggYXJlIHVzZWZ1bCBmb3IgdmFsaWRhdGlvbi5cbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uTmV4dCcpIG9uTW92ZU5leHQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIG1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlLiBDYW4gYmUgdXNlZnVsIGZvciB2YWxpZGF0aW9uLlxuICAgKiBMaXN0ZW4gdmlhIGAoY2xyV2l6YXJkT25QcmV2aW91cylgIGV2ZW50LlxuICAgKi9cblxuICBAT3V0cHV0KCdjbHJXaXphcmRPblByZXZpb3VzJykgb25Nb3ZlUHJldmlvdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICBAQ29udGVudENoaWxkcmVuKENscldpemFyZFBhZ2UpIHBhZ2VzOiBRdWVyeUxpc3Q8Q2xyV2l6YXJkUGFnZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyV2l6YXJkSGVhZGVyQWN0aW9uKSBoZWFkZXJBY3Rpb25zOiBRdWVyeUxpc3Q8Q2xyV2l6YXJkSGVhZGVyQWN0aW9uPjtcbiAgQFZpZXdDaGlsZCgnd2l6YXJkVGl0bGUnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgd2l6YXJkVGl0bGU6IEVsZW1lbnRSZWY7XG5cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlO1xuICB9XG5cbiAgcHVibGljIHNldCBjdXJyZW50UGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmdvVG8ocGFnZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzTGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlSXNMYXN0O1xuICB9XG5cbiAgcHVibGljIGdldCBpc0ZpcnN0KCkge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2VJc0ZpcnN0O1xuICB9XG5cbiAgcHVibGljIGdldCBpc1N0YXRpYygpIHtcbiAgICByZXR1cm4gKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsci13aXphcmQtLWlubGluZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaWZmZXI6IGFueTsgLy8gZm9yIG1hcmtpbmcgd2hlbiB0aGUgY29sbGVjdGlvbiBvZiB3aXphcmQgcGFnZXMgaGFzIGJlZW4gYWRkZWQgdG8gb3IgZGVsZXRlZCBmcm9tXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwdWJsaWMgbmF2U2VydmljZTogV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHVibGljIHBhZ2VDb2xsZWN0aW9uOiBQYWdlQ29sbGVjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2UsXG4gICAgcHVibGljIGhlYWRlckFjdGlvblNlcnZpY2U6IEhlYWRlckFjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVyc1xuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubGlzdGVuRm9yTmV4dFBhZ2VDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvclByZXZpb3VzUGFnZUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yQ2FuY2VsQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JGaW5pc2hlZENoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yUGFnZUNoYW5nZXMoKVxuICAgICk7XG5cbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzID0gdGhpcy5wYWdlcztcbiAgICB0aGlzLmhlYWRlckFjdGlvblNlcnZpY2Uud2l6YXJkSGVhZGVyQWN0aW9ucyA9IHRoaXMuaGVhZGVyQWN0aW9ucztcbiAgICB0aGlzLmluaXRpYWxpemVCdXR0b25zKCk7XG4gIH1cblxuICBwdWJsaWMgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMudXBkYXRlTmF2T25QYWdlQ2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyBXaXphcmQgYXMgZmluaXNoZWQuIEJ5IGRlZmF1bHQgaXQgZG9lcyBub3QgZXhlY3V0ZSBldmVudFxuICAgKiBlbWlzc2lvbnMgb3IgY2hlY2tzIGJlZm9yZSBjb21wbGV0aW5nIGFuZCBjbG9zaW5nLiBUaGlzIG1ldGhvZCBpcyBjb21tb25seVxuICAgKiB1c2VkIGFzIHBhcnQgb2YgYW4gYWx0ZXJuYXRpdmUgbmF2aWdhdGlvbiB3aXRoIGBbY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0XWAuXG4gICAqXG4gICAqIElmIGBza2lwQ2hlY2tzQW5kRW1pdHNgIGlzIHRydWUsIHRoZSB3aXphcmQgd2lsbCBjb21wbGV0ZSBhbmQgY2xvc2VcbiAgICogcmVnYXJkbGVzcyBvZiB0aGUgc3RhdGUgb2YgaXRzIGN1cnJlbnQgcGFnZS4gVGhpcyBpcyB1c2VmdWwgZm9yIGFsdGVybmF0aXZlXG4gICAqIG5hdmlnYXRpb24gd2hlcmUgZXZlbnQgZW1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGRvbmUgYW5kIGZpcmluZyB0aGVtIGFnYWluXG4gICAqIG1heSBjYXVzZSBhbiBldmVudCBsb29wLlxuICAgKi9cbiAgcHVibGljIGZpbmlzaChza2lwQ2hlY2tzQW5kRW1pdHMgPSB0cnVlKSB7XG4gICAgaWYgKHNraXBDaGVja3NBbmRFbWl0cykge1xuICAgICAgdGhpcy5mb3JjZUZpbmlzaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdlNlcnZpY2UuZmluaXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIHRoZSB3aXphcmQgYXMgZmluaXNoZWQgYnV0IGRvZXMgcnVuIGNoZWNrcyBhbmQgZW1pc3Npb25zLlxuICAgKiBHb29kIGZvciBhIGxhc3Qgc3RlcCBpbiBhbiBhbHRlcm5hdGUgd29ya2Zsb3cuIERvZXMgdGhlIHNhbWUgdGhpbmcgYXNcbiAgICogY2FsbGluZyBgQ2xyV2l6YXJkLmZpbmlzaCh0cnVlKWAgb3IgYENscldpemFyZC5maW5pc2goKWAgd2l0aG91dCBhIHBhcmFtZXRlci5cbiAgICovXG4gIHB1YmxpYyBmb3JjZUZpbmlzaCgpIHtcbiAgICBpZiAodGhpcy5zdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgd2l6YXJkLiBJZiB0aGVyZSBpcyBubyBjdXJyZW50IHBhZ2UgZGVmaW5lZCwgc2V0cyB0aGUgZmlyc3QgcGFnZSBpbiB0aGUgd2l6YXJkIHRvIGJlIGN1cnJlbnQuXG4gICAqL1xuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgdGhpcy5uYXZTZXJ2aWNlLnNldEZpcnN0UGFnZUN1cnJlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHJlbmRlciBidXR0b25zIHdoZW4gd2l6YXJkIGlzIG9wZW5lZCwgdG8gYXZvaWQgY2hvY29sYXRlIGVycm9yc1xuICAgIHRoaXMuYnV0dG9uU2VydmljZS5idXR0b25zUmVhZHkgPSB0cnVlO1xuXG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHdpemFyZC4gQ2FsbCB0aGlzIGRpcmVjdGx5IGluc3RlYWQgb2YgYGNhbmNlbCgpYCB0byBpbXBsZW1lbnQgYWx0ZXJuYXRpdmUgY2FuY2VsIGZ1bmN0aW9uYWxpdHkuXG4gICAqL1xuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBvcGVuIGFuZCBjbG9zZSB0aGUgd2l6YXJkLiBCeSBkZWZhdWx0IHRoZSB3aXphcmQgd2lsbFxuICAgKiBjbG9zZSBpZiBpbnZva2VkIHdpdGggbm8gcGFyYW1ldGVyLiBJZiBwYXJhbWV0ZXIgaXMgdHJ1ZSB3aXphcmQgd2lsbCBvcGVuXG4gICAqIGVsc2UgaWYgZmFsc2Ugd2lsbCBjbG9zZS5cbiAgICovXG4gIHB1YmxpYyB0b2dnbGUob3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChvcGVuKSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgd2l6YXJkIHRvIHRoZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5wcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQsIGBuZXh0KClgIGRvZXMgbm90IGV4ZWN1dGUgZXZlbnQgZW1pc3Npb25zLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjb21tb25seSBjYWxsZWQgYXMgcGFydCBvZiBhbiBhbHRlcm5hdGl2ZSBuYXZpZ2F0aW9uXG4gICAqIHdpdGggYFtjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHRdYC4gVGhlIHdpemFyZCB3aWxsIG1vdmUgdG8gdGhlIG5leHQgcGFnZVxuICAgKiByZWdhcmRsZXNzIG9mIHRoZSBzdGF0ZSBvZiBpdHMgY3VycmVudCBwYWdlLiBUaGlzIGlzIHVzZWZ1bCBmb3IgYWx0ZXJuYXRpdmVcbiAgICogbmF2aWdhdGlvbiB3aGVyZSBldmVudCBlbWlzc2lvbnMgaGF2ZSBhbHJlYWR5IGJlZW4gZG9uZSBhbmQgZmlyaW5nIHRoZW0gYWdhaW5cbiAgICogbWF5IGNhdXNlIGFuIGV2ZW50IGxvb3AuXG4gICAqXG4gICAqIElmIGBza2lwQ2hlY2tzQW5kRW1pdHNgIGlzIGZhbHNlLCB0aGUgd2l6YXJkIHdpbGwgZXhlY3V0ZSBkZWZhdWx0IGNoZWNrc1xuICAgKiBhbmQgZW1pdCBldmVudHMgYXMgbm9ybWFsLiBUaGlzIGlzIHVzZWZ1bCBmb3IgY3VzdG9tIGJ1dHRvbnMgb3IgcHJvZ3JhbW1hdGljXG4gICAqIHdvcmtmbG93cyB0aGF0IGFyZSBub3QgZXhlY3V0aW5nIHRoZSB3aXphcmRzIGRlZmF1bHQgY2hlY2tzIGFuZCBlbWlzc2lvbnMuXG4gICAqIEl0IGlzIGFub3RoZXIgd2F5IHRvIG5hdmlnYXRlIHdpdGhvdXQgaGF2aW5nIHRvIHJld3JpdGUgdGhlIHdpemFyZOKAmXMgZGVmYXVsdFxuICAgKiBmdW5jdGlvbmFsaXR5IGZyb20gc2NyYXRjaC5cbiAgICovXG4gIHB1YmxpYyBuZXh0KHNraXBDaGVja3NBbmRFbWl0czogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoc2tpcENoZWNrc0FuZEVtaXRzKSB7XG4gICAgICB0aGlzLmZvcmNlTmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdlNlcnZpY2UubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgd2l6YXJkIHRvIHRoZSBuZXh0IHBhZ2Ugd2l0aG91dCB0aGUgY2hlY2tzIGFuZCBlbWlzc2lvbnMuXG4gICAqIEdvb2QgZm9yIGEgbGFzdCBzdGVwIGluIGFuIGFsdGVybmF0ZSB3b3JrZmxvdy5cbiAgICogQWxpYXMgZm9yIGBDbHJXaXphcmQubmV4dCh0cnVlKWAgb3IgYENscldpemFyZC5uZXh0KClgXG4gICAqL1xuICBwdWJsaWMgZm9yY2VOZXh0KCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5mb3JjZU5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFuZCBjbG9zZXMgdGhlIHdpemFyZC4gRG8gbm90IHVzZSB0aGlzIGZvciBhbiBvdmVycmlkZSBvZiB0aGUgY2FuY2VsXG4gICAqIHRoZSBmdW5jdGlvbmFsaXR5IHdpdGggYFtjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbF1gLCBgW2NscldpemFyZFByZXZlbnRQYWdlRGVmYXVsdENhbmNlbF1gLFxuICAgKiBvciBgW2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdF1gIGJlY2F1c2UgaXQgd2lsbCBpbml0aWF0ZSB0aGUgc2FtZSBjaGVja3NcbiAgICogYW5kIGV2ZW50IGVtaXNzaW9ucyB0aGF0IGludm9rZWQgeW91ciBldmVudCBoYW5kbGVyLiBVc2UgYENscldpemFyZC5jbG9zZSgpYCBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLm5hdlNlcnZpY2UuY2FuY2VsKCk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIGJlaGF2aW9yIG9mIHRoZSB1bmRlcmx5aW5nIG1vZGFsIHRvIGF2b2lkIGNvbGxpc2lvbnMgd2l0aFxuICAgKiBhbHRlcm5hdGl2ZSBjYW5jZWwgZnVuY3Rpb25hbGl0eS4gSW4gbW9zdCBjYXNlcywgdXNlIGBDbHJXaXphcmQuY2FuY2VsKClgIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgbW9kYWxDYW5jZWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xvc2FibGUpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGZvciBhbHRlcm5hdGl2ZSBjYW5jZWwgZmxvd3MgZGVmaW5lZCBhdCB0aGUgY3VycmVudCBwYWdlIG9yXG4gICAqIHdpemFyZCBsZXZlbC4gUGVyZm9ybXMgYSBjYW5jZWxlZCBpZiBub3QuIEVtaXRzIGV2ZW50cyB0aGF0IGluaXRpYXRlXG4gICAqIHRoZSBhbHRlcm5hdGl2ZSBjYW5jZWwgb3V0cHV0cyBgKGNscldpemFyZFBhZ2VPbkNhbmNlbClgIGFuZCBgKGNscldpemFyZE9uQ2FuY2VsKWAuXG4gICAqL1xuICBwdWJsaWMgY2hlY2tBbmRDYW5jZWwoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlSGFzT3ZlcnJpZGVzID0gY3VycmVudFBhZ2Uuc3RvcENhbmNlbCB8fCBjdXJyZW50UGFnZS5wcmV2ZW50RGVmYXVsdDtcblxuICAgIGlmICh0aGlzLnN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2UucGFnZU9uQ2FuY2VsLmVtaXQoKTtcbiAgICBpZiAoIWN1cnJlbnRQYWdlSGFzT3ZlcnJpZGVzKSB7XG4gICAgICB0aGlzLm9uQ2FuY2VsLmVtaXQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc3RvcENhbmNlbCAmJiAhY3VycmVudFBhZ2VIYXNPdmVycmlkZXMpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIGEgZ2l2ZW4gcGFnZSBpbiB0aGUgV2l6YXJkLiBOYXZpZ2F0aW9uIHdpbGwgaW52b2tlIHRoZSB3aXphcmTigJlzIGRlZmF1bHRcbiAgICogY2hlY2tzIGFuZCBldmVudCBlbWlzc2lvbnMuXG4gICAqXG4gICAqIFRoZSBmb3JtYXQgb2YgdGhlIGV4cGVjdGVkIElEIHBhcmFtZXRlciBjYW4gYmUgZm91bmQgaW4gdGhlIHJldHVybiBvZiB0aGVcbiAgICogQ2xyV2l6YXJkUGFnZS5pZCBnZXR0ZXIsIHVzdWFsbHkgcHJlZml4ZWQgd2l0aCBgY2xyLXdpemFyZC1wYWdlLWAgYW5kIHRoZW4gZWl0aGVyIGFcbiAgICogbnVtZXJpYyBJRCBvciB0aGUgSUQgc3BlY2lmaWVkIGZvciB0aGUgYENscldpemFyZFBhZ2VgIGNvbXBvbmVudOKAmXMgYGlkYCBpbnB1dC5cbiAgICovXG4gIHB1YmxpYyBnb1RvKHBhZ2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFwYWdlSWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5hdlNlcnZpY2UuZ29UbyhwYWdlSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHNldHMgYWxsIFdpemFyZFBhZ2VzIHRvIGluY29tcGxldGUgYW5kIHNldHMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIGBDbHJXaXphcmRgIHRvXG4gICAqIGJlIHRoZSBjdXJyZW50IHBhZ2UsIHJlc2V0dGluZyB0aGUgd2l6YXJkIG5hdmlnYXRpb24uXG4gICAqIFVzZSBgKGNscldpemFyZE9uUmVzZXQpYCBldmVudCB0byByZXNldCB0aGUgZGF0YSBvciBtb2RlbCBvZiB5b3VyIHdpemFyZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLnJlc2V0KCk7XG4gICAgdGhpcy5vblJlc2V0Lm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yTmV4dFBhZ2VDaGFuZ2VzKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5tb3ZlZFRvTmV4dFBhZ2UucGlwZShmaWx0ZXIoKCkgPT4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm9uTW92ZU5leHQuZW1pdCgpO1xuICAgICAgdGhpcy53aXphcmRUaXRsZS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclByZXZpb3VzUGFnZUNoYW5nZXMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLm1vdmVkVG9QcmV2aW91c1BhZ2UucGlwZShmaWx0ZXIoKCkgPT4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm9uTW92ZVByZXZpb3VzLmVtaXQoKTtcbiAgICAgIHRoaXMud2l6YXJkVGl0bGUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDYW5jZWxDaGFuZ2VzKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5ub3RpZnlXaXphcmRDYW5jZWwuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tBbmRDYW5jZWwoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckZpbmlzaGVkQ2hhbmdlcygpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkRmluaXNoZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuZW1pdFdpemFyZEZpbmlzaGVkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JQYWdlQ2hhbmdlcygpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2VDaGFuZ2VkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmN1cnJlbnRQYWdlQ2hhbmdlZC5lbWl0KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVOYXZPblBhZ2VDaGFuZ2VzKCk6IHZvaWQge1xuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMucGFnZXMpO1xuICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4gdGhpcy5uYXZTZXJ2aWNlLnVwZGF0ZU5hdmlnYXRpb24oKSk7XG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgoKSA9PiB0aGlzLm5hdlNlcnZpY2UudXBkYXRlTmF2aWdhdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVCdXR0b25zKCk6IHZvaWQge1xuICAgIC8vIE9ubHkgdHJpZ2dlciBidXR0b25zIHJlYWR5IGlmIGRlZmF1bHQgaXMgb3BlbiAoaW5saW5lZClcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbnNSZWFkeSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0V2l6YXJkRmluaXNoZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0b3BOZXh0KSB7XG4gICAgICB0aGlzLmZvcmNlRmluaXNoKCk7XG4gICAgfVxuICAgIHRoaXMud2l6YXJkRmluaXNoZWQuZW1pdCgpO1xuICB9XG59XG4iXX0=