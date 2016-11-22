import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import { AppSettings } from '../../util/app-setting';

import {DanhMuc} from '../model/danhmuc';

@Injectable() 
export class DanhMucService {
    public danhmucUrl: string = AppSettings.API_ENDPOINT +'/danhmuc';
    
    constructor(private http : Http){}

    deleteDanhMuc(danhmucId: String): Observable<DanhMuc[]> {
        let url = `${this.danhmucUrl}/${danhmucId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getDanhMucs() : Observable<DanhMuc[]> {
         return this.http.get(this.danhmucUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveDanhMuc(danhmuc: DanhMuc) : Observable<DanhMuc> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (danhmuc.id) {
            let url = `${this.danhmucUrl}/${danhmuc.id}`;
             return this.http
                    .put(url, JSON.stringify(danhmuc), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        } else {
             return this.http
                    .post(this.danhmucUrl, JSON.stringify(danhmuc), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        }
       
    }

    private compareDanhMuc(a:DanhMuc, b:DanhMuc) {
        if (a.level < b.level) {
            return -1;
        }

        if (a.level > b.level) {
            return 1;
        }

        if (a.position < b.position) {
            return -1;
        }

        if (a.position > b.position) {
            return 1;
        }

        if (a.name < b.name) {
            return - 1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    private findDanhMucInList(danhmucs: DanhMuc[], dmId: String): DanhMuc {
        for (let dm of danhmucs) {
            if (dm.children.length > 0) {
                let danhmuc: DanhMuc = this.findDanhMucInList(dm.children, dmId);
                if (danhmuc) {
                    return danhmuc;
                }
            }

            if (dm.id === dmId) {
                return dm;
            }
        }
    }

    sortDanhMucs(danhmucs: DanhMuc[]): DanhMuc[]{
        let dms = danhmucs.sort(this.compareDanhMuc);
        dms.forEach(dm => {
            if (dm.children.length > 0) {
                dm.children = this.sortDanhMucs(dm.children);
            }
        });

        return dms;
    }

    addDanhMucToRootList(danhmucs: DanhMuc[], danhmuc: DanhMuc): DanhMuc[] {
        danhmucs.push(danhmuc);

        return danhmucs.sort(this.compareDanhMuc);
    }

    addDanhMucToLevelInList(danhmucs: DanhMuc[], danhmuc: DanhMuc): DanhMuc[] {
        let parent: DanhMuc = this.findDanhMucInList(danhmucs, danhmuc.parentId);
        if (parent) {
            if (parent.children.length > 0) {
                parent.children.push(danhmuc);
            } else {
                parent.children = [];
                parent.children.push(danhmuc);
            }

            parent.children = parent.children.sort(this.compareDanhMuc);
            return danhmucs;
        } else {
            return this.addDanhMucToRootList(danhmucs, danhmuc);
        }
    }

    updateSpecificDanhMucInList(danhmucs: DanhMuc[], danhmuc: DanhMuc): DanhMuc[] {
        if (danhmuc.parentId) {
            let parent = this.findDanhMucInList(danhmucs, danhmuc.parentId);
            if (parent) {
                if (parent.children.length > 0) {
                    let children: DanhMuc[] = parent.children;
                    parent.children = this.spliceDanhMuc(children, danhmuc);
                }

                return danhmucs;
            }
        }

        // update danh muc at root of list
        return this.spliceDanhMuc(danhmucs, danhmuc);
    }

    private spliceDanhMuc(danhmucs: DanhMuc[], danhmuc: DanhMuc): DanhMuc[] {
        let deleteCount: number = 1;
        let indexStart = danhmucs.findIndex(dm => dm.id === danhmuc.id);

        if (indexStart >= 0) {
            danhmucs.splice(indexStart, deleteCount, danhmuc);
        } 

        return danhmucs.sort(this.compareDanhMuc);
    }

    private handleError (error: any) {
        console.log('An error occurred at danh muc service:', error);
        return Observable.throw(error.message || error);
    }
}