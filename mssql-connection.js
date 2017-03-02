var sql = require('mssql');
 
function getConnectionPool(config){
    var connectionPool = new sql.Connection(config);
    
    connectionPool.on('error', handleError);
    connectionPool.connect(handleError);
    
    return connectionPool;
    
    function handleError(err){
        if(err){
            console.log(err);
        }
    }
}

module.exports = getConnectionPool;