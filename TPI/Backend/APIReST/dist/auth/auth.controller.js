import { orm } from "../shared/db/orm.js";
import bcrypt from "bcrypt";
import { Magos } from "../magos/magos.entity.js";
import jwt from "jsonwebtoken";
// Registro de usuarios
export const register = async (req, res) => {
    const em = orm.em.fork(); // Crea un EntityManager aislado para esta transacción
    try {
        // Verifica si el usuario existe
        const existingUser = await em.findOne(Magos, { email: req.body.email });
        if (existingUser) {
            return res.status(409).json("Usuario ya existe.");
        }
        // Crear nuevo usuario y hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(req.body.pass, salt);
        // Crear y guardar el nuevo usuario
        const newUser = em.create(Magos, {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            pass: hashedPass,
            profesion: req.body.profesion,
            madera_varita: req.body.madera_varita,
            nucleo_varita: req.body.nucleo_varita,
            largo_varita: req.body.largo_varita,
            isEmpleado: req.body.isEmpleado,
            institucion: req.body.institucion
        });
        await em.persistAndFlush(newUser);
        return res.status(200).json("Usuario creado.");
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Inicio de sesión de usuarios
export const login = async (req, res) => {
    const em = orm.em.fork(); // Crea un EntityManager aislado para esta transacción
    try {
        // Buscar usuario por email
        const user = await em.findOne(Magos, { email: req.body.email });
        if (!user) {
            return res.status(404).json("Usuario no encontrado.");
        }
        // Comparar contraseñas
        const checkPass = bcrypt.compareSync(req.body.pass, user.pass);
        if (!checkPass) {
            return res.status(400).json("Contraseña o email incorrecto.");
        }
        // Generar token
        const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: '1h' });
        // Excluir la contraseña de la respuesta
        const { pass, ...others } = user;
        // Enviar la cookie con el token
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo enviar en HTTPS en producción
        }).status(200).json(others);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Cierre de sesión
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("Sesión cerrada.");
};
// Actualización de información
export const updateUser = async (req, res) => {
    const em = orm.em.fork(); // Crea un EntityManager aislado para esta transacción
    try {
        const userId = req.body.id; // ID del usuario a actualizar
        // Buscar usuario por ID
        const user = await em.findOne(Magos, { id: userId });
        if (!user) {
            return res.status(404).json("Usuario no encontrado.");
        }
        // Actualizar algunos de los campos (institucion no lo puede cambiar)
        user.nombre = req.body.nombre || user.nombre;
        user.apellido = req.body.apellido || user.apellido;
        user.email = req.body.email || user.email;
        user.profesion = req.body.profesion || user.profesion;
        user.madera_varita = req.body.madera_varita || user.madera_varita;
        user.nucleo_varita = req.body.nucleo_varita || user.nucleo_varita;
        user.largo_varita = req.body.largo_varita || user.largo_varita;
        // Si se pone una nueva contraseña, hashearla
        if (req.body.pass) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(req.body.pass, salt);
            user.pass = hashedPass; // Actualizar la contraseña
        }
        await em.persistAndFlush(user); // Guardar cambios en la base de datos
        return res.status(200).json("Información actualizada.");
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
//# sourceMappingURL=auth.controller.js.map