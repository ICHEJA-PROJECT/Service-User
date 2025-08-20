import { Controller } from "@nestjs/common";
import { CellService } from "../services/cell.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateCellDto } from "../data/dtos/create-cell.dto";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";

@Controller('cells')
export class CellController {
    constructor(private readonly cellService: CellService) {}
    
    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.CELL_CREATE})
    async create(@Payload() createCellDto: CreateCellDto) {
        return await this.cellService.create(createCellDto);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.CELL_FIND_ALL})
    async findAll() {
        return await this.cellService.findAll();
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.CELL_FIND_BY_INSTITUTION})
    async findByInstitution(@Payload() instutionId: number) {
        return await this.cellService.findByInstitution(instutionId);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.CELL_FIND_BY_COORDINATOR})
    async findByCoordinator(@Payload() coordinatorId: number) {
        return await this.cellService.findByCoordinator(coordinatorId);
    }

    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.CELL_FIND_ONE})
    async findOne(@Payload() id: number) {
        console.log(id);
        return await this.cellService.findOne(id);
    }
}