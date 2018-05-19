##SMN-SQL

Gerenciador de conexão com o banco SQL utilizando mssql.

```js
const sql = require('smn-sql')({ /*configuração*/ });
```

## Chamada sem transação
```js
await sql.request()
    .input('parametro_name', sql.types.Int, valorParametro)
    .execute('procedure_name');
```

## Chamada com transação
```js
let transaction = sql.transaction();

await sql.request(transaction)
    .input('parametro_name', sql.types.Int, valorParametro)
    .execute('procedure_name');

await sql.request(transaction)
    .input('parametro_name', sql.types.Int, valorParametro)
    .execute('procedure_name');

await transaction.rollback();
await transaction.commit();

```

## Recuperar parâmetro output
```js

let request = sql.request(transaction)
    .input('parametro_name', sql.types.Int, valorParametro)
    .output('output_param', sql.types.Int)

await request.execute('procedure_name');

request.output(name?: string);
    
```