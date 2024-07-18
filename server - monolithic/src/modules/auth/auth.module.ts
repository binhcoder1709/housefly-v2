import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "src/configs/typeorm/typeorm.module";
import { AuthService } from "./auth.service";
import { AuthMiddleware } from "./auth.middleware";

@Module({
    imports:[TypeOrmModule],
    providers: [AuthService]
})
export class AuthModule implements NestModule
{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({path: '/auth/register', method:RequestMethod.POST});
    }
}