test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const postgresVersion = responseBody.dependencies.database.postgres_version;
  expect(postgresVersion).toEqual("16.0");

  const postgresMaxConnections =
    responseBody.dependencies.database.postgres_max_connections;
  expect(postgresMaxConnections).toBeGreaterThan(0);

  const postgresActiveConnections =
    responseBody.dependencies.database.postgres_active_connections;
  expect(postgresActiveConnections).toBeGreaterThan(0);

  expect(responseBody.dependencies.database.postgres_active_connections).toBe(
    1,
  );
});
