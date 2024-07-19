import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(user_id: string): Promise<User> {
    return await this.userModel.findById(user_id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async createOne(data: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }
}
