import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1+1;");
  console.log(result);
  response.status(200).json({ message: "alunos são pessoas que aprendem" });
}

export default status;
