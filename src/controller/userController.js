import { fn, col, where, Op } from "sequelize";
import { Address, User } from "../models/index.js";
import AppHelper from "../utils/AppHelper.js";

const getUserAll = async (req, res) => {
  try {
    const respon = await User.findAll();
    res.status(200).json(respon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPaginatedUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || "";

  try {
    let whereCondition = where(fn("LOWER", col("firstname")), {
      [Op.like]: `%${search.toLowerCase()}%`,
    });

    const { count, rows } = await User.findAndCountAll({
      attributes: ["id", "firstname", "lastname", "birthdate"],
      where: whereCondition,
      include: [
        {
          model: Address,
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    return AppHelper.resSuccess(res, 200, {
      data: rows,
      pagination: {
        totalItems: count,
        totalPages,
        perPage: page,
        currentPage: page,
      },
    });
  } catch (error) {
    return AppHelper.resError(res, 500, [{ msg: error.message }]);
  }
};

const getUserJoinAddressById = async (req, res) => {
  try {
    const respon = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Address,
        },
      ],
    });

    if (!respon) {
      return res.status(401).json({ massage: "id Tidak Terdaftar!" });
    } else {
      res.status(200).json(respon);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
  };

  try {
    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
  };

  try {
    const newUser = await User.update(userData, {
      where: {
        id: req.params.id,
      },
    });
    return AppHelper.resSuccess(res, 200, {
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const respon = await User.destroy({
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    res.status(200).json(respon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  getUserAll,
  getPaginatedUser,
  getUserJoinAddressById,
  createUser,
  updateUser,
  deleteUserById,
};
