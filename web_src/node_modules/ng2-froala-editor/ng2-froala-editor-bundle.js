var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("src/froala/froala.component", ["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, FroalaEditorComponent, FroalaEditorComponent_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            FroalaEditorComponent = FroalaEditorComponent_1 = (function () {
                function FroalaEditorComponent(el) {
                    this.el = el;
                    this.model = new core_1.EventEmitter();
                    this.editorInitialized = new core_1.EventEmitter();
                    this.isEditorInitialized = false;
                }
                FroalaEditorComponent.prototype.ngOnChanges = function (changes) {
                    if (changes.hasOwnProperty('froalaData') && this.isEditorInitialized) {
                        if (changes.froalaData.currentValue != this.froalaContent) {
                            this.setContent();
                        }
                    }
                };
                FroalaEditorComponent.prototype.ngOnInit = function () {
                    FroalaEditorComponent_1.froalaEditorInstance = $(this.el.nativeElement).find("textarea");
                    this.initListener();
                    this.froalaOptions = this.froalaOptions ? this.froalaOptions : {};
                    FroalaEditorComponent_1.froalaEditorInstance.froalaEditor(this.froalaOptions);
                };
                FroalaEditorComponent.prototype.ngOnDestroy = function () {
                    FroalaEditorComponent_1.froalaEditorInstance.off("froalaEditor.initialized");
                    FroalaEditorComponent_1.froalaEditorInstance.off("froalaEditor.contentChanged");
                };
                FroalaEditorComponent.prototype.initListener = function () {
                    var _this = this;
                    FroalaEditorComponent_1.froalaEditorInstance.on('froalaEditor.initialized', function (e, editor) {
                        _this.isEditorInitialized = true;
                        if (_this.froalaData) {
                            _this.setContent();
                        }
                        _this.getContent();
                        _this.editorInitialized.emit(null);
                    });
                    FroalaEditorComponent_1.froalaEditorInstance.on('froalaEditor.contentChanged', function (e, editor) {
                        if (_this.isEditorInitialized) {
                            _this.getContent();
                        }
                    });
                };
                FroalaEditorComponent.prototype.setDefaultContent = function () {
                    var content = "<p></p>";
                    FroalaEditorComponent_1.froalaEditorInstance.froalaEditor('html.set', content);
                    this.model.emit(content);
                };
                FroalaEditorComponent.prototype.setContent = function () {
                    FroalaEditorComponent_1.froalaEditorInstance.froalaEditor('html.set', this.froalaData);
                };
                FroalaEditorComponent.prototype.getContent = function () {
                    this.froalaContent = FroalaEditorComponent_1.froalaEditorInstance.froalaEditor('html.get', true);
                    if (!this.froalaContent) {
                        this.setDefaultContent();
                    }
                    else {
                        this.model.emit(this.froalaContent);
                    }
                };
                FroalaEditorComponent.getFroalaInstance = function () {
                    return FroalaEditorComponent_1.froalaEditorInstance;
                };
                return FroalaEditorComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], FroalaEditorComponent.prototype, "froalaData", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], FroalaEditorComponent.prototype, "froalaOptions", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], FroalaEditorComponent.prototype, "model", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], FroalaEditorComponent.prototype, "editorInitialized", void 0);
            FroalaEditorComponent = FroalaEditorComponent_1 = __decorate([
                core_1.Component({
                    selector: 'froala',
                    template: "<textarea></textarea>"
                }),
                __metadata("design:paramtypes", [core_1.ElementRef])
            ], FroalaEditorComponent);
            exports_1("FroalaEditorComponent", FroalaEditorComponent);
        }
    };
});
System.register("src/froala/froala-editor.module", ["@angular/core", "@angular/forms", "src/froala/froala.component"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, forms_1, froala_component_1, FroalaEditorModule;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (froala_component_1_1) {
                froala_component_1 = froala_component_1_1;
            }
        ],
        execute: function () {
            FroalaEditorModule = (function () {
                function FroalaEditorModule() {
                }
                return FroalaEditorModule;
            }());
            FroalaEditorModule = __decorate([
                core_2.NgModule({
                    imports: [
                        forms_1.FormsModule
                    ],
                    exports: [
                        froala_component_1.FroalaEditorComponent
                    ],
                    declarations: [
                        froala_component_1.FroalaEditorComponent
                    ]
                })
            ], FroalaEditorModule);
            exports_2("FroalaEditorModule", FroalaEditorModule);
        }
    };
});
System.register("ng2-froala-editor", ["src/froala/froala.component", "src/froala/froala-editor.module"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (froala_component_2_1) {
                exports_3({
                    "FroalaEditorComponent": froala_component_2_1["FroalaEditorComponent"]
                });
            },
            function (froala_editor_module_1_1) {
                exports_3({
                    "FroalaEditorModule": froala_editor_module_1_1["FroalaEditorModule"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=ng2-froala-editor-bundle.js.map