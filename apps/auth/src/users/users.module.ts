import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserDocumnet, UserSchema } from './models/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repositorty';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocumnet.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
