const sql = require('mssql');
const types = require('./types');
const isolation = require('./isolation_level');
const outputs = require('./output');
const Promise = require('bluebird');

class Sql {

    constructor(config) {
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
}

module.exports = (config) => {
    return new Sql(config);
}