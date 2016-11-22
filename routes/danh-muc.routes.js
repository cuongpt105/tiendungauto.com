var HandleException = require('../util/handleException');

var DanhMucEntity = require('../entity/danh-muc.entity');
var DanhMuc = require('../model/danh-muc.model');

var DanhMucService = require('../service/danh-muc.service');

module.exports = (app, router) => {
    let danhmucService = new DanhMucService();
    let handleException = new HandleException("DanhMucRouter");

    router.route("/danhmuc")
        .post(function(req, res){
            let danhmuc = new DanhMucEntity();
            danhmuc.name = req.body.name;
            danhmuc.description = req.body.description;
            danhmuc.position = req.body.position;
            danhmuc.level = req.body.level;
            danhmuc.status = req.body.status;
            danhmuc.seoTitle = req.body.seoTitle;
            danhmuc.seoKeyword = req.body.seoKeyword;
            danhmuc.seoDescription = req.body.seoDescription;
            danhmuc.parentId = req.body.parentId;

            danhmuc.save(function(err, danhmucEntity){
                if (err) {
                    handleException.logMessageWithError("POST /danhmuc", "danhmuc.save", err);
                    res.status(400).send(err);    
                }

                res.json(DanhMucService.convertEntityToModel(danhmucEntity));
            });
        })

        .get(function(req, res) {
            danhmucService.findAllDanhMuc(function(err, danhmucs){
                if (err) {
                    handleException.logMessageWithError("GET /danhmuc", "danhmucService.findAllDanhMuc", err);
                    res.status(400).send(err);    
                }

                res.json(danhmucs);
            });
        });

    router.route("/danhmuc/:danhmuc_id")
        .get(function(req, res){
            danhmucService.findDanhMucById(req.params.danhmuc_id, function(err, danhmuc){
                if (err) {
                    handleException.logMessageWithError("GET /danhmuc/:danhmuc_id", "danhmucService.findDanhMucById", err);
                    res.status(400).send(err);    
                }

                res.json(danhmuc);
            });
        })

        .put(function(req,res){
            DanhMucEntity.findById(req.params.danhmuc_id, function(err, danhmucEntity){
                if (err) {
                    handleException.logMessageWithError("PUT /danhmuc/:danhmuc_id", "DanhMucEntity.findById", err);
                    res.status(400).send(err);    
                }

                danhmucEntity = Object.assign(danhmucEntity, req.body);

                danhmucEntity.save(function(err){
                    if (err) {
                        handleException.logMessageWithError("PUT /danhmuc/:danhmuc_id", "danhmucEntity.save", err);
                        res.status(400).send(err);    
                    }

                    let result = DanhMucService.convertEntityToModel(danhmucEntity);
                    result.children = req.body.children;
                    res.json(result);
                });
            });
        })

        .delete(function(req, res){
            danhmucService.deleteDanhMuc(req.params.danhmuc_id, function(err, danhmucs){
                if (err) {
                    handleException.logMessageWithError("DELETE /danhmuc/:danhmuc_id", " danhmucService.deleteDanhMuc", err);
                    res.status(400).send(err);    
                } else {
                    res.json(danhmucs);
                }
            });
        });
}