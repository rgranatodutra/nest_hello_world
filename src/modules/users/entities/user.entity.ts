import { randomUUID } from "node:crypto";

export class User {
    id: string;
    name: string;
    login: string;
    password: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deactivatedAt: Date | null;

    constructor() {
        this.id = randomUUID();
        this.active = true;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deactivatedAt = null;
    };
};
