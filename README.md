##SMN-SQL

Gerenciador de conexão com o banco SQL utilizando mssql.

- const sql = require('devbox-box')('Objeto configurações de conexão com banco');

## Chamada sem transação
```
sql.request()
    .input('Parametro', sql.types.Int, valorParametro)
    .execute(...);

```

## Chamada com transação
```
let transaction = sql.transaction();

transaction.begin(...);

sql.request(transaction)
    .input('Parametro', sql.types.Int, valorParametro)
    .execute(...);

sql.request(transaction)
    .input('Parametro', sql.types.Int, valorParametro)
    .execute(...);

transaction.rollback(...);
transaction.commit(...);

```

## Recuperar parâmetro output
```

sql.request(transaction)
    .input('Parametro', sql.types.Int, valorParametro)
    .output('output_param', sql.types.Int)
    .execute('procedure', (err,data) =>{
        
        let out = sql.getOutput(); * Retorna somente o primeiro output
        or
        let out = sql.getOutput('nome parâmetro output');
        
    });
    
```