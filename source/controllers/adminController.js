const pizzeria = require("../data/pizzeria");

let adminController = {
    show: (req, res) => {
        res.render('admin/admin',{ title: 'Pizzería', pizzeria });
    }   

}

module.exports = adminController;