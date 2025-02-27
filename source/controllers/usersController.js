const {v4:uuidv4, validate } = require('uuid'); // este modulo me genera un id unico
const bcrypt = require('bcrypt'); // libreria util para encriptar contraseñas con hash y compare
const { route, lock } = require('../routes');
const fs = require('fs');
const path = require('path');


// Ruta al archivo JSON
const dataPath = path.join(__dirname, '..', 'data', 'users.json');

// Función para leer los datos del archivo JSON
const readData = () => {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
}

// Función para guardar los datos en el archivo JSON
const saveData = (data) => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(dataPath, jsonData, 'utf-8');
}

const usersController = {
    login: (req, res) => {
        res.render('users/login',{title: 'Pagina de logueo'});
    },
    register: (req, res) => {
        res.render('users/register',{title: 'Pagina de registro'});
    },

    processRegister: (req, res) => {

        const users = readData();
        const {firstName, lastName, email, password} = req.body;

        // Verifica si hay una imagen subida
        const image = req.file ? req.file.filename : '';


        // Log para verificar el nombre del archivo
        console.log('Imagen subida:', image);

        const newUser = {
            id : uuidv4(),
            firstName : firstName.trim(), //si el valor no llega, me da undefined y da error
            lastName : lastName.trim(),
            email: email.trim(),
            password: bcrypt.hashSync(password, 10),
            image: image,
            token: null, // clave que se envia por mail para validar formulario de registro
            validate: true, // queda en true cuando el usuario confirma el token en su mail
            lock: false, // el usuario no esta bloqueado, si le pongo true lo bloqueo 
            roll: 'user' //por defecto esta en usuario el roll, pero lo puedo dejar vacio y debo modificar la vista de registro para incluir un input de admin

        }

        users.push(newUser);
        saveData(users);
        return res.redirect('/login');
    },

    processLogin: (req, res) => {
        try {
            const users = readData(); // Leer los datos de los usuarios
            const { email, password, recordarme } = req.body; // Extraer email y password del cuerpo de la solicitud
    
            // Buscar el usuario por email y comparar la contraseña
            const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password));
    
            if (!user) {
                // Si no se encuentra el usuario o la contraseña no coincide, redirigir al login con un error
                return res.render('users/login', {
                    title: 'Pagina de logueo',
                    error: 'Credenciales no válidas'
                });
            }
    
            // Establecer la sesión del usuario
            req.session.userLogin = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                roll: user.roll,
                image: user.image 
            };

            // Si el usuario opta por ser recordado, establecer una cookie
            if (recordarme) {
                res.cookie('userLogin', req.session.userLogin, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // La cookie dura 30 días
            }
    
            // Redirigir a la página de perfil
            return res.redirect('/');
    
        } catch (error) {
            console.error("Error en el proceso de login:", error);
            // Redirigir al login con un error genérico en caso de excepción
            return res.render('users/login', {
                title: 'Pagina de logueo',
                error: 'Ocurrió un error, por favor intente nuevamente'
            });
        }
    },
    

        profile: (req, res) => {
            if (!req.session.userLogin) {
                return res.redirect('/login');
            }
            res.render('users/profile', { title: 'Perfil del usuario', user: req.session.userLogin });
        },
    

        logout: (req, res) => {
            req.session.destroy();
            res.clearCookie("userLogin"); 
            res.redirect("/login")
        },

        update: (req, res) => {

        },


}

module.exports = usersController;

