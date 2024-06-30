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
        username: "server", //설정한 username
        password: "1234", //설정한 비밀번호
        database: "five_wealth_secrets", //설정한 DB 이름
        host: "192.168.219.106", //엔드포인트
        dialect: "mysql"
    }
};
exports.default = config;
