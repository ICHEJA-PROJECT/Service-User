export interface HashDataRepository {
    hash(text: string): string;
}