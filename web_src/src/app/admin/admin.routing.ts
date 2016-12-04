import { Routes, RouterModule } from '@angular/router';

import {AdminComponent} from './component/admin.component';
import {HeaderComponent} from './component/header/header.component';
import {GioiThieuComponent} from './component/gioiThieu/gioithieu.component';
import {DichVuComponent} from './component/dichVu/dichvu.component';
import {KhuyenMaiComponent} from './component/khuyenMai/khuyenmai.component';
import {TinTucComponent} from './component/tinTuc/tintuc.component';
import {BanDoComponent} from './component/banDo/bando.component';
import {ThanhToanComponent} from './component/thanhToan/thanhtoan.component';
import {LienHeComponent} from './component/lienHe/lienhe.component';
import { DanhMucComponent } from './component/danhMuc/danhmuc.component';
import { ProductComponent } from './component/product/product.component';
import { GalleryComponent } from './component/gallery/gallery.component';

const adminRoutes: Routes  = [
    {
        path: 'admin', component: AdminComponent,
        children: [
            {path: '', component: GioiThieuComponent},
            {path: 'gioithieu', component: GioiThieuComponent},
            {path: 'header', component: HeaderComponent},
            {path: 'dichvu', component: DichVuComponent},
            {path: 'khuyenmai', component: KhuyenMaiComponent},
            {path: 'tintuc', component: TinTucComponent},
            {path: 'bando', component: BanDoComponent},
            {path: 'thanhtoan', component: ThanhToanComponent},
            {path: 'lienhe', component: LienHeComponent},
            {path: 'danhmuc', component: DanhMucComponent},
            {path: 'sanpham', component: ProductComponent},
            {path: 'gallery', component: GalleryComponent}
        ]
    }
    
];

export const routing = RouterModule.forChild(adminRoutes);