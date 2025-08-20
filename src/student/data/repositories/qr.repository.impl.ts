import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import * as QRCode from 'qrcode';
import { QRRepository } from "src/student/domain/repositories/QRRepository";

@Injectable()
export class QRRepositoryImpl implements QRRepository {
    async generateQR(text: string): Promise<string> {
        try {
            const qrImage = await QRCode.toDataURL(text, {
                errorCorrectionLevel: 'L',
            });
            return qrImage;
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message
            });
        }
    }
}