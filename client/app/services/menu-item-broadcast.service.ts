import { Injectable } from '@angular/core';

import { MenuItem } from '../models/menu-item';

import { CommonBroadcast} from './common-broadcast.service';

@Injectable()
export class MenuItemBroadcast extends CommonBroadcast<MenuItem> {
}