import { Address } from "../models/index.js";
import AppHelper from "../utils/AppHelper.js";

const getAddressAll = async (req, res) => {
  try {
    const respon = await Address.findAll();
    res.status(200).json(respon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAddressAllById = async (req, res) => {
  try {
    const respon = await Address.findOne({
      where: {
        id: req.params.id,
      },
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

const createAddress = async (req, res) => {
  const addressData = {
    user_id: req.body.user_id,
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
  };

  try {
    const newAddress = await Address.create(addressData);
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAddress = async (req, res) => {
  console.log("oooo");

  const addressData = {
    user_id: req.body.user_id,
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
  };

  try {
    const newAddress = await Address.update(addressData, {
      where: {
        id: req.params.id,
      },
    });
    return AppHelper.resSuccess(res, 200, {
      data: newAddress,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const respon = await Address.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(respon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  getAddressAll,
  getAddressAllById,
  createAddress,
  updateAddress,
  deleteAddressById,
};
