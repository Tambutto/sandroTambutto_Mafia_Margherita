let registerController = {
    show: (req, res) => {
        res.render('users/register',{title: 'Pagina de regitro'});
    }   

}

module.exports = registerController;