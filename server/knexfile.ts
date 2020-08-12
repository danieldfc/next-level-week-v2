import { resolve } from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'src', 'infra', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'infra', 'database', 'migrations'),
  },
  useNullDefault: true,
}