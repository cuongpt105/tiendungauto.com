"use strict";
var router_1 = require('@angular/router');
var client_component_1 = require('./client.component');
var trangchu_component_1 = require('../trangchu/trangchu.component');
var gioithieu_component_1 = require('../gioithieu/gioithieu.component');
var dich_vu_component_1 = require('../dichvu/dich-vu.component');
var tin_tuc_component_1 = require('../tintuc/tin-tuc.component');
var ban_do_component_1 = require('../bando/ban-do.component');
var thanh_toan_component_1 = require('../thanhtoan/thanh-toan.component');
var lien_he_component_1 = require('../lienhe/lien-he.component');
var danh_muc_component_1 = require('../danhmuc/danh-muc.component');
var product_component_1 = require('../product/product.component');
var clientRoutes = [
    {
        path: '',
        redirectTo: '/trang-chu',
        pathMatch: 'full'
    },
    {
        path: '', component: client_component_1.ClientAppComponent,
        children: [
            { path: 'trang-chu', component: trangchu_component_1.TrangChuComponent },
            { path: 'gioi-thieu', component: gioithieu_component_1.GioiThieuComponent },
            { path: 'dich-vu', component: dich_vu_component_1.DichVuComponent },
            { path: 'tin-tuc', component: tin_tuc_component_1.TinTucComponent },
            { path: 'ban-do', component: ban_do_component_1.BanDoComponent },
            { path: 'thanh-toan', component: thanh_toan_component_1.ThanhToanComponent },
            { path: 'lien-he', component: lien_he_component_1.LienHeComponent },
            { path: 'danh-muc/:id', component: danh_muc_component_1.DanhMucComponent },
            { path: 'san-pham/:id', component: product_component_1.ProductComponent }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(clientRoutes);
//# sourceMappingURL=client.routing.js.map