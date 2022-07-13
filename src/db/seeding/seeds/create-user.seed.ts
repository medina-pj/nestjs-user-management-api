import { UserEntity } from '../../../modules/users/entities';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(UserEntity)().create();
  }
}
