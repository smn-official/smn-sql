var sql = require('mssql');

function getTransaction(connectionPool){
    return connectionPool.transaction();    
}

module.exports = getTransaction;