export interface QRRepository {
    generateQR(text: string): Promise<string>;
}