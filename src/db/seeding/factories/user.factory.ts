import { UserEntity } from '../../../modules/users/entities';
import { define } from 'typeorm-seeding';

define(UserEntity, () => {
  const user = new UserEntity();
  user.first_name = 'John';
  user.last_name = 'Doe';
  user.address = 'Makati';
  user.postal_code = 1200;
  user.contact_number = 9175556666;
  user.email = 'john_doe@email.com';
  user.username = 'user_001';
  user.password =
    '$2b$10$wVfjeEICFPjjdXnJEyX40uZSjWPNAgSVM9Hk/6qEgf5BMrqRj/zt6';

  return user;
});
