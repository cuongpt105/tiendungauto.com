import { Routes, RouterModule } from '@angular/router';

import { ClientAppComponent } from './client.component';
import {TrangChuComponent} from '../trangchu/trangchu.component';
import {GioiThieuComponent} from '../gioithieu/gioithieu.component';
import {DichVuComponent} from '../dichvu/dich-vu.component';
import {TinTucComponent} from '../tintuc/tin-tuc.component';
import {BanDoComponent} from '../bando/ban-do.component';
import {ThanhToanComponent} from '../thanhtoan/thanh-toan.component';
import {LienHeComponent} from '../lienhe/lien-he.component';
import { DanhMucComponent } from '../danhmuc/danh-muc.component';
import { ProductComponent } from '../product/product.component';

const clientRoutes: Routes  = [
    {
        path: '',
        redirectTo: '/trang-chu',
        pathMatch: 'full'
    },
    {
        path: '', component: ClientAppComponent,
        children: [
            {path: 'trang-chu', component: TrangChuComponent},
            {path: 'gioi-thieu', component: GioiThieuComponent},
            {path: 'dich-vu', component: DichVuComponent},
            {path: 'tin-tuc', component: TinTucComponent},
            {path: 'ban-do', component: BanDoComponent},
            {path: 'thanh-toan', component: ThanhToanComponent},
            {path: 'lien-he', component: LienHeComponent},

            {path: 'danh-muc/:id', component: DanhMucComponent },
            {path: 'san-pham/:id', component: ProductComponent }
        ]
    }
    
];

export const routing = RouterModule.forChild(clientRoutes);