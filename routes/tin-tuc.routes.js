var HandleException = require('../util/handleException');

var TinTucEntity = require('../entity/tin-tuc.entity');
var TinTuc = require('../model/tin-tuc.model');

var TinTucService = require('../service/tin-tuc.service');

module.exports = (app, router) => {
    let tintucService = new TinTucService();
    let handleException = new HandleException("tintucRouter");

    router.route("/tintuc")
        .post(function(req, res){
            let tintuc = TinTucService.convertRequestToEntityForNew(req);

            tintuc.save(function(err, tintucEntity){
                if (err) {
                    handleException.logMessageWithError("POST /tintuc", "tintuc.save", err);
                    res.status(500).send(err);    
                }

                res.json(TinTucService.convertEntityToModel(tintucEntity));
            });
        })

        .get(function(req, res) {
            tintucService.findAllTinTuc(function(err, tintucs){
                if (err) {
                    handleException.logMessageWithError("GET /tintuc", "tintucService.findAllTinTuc", err);
                    res.status(500).send(err);    
                }

                res.json(tintucs);
            });
        });

    router.route("/tintuc/:tintuc_id")
        .get(function(req, res){
            tintucService.findTinTucById(req.params.tintuc_id, function(err, tintuc){
                if (err) {
                    handleException.logMessageWithError("GET /tintuc/:tintuc_id", "tintucService.findTinTucById", err);
                    res.status(500).send(err);    
                }

                res.json(tintuc);
            });
        })

        .put(function(req,res){
            TinTucEntity.findById(req.params.tintuc_id, function(err, tintucEntity){
                if (err) {
                    handleException.logMessageWithError("PUT /tintuc/:tintuc_id", "TinTucEntity.findById", err);
                    res.status(500).send(err);    
                }

                tintucEntity = TinTucService.convertRequestToEntityForUpdate(tintucEntity, req);

                tintucEntity.save(function(err){
                    if (err) {
                        handleException.logMessageWithError("PUT /tintuc/:tintuc_id", "tintucEntity.save", err);
                        res.status(500).send(err);    
                    }

                    res.json(TinTucService.convertEntityToModel(tintucEntity));
                });
            });
        })

        .delete(function(req, res){
            TinTucEntity.remove({_id: req.params.tintuc_id}, function(err, tintucEntity){
                if (err) {
                    handleException.logMessageWithError("DELETE /tintuc/:tintuc_id", "TinTucEntity.remove", err);
                    res.status(500).send(err);    
                }

                tintucService.findAllTinTuc(function(err, tintucs){
                    if (err) {
                        handleException.logMessageWithError("DELETE /tintuc/:tintuc_id", "tintucService.findAllTinTuc", err);
                        res.status(500).send(err);    
                    }

                    res.json(tintucs);
                })
            })
        });
}