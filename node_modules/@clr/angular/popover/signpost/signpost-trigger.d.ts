import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SignpostIdService } from './providers/signpost-id.service';
export declare class ClrSignpostTrigger implements OnDestroy {
    private ifOpenService;
    private renderer;
    private el;
    commonStrings: ClrCommonStringsService;
    private signpostIdService;
    private platformId;
    private subscriptions;
    ariaExpanded: boolean;
    ariaControl: string;
    constructor(ifOpenService: IfOpenService, renderer: Renderer2, el: ElementRef, commonStrings: ClrCommonStringsService, signpostIdService: SignpostIdService, platformId: Object);
    ngOnDestroy(): void;
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    onSignpostTriggerClick(event: Event): void;
}
