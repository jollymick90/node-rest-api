import { UnauthorizedError } from 'routing-controllers';

const defaultMsg = 'Registration Error!';
export class RegistrationError extends UnauthorizedError {
  constructor(msg: string = defaultMsg) {
    super(msg);
  }
}