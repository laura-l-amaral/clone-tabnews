import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date();

  const postgresVersionResponse = await database.query("SHOW server_version;");
  const postgresVersion = postgresVersionResponse.rows[0].server_version;

  const postgresMaxConnectionsResponse = await database.query(
    "SHOW max_connections;",
  );
  const postgresMaxConnections = parseInt(
    postgresMaxConnectionsResponse.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  console.log(`Banco de dados selecionado: ${databaseName}`);
  const postgresActiveConnectionsResponse = await database.query({
    text: `select count(*) from pg_stat_activity where datname = $1;`,
    values: [databaseName],
  });
  const postgresActiveConnections = parseInt(
    postgresActiveConnectionsResponse.rows[0].count,
  );

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion,
        postgres_max_connections: postgresMaxConnections,
        postgres_active_connections: postgresActiveConnections,
      },
    },
  });
}

export default status;
