var HandleException = require('../util/handleException');

var BanDoEntity = require('../entity/ban-do.entity');
var BanDo = require('../model/ban-do.model');

var handleException = new HandleException("BanDoService");

module.exports = class BanDoService {
    constructor(){}

    findAllBanDo(callback) {
        BanDoEntity.find({}, function(err, bandoEntities){
            if (err) {
                handleException.logMessageWithError("findAllBanDo", "BanDoEntity.find", err);
                callback(err);
            } else {
                callback(err, BanDoService.convertEntitiesToModels(bandoEntities));
            }
        });
    }

    findBanDoById(id, callback) {
        BanDoEntity.findById(id, function(err, bandoEntity){
            if (err) {
                handleException.logMessageWithError("findBanDoById", "BanDoEntity.findById", err);
                callback(err);
            } else {
                if (bandoEntity) {
                    callback(err, BanDoService.convertEntityToModel(bandoEntity));
                } else {
                    callback(new Error("Ban do nay khong ton tai trong he thong. Lam on thong bao loi nay toi admin."));
                }
            }
        });
    }

    static convertEntityToModel(bandoEntity) {
        let bando = new BanDo(bandoEntity._id, bandoEntity.title, 
                bandoEntity.address, bandoEntity.phone, bandoEntity.email, 
                bandoEntity.website, bandoEntity.map);
        return bando;
    }

    static convertEntitiesToModels(bandoEntities) {
        let bandos = [];
        for (let bandoEntity of bandoEntities) {
            let bando = BanDoService.convertEntityToModel(bandoEntity);
            bandos.push(bando);
        }

        return bandos;
    }
}