module.exports = class ProductReview {
    constructor(id, productId, name, email, rate, date, comment) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.email = email;
        this.rate = rate;
        this.date = date;
        this.comment = comment;
    }
}
