module.exports = class Product {
    constructor(id, name, code, shortDescription, detailDescription,
        priceOriginal, priceSell, pricePromotion,
        position, status, producer, quantity, guarantee, 
        vat, unit, seoTitle, seoKeyword, seoDescription, isDraft, modidfyDate,
        danhmuc, mainImage, imagesDetail){

        this.id = id;
        this.name = name;
        this.code = code;
        this.shortDescription = shortDescription;
        this.detailDescription = detailDescription;
        this.priceOriginal = priceOriginal;
        this.priceSell = priceSell;
        this.pricePromotion = pricePromotion;
        this.position = position;
        this.status = status;
        this.producer = producer;
        this.quantity = quantity;
        this.guarantee = guarantee;
        this.vat = vat;
        this.unit = unit;
        this.seoTitle = seoTitle;
        this.seoKeyword = seoKeyword;
        this.seoDescription = seoDescription;
        this.isDraft = isDraft;
        this.modifyDate = modidfyDate;

        this.danhmuc = danhmuc;
        this.mainImage = mainImage;
        this.imagesDetail = imagesDetail;
    }
}