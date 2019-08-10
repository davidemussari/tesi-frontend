/**
 * Allows modal overflow area to be scrollable via keyboard.
 * The modal body will focus with keyboard navigation only.
 * This allows inner focusable items to be focused without
 * the overflow scroll being focused.
 */
export declare class ClrModalBody {
    private _mouseDown;
    focus(event: any): void;
    mouseDown(): void;
    mouseUp(): void;
}
