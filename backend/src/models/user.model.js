import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 200,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // match: [/^\S+@\S+\.\S+$/, 'Por favor usa una dirección de correo valido.'],
    },
  },

  {
    timestamps: true,
  },
);

// Hash de la contraseña antes de guardar el usuario
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Metodo para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
