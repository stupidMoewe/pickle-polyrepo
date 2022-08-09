declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            PORT: string;
            REDIS_URL: string;
        }
    }
}

export {};
