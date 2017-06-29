import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AdminComponent} from './component/admin.component';
import {HeaderComponent} from './component/header/header.component';
import {GioiThieuComponent} from './component/gioiThieu/gioithieu.component';
import {DichVuComponent} from './component/dichVu/dichvu.component';
import {KhuyenMaiComponent} from './component/khuyenMai/khuyenmai.component';
import {TinTucComponent} from './component/tinTuc/tintuc.component';
import {BanDoComponent} from './component/banDo/bando.component';
import {ThanhToanComponent} from './component/thanhToan/thanhtoan.component';
import { DanhMucComponent } from './component/danhMuc/danhmuc.component';
import { ProductComponent } from './component/product/product.component';
import { GalleryComponent } from './component/gallery/gallery.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: AdminComponent,
        children: [
            {path: '', component: GioiThieuComponent},
            {path: 'gioi-thieu', component: GioiThieuComponent},
            {path: 'header', component: HeaderComponent},
            {path: 'dich-vu', component: DichVuComponent},
            {path: 'khuyen-mai', component: KhuyenMaiComponent},
            {path: 'tin-tuc', component: TinTucComponent},
            {path: 'ban-do', component: BanDoComponent},
            {path: 'thanh-toan', component: ThanhToanComponent},
            {path: 'danh-muc', component: DanhMucComponent},
            {path: 'san-pham', component: ProductComponent},
            {path: 'gallery', component: GalleryComponent}
        ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {}