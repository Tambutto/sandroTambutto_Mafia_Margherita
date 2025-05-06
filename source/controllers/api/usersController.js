const { token } = require('morgan');
const { User } = require('../../database/models');

const usersController = {
    listUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ["id", "firstName","lastName", "email", "image"], // Excluimos información sensible como password
                order: [['id', 'DESC']] // Obtiene el último usuario primero
            });

            return res.json({
                count: users.length,
                data: users.map(user => ({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    detail: `/api/users/${user.id}`

                }))
            });
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({ meta: { status: 500, msg: "Error interno del servidor" } });
        }
    },

    getUserDetail: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                // attributes: ["id", "first_name", "email", "image","last_name"] // Excluimos password
            });

            if (!user) {
                return res.status(404).json({ meta: { status: 404, msg: "Usuario no encontrado" } });
            }

            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                token: user.token,
                roleId: user.roleId,
                isValidated: user.isValidated,
                lock: user.lock,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            return res.status(500).json({ meta: { status: 500, msg: "Error interno del servidor" } });
        }
    }
};

module.exports = usersController;

