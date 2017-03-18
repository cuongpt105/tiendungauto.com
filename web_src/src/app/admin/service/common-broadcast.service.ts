import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Rx';

@Injectable()
export class CommonBroadcast<T> {
    private objectSubject = new Subject<T>();

    constructor() {}

    broadCastValue(object: T) {
       this.objectSubject.next(object);
    }

    triggerBroadcast() {
        return this.objectSubject;
    }
}