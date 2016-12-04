var headerRoutes = require('./header.routes.js');
var gioithieuRoutes = require('./gioi-thieu.routes.js');
var bandoRoutes = require('./ban-do.routes.js');
var thanhtoanRoutes = require('./thanh-toan.routes.js');
var dichvuRoutes = require('./dich-vu.routes.js');
var tintucRoutes = require('./tin-tuc.routes.js');
var tintucfileRoutes = require('./tin-tuc-file.routes.js');
var danhmucRoutes = require('./danh-muc.routes.js');
var productRoutes = require('./product.routes.js');
var productImageRoutes = require('./product-image.routes.js');
var galleryRoutes = require('./gallery.routes.js');
var fileSystemRoutes = require('./file-system.routes.js')

module.exports = (app, router) => {
   router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       next();
    });

    gioithieuRoutes(app, router);
    headerRoutes(app, router);
    bandoRoutes(app, router);
    thanhtoanRoutes(app, router);
    dichvuRoutes(app, router);
    tintucRoutes(app, router);
    tintucfileRoutes(app, router);
    danhmucRoutes(app, router);
    productRoutes(app, router);
    productImageRoutes(app, router);
    galleryRoutes(app, router);
    fileSystemRoutes(app, router);

    app.use('/api', router);

    //app.get('*', (req, res) => {
    //    res.sendFile('../client/index.html');
    //});
}