export interface EnvsI {
    DB_NAME: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    BROKER_HOSTS: string[];
    UPLOAD_IMAGE_SERVICE_URL: string;
    SALTS: number;
    ENCRYPTION_KEY: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
}