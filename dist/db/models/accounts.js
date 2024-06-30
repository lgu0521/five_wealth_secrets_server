"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Accounts = _1.default.define('accounts', {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        // defaultValue automatically set the default value to the current time
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull defaults to true
        allowNull: false,
    },
    source: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    credit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    users_PK: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn("NOW"), //이렇게 수정!
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn("NOW"),
        allowNull: false
    },
}, {
    // Other model options go here
    timestamps: false,
});
exports.default = Accounts;
