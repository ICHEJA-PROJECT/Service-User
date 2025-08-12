import { HttpStatus, Injectable } from "@nestjs/common";
import { EncryptDataRepository } from "src/student/domain/repositories/EncryptDataRepository";
import * as crypto from 'crypto';
import { envsValues } from "src/core/config/getEnvs";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class EncryptDataRepositoryImpl implements EncryptDataRepository {
    private encryptionKey = envsValues.ENCRYPTION_KEY;
    private ivLength = 16;

    encrypt(text: string): string {
        try {
            const iv = crypto.randomBytes(this.ivLength);
            const cipher = crypto.createCipheriv(
                'aes-256-cbc',
                Buffer.from(this.encryptionKey),
                iv
            );
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message
            });
        }
    }
}