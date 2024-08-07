import { Inject, Injectable } from '@nestjs/common';
import { Subscription } from 'src/entities/subcription.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

export interface IUserResponse {
  user_id: string;
  user_name: string;
  email: string;
  avatar: string;
  role: number;
  status: number;
}

@Injectable()
export class UserRepository {
  private readonly userRepos: Repository<User>;
  private readonly subscriptionRepos: Repository<Subscription>;
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.userRepos = this.dataSource.getRepository(User);
    this.subscriptionRepos = this.dataSource.getRepository(Subscription);
  }

  async findAll(page: number, limit: number) {
    let offset: number = 0;
    const totalUsers = await this.userRepos.count();
    const totalPage = Math.ceil(totalUsers / limit);
    if (page > 0) {
      offset = (page - 1) * limit;
      const usersLimit = await this.userRepos.find({
        take: limit,
        skip: offset,
      });
      const usersResponse: IUserResponse[] = usersLimit.map((item) => ({
        user_id: item.user_id,
        user_name: item.user_name,
        email: item.email,
        avatar: item.avatar,
        role: item.role,
        status: item.status,
      }));
      return {
        dataLimit: usersResponse,
        totalPage: totalPage,
        totalUsers: totalUsers,
      };
    }
  }

  async findById(user_id: string): Promise<IUserResponse> {
    const user = await this.userRepos.findOneBy({ user_id: user_id });
    const response: IUserResponse = {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
    };

    return response;
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

  async findSubscription(user_id: string) {
    const user = await this.userRepos.findOneBy({ user_id: user_id });
    return await this.subscriptionRepos.findOneBy({ user: user });
  }
}
