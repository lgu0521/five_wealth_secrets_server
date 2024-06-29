"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const RatioOfAccounts = _1.default.define('ratio_of_accounts', {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    investment: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull defaults to true
        allowNull: false,
    },
    savings: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    offering: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    tithe: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    spending: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    // Other model options go here
    timestamps: false,
});
exports.default = RatioOfAccounts;
