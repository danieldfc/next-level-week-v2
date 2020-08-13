import { Request, Response } from "express";
import CreateSessionService from "@infra/services/CreateSessionService";

class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}

export default SessionsController;
