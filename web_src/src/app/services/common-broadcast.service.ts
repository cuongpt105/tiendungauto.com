import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Rx';

@Injectable()
export class CommonBroadcast<T> {
    private objectSubject: Subject<T> = new Subject<T>();

    constructor() {}

    broadCastValue(object: T) {
       this.objectSubject.next(object);
    }

    triggerBroadcast(): Subject<T> {
        return this.objectSubject;
    }
}