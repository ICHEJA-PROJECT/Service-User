export function base64ToMulterFile(base64String: string, filename: string, mimeType: string, fieldname = 'file') {
    // Remover el prefijo data:image/jpeg;base64, si existe
    const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Convertir base64 a bytes
    const byteCharacters = atob(base64Data);
    const buffer = Buffer.from(byteCharacters, 'binary');
    
    // Crear objeto compatible con Express.Multer.File
    const multerFile = {
        fieldname: fieldname,
        originalname: filename,
        encoding: '7bit',
        mimetype: mimeType,
        buffer: buffer,
        size: buffer.length,
        destination: undefined,
        filename: undefined,
        path: undefined,
        stream: undefined
    };
    
    return multerFile;
}