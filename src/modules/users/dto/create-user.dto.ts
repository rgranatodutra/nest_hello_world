import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    login: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Transform(
        ({ value }: { value: string }) => hashSync(value, 10),
        { groups: ['transform'] }
    )
    password: string;
};