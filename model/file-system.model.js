module.exports = class FileSystem {
    constructor(id, fileName, orginalName, size, pathFile){
        this.id = id;
        this.fileName = fileName;
        this.originalName = orginalName;
        this.size = size;
        this.pathFile = pathFile;
    }
}