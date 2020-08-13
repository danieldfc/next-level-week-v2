import { Request, Response } from "express";
import CreateUserService from "@infra/services/CreateUserService";

export default class UsersController {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      password,
    } = request.body;

    const createUserService = new CreateUserService();
    
    const createdUser = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(createdUser);
  }
}