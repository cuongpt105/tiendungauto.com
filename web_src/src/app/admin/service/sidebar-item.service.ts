import { Injectable } from '@angular/core';

import { SideBarItem } from '../model/sidebar-item';

const SIDEBAR_ITEMS: SideBarItem[] = [
    {name: 'gioithieu', value: 'Giới thiệu', linkRef: '/admin/gioi-thieu', iconClass: 'fa-info'},
    {name: 'header', value: 'Header', linkRef: '/admin/header', iconClass: 'fa-header'},
    {name: 'dichvu', value: 'Dịch vụ', linkRef: '/admin/dich-vu', iconClass: 'fa-tachometer'},
    {name: 'khuyenmai', value: 'Khuyên mãi', linkRef: '/admin/khuyen-mai', iconClass: 'fa-tachometer'},
    {name: 'tintuc', value: 'Tin tức', linkRef: '/admin/tin-tuc', iconClass: 'fa-tachometer'},
    {name: 'bando', value: 'Bản đồ', linkRef: '/admin/ban-do', iconClass: 'fa-tachometer'},
    {name: 'thanhtoan', value: 'Thanh toán', linkRef: '/admin/thanh-toan', iconClass: 'fa-tachometer'},
    {name: 'danhmuc', value: 'Danh mục', linkRef: '/admin/danh-muc', iconClass: 'fa-tachometer'},
    {name: 'sanpham', value: 'Sản phẩm', linkRef: '/admin/san-pham', iconClass: 'fa-tachometer'},
    {name: 'gallery', value: 'Gallery', linkRef: '/admin/gallery', iconClass: 'fa-tachometer'},
];

@Injectable()
export class SideBarItemService {
    constructor() {}

    getSidebarItems(): SideBarItem[] {
        return SIDEBAR_ITEMS;
    }

    getItemByName(name: string): SideBarItem {
        let result = this.getSidebarItems().filter(item => {
            return (item.name === name);
        });
        return result? result[0] : null;
    }
}