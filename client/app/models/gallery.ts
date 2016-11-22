export class Gallery {
    title: string;
    name: string;
    path: string;
    productId: string;

    public constructor(title: string, name : string, path : string, productId: string) {
        this.name = name;
        this.title = title;
        this.path = path;
        this.productId = productId;
    }
}