"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var admin_routing_1 = require('./admin.routing');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var admin_component_1 = require('./component/admin.component');
var header_component_1 = require('./component/header/header.component');
var gioithieu_component_1 = require('./component/gioiThieu/gioithieu.component');
var dichvu_component_1 = require('./component/dichVu/dichvu.component');
var khuyenmai_component_1 = require('./component/khuyenMai/khuyenmai.component');
var tintuc_component_1 = require('./component/tinTuc/tintuc.component');
var bando_component_1 = require('./component/banDo/bando.component');
var thanhtoan_component_1 = require('./component/thanhToan/thanhtoan.component');
var lienhe_component_1 = require('./component/lienHe/lienhe.component');
var danhmuc_component_1 = require('./component/danhMuc/danhmuc.component');
var danhmucitem_component_1 = require('./component/danhMucItem/danhmucitem.component');
var danhmucselection_component_1 = require('./component/danhMucSelection/danhmucselection.component');
var product_component_1 = require('./component/product/product.component');
var productview_component_1 = require('./component/productView/productview.component');
var productmodify_component_1 = require('./component/productModify/productmodify.component');
var productImageDetail_component_1 = require('./component/productImageDetail/productImageDetail.component');
var galary_component_1 = require('./component/galary/galary.component');
var item_highlight_directive_1 = require('./directive/item-highlight.directive');
var common_broadcast_service_1 = require('./service/common-broadcast.service');
var sidebar_item_broadcast_service_1 = require('./service/sidebar-item-broadcast.service');
var sidebar_item_service_1 = require('./service/sidebar-item.service');
var header_service_1 = require('./service/header.service');
var upload_file_service_1 = require('./service/upload-file.service');
var gioithieu_service_1 = require('./service/gioithieu.service');
var dichvu_service_1 = require('./service/dichvu.service');
var thanhtoan_service_1 = require('./service/thanhtoan.service');
var product_service_1 = require('./service/product.service');
var productimage_service_1 = require('./service/productimage.service');
var danhmuc_service_1 = require('./service/danhmuc.service');
var tintuc_service_1 = require('./service/tintuc.service');
var tintucfile_service_1 = require('./service/tintucfile.service');
var bando_service_1 = require('./service/bando.service');
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                admin_routing_1.routing,
                primeng_1.CheckboxModule,
                primeng_2.TabViewModule,
                primeng_3.EditorModule, primeng_3.SharedModule],
            declarations: [
                admin_component_1.AdminComponent,
                header_component_1.HeaderComponent,
                gioithieu_component_1.GioiThieuComponent,
                dichvu_component_1.DichVuComponent,
                khuyenmai_component_1.KhuyenMaiComponent,
                tintuc_component_1.TinTucComponent,
                bando_component_1.BanDoComponent,
                thanhtoan_component_1.ThanhToanComponent,
                lienhe_component_1.LienHeComponent,
                danhmuc_component_1.DanhMucComponent,
                danhmucitem_component_1.DanhMucItemComponent,
                danhmucselection_component_1.DanhMucSelectionComponent,
                product_component_1.ProductComponent,
                productview_component_1.ProductViewComponent,
                productmodify_component_1.ProductModifyComponent,
                productImageDetail_component_1.ProductImageDetailComponent,
                galary_component_1.GalaryComponent,
                item_highlight_directive_1.ItemHighlightDirective
            ],
            providers: [
                common_broadcast_service_1.CommonBroadcast,
                sidebar_item_broadcast_service_1.SidebarItemBroadcast,
                sidebar_item_service_1.SideBarItemService,
                header_service_1.HeaderService,
                upload_file_service_1.UploadFileService,
                gioithieu_service_1.GioiThieuService,
                dichvu_service_1.DichVuService,
                thanhtoan_service_1.ThanhToanService,
                danhmuc_service_1.DanhMucService,
                product_service_1.ProductService,
                productimage_service_1.ProductImageService,
                tintuc_service_1.TinTucService,
                tintucfile_service_1.TinTucFileService,
                bando_service_1.BanDoService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map