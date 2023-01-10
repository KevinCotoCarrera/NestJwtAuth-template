import {Module} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/Users/entities/user.entity";
import { File, FileSchema } from "./models/Files/entities/file.entity";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "configuration";

@Module({
    imports: [
    ConfigModule.forRoot({
        envFilePath: '.env',
        load: [configuration],
        isGlobal: true,
        }),
    MongooseModule.forRoot('mongodb://localhost:27017/Zip'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    AuthModule
    ],

    controllers:[],
    providers:[]
})

export class AppModule {}

