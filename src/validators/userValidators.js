import { Address, User } from "../models/index.js";

const createFirstnameValidator = async (req, res, next) => {
  const respon = await User.findOne({
    attributes: ["firstname"],
    where: {
      firstname: req.body.firstname,
    },
  });

  if (respon) {
    return res.status(400).json({ massage: "firstname sudah terdaftar!" });
  } else {
    next();
  }
};

const userIdValidator = async (req, res, next) => {
  const id = req.params.id;

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

const updateFirstnameValidator = async (req, res, next) => {
  const { firstname } = req.body;
  const { id } = req.params;

  try {
    // Gunakan Sequelize untuk mencari user berdasarkan firstname
    const respon = await User.findOne({ where: { firstname } });

    // Periksa apakah firstname sudah ada

    if (respon) {
      // Periksa apakah user_id sama
      if (respon.id == id) {
        next();
      } else {
        return res.status(400).json({ message: "firstname sudah terdaftar!" });
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteIdValidator = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Gunakan Sequelize untuk mencari user berdasarkan user_id
    const respon = await User.findByPk(id);

    if (!respon) {
      return res.status(401).json({ message: "user_id Tidak Terdaftar!" });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteValidatorAddress = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Gunakan Sequelize untuk mencari user berdasarkan user_id
    const respon = await Address.findOne({
      where: {
        user_id: id,
      },
      individualHooks: true,
    });

    if (!respon) {
      next();
    } else {
      try {
        const respon = await Address.destroy({
          where: {
            user_id: id,
          },
        });
        next();
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createFirstnameValidator,
  userIdValidator,
  updateFirstnameValidator,
  deleteIdValidator,
  deleteValidatorAddress,
};
