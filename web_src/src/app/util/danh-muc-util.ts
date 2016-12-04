import { DanhMuc } from '../admin/model/danhmuc';

export class DanhMucUtil {
    static convertTreeDMToListDM(dms: DanhMuc[]): DanhMuc[] {
        let danhMucs: DanhMuc[] = [];
        for (let dm of dms) {
            this.addChildrenToList(danhMucs, dm);
        }

        return danhMucs;
    }

    private static addChildrenToList(danhMucList: DanhMuc[], currentDanhMuc: DanhMuc) {
        danhMucList.push(currentDanhMuc);

        if (currentDanhMuc.children && currentDanhMuc.children.length > 0) {
            for (let dm of currentDanhMuc.children) {
                this.addChildrenToList(danhMucList, dm);
            }
        }
    }
}