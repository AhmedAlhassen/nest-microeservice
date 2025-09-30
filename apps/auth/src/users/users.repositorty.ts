import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumnet } from './models/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocumnet> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectModel(UserDocumnet.name)
    userModel: Model<UserDocumnet>,
  ) {
    super(userModel);
  }
}
