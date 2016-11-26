export class HeaderInfo {
    name: string;
    title: string;
    keyword: string;
    description: string;
    
    public constructor(name: string, title : string, keyword : string, description : string) {
        this.name = name;
        this.title = title;
        this.keyword = keyword;
        this.description = description;
    }
}