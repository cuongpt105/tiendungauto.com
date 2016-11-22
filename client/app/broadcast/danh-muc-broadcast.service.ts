import { Injectable } from '@angular/core';

import { DanhMuc } from '../admin/model/danhmuc';

import { CommonBroadcast} from '../services/common-broadcast.service';

@Injectable()
export class DanhMucBroadcast extends CommonBroadcast<DanhMuc[]> {
}