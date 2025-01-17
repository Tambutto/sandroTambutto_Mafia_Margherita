let loginController = {
    show: (req, res) => {
        res.render('users/login',{title: 'Pagina de logueo'});
    }   

}

module.exports = loginController;