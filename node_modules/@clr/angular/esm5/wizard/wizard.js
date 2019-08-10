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
var ClrWizard = /** @class */ (function () {
    function ClrWizard(platformId, navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
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
    Object.defineProperty(ClrWizard.prototype, "forceForward", {
        get: function () {
            return this._forceForward;
        },
        /**
         * Resets page completed states when navigating backwards.
         * Set using `[clrWizardForceForwardNavigation]` input.
         */
        set: function (value) {
            this._forceForward = !!value;
            this.navService.forceForwardNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "clrWizardOpen", {
        /**
         * Toggles open/close of the wizard component.
         * Set using the `[clrWizardOpen]` input.
         */
        set: function (open) {
            if (open) {
                this.buttonService.buttonsReady = true;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNext", {
        get: function () {
            return this._stopNext;
        },
        /**
         * Prevents ClrWizard from moving to the next page or closing itself on finishing.
         * Set using the `[clrWizardPreventDefaultNext]` input. Note that using stopNext
         * will require you to create your own calls to .next() and .finish() in your
         * host component to make the ClrWizard work as expected.
         */
        set: function (value) {
            this._stopNext = !!value;
            this.navService.wizardHasAltNext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopCancel", {
        get: function () {
            return this._stopCancel;
        },
        /**
         * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
         * Set using the `[clrWizardPreventDefaultCancel]` input.
         *
         * Note that using stopCancel will require you to create your own calls to `close()` in your host compone`nt
         * to make the ClrWizard work as expected. Useful for doing checks or prompts
         * before closing a ClrWizard.
         */
        set: function (value) {
            this._stopCancel = !!value;
            this.navService.wizardHasAltCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNavigation", {
        get: function () {
            return this._stopNavigation;
        },
        /**
         * Prevents ClrWizard from performing any form of navigation away from the current
         * page. Set using the `[clrWizardPreventNavigation]` input.
         * Note that stopNavigation is meant to freeze the wizard in place, typically
         * during a long validation or background action where you want the wizard to
         * display loading content but not allow the user to execute navigation in
         * the stepnav, close X, or the  back, finish, or next buttons.
         */
        set: function (value) {
            this._stopNavigation = !!value;
            this.navService.wizardStopNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "disableStepnav", {
        get: function () {
            return this._disableStepnav;
        },
        /**
         * Prevents clicks on the links in the stepnav from working.
         * Set using `[clrWizardDisableStepnav]` input.
         * A more granular bypassing of navigation which can be useful when your
         * ClrWizard is in a state of completion and you don't want users to be
         * able to jump backwards and change things.
         */
        set: function (value) {
            this._disableStepnav = !!value;
            this.navService.wizardDisableStepnav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopModalAnimations", {
        get: function () {
            return this._stopModalAnimations ? 'true' : 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "currentPage", {
        get: function () {
            return this.navService.currentPage;
        },
        set: function (page) {
            this.navService.goTo(page, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isLast", {
        get: function () {
            return this.navService.currentPageIsLast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isFirst", {
        get: function () {
            return this.navService.currentPageIsFirst;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isStatic", {
        get: function () {
            return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
        },
        enumerable: true,
        configurable: true
    });
    ClrWizard.prototype.ngAfterContentInit = function () {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        this.initializeButtons();
    };
    ClrWizard.prototype.ngDoCheck = function () {
        this.updateNavOnPageChanges();
    };
    ClrWizard.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
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
    ClrWizard.prototype.finish = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    };
    /**
     * Marks the wizard as finished but does run checks and emissions.
     * Good for a last step in an alternate workflow. Does the same thing as
     * calling `ClrWizard.finish(true)` or `ClrWizard.finish()` without a parameter.
     */
    ClrWizard.prototype.forceFinish = function () {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    };
    /**
     * Opens the wizard. If there is no current page defined, sets the first page in the wizard to be current.
     */
    ClrWizard.prototype.open = function () {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    };
    /**
     * Closes the wizard. Call this directly instead of `cancel()` to implement alternative cancel functionality.
     */
    ClrWizard.prototype.close = function () {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    };
    /**
     * Used to open and close the wizard. By default the wizard will
     * close if invoked with no parameter. If parameter is true wizard will open
     * else if false will close.
     */
    ClrWizard.prototype.toggle = function (open) {
        if (open) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * Moves the wizard to the previous page.
     */
    ClrWizard.prototype.previous = function () {
        this.navService.previous();
    };
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
    ClrWizard.prototype.next = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    };
    /**
     * Moves the wizard to the next page without the checks and emissions.
     * Good for a last step in an alternate workflow.
     * Alias for `ClrWizard.next(true)` or `ClrWizard.next()`
     */
    ClrWizard.prototype.forceNext = function () {
        this.navService.forceNext();
    };
    /**
     * Cancels and closes the wizard. Do not use this for an override of the cancel
     * the functionality with `[clrWizardPreventDefaultCancel]`, `[clrWizardPreventPageDefaultCancel]`,
     * or `[clrWizardPagePreventDefault]` because it will initiate the same checks
     * and event emissions that invoked your event handler. Use `ClrWizard.close()` instead.
     */
    ClrWizard.prototype.cancel = function () {
        this.navService.cancel();
    };
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality. In most cases, use `ClrWizard.cancel()` instead.
     */
    ClrWizard.prototype.modalCancel = function () {
        if (this.closable) {
            this.checkAndCancel();
        }
    };
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs `(clrWizardPageOnCancel)` and `(clrWizardOnCancel)`.
     */
    ClrWizard.prototype.checkAndCancel = function () {
        var currentPage = this.currentPage;
        var currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
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
    };
    /**
     * Navigates to a given page in the Wizard. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with `clr-wizard-page-` and then either a
     * numeric ID or the ID specified for the `ClrWizardPage` component’s `id` input.
     */
    ClrWizard.prototype.goTo = function (pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    };
    /**
     * Reset sets all WizardPages to incomplete and sets the first page in the `ClrWizard` to
     * be the current page, resetting the wizard navigation.
     * Use `(clrWizardOnReset)` event to reset the data or model of your wizard.
     */
    ClrWizard.prototype.reset = function () {
        this.pageCollection.reset();
        this.onReset.next();
    };
    ClrWizard.prototype.listenForNextPageChanges = function () {
        var _this = this;
        return this.navService.movedToNextPage.pipe(filter(function () { return isPlatformBrowser(_this.platformId); })).subscribe(function () {
            _this.onMoveNext.emit();
            _this.wizardTitle.nativeElement.focus();
        });
    };
    ClrWizard.prototype.listenForPreviousPageChanges = function () {
        var _this = this;
        return this.navService.movedToPreviousPage.pipe(filter(function () { return isPlatformBrowser(_this.platformId); })).subscribe(function () {
            _this.onMovePrevious.emit();
            _this.wizardTitle.nativeElement.focus();
        });
    };
    ClrWizard.prototype.listenForCancelChanges = function () {
        var _this = this;
        return this.navService.notifyWizardCancel.subscribe(function () { return _this.checkAndCancel(); });
    };
    ClrWizard.prototype.listenForFinishedChanges = function () {
        var _this = this;
        return this.navService.wizardFinished.subscribe(function () { return _this.emitWizardFinished(); });
    };
    ClrWizard.prototype.listenForPageChanges = function () {
        var _this = this;
        return this.navService.currentPageChanged.subscribe(function () { return _this.currentPageChanged.emit(); });
    };
    ClrWizard.prototype.updateNavOnPageChanges = function () {
        var _this = this;
        var changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(function () { return _this.navService.updateNavigation(); });
            changes.forEachRemovedItem(function () { return _this.navService.updateNavigation(); });
        }
    };
    ClrWizard.prototype.initializeButtons = function () {
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    };
    ClrWizard.prototype.emitWizardFinished = function () {
        if (!this.stopNext) {
            this.forceFinish();
        }
        this.wizardFinished.emit();
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
    return ClrWizard;
}());
export { ClrWizard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3dpemFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztFQUlFOztBQUVGLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYzlDO0lBK0xFLG1CQUMrQixVQUFrQixFQUN4QyxVQUFtQyxFQUNuQyxjQUFxQyxFQUNyQyxhQUErQixFQUMvQixtQkFBd0MsRUFDdkMsVUFBc0IsRUFDOUIsT0FBd0I7UUFOSyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3hDLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQUNyQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBcE1oQzs7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Qix1QkFBdUI7WUFDbkIscUJBQXFCO1lBQ3RCLGdCQUFnQjtZQUNWLG1CQUFtQjtZQUMzQixVQUFVO1lBQ3JCLGVBQWU7T0F0TWYsU0FBUyxDQW1jckI7SUFBRCxnQkFBQztDQUFBLEFBbmNELElBbWNDO1NBbmNZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBCdXR0b25IdWJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYnV0dG9uLWh1Yi5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlckFjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9oZWFkZXItYWN0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRIZWFkZXJBY3Rpb24gfSBmcm9tICcuL3dpemFyZC1oZWFkZXItYWN0aW9uJztcbmltcG9ydCB7IENscldpemFyZFBhZ2UgfSBmcm9tICcuL3dpemFyZC1wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXdpemFyZCcsXG4gIHByb3ZpZGVyczogW1dpemFyZE5hdmlnYXRpb25TZXJ2aWNlLCBQYWdlQ29sbGVjdGlvblNlcnZpY2UsIEJ1dHRvbkh1YlNlcnZpY2UsIEhlYWRlckFjdGlvblNlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vd2l6YXJkLmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItd2l6YXJkXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLndpemFyZC1tZF0nOiBcInNpemUgPT0gJ21kJ1wiLFxuICAgICdbY2xhc3Mud2l6YXJkLWxnXSc6IFwic2l6ZSA9PSAnbGcnXCIsXG4gICAgJ1tjbGFzcy53aXphcmQteGxdJzogXCJzaXplID09ICd4bCdcIixcbiAgICAnW2NsYXNzLmxhc3RQYWdlXSc6ICduYXZTZXJ2aWNlLmN1cnJlbnRQYWdlSXNMYXN0JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBEb0NoZWNrIHtcbiAgLyoqXG4gICAqIFNldCB0aGUgbW9kYWwgc2l6ZSBvZiB0aGUgd2l6YXJkLiBTZXQgdXNpbmcgYFtjbHJXaXphcmRTaXplXWAgaW5wdXQuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFNpemUnKSBzaXplID0gJ3hsJztcblxuICAvKipcbiAgICogVGVsbHMgdGhlIG1vZGFsIHBhcnQgb2YgdGhlIHdpemFyZCB3aGV0aGVyIGl0IHNob3VsZCBoYXZlIGEgY2xvc2UgXCJYXCJcbiAgICogaW4gdGhlIHRvcCByaWdodCBjb3JuZXIuIFNldCB1c2luZyBgW2NscldpemFyZENsb3NhYmxlXWAgaW5wdXQuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZENsb3NhYmxlJykgY2xvc2FibGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBSZXNldHMgcGFnZSBjb21wbGV0ZWQgc3RhdGVzIHdoZW4gbmF2aWdhdGluZyBiYWNrd2FyZHMuXG4gICAqIFNldCB1c2luZyBgW2NscldpemFyZEZvcmNlRm9yd2FyZE5hdmlnYXRpb25dYCBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkRm9yY2VGb3J3YXJkTmF2aWdhdGlvbicpXG4gIHNldCBmb3JjZUZvcndhcmQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mb3JjZUZvcndhcmQgPSAhIXZhbHVlO1xuICAgIHRoaXMubmF2U2VydmljZS5mb3JjZUZvcndhcmROYXZpZ2F0aW9uID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfZm9yY2VGb3J3YXJkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBmb3JjZUZvcndhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvcmNlRm9yd2FyZDtcbiAgfVxuXG4gIF9vcGVuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBUb2dnbGVzIG9wZW4vY2xvc2Ugb2YgdGhlIHdpemFyZCBjb21wb25lbnQuXG4gICAqIFNldCB1c2luZyB0aGUgYFtjbHJXaXphcmRPcGVuXWAgaW5wdXQuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZE9wZW4nKVxuICBzZXQgY2xyV2l6YXJkT3BlbihvcGVuOiBib29sZWFuKSB7XG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIHRoaXMuYnV0dG9uU2VydmljZS5idXR0b25zUmVhZHkgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9vcGVuID0gb3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBDbHJXaXphcmQgZnJvbSBtb3ZpbmcgdG8gdGhlIG5leHQgcGFnZSBvciBjbG9zaW5nIGl0c2VsZiBvbiBmaW5pc2hpbmcuXG4gICAqIFNldCB1c2luZyB0aGUgYFtjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHRdYCBpbnB1dC4gTm90ZSB0aGF0IHVzaW5nIHN0b3BOZXh0XG4gICAqIHdpbGwgcmVxdWlyZSB5b3UgdG8gY3JlYXRlIHlvdXIgb3duIGNhbGxzIHRvIC5uZXh0KCkgYW5kIC5maW5pc2goKSBpbiB5b3VyXG4gICAqIGhvc3QgY29tcG9uZW50IHRvIG1ha2UgdGhlIENscldpemFyZCB3b3JrIGFzIGV4cGVjdGVkLlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQnKVxuICBzZXQgc3RvcE5leHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdG9wTmV4dCA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLndpemFyZEhhc0FsdE5leHQgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zdG9wTmV4dDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc3RvcE5leHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BOZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIENscldpemFyZCBmcm9tIGNsb3Npbmcgd2hlbiB0aGUgY2FuY2VsIGJ1dHRvbiBvciBjbG9zZSBcIlhcIiBpcyBjbGlja2VkLlxuICAgKiBTZXQgdXNpbmcgdGhlIGBbY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWxdYCBpbnB1dC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHVzaW5nIHN0b3BDYW5jZWwgd2lsbCByZXF1aXJlIHlvdSB0byBjcmVhdGUgeW91ciBvd24gY2FsbHMgdG8gYGNsb3NlKClgIGluIHlvdXIgaG9zdCBjb21wb25lYG50XG4gICAqIHRvIG1ha2UgdGhlIENscldpemFyZCB3b3JrIGFzIGV4cGVjdGVkLiBVc2VmdWwgZm9yIGRvaW5nIGNoZWNrcyBvciBwcm9tcHRzXG4gICAqIGJlZm9yZSBjbG9zaW5nIGEgQ2xyV2l6YXJkLlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQcmV2ZW50RGVmYXVsdENhbmNlbCcpXG4gIHNldCBzdG9wQ2FuY2VsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RvcENhbmNlbCA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLndpemFyZEhhc0FsdENhbmNlbCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3N0b3BDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHN0b3BDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BDYW5jZWw7XG4gIH1cblxuICAvKipcbiAgICogUHJldmVudHMgQ2xyV2l6YXJkIGZyb20gcGVyZm9ybWluZyBhbnkgZm9ybSBvZiBuYXZpZ2F0aW9uIGF3YXkgZnJvbSB0aGUgY3VycmVudFxuICAgKiBwYWdlLiBTZXQgdXNpbmcgdGhlIGBbY2xyV2l6YXJkUHJldmVudE5hdmlnYXRpb25dYCBpbnB1dC5cbiAgICogTm90ZSB0aGF0IHN0b3BOYXZpZ2F0aW9uIGlzIG1lYW50IHRvIGZyZWV6ZSB0aGUgd2l6YXJkIGluIHBsYWNlLCB0eXBpY2FsbHlcbiAgICogZHVyaW5nIGEgbG9uZyB2YWxpZGF0aW9uIG9yIGJhY2tncm91bmQgYWN0aW9uIHdoZXJlIHlvdSB3YW50IHRoZSB3aXphcmQgdG9cbiAgICogZGlzcGxheSBsb2FkaW5nIGNvbnRlbnQgYnV0IG5vdCBhbGxvdyB0aGUgdXNlciB0byBleGVjdXRlIG5hdmlnYXRpb24gaW5cbiAgICogdGhlIHN0ZXBuYXYsIGNsb3NlIFgsIG9yIHRoZSAgYmFjaywgZmluaXNoLCBvciBuZXh0IGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFByZXZlbnROYXZpZ2F0aW9uJylcbiAgc2V0IHN0b3BOYXZpZ2F0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RvcE5hdmlnYXRpb24gPSAhIXZhbHVlO1xuICAgIHRoaXMubmF2U2VydmljZS53aXphcmRTdG9wTmF2aWdhdGlvbiA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3N0b3BOYXZpZ2F0aW9uID0gZmFsc2U7XG4gIGdldCBzdG9wTmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcE5hdmlnYXRpb247XG4gIH1cblxuICAvKipcbiAgICogUHJldmVudHMgY2xpY2tzIG9uIHRoZSBsaW5rcyBpbiB0aGUgc3RlcG5hdiBmcm9tIHdvcmtpbmcuXG4gICAqIFNldCB1c2luZyBgW2NscldpemFyZERpc2FibGVTdGVwbmF2XWAgaW5wdXQuXG4gICAqIEEgbW9yZSBncmFudWxhciBieXBhc3Npbmcgb2YgbmF2aWdhdGlvbiB3aGljaCBjYW4gYmUgdXNlZnVsIHdoZW4geW91clxuICAgKiBDbHJXaXphcmQgaXMgaW4gYSBzdGF0ZSBvZiBjb21wbGV0aW9uIGFuZCB5b3UgZG9uJ3Qgd2FudCB1c2VycyB0byBiZVxuICAgKiBhYmxlIHRvIGp1bXAgYmFja3dhcmRzIGFuZCBjaGFuZ2UgdGhpbmdzLlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmREaXNhYmxlU3RlcG5hdicpXG4gIHNldCBkaXNhYmxlU3RlcG5hdih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVTdGVwbmF2ID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkRGlzYWJsZVN0ZXBuYXYgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlU3RlcG5hdjogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZVN0ZXBuYXYoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVTdGVwbmF2O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY29tbXVuaWNhdGUgdG8gdGhlIHVuZGVybHlpbmcgbW9kYWwgdGhhdCBhbmltYXRpb25zIGFyZSBub3RcbiAgICogd2FudGVkLiBQcmltYXJ5IHVzZSBpcyBmb3IgdGhlIGRpc3BsYXkgb2Ygc3RhdGljL2lubGluZSB3aXphcmRzLlxuICAgKiBTZXQgdXNpbmcgYFtjbHJXaXphcmRQcmV2ZW50TW9kYWxBbmltYXRpb25dYCBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUHJldmVudE1vZGFsQW5pbWF0aW9uJykgX3N0b3BNb2RhbEFuaW1hdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHN0b3BNb2RhbEFuaW1hdGlvbnMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcE1vZGFsQW5pbWF0aW9ucyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIGlzIG9wZW5lZCBvciBjbG9zZWQuXG4gICAqIExpc3RlbiB2aWEgYChjbHJXaXphcmRPcGVuQ2hhbmdlKWAgZXZlbnQuXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPcGVuQ2hhbmdlJykgX29wZW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIGlzIGNhbmNlbGVkLiBMaXN0ZW4gdmlhIGAoY2xyV2l6YXJkT25DYW5jZWwpYCBldmVudC5cbiAgICogQ2FuIGJlIGNvbWJpbmVkIHdpdGggdGhlIGBbY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWxdYCBpbnB1dCB0byBjcmVhdGVcbiAgICogd2l6YXJkLWxldmVsIGN1c3RvbSBjYW5jZWwgcm91dGluZXMuXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPbkNhbmNlbCcpIG9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHdpemFyZCBpcyBjb21wbGV0ZWQuIExpc3RlbiB2aWEgYChjbHJXaXphcmRPbkZpbmlzaClgIGV2ZW50LlxuICAgKiBDYW4gYmUgY29tYmluZWQgd2l0aCB0aGUgYFtjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHRdYCBpbnB1dCB0byBjcmVhdGVcbiAgICogd2l6YXJkLWxldmVsIGN1c3RvbSBjb21wbGV0aW9uIHJvdXRpbmVzLlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkT25GaW5pc2gnKSB3aXphcmRGaW5pc2hlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgaXMgcmVzZXQuIExpc3RlbiB2aWEgYChjbHJXaXphcmRPblJlc2V0KWAgZXZlbnQuXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPblJlc2V0Jykgb25SZXNldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50IHBhZ2UgaGFzIGNoYW5nZWQuIExpc3RlbiB2aWEgYChjbHJXaXphcmRDdXJyZW50UGFnZUNoYW5nZWQpYCBldmVudC5cbiAgICogb3V0cHV0LiBVc2VmdWwgZm9yIG5vbi1ibG9ja2luZyB2YWxpZGF0aW9uLlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkQ3VycmVudFBhZ2VDaGFuZ2VkJykgY3VycmVudFBhZ2VDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHdpemFyZCBtb3ZlcyB0byB0aGUgbmV4dCBwYWdlLiBMaXN0ZW4gdmlhIGAoY2xyV2l6YXJkT25OZXh0KWAgZXZlbnQuXG4gICAqIENhbiBiZSBjb21iaW5lZCB3aXRoIHRoZSBgW2NscldpemFyZFByZXZlbnREZWZhdWx0TmV4dF1gIGlucHV0IHRvIGNyZWF0ZVxuICAgKiB3aXphcmQtbGV2ZWwgY3VzdG9tIG5hdmlnYXRpb24gcm91dGluZXMsIHdoaWNoIGFyZSB1c2VmdWwgZm9yIHZhbGlkYXRpb24uXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPbk5leHQnKSBvbk1vdmVOZXh0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHdpemFyZCBtb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZS4gQ2FuIGJlIHVzZWZ1bCBmb3IgdmFsaWRhdGlvbi5cbiAgICogTGlzdGVuIHZpYSBgKGNscldpemFyZE9uUHJldmlvdXMpYCBldmVudC5cbiAgICovXG5cbiAgQE91dHB1dCgnY2xyV2l6YXJkT25QcmV2aW91cycpIG9uTW92ZVByZXZpb3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJXaXphcmRQYWdlKSBwYWdlczogUXVlcnlMaXN0PENscldpemFyZFBhZ2U+O1xuICBAQ29udGVudENoaWxkcmVuKENscldpemFyZEhlYWRlckFjdGlvbikgaGVhZGVyQWN0aW9uczogUXVlcnlMaXN0PENscldpemFyZEhlYWRlckFjdGlvbj47XG4gIEBWaWV3Q2hpbGQoJ3dpemFyZFRpdGxlJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHdpemFyZFRpdGxlOiBFbGVtZW50UmVmO1xuXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY3VycmVudFBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIHRoaXMubmF2U2VydmljZS5nb1RvKHBhZ2UsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0xhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZUlzTGFzdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNGaXJzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlSXNGaXJzdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTdGF0aWMoKSB7XG4gICAgcmV0dXJuICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHItd2l6YXJkLS1pbmxpbmUnKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlmZmVyOiBhbnk7IC8vIGZvciBtYXJraW5nIHdoZW4gdGhlIGNvbGxlY3Rpb24gb2Ygd2l6YXJkIHBhZ2VzIGhhcyBiZWVuIGFkZGVkIHRvIG9yIGRlbGV0ZWQgZnJvbVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHVibGljIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBwYWdlQ29sbGVjdGlvbjogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBidXR0b25TZXJ2aWNlOiBCdXR0b25IdWJTZXJ2aWNlLFxuICAgIHB1YmxpYyBoZWFkZXJBY3Rpb25TZXJ2aWNlOiBIZWFkZXJBY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnNcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmxpc3RlbkZvck5leHRQYWdlQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JQcmV2aW91c1BhZ2VDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvckNhbmNlbENoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yRmluaXNoZWRDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvclBhZ2VDaGFuZ2VzKClcbiAgICApO1xuXG4gICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5wYWdlcyA9IHRoaXMucGFnZXM7XG4gICAgdGhpcy5oZWFkZXJBY3Rpb25TZXJ2aWNlLndpemFyZEhlYWRlckFjdGlvbnMgPSB0aGlzLmhlYWRlckFjdGlvbnM7XG4gICAgdGhpcy5pbml0aWFsaXplQnV0dG9ucygpO1xuICB9XG5cbiAgcHVibGljIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLnVwZGF0ZU5hdk9uUGFnZUNoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKipcbiAgICogTWFya3MgV2l6YXJkIGFzIGZpbmlzaGVkLiBCeSBkZWZhdWx0IGl0IGRvZXMgbm90IGV4ZWN1dGUgZXZlbnRcbiAgICogZW1pc3Npb25zIG9yIGNoZWNrcyBiZWZvcmUgY29tcGxldGluZyBhbmQgY2xvc2luZy4gVGhpcyBtZXRob2QgaXMgY29tbW9ubHlcbiAgICogdXNlZCBhcyBwYXJ0IG9mIGFuIGFsdGVybmF0aXZlIG5hdmlnYXRpb24gd2l0aCBgW2NscldpemFyZFByZXZlbnREZWZhdWx0TmV4dF1gLlxuICAgKlxuICAgKiBJZiBgc2tpcENoZWNrc0FuZEVtaXRzYCBpcyB0cnVlLCB0aGUgd2l6YXJkIHdpbGwgY29tcGxldGUgYW5kIGNsb3NlXG4gICAqIHJlZ2FyZGxlc3Mgb2YgdGhlIHN0YXRlIG9mIGl0cyBjdXJyZW50IHBhZ2UuIFRoaXMgaXMgdXNlZnVsIGZvciBhbHRlcm5hdGl2ZVxuICAgKiBuYXZpZ2F0aW9uIHdoZXJlIGV2ZW50IGVtaXNzaW9ucyBoYXZlIGFscmVhZHkgYmVlbiBkb25lIGFuZCBmaXJpbmcgdGhlbSBhZ2FpblxuICAgKiBtYXkgY2F1c2UgYW4gZXZlbnQgbG9vcC5cbiAgICovXG4gIHB1YmxpYyBmaW5pc2goc2tpcENoZWNrc0FuZEVtaXRzID0gdHJ1ZSkge1xuICAgIGlmIChza2lwQ2hlY2tzQW5kRW1pdHMpIHtcbiAgICAgIHRoaXMuZm9yY2VGaW5pc2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZTZXJ2aWNlLmZpbmlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyB0aGUgd2l6YXJkIGFzIGZpbmlzaGVkIGJ1dCBkb2VzIHJ1biBjaGVja3MgYW5kIGVtaXNzaW9ucy5cbiAgICogR29vZCBmb3IgYSBsYXN0IHN0ZXAgaW4gYW4gYWx0ZXJuYXRlIHdvcmtmbG93LiBEb2VzIHRoZSBzYW1lIHRoaW5nIGFzXG4gICAqIGNhbGxpbmcgYENscldpemFyZC5maW5pc2godHJ1ZSlgIG9yIGBDbHJXaXphcmQuZmluaXNoKClgIHdpdGhvdXQgYSBwYXJhbWV0ZXIuXG4gICAqL1xuICBwdWJsaWMgZm9yY2VGaW5pc2goKSB7XG4gICAgaWYgKHRoaXMuc3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHdpemFyZC4gSWYgdGhlcmUgaXMgbm8gY3VycmVudCBwYWdlIGRlZmluZWQsIHNldHMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIHdpemFyZCB0byBiZSBjdXJyZW50LlxuICAgKi9cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIHRoaXMubmF2U2VydmljZS5zZXRGaXJzdFBhZ2VDdXJyZW50KCk7XG4gICAgfVxuXG4gICAgLy8gT25seSByZW5kZXIgYnV0dG9ucyB3aGVuIHdpemFyZCBpcyBvcGVuZWQsIHRvIGF2b2lkIGNob2NvbGF0ZSBlcnJvcnNcbiAgICB0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uc1JlYWR5ID0gdHJ1ZTtcblxuICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSB3aXphcmQuIENhbGwgdGhpcyBkaXJlY3RseSBpbnN0ZWFkIG9mIGBjYW5jZWwoKWAgdG8gaW1wbGVtZW50IGFsdGVybmF0aXZlIGNhbmNlbCBmdW5jdGlvbmFsaXR5LlxuICAgKi9cbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gb3BlbiBhbmQgY2xvc2UgdGhlIHdpemFyZC4gQnkgZGVmYXVsdCB0aGUgd2l6YXJkIHdpbGxcbiAgICogY2xvc2UgaWYgaW52b2tlZCB3aXRoIG5vIHBhcmFtZXRlci4gSWYgcGFyYW1ldGVyIGlzIHRydWUgd2l6YXJkIHdpbGwgb3BlblxuICAgKiBlbHNlIGlmIGZhbHNlIHdpbGwgY2xvc2UuXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKG9wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAob3Blbikge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIHdpemFyZCB0byB0aGUgcHJldmlvdXMgcGFnZS5cbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLm5hdlNlcnZpY2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0LCBgbmV4dCgpYCBkb2VzIG5vdCBleGVjdXRlIGV2ZW50IGVtaXNzaW9ucy5cbiAgICogVGhpcyBtZXRob2QgaXMgY29tbW9ubHkgY2FsbGVkIGFzIHBhcnQgb2YgYW4gYWx0ZXJuYXRpdmUgbmF2aWdhdGlvblxuICAgKiB3aXRoIGBbY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0XWAuIFRoZSB3aXphcmQgd2lsbCBtb3ZlIHRvIHRoZSBuZXh0IHBhZ2VcbiAgICogcmVnYXJkbGVzcyBvZiB0aGUgc3RhdGUgb2YgaXRzIGN1cnJlbnQgcGFnZS4gVGhpcyBpcyB1c2VmdWwgZm9yIGFsdGVybmF0aXZlXG4gICAqIG5hdmlnYXRpb24gd2hlcmUgZXZlbnQgZW1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGRvbmUgYW5kIGZpcmluZyB0aGVtIGFnYWluXG4gICAqIG1heSBjYXVzZSBhbiBldmVudCBsb29wLlxuICAgKlxuICAgKiBJZiBgc2tpcENoZWNrc0FuZEVtaXRzYCBpcyBmYWxzZSwgdGhlIHdpemFyZCB3aWxsIGV4ZWN1dGUgZGVmYXVsdCBjaGVja3NcbiAgICogYW5kIGVtaXQgZXZlbnRzIGFzIG5vcm1hbC4gVGhpcyBpcyB1c2VmdWwgZm9yIGN1c3RvbSBidXR0b25zIG9yIHByb2dyYW1tYXRpY1xuICAgKiB3b3JrZmxvd3MgdGhhdCBhcmUgbm90IGV4ZWN1dGluZyB0aGUgd2l6YXJkcyBkZWZhdWx0IGNoZWNrcyBhbmQgZW1pc3Npb25zLlxuICAgKiBJdCBpcyBhbm90aGVyIHdheSB0byBuYXZpZ2F0ZSB3aXRob3V0IGhhdmluZyB0byByZXdyaXRlIHRoZSB3aXphcmTigJlzIGRlZmF1bHRcbiAgICogZnVuY3Rpb25hbGl0eSBmcm9tIHNjcmF0Y2guXG4gICAqL1xuICBwdWJsaWMgbmV4dChza2lwQ2hlY2tzQW5kRW1pdHM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKHNraXBDaGVja3NBbmRFbWl0cykge1xuICAgICAgdGhpcy5mb3JjZU5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZTZXJ2aWNlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIHdpemFyZCB0byB0aGUgbmV4dCBwYWdlIHdpdGhvdXQgdGhlIGNoZWNrcyBhbmQgZW1pc3Npb25zLlxuICAgKiBHb29kIGZvciBhIGxhc3Qgc3RlcCBpbiBhbiBhbHRlcm5hdGUgd29ya2Zsb3cuXG4gICAqIEFsaWFzIGZvciBgQ2xyV2l6YXJkLm5leHQodHJ1ZSlgIG9yIGBDbHJXaXphcmQubmV4dCgpYFxuICAgKi9cbiAgcHVibGljIGZvcmNlTmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLm5hdlNlcnZpY2UuZm9yY2VOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBhbmQgY2xvc2VzIHRoZSB3aXphcmQuIERvIG5vdCB1c2UgdGhpcyBmb3IgYW4gb3ZlcnJpZGUgb2YgdGhlIGNhbmNlbFxuICAgKiB0aGUgZnVuY3Rpb25hbGl0eSB3aXRoIGBbY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWxdYCwgYFtjbHJXaXphcmRQcmV2ZW50UGFnZURlZmF1bHRDYW5jZWxdYCxcbiAgICogb3IgYFtjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHRdYCBiZWNhdXNlIGl0IHdpbGwgaW5pdGlhdGUgdGhlIHNhbWUgY2hlY2tzXG4gICAqIGFuZCBldmVudCBlbWlzc2lvbnMgdGhhdCBpbnZva2VkIHlvdXIgZXZlbnQgaGFuZGxlci4gVXNlIGBDbHJXaXphcmQuY2xvc2UoKWAgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmNhbmNlbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBiZWhhdmlvciBvZiB0aGUgdW5kZXJseWluZyBtb2RhbCB0byBhdm9pZCBjb2xsaXNpb25zIHdpdGhcbiAgICogYWx0ZXJuYXRpdmUgY2FuY2VsIGZ1bmN0aW9uYWxpdHkuIEluIG1vc3QgY2FzZXMsIHVzZSBgQ2xyV2l6YXJkLmNhbmNlbCgpYCBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIG1vZGFsQ2FuY2VsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsb3NhYmxlKSB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ2FuY2VsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgYWx0ZXJuYXRpdmUgY2FuY2VsIGZsb3dzIGRlZmluZWQgYXQgdGhlIGN1cnJlbnQgcGFnZSBvclxuICAgKiB3aXphcmQgbGV2ZWwuIFBlcmZvcm1zIGEgY2FuY2VsZWQgaWYgbm90LiBFbWl0cyBldmVudHMgdGhhdCBpbml0aWF0ZVxuICAgKiB0aGUgYWx0ZXJuYXRpdmUgY2FuY2VsIG91dHB1dHMgYChjbHJXaXphcmRQYWdlT25DYW5jZWwpYCBhbmQgYChjbHJXaXphcmRPbkNhbmNlbClgLlxuICAgKi9cbiAgcHVibGljIGNoZWNrQW5kQ2FuY2VsKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICBjb25zdCBjdXJyZW50UGFnZUhhc092ZXJyaWRlcyA9IGN1cnJlbnRQYWdlLnN0b3BDYW5jZWwgfHwgY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQ7XG5cbiAgICBpZiAodGhpcy5zdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlLnBhZ2VPbkNhbmNlbC5lbWl0KCk7XG4gICAgaWYgKCFjdXJyZW50UGFnZUhhc092ZXJyaWRlcykge1xuICAgICAgdGhpcy5vbkNhbmNlbC5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN0b3BDYW5jZWwgJiYgIWN1cnJlbnRQYWdlSGFzT3ZlcnJpZGVzKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byBhIGdpdmVuIHBhZ2UgaW4gdGhlIFdpemFyZC4gTmF2aWdhdGlvbiB3aWxsIGludm9rZSB0aGUgd2l6YXJk4oCZcyBkZWZhdWx0XG4gICAqIGNoZWNrcyBhbmQgZXZlbnQgZW1pc3Npb25zLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBleHBlY3RlZCBJRCBwYXJhbWV0ZXIgY2FuIGJlIGZvdW5kIGluIHRoZSByZXR1cm4gb2YgdGhlXG4gICAqIENscldpemFyZFBhZ2UuaWQgZ2V0dGVyLCB1c3VhbGx5IHByZWZpeGVkIHdpdGggYGNsci13aXphcmQtcGFnZS1gIGFuZCB0aGVuIGVpdGhlciBhXG4gICAqIG51bWVyaWMgSUQgb3IgdGhlIElEIHNwZWNpZmllZCBmb3IgdGhlIGBDbHJXaXphcmRQYWdlYCBjb21wb25lbnTigJlzIGBpZGAgaW5wdXQuXG4gICAqL1xuICBwdWJsaWMgZ29UbyhwYWdlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghcGFnZUlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uYXZTZXJ2aWNlLmdvVG8ocGFnZUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBzZXRzIGFsbCBXaXphcmRQYWdlcyB0byBpbmNvbXBsZXRlIGFuZCBzZXRzIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBgQ2xyV2l6YXJkYCB0b1xuICAgKiBiZSB0aGUgY3VycmVudCBwYWdlLCByZXNldHRpbmcgdGhlIHdpemFyZCBuYXZpZ2F0aW9uLlxuICAgKiBVc2UgYChjbHJXaXphcmRPblJlc2V0KWAgZXZlbnQgdG8gcmVzZXQgdGhlIGRhdGEgb3IgbW9kZWwgb2YgeW91ciB3aXphcmQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5yZXNldCgpO1xuICAgIHRoaXMub25SZXNldC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvck5leHRQYWdlQ2hhbmdlcygpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UubW92ZWRUb05leHRQYWdlLnBpcGUoZmlsdGVyKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vbk1vdmVOZXh0LmVtaXQoKTtcbiAgICAgIHRoaXMud2l6YXJkVGl0bGUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JQcmV2aW91c1BhZ2VDaGFuZ2VzKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5tb3ZlZFRvUHJldmlvdXNQYWdlLnBpcGUoZmlsdGVyKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vbk1vdmVQcmV2aW91cy5lbWl0KCk7XG4gICAgICB0aGlzLndpemFyZFRpdGxlLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yQ2FuY2VsQ2hhbmdlcygpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2Uubm90aWZ5V2l6YXJkQ2FuY2VsLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrQW5kQ2FuY2VsKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JGaW5pc2hlZENoYW5nZXMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLndpemFyZEZpbmlzaGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmVtaXRXaXphcmRGaW5pc2hlZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yUGFnZUNoYW5nZXMoKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQuZW1pdCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTmF2T25QYWdlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLnBhZ2VzKTtcbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKCgpID0+IHRoaXMubmF2U2VydmljZS51cGRhdGVOYXZpZ2F0aW9uKCkpO1xuICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4gdGhpcy5uYXZTZXJ2aWNlLnVwZGF0ZU5hdmlnYXRpb24oKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplQnV0dG9ucygpOiB2b2lkIHtcbiAgICAvLyBPbmx5IHRyaWdnZXIgYnV0dG9ucyByZWFkeSBpZiBkZWZhdWx0IGlzIG9wZW4gKGlubGluZWQpXG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuYnV0dG9uU2VydmljZS5idXR0b25zUmVhZHkgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdFdpemFyZEZpbmlzaGVkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdG9wTmV4dCkge1xuICAgICAgdGhpcy5mb3JjZUZpbmlzaCgpO1xuICAgIH1cbiAgICB0aGlzLndpemFyZEZpbmlzaGVkLmVtaXQoKTtcbiAgfVxufVxuIl19