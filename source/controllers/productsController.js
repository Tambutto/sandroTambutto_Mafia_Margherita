let productsController = {
    showDetail: (req, res) => {
        res.render('products/productDetail',{title: 'Detalle del producto'});
    },
    showCart: (req, res) => {
        res.render('products/productCartl',{title: 'Carrito de compras'});    
    }
    // show: (req, res) => {
    //     res.render('products/productDetail',{title: 'Detalle del producto'});
    // }
}


module.exports = productsController;