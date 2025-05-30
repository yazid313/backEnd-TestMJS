import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getPaginatedUser,
  getUserAll,
  getUserJoinAddressById,
  updateUser,
} from "../controller/userController.js";
import {
  createFirstnameValidator,
  deleteIdValidator,
  updateFirstnameValidator,
  userIdValidator,
  deleteValidatorAddress,
} from "../validators/userValidators.js";

const router = Router();

router.get("/getAllUser", getUserAll);
router.get("/getAllUserByPaginated", getPaginatedUser);
router.get("/getUserJoinAddresById/:id", getUserJoinAddressById);
router.post("/createUser", createFirstnameValidator, createUser);
router.put(
  "/updateUser/:id",
  userIdValidator,
  updateFirstnameValidator,
  updateUser
);
router.delete(
  "/deleteUser/:id",
  deleteIdValidator,
  deleteValidatorAddress,
  deleteUserById
);

export default router;
