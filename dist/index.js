"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./db/models")); // models/index.ts에서 sequelize 객체를 가져옴
const accounts_1 = __importDefault(require("./db/models/accounts"));
const ratio_of_accounts_1 = __importDefault(require("./db/models/ratio_of_accounts"));
const account_details_1 = __importDefault(require("./db/models/account_details"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)(); // express 객체 받아옴
app.use((0, cors_1.default)({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));
// JSON 파싱을 위한 미들웨어
app.use(body_parser_1.default.json());
// URL-encoded 데이터 파싱을 위한 미들웨어
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.default
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
    }))
        .catch((e) => {
        console.log(e);
    });
    res.send('Hi! This is my first express server');
})); // HTTP GET method 정의
app.get('/my/accounts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // accounts 테이블에서 모든 데이터를 가져옴
    const accounts = yield accounts_1.default.findAll();
    res.send({
        status: 200,
        message: "Success",
        data: accounts
    });
}));
app.get('/my/accounts/:accountId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.accountId;
    // accounts 테이블에서 모든 데이터를 가져옴
    const accounts = yield accounts_1.default.findOne({
        where: {
            id: accountId
        }
    });
    const ratioOfAccounts = yield ratio_of_accounts_1.default.findOne({
        where: {
            id: accountId
        }
    });
    const accountDetails = yield account_details_1.default.findAll({
        where: {
            accounts_PK: accountId
        }
    });
    if (!accounts) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    ;
    if (!ratioOfAccounts) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    if (!accountDetails) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    const resData = {
        id: accounts.id,
        credit: accounts.credit,
        ratio_investment: ratioOfAccounts.investment,
        ratio_savings: ratioOfAccounts.savings,
        ratio_offering: ratioOfAccounts.offering,
        ratio_tithe: ratioOfAccounts.tithe,
        ratio_spending: ratioOfAccounts.spending,
        // 사용 가능한 금액 계산
        max_investment: accounts.credit * (ratioOfAccounts.investment / 100),
        max_savings: accounts.credit * (ratioOfAccounts.savings / 100),
        max_offering: accounts.credit * (ratioOfAccounts.offering / 100),
        max_tithe: accounts.credit * (ratioOfAccounts.tithe / 100),
        max_spending: accounts.credit * (ratioOfAccounts.spending / 100),
        // 사용 내역
        used_investment: accountDetails.map((accountDetail) => {
            if (accountDetail.ratio_catagory === 'investment') {
                return accountDetail.amount;
            }
            return 0;
        }).reduce((acc, cur) => acc + cur, 0),
        used_savings: accountDetails.map((accountDetail) => {
            if (accountDetail.ratio_catagory === 'savings') {
                return accountDetail.amount;
            }
            return 0;
        }).reduce((acc, cur) => acc + cur, 0),
        used_offering: accountDetails.map((accountDetail) => {
            if (accountDetail.ratio_catagory === 'offering') {
                return accountDetail.amount;
            }
            return 0;
        }).reduce((acc, cur) => acc + cur, 0),
        used_tithe: accountDetails.map((accountDetail) => {
            if (accountDetail.ratio_catagory === 'tithe') {
                return accountDetail.amount;
            }
            return 0;
        }).reduce((acc, cur) => acc + cur, 0),
        used_spending: accountDetails.map((accountDetail) => {
            if (accountDetail.ratio_catagory === 'spending') {
                return accountDetail.amount;
            }
            return 0;
        }).reduce((acc, cur) => acc + cur, 0),
        total_used: accountDetails.map((accountDetail) => accountDetail.amount).reduce((acc, cur) => acc + cur, 0),
    };
    res.send({
        status: 200,
        message: "Success",
        data: resData
    });
}));
app.get('/my/accounts/:accountId/:catagory', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.accountId;
    const catagory = req.params.catagory;
    const accounts = yield accounts_1.default.findOne({
        where: {
            id: accountId
        }
    });
    const ratioOfAccounts = yield ratio_of_accounts_1.default.findOne({
        where: {
            id: accountId
        }
    });
    const accountDetails = yield account_details_1.default.findAll({
        where: {
            accounts_PK: accountId,
            ratio_catagory: catagory
        }
    });
    if (!accounts) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    if (!ratioOfAccounts) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    if (!accountDetails) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    const ratio_catagory = {
        investment: ratioOfAccounts.investment,
        savings: ratioOfAccounts.savings,
        offering: ratioOfAccounts.offering,
        tithe: ratioOfAccounts.tithe,
        spending: ratioOfAccounts.spending
    }[catagory] || 0;
    const resData = {
        id: accounts.id,
        ratio_investment: ratio_catagory,
        max_investment: accounts.credit * (ratio_catagory / 100),
        used_investment: accountDetails.map((accountDetail) => accountDetail.amount).reduce((acc, cur) => acc + cur, 0),
        history: accountDetails
    };
    res.send({
        status: 200,
        message: "Success",
        data: resData
    });
}));
app.post('/my/accounts/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("새로운 계좌 생성 요청", JSON.stringify(req.body));
    const { name, source, credit, users_PK, ratio_investment, ratio_savings, ratio_offering, ratio_tithe, ratio_spending } = req.body;
    const newAccount = yield accounts_1.default.create({
        name,
        source,
        credit: parseInt(credit),
        users_PK,
    });
    console.log("새로운 계좌 생성 완료", JSON.stringify(newAccount));
    const newRatioOfAccounts = yield ratio_of_accounts_1.default.create({
        id: newAccount.id,
        investment: ratio_investment,
        savings: ratio_savings,
        offering: ratio_offering,
        spending: ratio_spending,
        tithe: ratio_tithe
    });
    res.send({
        status: 200,
        message: "Success",
        data: {
            id: newAccount.id,
        }
    });
}));
app.post('/my/accounts/:accountId/details/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accounts_PK, name, content, amount, ratio_catagory } = req.body;
    const newAccountDetail = yield account_details_1.default.create({
        accounts_PK,
        name,
        content,
        amount,
        ratio_catagory
    });
    res.send({
        status: 200,
        message: "Success",
        data: {
            id: newAccountDetail.id
        }
    });
}));
app.get('/my/accounts/:accountId/details/:historyId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.accountId;
    const historyId = req.params.historyId;
    const accountDetail = yield account_details_1.default.findOne({
        where: {
            id: historyId,
            accounts_PK: accountId
        }
    });
    if (!accountDetail) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    res.send({
        status: 200,
        message: "Success",
        data: accountDetail
    });
}));
app.post('/my/accounts/:accountId/details/:historyId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, accounts_PK, name, content, amount, ratio_catagory } = req.body;
    const updateAccountDetail = yield account_details_1.default.update({
        accounts_PK,
        name,
        content,
        amount,
        ratio_catagory
    }, {
        where: {
            id
        }
    });
    res.send({
        status: 200,
        message: "Success",
        data: {
            id: id
        }
    });
}));
app.delete('/my/accounts/:accountId/details/:historyId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.accountId;
    const historyId = req.params.historyId;
    const accountDetail = yield account_details_1.default.findOne({
        where: {
            id: historyId,
            accounts_PK: accountId
        }
    });
    if (!accountDetail) {
        res.send({
            status: 404,
            message: "Not Found",
            data: JSON.stringify({})
        });
        return;
    }
    yield accountDetail.destroy();
    res.send({
        status: 200,
        message: "Success",
        data: JSON.stringify({})
    });
}));
app.listen('8000', () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################    
    `);
}); // 8000번 포트에서 서버 실행
