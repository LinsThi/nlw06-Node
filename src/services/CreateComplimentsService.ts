import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentsRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}


class CreateComplimentsService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentsRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const userRepository = getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver) {
      throw new Error("Incorrect user receiver");
    }
    
    const userReceiverExits = await userRepository.findOne(user_receiver);
    
    if(!userReceiverExits) {
      throw new Error("User receiver not exists!");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentsService };