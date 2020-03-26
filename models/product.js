module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      available_start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      available_end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      adult_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      youth_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      photo: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(20),
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
