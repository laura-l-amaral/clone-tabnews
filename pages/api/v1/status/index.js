import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

function status(request, response) {
  response.status(200).json({ message: "alunos são pessoas que aprendem" });
}

export default status;
