"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const AccountDetails = _1.default.define('account_details', {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    accounts_PK: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull defaults to true
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ratio_catagory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn("NOW"),
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn("NOW"),
        allowNull: false,
    }
}, {
    // Other model options go here
    timestamps: false,
});
exports.default = AccountDetails;
