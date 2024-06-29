import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from ".";

/*
-- five_wealth_secrets.ratio_of_accounts definition

CREATE TABLE `ratio_of_accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `investment` int NOT NULL,
  `savings` int NOT NULL,
  `offering` int NOT NULL,
  `tithe` int NOT NULL,
  `spending` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `ratio_of_accounts_FK` FOREIGN KEY (`id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/


type RatioOfAccountsAttributes = {
    id: number;
    investment: number,
    savings: number,
    offering: number,
    tithe: number,
    spending: number
}

type RatioOfAccountsCreationAttributes = RatioOfAccountsAttributes;

interface RatioOfAccountsModel extends Model<RatioOfAccountsAttributes, RatioOfAccountsCreationAttributes> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    investment: number,
    savings: number,
    offering: number,
    tithe: number,
    spending: number
}

const RatioOfAccounts = sequelize.define<RatioOfAccountsModel>(
    'ratio_of_accounts',
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        investment: {
            type: DataTypes.INTEGER,
            // allowNull defaults to true
            allowNull: false,
        },
        savings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        offering: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tithe: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        spending: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        // Other model options go here
        timestamps: false,
    },
);

export default RatioOfAccounts;
