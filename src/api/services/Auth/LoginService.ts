import {
  Inject,
  Service,
} from 'typedi';

import { InvalidCredentials } from '@api/exceptions/Auth/InvalidCredentials';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { LoginRequest } from '@base/api/requests/Auth/LoginRequest';
import { ClaimUser } from '@base/api/responses/Auth/ClaimUser';
import { AuthService } from '@base/infrastructure/services/auth/AuthService';
import { HashService } from '@base/infrastructure/services/hash/HashService';

@Service()
export class LoginService {
  
  @Inject()
  private userRepository: UserRepository;

  @Inject()
  private authService: AuthService;

  @Inject()
  private hashService: HashService;

  constructor() { }

  public async login(data: LoginRequest) {
    let user = await this.userRepository.findOneByEmail(data.email);

    if (!user) {
      throw new InvalidCredentials();
    }

    if (!(await this.hashService.compare(data.password, user.password))) {
      throw new InvalidCredentials();
    }
    const claimUser: ClaimUser = {
      tu: user.uuid
    }
    return this.authService.sign(
      claimUser,
      { user: claimUser },
    );
  }
}
