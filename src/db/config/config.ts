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
    username: process.env.DB_USERNAME!, //설정한 username
    password: process.env.DB_PASSWORD!, //설정한 비밀번호
    database: process.env.DB_DBNAME!, //설정한 DB 이름
    host: process.env.DB_HOST!, //엔드포인트
    dialect: "mysql"
  }
};

export default config;