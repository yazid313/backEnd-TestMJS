import { Sequelize } from "sequelize";
import db from "../db/config/db.js";
const Address = db.define(
  "Address",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      onDelete: "CASCADE",
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postal_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "addresses",
    timestamps: true,
  }
);

export default Address;
