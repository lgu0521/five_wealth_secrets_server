import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from "sequelize";
import sequelize from ".";

/*
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `source` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `credit` INT NOT NULL,
  `users_PK` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_FK` (`users_PK`),
  CONSTRAINT `accounts_FK` FOREIGN KEY (`users_PK`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/

interface CreationAccountsModel extends Model<InferAttributes<AccountsModel>, InferCreationAttributes<AccountsModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    name: string,
    source: string,
    credit: number,
    users_PK: number
}


type AccountsAttributes = {
    id: CreationOptional<number>;
    name: string,
    source: string,
    credit: number,
    users_PK: number,
    createdAt: string,
    updatedAt: string
}

type AccountsCreationAttributes = {
    name: string,
    source: string,
    credit: number,
    users_PK: number
}

interface AccountsModel extends Model<AccountsAttributes, AccountsCreationAttributes> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    name: string,
    source: string,
    credit: number,
    users_PK: number,
    createdAt: string,
    updatedAt: string
}


const Accounts = sequelize.define<AccountsModel>(
    'accounts',
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            // defaultValue automatically set the default value to the current time
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            // allowNull defaults to true
            allowNull: false,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        credit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        users_PK: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"), //이렇게 수정!
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"),
            allowNull: false
        },
    },
    {
        // Other model options go here
        timestamps: false,
    },
)

export default Accounts;
