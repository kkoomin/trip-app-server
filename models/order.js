module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "order",
    {
      quantity: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      order_number: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  );
};
