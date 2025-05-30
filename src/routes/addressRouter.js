import express from "express";
import {
  createAddress,
  deleteAddressById,
  getAddressAll,
  getAddressAllById,
  updateAddress,
} from "../controller/addressController.js";
import {
  addressIdValidator,
  userIdValidator,
} from "../validators/addressValidators.js";

const router = express.Router();

router.get("/getAllAddress", getAddressAll);
router.get("/getAddressById/:id", addressIdValidator, getAddressAllById);
router.post("/createAddress", userIdValidator, createAddress);
router.put("/updateAddress/:id", addressIdValidator, updateAddress);
router.delete("/deleteAddress/:id", addressIdValidator, deleteAddressById);

export default router;
