module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      available_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      available_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      adult_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      youth_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(20),
        allowNull: true,
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
