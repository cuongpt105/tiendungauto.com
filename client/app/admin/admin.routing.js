"use strict";
var router_1 = require('@angular/router');
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
var product_component_1 = require('./component/product/product.component');
var galary_component_1 = require('./component/galary/galary.component');
var adminRoutes = [
    {
        path: 'admin', component: admin_component_1.AdminComponent,
        children: [
            { path: '', component: gioithieu_component_1.GioiThieuComponent },
            { path: 'gioithieu', component: gioithieu_component_1.GioiThieuComponent },
            { path: 'header', component: header_component_1.HeaderComponent },
            { path: 'dichvu', component: dichvu_component_1.DichVuComponent },
            { path: 'khuyenmai', component: khuyenmai_component_1.KhuyenMaiComponent },
            { path: 'tintuc', component: tintuc_component_1.TinTucComponent },
            { path: 'bando', component: bando_component_1.BanDoComponent },
            { path: 'thanhtoan', component: thanhtoan_component_1.ThanhToanComponent },
            { path: 'lienhe', component: lienhe_component_1.LienHeComponent },
            { path: 'danhmuc', component: danhmuc_component_1.DanhMucComponent },
            { path: 'sanpham', component: product_component_1.ProductComponent },
            { path: 'galary', component: galary_component_1.GalaryComponent }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(adminRoutes);
//# sourceMappingURL=admin.routing.js.map