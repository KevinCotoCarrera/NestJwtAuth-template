import * as mongoose from "mongoose"
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { File } from "src/models/Files/entities/file.entity"

export type UserDocument = mongoose.HydratedDocument<User>

@Schema()
export class User{
    
    @Prop({required: true})
    name: string

    @Prop({required: true, unique: true})
    email: string
    
    @Prop({ required: true })
    password: string;
    
    @Prop({default: mongoose.now()})
    createdAt: Date;

    @Prop()
    files: File[]
}

export const UserSchema = SchemaFactory.createForClass(User);
