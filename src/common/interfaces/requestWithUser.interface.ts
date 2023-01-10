import { Request } from 'express';
import {UserDocument} from '../../models/Users/entities/user.entity'

interface RequestWithUser extends Request {
  user: UserDocument
}

export default RequestWithUser;