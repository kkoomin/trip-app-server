module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "customer",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      name_kor: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      fist_name_eng: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      last_name_eng: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      point: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
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
