var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("src/froala/froala.component", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var FroalaEditorCompnoent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FroalaEditorCompnoent = (function () {
                function FroalaEditorCompnoent(el) {
                    this.el = el;
                    this.model = new core_1.EventEmitter();
                    this.editorInitialized = new core_1.EventEmitter();
                    this.isEditorInitialized = false;
                }
                FroalaEditorCompnoent.prototype.ngOnChanges = function (changes) {
                    if (changes.hasOwnProperty('froalaData') && this.isEditorInitialized) {
                        if (changes.froalaData.currentValue != this.froalaContent) {
                            this.setContent();
                        }
                    }
                };
                FroalaEditorCompnoent.prototype.ngOnInit = function () {
                    FroalaEditorCompnoent.froalaEditorInstance = $(this.el.nativeElement).find("textarea");
                    this.initListener();
                    this.froalaOptions = this.froalaOptions ? this.froalaOptions : {};
                    FroalaEditorCompnoent.froalaEditorInstance.froalaEditor(this.froalaOptions);
                };
                FroalaEditorCompnoent.prototype.ngOnDestroy = function () {
                    FroalaEditorCompnoent.froalaEditorInstance.off("froalaEditor.initialized");
                    FroalaEditorCompnoent.froalaEditorInstance.off("froalaEditor.contentChanged");
                };
                FroalaEditorCompnoent.prototype.initListener = function () {
                    var _this = this;
                    FroalaEditorCompnoent.froalaEditorInstance.on('froalaEditor.initialized', function (e, editor) {
                        _this.isEditorInitialized = true;
                        if (_this.froalaData) {
                            _this.setContent();
                        }
                        _this.getContent();
                        _this.editorInitialized.emit(null);
                    });
                    FroalaEditorCompnoent.froalaEditorInstance.on('froalaEditor.contentChanged', function (e, editor) {
                        if (_this.isEditorInitialized) {
                            _this.getContent();
                        }
                    });
                };
                FroalaEditorCompnoent.prototype.setDefaultContent = function () {
                    var content = "<p></p>";
                    FroalaEditorCompnoent.froalaEditorInstance.froalaEditor('html.set', content);
                    this.model.emit(content);
                };
                FroalaEditorCompnoent.prototype.setContent = function () {
                    FroalaEditorCompnoent.froalaEditorInstance.froalaEditor('html.set', this.froalaData);
                };
                FroalaEditorCompnoent.prototype.getContent = function () {
                    this.froalaContent = FroalaEditorCompnoent.froalaEditorInstance.froalaEditor('html.get', true);
                    if (!this.froalaContent) {
                        this.setDefaultContent();
                    }
                    else {
                        this.model.emit(this.froalaContent);
                    }
                };
                FroalaEditorCompnoent.getFroalaInstance = function () {
                    return FroalaEditorCompnoent.froalaEditorInstance;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], FroalaEditorCompnoent.prototype, "froalaData", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], FroalaEditorCompnoent.prototype, "froalaOptions", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], FroalaEditorCompnoent.prototype, "model", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], FroalaEditorCompnoent.prototype, "editorInitialized", void 0);
                FroalaEditorCompnoent = __decorate([
                    core_1.Component({
                        selector: 'froala',
                        template: "<textarea></textarea>"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], FroalaEditorCompnoent);
                return FroalaEditorCompnoent;
            }());
            exports_1("FroalaEditorCompnoent", FroalaEditorCompnoent);
        }
    }
});
System.register("src/froala/froala-editor.module", ['@angular/core', '@angular/forms', "src/froala/froala.component"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, forms_1, froala_component_1;
    var FroalaEditorModule;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (froala_component_1_1) {
                froala_component_1 = froala_component_1_1;
            }],
        execute: function() {
            FroalaEditorModule = (function () {
                function FroalaEditorModule() {
                }
                FroalaEditorModule = __decorate([
                    core_2.NgModule({
                        imports: [
                            forms_1.FormsModule
                        ],
                        exports: [
                            froala_component_1.FroalaEditorCompnoent
                        ],
                        declarations: [
                            froala_component_1.FroalaEditorCompnoent
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], FroalaEditorModule);
                return FroalaEditorModule;
            }());
            exports_2("FroalaEditorModule", FroalaEditorModule);
        }
    }
});
System.register("ng2-froala-editor", ["src/froala/froala.component", "src/froala/froala-editor.module"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[
            function (froala_component_2_1) {
                exports_3({
                    "FroalaEditorCompnoent": froala_component_2_1["FroalaEditorCompnoent"]
                });
            },
            function (froala_editor_module_1_1) {
                exports_3({
                    "FroalaEditorModule": froala_editor_module_1_1["FroalaEditorModule"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ng2-froala-editor-bundle.js.map