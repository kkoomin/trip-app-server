module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "order",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_number: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
      is_review_written: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );
};
