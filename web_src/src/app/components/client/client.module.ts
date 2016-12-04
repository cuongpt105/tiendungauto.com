import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MainPipeModule } from '../../pipe/main-pipe.module';

import {routing} from './client.routing';
import {CheckboxModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {EditorModule,SharedModule} from 'primeng/primeng'; 
import {PaginatorModule} from 'primeng/primeng';

import { ClientAppComponent }  from './client.component';

// list components that are not show in client side
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../sidebar/side-bar.component';
import { BreadCrumbComponent } from '../breadcrumb/bread-crumb.component';
import { FooterComponent } from '../footer/footer.component';

import { RatingViewComponent } from '../ratingview/rating-view.component';
import { RatingComponent } from '../rating/rating.component';
import { GalleryHolderComponent } from '../gallery-holder/gallery-holder.component';
import { CarouselComponent } from '../carousel/carousel.component';

// list components that are show on client side
import {TrangChuComponent} from '../trangchu/trangchu.component';
import {GioiThieuComponent} from '../gioithieu/gioithieu.component';
import {DichVuComponent} from '../dichvu/dich-vu.component';
import {TinTucComponent} from '../tintuc/tin-tuc.component';
import {BanDoComponent} from '../bando/ban-do.component';
import {ThanhToanComponent} from '../thanhtoan/thanh-toan.component';
import {LienHeComponent} from '../lienhe/lien-he.component';
import { DanhMucComponent} from '../danhmuc/danh-muc.component';
import { ProductGroupComponent } from '../productgroup/product-group.component';
import { ProductComponent } from '../product/product.component';

import { HeaderInfoBroadcast} from '../../services/header-info-broadcast.service';
import { MenuItemBroadcast } from '../../services/menu-item-broadcast.service';
import { BreadCrumbInfoBroadcast} from '../../services/bread-crumb-broadcast.service';
import { DanhMucBroadcast } from '../../broadcast/danh-muc-broadcast.service';

import { InformationCommonHandle } from '../../services/information-common-handle.service';

import { MenuService} from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { GalleryService } from '../../admin/service/gallery.service';

@NgModule({
  imports:      [ 
    CommonModule, 
    FormsModule, 
    HttpModule, 
    routing,
    CheckboxModule,
    TabViewModule,

    // import module from primeface
    EditorModule,SharedModule, PaginatorModule,
    MainPipeModule.forRoot()
  ],

  declarations: [ 
    ClientAppComponent, 

    HeaderComponent,
    SideBarComponent,
    BreadCrumbComponent,
    FooterComponent,

    RatingComponent,
    RatingViewComponent,
    GalleryHolderComponent,
    CarouselComponent,

    TrangChuComponent,
    GioiThieuComponent,
    DichVuComponent,
    TinTucComponent,
    BanDoComponent,
    ThanhToanComponent,
    LienHeComponent,

    DanhMucComponent,
    ProductGroupComponent,
    ProductComponent
  ],
  
  providers: [
    HeaderInfoBroadcast,
    MenuItemBroadcast,
    BreadCrumbInfoBroadcast,
    DanhMucBroadcast,

    InformationCommonHandle,

    MenuService,
    HeaderInfoService,
    GalleryService
  ]
})

export class ClientModule { }