var HandleException = require('../util/handleException');

var BanDoEntity = require('../entity/ban-do.entity');
var BanDo = require('../model/ban-do.model');

var BanDoService = require('../service/ban-do.service');

module.exports = (app, router) => {
    let bandoService = new BanDoService();
    let handleException = new HandleException("BanDoRouter");

    router.route("/bando")
        .post(function(req, res){
            let bando = new BanDoEntity();
            bando.title = req.body.title;
            bando.address = req.body.address;
            bando.phone = req.body.phone;
            bando.email = req.body.email;
            bando.website = req.body.website;
            bando.map = req.body.map;

            bando.save(function(err, bandoEntity){
                if (err) {
                    handleException.logMessageWithError("POST /bando", "bando.save", err);
                    res.status(400).send(err);    
                }

                res.json(BanDoService.convertEntityToModel(bandoEntity));
            });
        })

        .get(function(req, res) {
            bandoService.findAllBanDo(function(err, bandos){
                if (err) {
                    handleException.logMessageWithError("GET /bando", "bandoService.findAllBanDo", err);
                    res.status(400).send(err);     
                }

                res.json(bandos);
            });
        });

    router.route("/bando/:bando_id")
        .get(function(req, res){
            bandoService.findBanDoById(req.params.bando_id, function(err, bando){
                if (err) {
                    handleException.logMessageWithError("GET /bando/:bando_id", "bandoService.findBanDoById", err);
                    res.status(400).send(err);     
                }

                res.json(bando);
            });
        })

        .put(function(req,res){
            BanDoEntity.findById(req.params.bando_id, function(err, bandoEntity){
                if (err) {
                    handleException.logMessageWithError("PUT /bando/:bando_id", "BanDoEntity.findById", err);
                    res.status(400).send(err);     
                }

                bandoEntity = Object.assign(bandoEntity, req.body);

                bandoEntity.save(function(err){
                    if (err) {
                        handleException.logMessageWithError("PUT /bando/:bando_id", "bandoEntity.save", err);
                        res.status(400).send(err);     
                    }

                    res.json(BanDoService.convertEntityToModel(bandoEntity));
                });
            });
        })

        .delete(function(req, res){
            BanDoEntity.remove({_id: req.params.bando_id}, function(err, bandoEntity){
                if (err) {
                    handleException.logMessageWithError("DELETE /bando/:bando_id", "BanDoEntity.remove", err);
                    res.status(400).send(err);     
                }

                bandoService.findAllBanDo(function(err, bandos){
                    if (err) {
                        handleException.logMessageWithError("DELETE /bando/:bando_id", "bandoService.findAllBanDo", err);
                        res.status(400).send(err);     
                    }

                    res.json(bandos);
                })
            })
        });
}