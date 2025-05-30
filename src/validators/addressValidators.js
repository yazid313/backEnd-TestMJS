import { Address, User } from "../models/index.js";

const addressIdValidator = async (req, res, next) => {
  const id = req.params.id;

  try {
    // mencari Address berdasarkan Address_id
    const respon = await Address.findByPk(id);

    if (!respon) {
      return res.status(401).json({ message: "Address_id Tidak Terdaftar!" });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userIdValidator = async (req, res, next) => {
  const id = req.body.user_id;

  try {
    // mencari user berdasarkan user_id
    const respon = await User.findByPk(id);

    if (!respon) {
      return res.status(401).json({ message: "user_id Tidak Terdaftar!" });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { addressIdValidator, userIdValidator };
