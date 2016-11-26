import { Injectable } from '@angular/core';

import { HeaderInfo } from '../models/header-info';

import { CommonBroadcast} from './common-broadcast.service';

@Injectable()
export class HeaderInfoBroadcast extends CommonBroadcast<HeaderInfo> {
}