import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
import { MultiAlertService } from './providers/multi-alert.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export declare class ClrAlert {
    iconService: AlertIconAndTypesService;
    cdr: ChangeDetectorRef;
    multiAlertService: MultiAlertService;
    commonStrings: ClrCommonStringsService;
    constructor(iconService: AlertIconAndTypesService, cdr: ChangeDetectorRef, multiAlertService: MultiAlertService, commonStrings: ClrCommonStringsService);
    isSmall: boolean;
    closable: boolean;
    isAppLevel: boolean;
    clrCloseButtonAriaLabel: string;
    _closed: boolean;
    _closedChanged: EventEmitter<boolean>;
    alertType: string;
    /**
     * clrPolite is not used in the code. Is here just to provide
     * code complition and also mark component what type AriaLive
     * will be used.
     */
    polite: boolean;
    assertive: boolean;
    off: boolean;
    /**
     * There is an order on how the attributes will take effect.
     * Assertive, Off, Polite.
     *
     * Polite is default if non is passed.
     *
     * In the case of setting all of them to true. Assertive will be used.
     *
     */
    readonly setAriaLive: string;
    alertIconShape: string;
    readonly alertClass: string;
    private previouslyHidden;
    private hidden;
    private detectChangesIfNeeded;
    readonly isHidden: boolean;
    close(): void;
    open(): void;
}
