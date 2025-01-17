let productControler = {
    show: (req, res) => {
        res.render('products/productDetail',{title: 'Detalle del producto'});
    }   

}

module.exports = productControler;