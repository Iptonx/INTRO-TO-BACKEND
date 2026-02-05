import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validacion basica
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    //verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe." });
    }

    // crear usuario
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //vetificar si el usuario ya existe

    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) return res.status(404).json({
        message: "Usuario no encontrado."
    });

    //comparar contraseñas
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ 
        message: "Contraseña incorrecta." 
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    res.status(500).json({ 
        message: "Error del servidor.", error: error.message 
    });
  }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        })

        if (!user) return res.status(404).json({
            message: "Usuario no encontrado."
        });

        res.status(200).json({
            message: "Cierre de sesión exitoso."
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Error del servidor.", error: error.message 
        });
    }
}

export { registerUser, loginUser, logoutUser };
