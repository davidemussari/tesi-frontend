import { AnimationEvent } from '@angular/animations';
import { EventEmitter, OnChanges, OnDestroy, SimpleChange, ElementRef } from '@angular/core';
import { FocusTrapDirective } from '../utils/focus-trap/focus-trap.directive';
import { ScrollingService } from '../utils/scrolling/scrolling-service';
import { ClrCommonStringsService } from '../utils/i18n/common-strings.service';
export declare class ClrModal implements OnChanges, OnDestroy {
    private _scrollingService;
    commonStrings: ClrCommonStringsService;
    private platformId;
    modalId: string;
    focusTrap: FocusTrapDirective;
    modalTitle: ElementRef<HTMLDivElement>;
    _open: boolean;
    _openChanged: EventEmitter<boolean>;
    closable: boolean;
    size: string;
    staticBackdrop: boolean;
    skipAnimation: string;
    bypassScrollService: boolean;
    stopClose: boolean;
    altClose: EventEmitter<boolean>;
    constructor(_scrollingService: ScrollingService, commonStrings: ClrCommonStringsService, platformId: Object, modalId: string);
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    open(): void;
    close(): void;
    fadeDone(e: AnimationEvent): void;
}
