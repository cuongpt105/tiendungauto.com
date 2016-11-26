import { Injectable } from '@angular/core';

import { MenuItem } from '../models/menu-item';

const SIDEBAR_ITEMS: MenuItem[] = [
    {name: 'trangchu', value: 'Trang Chủ', linkRef: '/trang-chu'},
    {name: 'gioithieu', value: 'Giới Thiệu', linkRef: '/gioi-thieu'},
    {name: 'dichvu', value: 'Dịch Vụ', linkRef: '/dich-vu'},
    //{name: 'khuyenmai', value: 'Khuyến Mãi', linkRef: '/khuyen-mai'},
    {name: 'tintuc', value: 'Tin Tức', linkRef: '/tin-tuc'},
    {name: 'bando', value: 'Bản Đồ', linkRef: '/ban-do'},
    {name: 'thanhtoan', value: 'Thanh Toán', linkRef: '/thanh-toan'},
    {name: 'lienhe', value: 'Liên Hệ', linkRef: '/lien-he'}
];

@Injectable()
export class MenuService {
    
    constructor() {}

    getSidebarItems(): MenuItem[] {
        return SIDEBAR_ITEMS;
    }

    getMenuItemByName(name: string): MenuItem {
        let result = this.getSidebarItems().filter(item => {
            return (item.name === name);
        });
        return result? result[0] : null;
    }
}