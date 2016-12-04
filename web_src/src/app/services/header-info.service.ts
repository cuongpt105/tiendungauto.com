import { Injectable } from '@angular/core';

import { HeaderInfo } from '../models/header-info';

const HEADER_INFOS: HeaderInfo[] = [
    {
        name: 'trangchu', 
        title: 'Trang Chủ', 
        keyword: 'Trang chủ Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Trang chủ Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'gioithieu', 
        title: 'Giới Thiệu', 
        keyword: 'Giới thiệu Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Giới thiệu Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'dichvu', 
        title: 'Dịch Vụ', 
        keyword: 'Dịch vụ Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Dịch vụ Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'khuyenmai', 
        title: 'Khuyến Mãi', 
        keyword: 'Khuyến mãi Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Khuyến mãi Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'tintuc', 
        title: 'Tin Tức',
        keyword: 'Tin tức Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Tin tức Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'bando', 
        title: 'Bản Đồ', 
        keyword: 'Bản đồ Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Bản đồ Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'thanhtoan', 
        title: 'Thanh Toán', 
        keyword: 'Thanh toán Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Thanh toán Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    },
    {
        name: 'lienhe', 
        title: 'Liên Hệ', 
        keyword: 'Liên hệ Tiến Dũng Auto phụ kiện xe hơi, phụ kiện ô tô Bình Dương.', 
        description: 'Liên hệ Trung Tâm Phụ Kiện Ô Tô Chất Lượng Cao Tiến Dũng Bình Dương cung cấp sản phẩm Phụ Kiện xe hơi cao cấp (nội thất, ngoại thất, hệ thống điện...) và dịch vụ chu đáo - chuyên nghiệp.'
    }
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