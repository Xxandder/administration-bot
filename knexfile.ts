import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    client:'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '1234',
      database: 'administration',
      port: 5432,
      charset: 'utf8',
      debug: true,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};

// module.exports = {
//   development: {
//     client: process.env?.['DB_DIALECT'] || 'postgresql',
//     connection: {
//       host: process.env?.['DB_HOST'],
//       user: process.env?.["DB_USER"],
//       password: process.env?.["DB_PASSWORD"]?.toString(),
//       database: process.env?.["DB_NAME"],
//       port: parseInt(process.env?.["DB_PORT"] || '5432', 10),
//       charset: 'utf8',
//       debug: true,
//     },
//     pool: {
//         min: parseInt(process.env?.["DB_POOL_MIN"] || '2', 10),
//         max: parseInt(process.env?.["DB_POOL_MAX"] || '10', 10),
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './src/db/migrations',
//     },
//     seeds: {
//       directory: './src/db/seeds',
//     },
//   },
// };
