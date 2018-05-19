const sql = require('mssql');
const types = require('./types');
const isolation = require('./isolation_level');
const outputs = require('./output');
const Promise = require('bluebird');

class Sql {

    constructor(config) {
        config = this._defaultConfig(config);
        this._pool = new sql.ConnectionPool(config);
        this.types = types;
        this.isolation = isolation;
    }

    async pool() {
        if (!this._pool.connected)
            await this._pool.connect();
        return this._pool;
    }

    async request(transaction) {
        let req = transaction instanceof sql.Transaction
            ? transaction.request()
            : new sql.Request(await this.pool());
        req.outputs = outputs(req);

        req.on('done', (data) => { console.log('on.done') });
        req.on('error', (err) => {
            /*
                Só c criar varias conexoes
                if(!(transaction instanceof sql.Transaction))
                   await this._pool.close();
            */
            console.log('on.error')
        });
        return req;
    }

    async execute(procedure, parameters, transaction) {
        let request = await this.request(transaction);
        for (var i in parameters)
            request.input(i, parameters[i]);
        return await request.execute(procedure);
    }

    async transaction(isolation = this.isolation.read_committed) {
        const transaction = new sql.Transaction(await this.pool());
        await transaction.begin(isolation);
        return transaction;
    }

    table() {
        return new sql.Table();
    }

    _defaultConfig(config) {
        return this._merge(config, {
            driver: 'tedious',
            options: {
                connectTimeout: 15000,
                requestTimeout: 150000
            },
            pool: {
                max: 20,
                min: 10,
                idleTimeoutMillis: 3000
            }
        });
    }

    _merge(config, _default) {
        for (let i in config) {
            if (typeof config[i] != 'object' || config[i] instanceof Date) continue;
            config[i] = this._merge(config[i], _default[i] || {});
        }
        return Object.assign(config, _default);
    }
}

module.exports = (config) => {
    return new Sql(config);
}