const sql = require('mssql');

module.exports = {
    read_committed: sql.ISOLATION_LEVEL.READ_COMMITTED,
    read_uncommitted: sql.ISOLATION_LEVEL.READ_UNCOMMITTED,
    repeatable: sql.ISOLATION_LEVEL.REPEATABLE_READ,
    serializable: sql.ISOLATION_LEVEL.SERIALIZABLE,
    snapshot: sql.ISOLATION_LEVEL.SNAPSHOT
}