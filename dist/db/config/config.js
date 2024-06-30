"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//config/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        username: process.env.DB_USERNAME, //설정한 username
        password: process.env.DB_PASSWORD, //설정한 비밀번호
        database: process.env.DB_DBNAME, //설정한 DB 이름
        host: process.env.DB_HOST, //엔드포인트
        dialect: "mysql"
    }
};
exports.default = config;
