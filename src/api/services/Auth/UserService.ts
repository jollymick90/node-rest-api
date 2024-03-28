import {
  Inject,
  Service,
} from 'typedi';

import { UserRepository } from '@base/api/repositories/Users/UserRepository';

@Service()
export class UserService {
    @Inject()
    private userRepository: UserRepository;

    public async findByUuid(uuid: string) {
        return await this.userRepository.findOneByUuid(uuid);        
    }
}