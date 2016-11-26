export class DanhMuc {
    id: String;
    name: String;
    description: String;
    position: number;
    level: number;
    //image:
    status: Boolean;
    seoTitle: String;
    seoKeyword: String;
    seoDescription: String;

    parentId: String;
    children: DanhMuc[];
}