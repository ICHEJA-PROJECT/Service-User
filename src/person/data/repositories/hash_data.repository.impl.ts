import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import * as bcrypt from 'bcrypt';
import { envsValues } from "src/core/config/getEnvs";
import { HashDataRepository } from "src/person/domain/repositories/HashDataRepository";

@Injectable()
export class HashDataRepositoryImpl implements HashDataRepository {
    private salts = envsValues.SALTS;

    hash(text: string): string {
        try {
            return bcrypt.hashSync(text, this.salts);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
}