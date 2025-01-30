
const usersController = {
    showLogin: (req, res) => {
        res.render('users/login',{title: 'Pagina de logueo'});
    },
    showRegister: (req, res) => {
        res.render('users/register',{title: 'Pagina de registro'});
    }
}

module.exports = usersController;

