// Middleware para verificar la cookie del usuario
const userCookie = (req, res, next) => {
    if (req.cookies && req.cookies.userLogin && !req.session.userLogin) {
        req.session.userLogin = req.cookies.userLogin; //Esta línea establece la sesión userLogin utilizando el valor de la cookie userLogin. Básicamente, transfiere la información de la cookie a la sesión.
    }
    next();
}

module.exports = userCookie;

/* Este middleware verifica tres cosas:

req.cookies: Comprueba si hay cookies presentes en la solicitud.

req.cookies.userLogin: Verifica si la cookie userLogin existe.

!req.session.userLogin: Asegura que la sesión userLogin no esté ya establecida.

La condición completa se asegura de que solo se ejecute el siguiente bloque de código si las cookies están presentes, la cookie userLogin existe, y la sesión userLogin no está ya establecida. */