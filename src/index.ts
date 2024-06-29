import express, { Request, Response, NextFunction } from 'express';
import sequelize from './db/models';	// models/index.ts에서 sequelize 객체를 가져옴
import Accounts from './db/models/accounts';
import RatioOfAccounts from './db/models/ratio_of_accounts';
import AccountDetails from './db/models/account_details';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();	// express 객체 받아옴

app.use(cors({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));

// JSON 파싱을 위한 미들웨어
app.use(bodyParser.json());

// URL-encoded 데이터 파싱을 위한 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await sequelize
        .authenticate()
        .then(async () => {

        })
        .catch((e: Error) => {
            console.log(e);
        });

    res.send('Hi! This is my first express server');
});	// HTTP GET method 정의


app.get('/my/accounts', async (req: Request, res: Response, next: NextFunction) => {
    // accounts 테이블에서 모든 데이터를 가져옴
    const accounts = await Accounts.findAll();

    res.send({
        status: 200,
        message: "Success",
        data: accounts
    });

});

app.get('/my/accounts/:accountId', async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.params.accountId;
    // accounts 테이블에서 모든 데이터를 가져옴
    const accounts = await Accounts.findOne({
        where: {
            id: accountId
        }
    });

    const ratioOfAccounts = await RatioOfAccounts.findOne({
        where: {
            id: accountId
        }
    });

    const accountDetails = await AccountDetails.findAll({
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
    };

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
    }

    res.send({
        status: 200,
        message: "Success",
        data: resData
    });
});


app.get('/my/accounts/:accountId/:catagory', async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.params.accountId;
    const catagory = req.params.catagory;

    const accounts = await Accounts.findOne({
        where: {
            id: accountId
        }
    });

    const ratioOfAccounts = await RatioOfAccounts.findOne({
        where: {
            id: accountId
        }
    });
    const accountDetails = await AccountDetails.findAll({
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
    }

    res.send({
        status: 200,
        message: "Success",
        data: resData
    });
});


type CreateAccounts = {
    name: string;
    source: string;
    credit: string;
    users_PK: number;
    ratio_investment: number;
    ratio_savings: number;
    ratio_offering: number;
    ratio_tithe: number;
    ratio_spending: number;
};

app.post('/my/accounts/add', async (req: any, res: Response) => {

    console.log("새로운 계좌 생성 요청", JSON.stringify(req.body));
    const {
        name,
        source,
        credit,
        users_PK,
        ratio_investment,
        ratio_savings,
        ratio_offering,
        ratio_tithe,
        ratio_spending
    } = req.body as CreateAccounts;

    const newAccount = await Accounts.create({
        name,
        source,
        credit: parseInt(credit),
        users_PK,
    });

    console.log("새로운 계좌 생성 완료", JSON.stringify(newAccount));

    const newRatioOfAccounts = await RatioOfAccounts.create({
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
});


type CreateAccountDetails = {
    accounts_PK: number;
    name: string;
    content: string;
    amount: number;
    ratio_catagory: string;
};

app.post('/my/accounts/:accountId/details/add', async (req: any, res: Response) => {
    const { accounts_PK, name, content, amount, ratio_catagory } = req.body as CreateAccountDetails;

    const newAccountDetail = await AccountDetails.create({
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
});


app.get('/my/accounts/:accountId/details/:historyId', async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const historyId = req.params.historyId;

    const accountDetail = await AccountDetails.findOne({
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
})

type EditAccountDetails = CreateAccountDetails & {
    id: number;
};
app.post('/my/accounts/:accountId/details/:historyId', async (req: Request, res: Response) => {
    const { id, accounts_PK, name, content, amount, ratio_catagory } = req.body as EditAccountDetails;

    const updateAccountDetail = await AccountDetails.update({
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
})


app.delete('/my/accounts/:accountId/details/:historyId', async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const historyId = req.params.historyId;

    const accountDetail = await AccountDetails.findOne({
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

    await accountDetail.destroy();

    res.send({
        status: 200,
        message: "Success",
        data: JSON.stringify({})
    });
});

app.listen('8000', () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################    
    `)
})	// 8000번 포트에서 서버 실행