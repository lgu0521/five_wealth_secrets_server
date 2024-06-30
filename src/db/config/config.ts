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
    username: "server", //설정한 username
    password: "1234", //설정한 비밀번호
    database: "five_wealth_secrets", //설정한 DB 이름
    host: "192.168.219.106", //엔드포인트
    dialect: "mysql"
  }
};

export default config;