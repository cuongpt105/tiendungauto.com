import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import {routing} from './admin.routing';
import {CheckboxModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {EditorModule,SharedModule} from 'primeng/primeng'; 

import { AdminComponent }  from './component/admin.component';
import {HeaderComponent} from './component/header/header.component';
import {GioiThieuComponent} from './component/gioiThieu/gioithieu.component';
import {DichVuComponent} from './component/dichVu/dichvu.component';
import {KhuyenMaiComponent} from './component/khuyenMai/khuyenmai.component';
import {TinTucComponent} from './component/tinTuc/tintuc.component';
import {BanDoComponent} from './component/banDo/bando.component';
import {ThanhToanComponent} from './component/thanhToan/thanhtoan.component';
import {LienHeComponent} from './component/lienHe/lienhe.component';
import { DanhMucComponent } from './component/danhMuc/danhmuc.component';
import { DanhMucItemComponent} from './component/danhMucItem/danhmucitem.component';
import { DanhMucSelectionComponent } from './component/danhMucSelection/danhmucselection.component';

import { ProductComponent } from './component/product/product.component';
import { ProductViewComponent } from './component/productView/productview.component';
import { ProductModifyComponent } from './component/productModify/productmodify.component';
import { ProductImageDetailComponent } from './component/productImageDetail/productImageDetail.component'

import { GalaryComponent } from './component/galary/galary.component';

import {ItemHighlightDirective} from './directive/item-highlight.directive';

import { CommonBroadcast} from './service/common-broadcast.service';
import {SidebarItemBroadcast} from './service/sidebar-item-broadcast.service';
import { SideBarItemService } from './service/sidebar-item.service';
import { HeaderService} from './service/header.service';
import { UploadFileService } from './service/upload-file.service';
import { GioiThieuService } from './service/gioithieu.service';
import { DichVuService } from './service/dichvu.service';
import { ThanhToanService } from './service/thanhtoan.service';
import { ProductService} from './service/product.service';
import { ProductImageService} from './service/productimage.service';
import { DanhMucService} from './service/danhmuc.service';
import { TinTucService} from './service/tintuc.service';
import { TinTucFileService} from './service/tintucfile.service';
import { BanDoService} from './service/bando.service';

@NgModule({
  imports:      [ 
    CommonModule, 
    FormsModule, 
    HttpModule, 
    routing,
    CheckboxModule,
    TabViewModule,
    EditorModule,SharedModule],
  declarations: [ 
    AdminComponent, 
    HeaderComponent, 
    GioiThieuComponent,
    DichVuComponent,
    KhuyenMaiComponent,
    TinTucComponent,
    BanDoComponent,
    ThanhToanComponent,
    LienHeComponent,
    DanhMucComponent,
    DanhMucItemComponent,
    DanhMucSelectionComponent,
    ProductComponent,
    ProductViewComponent,
    ProductModifyComponent,
    ProductImageDetailComponent,
    GalaryComponent,
    ItemHighlightDirective
  ],
  providers: [
    CommonBroadcast,
    SidebarItemBroadcast,
    SideBarItemService,
    HeaderService,
    UploadFileService,
    GioiThieuService,
    DichVuService,
    ThanhToanService,
    DanhMucService,
    ProductService,
    ProductImageService,
    TinTucService,
    TinTucFileService,
    BanDoService
  ]
})

export class AdminModule { }