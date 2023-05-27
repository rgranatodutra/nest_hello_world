import { Exclude } from "class-transformer";
import { randomUUID } from "node:crypto";

export class User {
    readonly id: string;
    name: string;
    login: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deactivatedAt: Date | null;

    @Exclude()
    password: string;

    constructor() {
        this.id = randomUUID();
        this.active = true;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deactivatedAt = null;
    };
};
