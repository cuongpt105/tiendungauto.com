class CommonUtil {
    constructor(){}

    mergeCollection(firstCollects, secondCollects) {
        let collects = [];

        if (firstCollects.length > 0) {
            for (let object of firstCollects) {
                collects.push(object);
            }
        }

        if (secondCollects.length > 0) {
            for (let object of secondCollects) {
                collects.push(object);
            }
        }

        return collects;
    }

    getOrderByField(fieldOrderByOriginal) {
        let result = "-modifyDate";
        let fields = (""+fieldOrderByOriginal).split('-');
        
        if (fields[0] === 'date') {
            result = 'modifyDate';
        } else if (fields[0] === 'price') {
            result = 'priceSell';
        }

        if (fields.length > 1) {
            if (fields[1] === 'desc') {
                result = "-"+result;
            }
        }

        return result;
    }
}

module.exports = new CommonUtil();