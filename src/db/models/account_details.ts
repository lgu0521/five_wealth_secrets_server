import { Sequelize, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import sequelize from ".";

/*
-- five_wealth_secrets.account_details definition

CREATE TABLE `account_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(100) NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `amount` int NOT NULL,
  `ratio_catagory` varchar(100) NOT NULL,
  `accounts_PK` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_details_FK` (`accounts_PK`),
  CONSTRAINT `account_details_FK` FOREIGN KEY (`accounts_PK`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/

type AccountDetailsCreationAttributes = {
    accounts_PK: number,
    name: string,
    content: string,
    amount: number,
    ratio_catagory: string,
}


type AccountDetailsAttributes = AccountDetailsCreationAttributes & {
    id: number;
    createdAt: string,
    updatedAt: string,
}


interface AccountDetailsModel extends Model<AccountDetailsAttributes, AccountDetailsCreationAttributes> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    accounts_PK: number,
    name: string,
    content: string,
    amount: number,
    ratio_catagory: string,
    createdAt: string,
    updatedAt: string,
}

const AccountDetails = sequelize.define<AccountDetailsModel>(
    'account_details',
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        accounts_PK: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            // allowNull defaults to true
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ratio_catagory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"),
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"),
            allowNull: false,
        }
    },
    {
        // Other model options go here
        timestamps: false,
    },
);

export default AccountDetails;
