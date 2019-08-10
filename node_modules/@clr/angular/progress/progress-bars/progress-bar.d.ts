export declare class ClrProgressBar {
    /**
     * Handle component ID
     */
    private _ID;
    externalId: string;
    id: string;
    max: number;
    value: number;
    displayval: string;
    readonly progressClass: boolean;
    private _labeled;
    readonly labeledClass: boolean;
    clrLabeled: boolean | string;
    private _fade;
    readonly fadeClass: boolean;
    clrFade: boolean | string;
    private _loop;
    readonly loopClass: boolean;
    clrLoop: boolean | string;
    private _success;
    readonly successClass: boolean;
    clrSuccess: boolean | string;
    private _danger;
    readonly dangerClass: boolean;
    clrDanger: boolean | string;
    private _flash;
    readonly flashClass: boolean;
    clrFlash: boolean | string;
    private _flashDanger;
    readonly flashDangerClass: boolean;
    clrFlashDanger: boolean | string;
    assertive: boolean;
    off: boolean;
    /**
     * Make sure that we always will have something that is readable
     * for the screen reader
     */
    readonly displayValue: string;
    /**
     * Display aria-live only when there is value and it's not 0 or equal to the max value
     */
    displayAriaLive(): boolean;
    readonly ariaLive: "assertive" | "off" | "polite";
}
