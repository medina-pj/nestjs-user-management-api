import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import {
  GetUserFilterDto,
  UserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '../dtos';
import { UserEntity } from '../entities';
import { ErrorCodes } from '../../../common/enums';
import { CryptoService } from '../../../providers/encryption.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private cryptoService: CryptoService,
  ) {}

  /**
   *
   * @param userDto user info
   * @returns created user
   */
  async createUser(userDto: UserDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepo.create(userDto);
      const saveUser: UserEntity = await this.userRepo.save({
        ...newUser,
        password: await this.cryptoService.hashPassword(newUser.password),
      });

      return saveUser;
    } catch (error) {
      if (error.code === ErrorCodes.DUPLICATE_DATA_ERROR) {
        throw new ConflictException('Username or email already exist.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   *
   * @param id user id
   * @returns user
   */
  async getUser(id: number): Promise<UserEntity> {
    const record: UserEntity = await this.userRepo.findOneBy({ id: id });

    if (!record) {
      throw new NotFoundException(`User with ID of ${id} is not found.`);
    }

    return record;
  }

  /**
   *
   * @param filterDto[optional]
   * @returns users
   */
  async getUsers(
    user: UserEntity,
    filterDto?: GetUserFilterDto,
  ): Promise<UserEntity[]> {
    const records: UserEntity[] = await this.userRepo.find({
      where: {
        id: Not(user.id),
        ...filterDto,
      },
    });

    return records;
  }

  /**
   *
   * @param id user id
   * @returns void
   */
  async deleteUser(id: number): Promise<void> {
    const deletedUser = await this.userRepo.delete({ id: id });

    if (deletedUser.affected === 0)
      throw new NotFoundException(`User not found.`);
  }

  /**
   *
   * @param id[] list of user id
   * @returns void
   */
  async deleteMultipleUser(id: number[]): Promise<void> {
    const deletedUser = await this.userRepo.delete([...id]);
    if (deletedUser.affected === 0)
      throw new NotFoundException(`Users not found.`);
  }

  /**
   *
   * @param id user id
   * @param userDto Update user info
   * @returns updated Product
   */
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const {
      first_name,
      last_name,
      address,
      postal_code,
      email,
      contact_number,
    } = updateUserDto;

    // check if email to be changed already exist
    const records = await this.userRepo.findOne({
      where: {
        email,
        id: Not(id),
      },
    });
    if (records) throw new BadRequestException(`Email already exist.`);

    await this.userRepo.update(id, {
      first_name,
      last_name,
      address,
      postal_code,
      email,
      contact_number,
    });

    const updatedUser = this.getUser(id);

    return updatedUser;
  }

  /**
   *
   * @param id user id
   * @param updateUserPasswordDto
   * @returns void
   */
  async updateUserPassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    const { newPassword, oldPassword } = updateUserPasswordDto;

    // get user details
    const userDetails = await this.userRepo.findOne({ where: { id: id } });
    if (!userDetails) throw new NotFoundException('User not found.');

    // check old password
    const checkOldPassword = await this.cryptoService.comparePassword(
      oldPassword,
      userDetails.password,
    );
    if (!checkOldPassword)
      throw new BadRequestException('Incorrect old password.');

    // save new password
    await this.userRepo.update(id, {
      password: await this.cryptoService.hashPassword(newPassword),
    });
  }
}
