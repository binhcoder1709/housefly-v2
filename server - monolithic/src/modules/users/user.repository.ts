import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private userRepos: Repository<User>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.userRepos = this.dataSource.getRepository(User);
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
}
