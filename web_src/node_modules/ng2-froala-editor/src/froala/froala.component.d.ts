import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
export declare class FroalaEditorComponent implements OnInit, OnDestroy {
    private el;
    froalaData: string;
    froalaOptions: any;
    model: EventEmitter<any>;
    editorInitialized: EventEmitter<any>;
    private static froalaEditorInstance;
    isEditorInitialized: Boolean;
    froalaContent: any;
    constructor(el: ElementRef);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    initListener(): void;
    setDefaultContent(): void;
    setContent(): void;
    getContent(): void;
    static getFroalaInstance(): any;
}
