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
var client_routing_1 = require('./client.routing');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var client_component_1 = require('./client.component');
// list components that are not show in client side
var header_component_1 = require('../header/header.component');
var side_bar_component_1 = require('../sidebar/side-bar.component');
var bread_crumb_component_1 = require('../breadcrumb/bread-crumb.component');
var footer_component_1 = require('../footer/footer.component');
var rating_view_component_1 = require('../ratingview/rating-view.component');
var rating_component_1 = require('../rating/rating.component');
var gallery_holder_component_1 = require('../gallery-holder/gallery-holder.component');
var carousel_component_1 = require('../carousel/carousel.component');
// list components that are show on client side
var trangchu_component_1 = require('../trangchu/trangchu.component');
var gioithieu_component_1 = require('../gioithieu/gioithieu.component');
var dich_vu_component_1 = require('../dichvu/dich-vu.component');
var tin_tuc_component_1 = require('../tintuc/tin-tuc.component');
var ban_do_component_1 = require('../bando/ban-do.component');
var thanh_toan_component_1 = require('../thanhtoan/thanh-toan.component');
var lien_he_component_1 = require('../lienhe/lien-he.component');
var danh_muc_component_1 = require('../danhmuc/danh-muc.component');
var product_group_component_1 = require('../productgroup/product-group.component');
var product_component_1 = require('../product/product.component');
var header_info_broadcast_service_1 = require('../../services/header-info-broadcast.service');
var menu_item_broadcast_service_1 = require('../../services/menu-item-broadcast.service');
var bread_crumb_broadcast_service_1 = require('../../services/bread-crumb-broadcast.service');
var danh_muc_broadcast_service_1 = require('../../broadcast/danh-muc-broadcast.service');
var information_common_handle_service_1 = require('../../services/information-common-handle.service');
var menu_service_1 = require('../../services/menu.service');
var header_info_service_1 = require('../../services/header-info.service');
var ClientModule = (function () {
    function ClientModule() {
    }
    ClientModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                client_routing_1.routing,
                primeng_1.CheckboxModule,
                primeng_2.TabViewModule,
                // import module from primeface
                primeng_3.EditorModule, primeng_3.SharedModule, primeng_4.PaginatorModule
            ],
            declarations: [
                client_component_1.ClientAppComponent,
                header_component_1.HeaderComponent,
                side_bar_component_1.SideBarComponent,
                bread_crumb_component_1.BreadCrumbComponent,
                footer_component_1.FooterComponent,
                rating_component_1.RatingComponent,
                rating_view_component_1.RatingViewComponent,
                gallery_holder_component_1.GalleryHolderComponent,
                carousel_component_1.CarouselComponent,
                trangchu_component_1.TrangChuComponent,
                gioithieu_component_1.GioiThieuComponent,
                dich_vu_component_1.DichVuComponent,
                tin_tuc_component_1.TinTucComponent,
                ban_do_component_1.BanDoComponent,
                thanh_toan_component_1.ThanhToanComponent,
                lien_he_component_1.LienHeComponent,
                danh_muc_component_1.DanhMucComponent,
                product_group_component_1.ProductGroupComponent,
                product_component_1.ProductComponent
            ],
            providers: [
                header_info_broadcast_service_1.HeaderInfoBroadcast,
                menu_item_broadcast_service_1.MenuItemBroadcast,
                bread_crumb_broadcast_service_1.BreadCrumbInfoBroadcast,
                danh_muc_broadcast_service_1.DanhMucBroadcast,
                information_common_handle_service_1.InformationCommonHandle,
                menu_service_1.MenuService,
                header_info_service_1.HeaderInfoService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ClientModule);
    return ClientModule;
}());
exports.ClientModule = ClientModule;
//# sourceMappingURL=client.module.js.map