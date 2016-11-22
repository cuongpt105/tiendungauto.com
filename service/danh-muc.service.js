var HandleException = require('../util/handleException');

var DanhMucEntity = require('../entity/danh-muc.entity');
var DanhMuc = require('../model/danh-muc.model');
var danhmucDao = require('../dao/danh-muc.dao');
var async = require('async');

var handleException = new HandleException("DanhMucService");

module.exports = class DanhMucService {
    constructor(){}

    findAllDanhMuc(callback) {
        danhmucDao.findDanhMucs(function(err, danhmucEntities){
            if (err) {
                handleException.logMessageWithError("findAllDanhMuc", "danhmucDao.findDanhMucs", err);
                callback(err);
            } else {
                let dms = DanhMucService.convertEntitiesToModels(danhmucEntities);
                let parents = dms.filter(dm => {
                    if (dm.parentId) {
                        return false;
                    } else {
                        return true;
                    }
                })

                for (let danhmuc of parents) {
                    let danhmucService = new DanhMucService();
                    let children = danhmucService.findChildrenOfParent(danhmuc, dms);
                    if (children && children.length > 0) {
                        danhmuc.children = children;
                    }
                }

                callback(err, parents);
            }
        });
    }

    findChildrenOfParent(parent, dms) {
        let children = dms.filter(dm => {
            let parentId = ""+parent.id;
            let parentIdOfDanhmuc = ""+dm.parentId;
            return parentId === parentIdOfDanhmuc;
        });
        
        if (children && children.length > 0) {
            for (let child of children) {
                child.parentId = parent.id;

                let danhmucService = new DanhMucService();
                let childrenOfChildren = danhmucService.findChildrenOfParent(child, dms);
                if (childrenOfChildren && childrenOfChildren.length > 0) {
                    child.children = childrenOfChildren;
                }
            }
        }

        return children;
    }

    /**
     * This function will find current danh muc and then push it into the list. 
     * The find all children and push into the list
     */
    findDanhMucsIncludeChildren(parentId, dms, danhmucsResult) {
        let parent = dms.filter(dm => {
            let dmId = ""+dm.id;
            let parentCompareId = ""+parentId;
            return parentCompareId === dmId;
        });

        if (parent && parent.length > 0) {
            danhmucsResult.push(parent[0]);
        }

        // find children of this parent
        let children = dms.filter(dm => {
            let parentOfCurrent = ""+parentId;
            let parentIdOfDanhmuc = ""+dm.parentId;
            return parentOfCurrent === parentIdOfDanhmuc;
        });

        if (children && children.length > 0) {
            for (let child of children) {
                let danhmucService = new DanhMucService();
                danhmucService.findDanhMucsIncludeChildren(child.id, dms, danhmucsResult);
            }
        }
    }

    findDanhMucsIncludeChidlrenAsListById(id, callback) {
        let danhmucs = [];
        let dmIds = [];

        let d = new Date();
        danhmucDao.findDanhMucs(function(err, danhmucEntities){
            if (err) {
                handleException.logMessageWithError("findAllDanhMuc", "danhmucDao.findDanhMucs", err);
                callback(err);
            } else {
                let dms = DanhMucService.convertEntitiesToModels(danhmucEntities);
                let current = dms.filter(dm => ""+dm.id === ""+id);
                danhmucs.push(current[0]);
                dmIds.push(id);

                while (dmIds.length > 0) {
                    let dmParentId = dmIds[0];
                    let children = dms.filter(dm => ""+dm.parentId === ""+dmParentId);
                    if (children && children.length > 0) {
                        for (let child of children) {
                            dmIds.push(child.id);
                            danhmucs.push(child);
                        }
                    }

                    dmIds.shift();
                }
                
                let a = new Date();
                callback(err, danhmucs);
            }
        });
        /*
        async.series([
            // load current danh muc
            function(cb) {
                let danhMucService = new DanhMucService();
                danhMucService.findDanhMucById(id, function(err, danhmuc){
                    if (err) cb(err);

                    danhmucs.push(danhmuc);
                    dmIds.push(danhmuc.id);
                    cb();
                });
            },

            // load all danh muc children of parent
            function(cb) {
                async.whilst(
                    function () { return dmIds.length > 0; },
                    function (cb) {
                        let dmParentId = dmIds[0];
                        danhmucDao.findDanhMucsOfParent(dmParentId, function(err, dmsEntities) {
                            if (err) cb(err);

                            if (dmsEntities && dmsEntities.length > 0) {
                                let dms = DanhMucService.convertEntitiesToModels(dmsEntities);
                                
                                for (let dm of dms) {
                                    dmIds.push(dm.id);
                                    danhmucs.push(dm);
                                }
                            }
                            
                            // remove current parent out of list of danh muc id
                            dmIds.shift();
                            cb();
                        });
                    },
                    function (err) {
                         if (err) cb(err);
                         cb();
                    }
                );
            }
        ],
        
        // final send all danhmucs back to place call this function
        function(err){
            if (err) callback(err);
            callback(err, danhmucs);
        });*/
    }

    findDanhMucById(id, callback) {
        danhmucDao.findDanhMucById(id, function(err, danhmucEntity){
            if (err) {
                handleException.logMessageWithError("findDanhMucById", "danhmucDao.findDanhMucById", err);
                callback(err);
            } else {
                if (danhmucEntity) {
                    callback(err, DanhMucService.convertEntityToModel(danhmucEntity));
                } else {
                    callback(new Error("Danh muc nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin"));
                }
            }

            
        });
    }

    deleteDanhMuc(id, callback) {
        danhmucDao.findDanhMucById(id, function(err, danhmucEntity){
            if (err) {
                handleException.logMessageWithError("deleteDanhMuc", "danhmucDao.findDanhMucById", err);
                callback(err);
            } else {
                if (danhmucEntity) {
                    let danhmucService = new DanhMucService();
                    danhmucDao.findDanhMucs(function(err, danhmucEntities){
                        if (err) {
                            handleException.logMessageWithError("findAllDanhMuc", "danhmucDao.findDanhMucs", err);
                            callback(err);
                        } else {
                            let dms = DanhMucService.convertEntitiesToModels(danhmucEntities);
                            let result = [];
                            danhmucService.findDanhMucsIncludeChildren(danhmucEntity._id, dms, result);
                            for (let dm of result) {
                                DanhMucEntity.remove({_id:dm.id},function(err,entity){
                                    if (err) {
                                        handleException.logMessageWithError("deleteDanhMuc", "DanhMucEntity.remove", err);
                                    }
                                });
                            }

                            danhmucService.findAllDanhMuc(function(err, dms){
                                callback(err,dms);
                            });
                        }
                    });
                    
                } else {
                    let message = "Danh muc nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin.";
                    handleException.logMessageWithError("deleteDanhMuc", message, err);
                    callback(new Error(message));
                }
            }
        });
    }

    static convertEntityToModel(danhmucEntity) {
        let children = [];
        let danhmuc = new DanhMuc(danhmucEntity._id, danhmucEntity.name,
                danhmucEntity.description, danhmucEntity.position, danhmucEntity.level, danhmucEntity.status,
                danhmucEntity.seoTitle, danhmucEntity.seoKeyword, danhmucEntity.seoDescription, 
                danhmucEntity.parentId, children);
        return danhmuc;
    }

    static convertEntitiesToModels(danhmucEntities) {
        let danhmucs = [];
        for (let danhmucEntity of danhmucEntities) {
            let danhmuc = DanhMucService.convertEntityToModel(danhmucEntity);
            danhmucs.push(danhmuc);
        }

        return danhmucs;
    }
}