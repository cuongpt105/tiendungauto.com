import { Injectable } from '@angular/core';

import { HeaderInfo } from '../models/header-info';

const HEADER_INFOS: HeaderInfo[] = [
    {name: 'trangchu', title: 'Trang Chủ', keyword: 'trang chu keyword', description: 'trang chu description'},
    {name: 'gioithieu', title: 'Giới Thiệu', keyword: 'gioi thieu keyword', description: 'gioi thieu description'},
    {name: 'dichvu', title: 'Dịch Vụ', keyword: 'dich vu keyword', description: 'dich vu description'},
    {name: 'khuyenmai', title: 'Khuyến Mãi', keyword: 'khuyen mai keyword', description: 'khuyen mai description'},
    {name: 'tintuc', title: 'Tin Tức',keyword: 'tin tuc keyword', description: 'tin tuc description'},
    {name: 'bando', title: 'Bản Đồ', keyword: 'ban do keyword', description: 'ban do description'},
    {name: 'thanhtoan', title: 'Thanh Toán', keyword: 'thanh toan keyword', description: 'thanh toan description'},
    {name: 'lienhe', title: 'Liên Hệ', keyword: 'lien he keyword', description: 'lien he description'}
];

@Injectable()
export class HeaderInfoService {
    
    constructor() {}

    getHeaderInfos(): HeaderInfo[] {
        return HEADER_INFOS;
    }

    getHeaderInfoByName(name: string): HeaderInfo {
        let result = this.getHeaderInfos().filter(item => {
            return (item.name === name);
        });
        return result? result[0] : null;
    }
}