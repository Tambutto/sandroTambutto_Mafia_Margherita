// const bcrypt = require('bcrypt'); // libreria util para encriptar contraseñas con hash y compare
const bcrypt = require('bcryptjs');
// Ruta al archivo JSON
// const dataPath = path.join(__dirname, '..', 'data', 'users.json');

// Función para leer los datos del archivo JSON
// const readData = () => {
//     const jsonData = fs.readFileSync(dataPath, 'utf-8');
//     return JSON.parse(jsonData);
// }

// Función para guardar los datos en el archivo JSON
// const saveData = (data) => {
//     const jsonData = JSON.stringify(data);
//     fs.writeFileSync(dataPath, jsonData, 'utf-8');
// }

// Usandro Express-validator

const { validationResult } = require('express-validator'); // Este metodo me permite obtener el resultado de todas las validaciones previas


// Usando sequelize:

// const { Sequelize } = require("../database/models");

const { User, Role} = require('../database/models'); // Importa el modelo User



const usersController = {

    login: (req, res) => {
        res.render('users/login',{title: 'Pagina de logueo'});
    },

    register: (req, res) => {
        res.render('users/register',{title: 'Pagina de registro', errors: []});
    },

    processRegister: async (req, res, next) => {
        try {
            // const users = readData();
            const {firstName, lastName, email, password, roleId} = req.body;

            const errors = validationResult(req); // Obtiene los errores de validación
            console.log(errors.array()); // Verifica si los errores son generados
            if (!errors.isEmpty()) {
                return res.render('users/register', {
                    title: 'Pagina de registro',
                    errors: errors.array(), // Pasa los errores a la vista
                    
                });
        }
            // Validación de usuario único
            const userExists = await User.findOne({ where: { email } }) // Verifica si el usuario ya existe ne la base de datos, pero ya lo tengo declarado en el middleware de registerValidator
            
            if (userExists) {
                return res.render('users/register', {
                    title: 'Pagina de registro',
                    error: 'El email ya está registrado.',
                });
        }

        // Verifica si hay una imagen subida
        const image = req.file ? req.file.filename : '';


        // Log para verificar el nombre del archivo
        console.log('Imagen subida:', image);

        // const newUser = {
        //     id : uuidv4(),
        //     firstName : firstName.trim(), //si el valor no llega, me da undefined y da error
        //     lastName : lastName.trim(),
        //     email: email.trim(),
        //     password: bcrypt.hashSync(password, 10),
        //     image: image,
        //     token: null, // clave que se envia por mail para validar formulario de registro
        //     validate: true, //  queda en true cuando el usuario confirma el token en su mail
        //     lock: false, // el usuario no esta bloqueado, si le pongo true lo bloqueo 
        //     roll: 'user' // por defecto esta en usuario el roll, pero lo puedo dejar vacio y debo modificar la vista de registro para incluir un input de admin

        // }
        // users.push(newUser);
        // saveData(users);

        // Usando sequelize:

        // Crear el nuevo usuario en la base de datos
        const newUser = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: bcrypt.hashSync(password, 10),
            image: image,
            token: null, // Puedes agregar lógica para generar el token si lo necesitas
            isValidated: false, // Ajusta el campo según tu esquema de base de datos
            lock: false,
            roleId: roleId || 2,
        });

        console.log('Usuario registrado:', newUser);

        return res.redirect('/login');

         

        } catch (error) {
            console.error("Error en el proceso de registro:", error);
            return res.render('users/register', {
                title: 'Pagina de registro',
                error: 'Ocurrió un error, por favor intente nuevamente'
            });
        }
    },
    // processLogin: (req, res) => {
    //     try {
    //         const users = readData(); // Leer los datos de los usuarios
    //         const { email, password, recordarme } = req.body; // Extraer email y password del cuerpo de la solicitud
    
    //         // Buscar el usuario por email y comparar la contraseña
    //         const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password));
    
    //         if (!user) {
    //             // Si no se encuentra el usuario o la contraseña no coincide, redirigir al login con un error
    //             return res.render('users/login', {
    //                 title: 'Pagina de logueo',
    //                 error: 'Credenciales no válidas'
    //             });
    //         }
    
    //         // Establecer la sesión del usuario
    //         req.session.userLogin = {
    //             id: user.id,
    //             firstName: user.firstName,
    //             lastName: user.lastName,
    //             roll: user.roll,
    //             image: user.image 
    //         };

    //         // Si el usuario opta por ser recordado, establecer una cookie
    //         if (recordarme) {
    //             res.cookie('userLogin', req.session.userLogin, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // La cookie dura 30 días
    //         }
    
    //         // Redirigir a la página de perfil
    //         return res.redirect('/');
    
    //     } catch (error) {
    //         console.error("Error en el proceso de login:", error);
    //         // Redirigir al login con un error genérico en caso de excepción
    //         return res.render('users/login', {
    //             title: 'Pagina de logueo',
    //             error: 'Ocurrió un error, por favor intente nuevamente'
    //         });
    //     }
    // },

        processLogin: async (req, res) => {
        try {

         
            const { email, password, recordarme } = req.body; // Extraer email y password del cuerpo de la solicitud

            // Capturar los errores de validación
            const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.render('users/login', {
                        title: 'Página de Login',
                        errors: errors.array(),
                    });
        }

            // Buscar el usuario en la base de datos
            const user = await User.findOne({ where: { email } });
            if (!user || !bcrypt.compareSync(password, user.password)) {
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
                role: user.role, //Asegura establecer un rol por defect como user 
                // roll: user.roll,
                image: user.image,
            };
        // Si el usuario opta por ser recordado, establecer una cookie
            if (recordarme) {
                res.cookie('userLogin', req.session.userLogin, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // La cookie dura 30 días
            }

            return res.redirect('/');
            } catch (error) {
            console.error("Error en el proceso de login:", error);
            return res.render('users/login', {
                title: 'Pagina de logueo',
                error: 'Ocurrió un error, por favor intente nuevamente.',
            });
            }
         },

        // profile: async (req, res) => {
        //     if (!req.session.userLogin) {
        //         return res.redirect('/login'); // Si no hay sesión, redirige al login
        //     }

        //     try{
        //         // Buscar al usuario en la base de datos usando el ID de la sesión
        //         const user = await User.findByPk(req.session.userLogin.id, {
        //             include: { model: Rol, as: 'role' } // Incluye la información del rol
        //         });

        //         if (!user) {
        //             console.log('Usuario no encontrado en la base de datos.');
        //             return res.redirect('/login'); // Redirige si el usuario no existe
        //         }

        //         // Verifica si el usuario es admin
        //         const isAdmin = user.role && user.role.tipo === 'Admin';

        //         // Renderiza la vista con la información del usuario
        //         res.render('users/profile', { 
        //             title: 'Perfil del usuario', 
        //             user: user,
        //             isAdmin: isAdmin // Pasa esta variable a la vista
        //         });

        //         // Renderiza la vista con el usuario encontrado en la base de datos
        //         res.render('users/profile', { title: 'Perfil del usuario', user: user // Pasa el objeto actualizado del usuario 

        //         });
        //     } catch (error) { 
        //         console.error("Error al obtener el perfil: ", error.message );
        //         res.redirect('/login');// Redirige en caso de un error
        //     }
        // },

        profile: async (req, res) => {
            if (!req.session.userLogin || !req.session.userLogin.id) {
                console.log('Sesión no encontrada o inválida. Redirigiendo a login.');
                return res.redirect('/login'); // Si no hay sesión, redirige al login
            }
        
            try {
                // Buscar al usuario en la base de datos usando el ID de la sesión
                const user = await User.findByPk(req.session.userLogin.id, {
                    include: { model: Role, as: 'role' } // Incluye la información del rol
                });
        
                if (!user) {
                    console.log('Usuario no encontrado en la base de datos.');
                    return res.redirect('/login'); // Redirige si el usuario no existe
                }
        
                // Verifica si el usuario es admin
                const isAdmin = user?.role?.tipo === 'Admin';
        
                // Renderiza la vista con la información del usuario
                return res.render('users/profile', { 
                    title: 'Perfil del usuario', 
                    user: user,
                    isAdmin: isAdmin // Pasa esta variable a la vista
                });
        
            } catch (error) {
                console.error('Error al cargar perfil:', error);
                return res.status(500).render('error', { 
                    message: 'Error interno al cargar el perfil.', 
                    error: { status: 500, stack: error.stack || 'No se proporcionó información detallada.' } 
                });
            
            }
        },
        

        logout: (req, res) => {
            req.session.destroy();
            res.clearCookie("userLogin"); 
            res.redirect("/login")
        },

        editForm: async (req, res) => {
            try {
                // Log para depuración
                console.log('ID recibido:', req.params.id)
                const id = req.params.id;
                const user = await User.findByPk(id, {
                    include: { model: Role, as: 'role' } // Incluye el modelo "Role"
                });

                if (!user) {
                    return res.status(404).render('error', { 
                        message: 'Usuario no encontrado.', 
                        error: { status: 404, stack: 'El usuario con el ID proporcionado no existe.' } 
                    });
                }
                
        
                return res.render('users/updateDelete', { title: 'Editar Usuario', user });
            } catch (error) {
                console.error('Error cargando formulario:', error);
                return res.render('error', { message: 'Error al cargar el formulario.' });
            }
        },
        
        update: async (req, res) => {
            try {
                const id = req.params.id; // ID del usuario a actualizar
                const { firstName, lastName, email, password, roleId } = req.body;
        
                console.log('Datos recibidos para actualizar:', req.body);
                console.log('ID de la sesión (usuario logueado):', req.session.userLogin.id);
                console.log('ID del usuario objetivo:', id);
                console.log('Rol del usuario logueado:', req.session.userLogin.role);
        
                // Validar permisos
                // if (req.session.userLogin.role !== 'admin' && req.session.userLogin.id !== id) {
                //     console.log('Intento de actualización no autorizado.');
                //     return res.status(403).render('error', { 
                //         message: 'No tienes permiso para realizar esta acción.', 
                //         error: { status: 403 }
                //     });
                // }
        
                // Bloquear que un administrador se actualice a sí mismo
                if (req.session.userLogin.id === id) {
                    console.log('Un administrador no puede modificar su propia cuenta.');
                    return res.status(403).render('error', { 
                        message: 'No puedes modificar tu propia cuenta.', 
                        error: { status: 403 }
                    });
                }
        
                // Buscar al usuario en la base de datos
                const user = await User.findByPk(id, {
                    include: { model: Role, as: 'role' }
                });
        
                if (!user) {
                    return res.status(404).render('error', { 
                        message: 'Usuario no encontrado.', 
                        error: { status: 404 }
                    });
                }
        
                // Validar email duplicado
                const emailExists = email && email !== user.email ? await User.findOne({
                    where: { email, id: { [Sequelize.Op.ne]: id } }
                }) : null;
        
                if (emailExists) {
                    console.log('El email ya está registrado:', email);
                    return res.status(400).render('error', { 
                        message: 'El email ya está registrado.', 
                        error: { status: 400 }
                    });
                }
        
                // Asignar nuevos valores y guardar
                user.set({
                    firstName,
                    lastName,
                    email,
                    password: password ? bcrypt.hashSync(password, 10) : user.password,
                    image: req.file ? req.file.filename : user.image,
                    roleId: roleId || user.roleId
                });
                await user.save();
        
                console.log(`Usuario con ID ${id} actualizado correctamente.`);
                return res.redirect(`/profile/${id}`);
            } catch (error) {
                console.error('Error al actualizar usuario:', error);
                return res.status(500).render('error', { 
                    message: 'Error interno al actualizar el usuario.', 
                    error: { status: 500, stack: error.stack || 'Información no disponible.' }
                });
            }
        },
        

        deleteUser: async (req, res) => {
            try {
                const id = req.params.id; // Captura el ID desde el parámetro de la URL
                console.log(`ID recibido para eliminación: ${id}`);

                
                // Validar permisos
                if (req.session.userLogin.role !== 'admin') {
                    console.log('Intento de eliminación no autorizado.');
                }

                const user = await User.findByPk(id, {
                    include: { model: Role, as: 'role' }
                }); // Busca al usuario con el ID proporcionado
                if (!user) {
                    console.log(`Usuario con ID ${id} no encontrado.`);
                    return res.status(404).render('error', {
                        message: 'Usuario no encontrado.',
                        error: { status: 404, stack: 'El usuario con el ID proporcionado no existe.' }
                    });
                }
        
                await User.destroy({ where: { id } }); // Elimina al usuario
                console.log(`Usuario con ID ${id} eliminado.`);
                return res.redirect('/users'); // Redirige tras la eliminación
            } catch (error) {
                console.error(`Error al eliminar usuario con ID ${id}:`, error);
                return res.status(500).render('error', {
                    message: 'Error al eliminar el usuario.',
                    error: { status: 500, stack: error.stack || 'Información no disponible.' }
                });
            }
        }
        
        
    
}
    



module.exports = usersController;
