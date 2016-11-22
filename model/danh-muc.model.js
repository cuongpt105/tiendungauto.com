module.exports = class DanhMuc {
    constructor(id, name, description, position, level, status, 
        seoTitle, seoKeyword, seoDescription, 
        parentId, children){

        this.id = id;
        this.name = name;
        this.description = description;
        this.position = position;
        this.level = level;
        this.status = status;
        this.seoTitle = seoTitle;
        this.seoKeyword = seoKeyword;
        this.seoDescription = seoDescription;
        this.parentId = parentId;
        this.children = children;
    }
}