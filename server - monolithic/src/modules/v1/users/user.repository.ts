import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly userRepos: Repository<User>;
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.userRepos = this.dataSource.getRepository(User);
  }

  async findAll(page: number, limit: number) {
    let offset: number = 0;
    const users = await this.userRepos.find();
    const totalPage = Math.ceil(users.length / limit);
    if (page > 0) {
      offset = (page - 1) * limit;
      const usersLimit = await this.userRepos.find({
        take: limit,
        skip: offset,
      });
      return {
        dataLimit: usersLimit,
        totalPage: totalPage,
      };
    }
  }

  async findById(user_id: string): Promise<User> {
    return await this.userRepos.findOneBy({ user_id: user_id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepos.findOneBy({ email: email });
  }
  
  async createOne(data: Partial<User>): Promise<User> {
    return await this.userRepos.save(data);
  }

  async changeStatus(user_id: string, status: number): Promise<UpdateResult> {
    return await this.userRepos.update(
      { user_id: user_id },
      { status: status },
    );
  }

  async deleteOne(user_id: string): Promise<DeleteResult> {
    return await this.userRepos.delete(user_id);
  }
}
