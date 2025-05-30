import Address from "./address.js";
import User from "./user.js";

User.hasOne(Address, { foreignKey: "user_id", onDelete: "CASCADE" });
Address.belongsTo(User, { foreignKey: "user_id" });

export { User, Address };
