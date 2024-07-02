//config/config.ts
import dotenv from 'dotenv';
dotenv.config();

type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  [key: string]: string | boolean;
}

interface IConfig {
  development: Config;
}

const config: IConfig = {
  development: {
    username: "lgu0521", //설정한 username
    password: "alsgml21!", //설정한 비밀번호
    database: "lgu0521", //설정한 DB 이름
    host: "112.175.185.144", //엔드포인트
    dialect: "mysql"
  }
};


export default config;