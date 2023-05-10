import { Controller ,Post,Body,Get} from '@nestjs/common';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { TypeSeatDto } from './dto/typeSeat.dto';
import { TypeSeatService } from './type-seat.service';

@Controller('type-seat')
export class TypeSeatController {
    constructor(private readonly typeSeatService:TypeSeatService){}

    @Post()
    async createTypeSeat(@Body() dto:TypeSeatDto) {
        const result = await this.typeSeatService.createTypeSeat(dto)

        if(!result) return failResponse({
            message:"Create TypeSeat Faild"
        })

        return successResponse({
            message:"Create TypeSeat Success", 
            payload:result
        })
    }

    @Get()
    async getAllTypeSeat() {
        const result = await this.typeSeatService.getAllTypeSeat();

        if(!result) return failResponse({
            message:"Create TypeSeat Faild"
        })
        return successResponse({
            message:"Create TypeSeat Success",
            payload:{
                normalSeat:result.filter(item=>{
                    return item.name === "normal"
                }),

                couple:result.filter(item=>{
                    return item.name === "couple"
                }),
            }
        })
    }
}
