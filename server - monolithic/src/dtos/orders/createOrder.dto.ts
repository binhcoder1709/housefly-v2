import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto
{
    @IsString()
    order_name:string

    @IsNumber()
    total_amount: number

    @IsString()
    user: string

    
}