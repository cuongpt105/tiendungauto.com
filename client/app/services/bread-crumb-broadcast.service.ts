import { Injectable } from '@angular/core';

import { BreadCrumbInfo } from '../models/bread-crumb-info';

import { CommonBroadcast} from './common-broadcast.service';

@Injectable()
export class BreadCrumbInfoBroadcast extends CommonBroadcast<BreadCrumbInfo[]> {
}