export class MenuItem {
    name: string;
    value: string;
    linkRef: string;
    
    public constructor(name : string, value : string, linkRef : string) {
        this.name = name;
        this.value = value;
        this.linkRef = linkRef;
    }
}