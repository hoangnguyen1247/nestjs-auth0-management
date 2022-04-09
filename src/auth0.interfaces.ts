import { ModuleMetadata, Type } from "@nestjs/common";

export interface Auth0ManagementOptions {
    domain: string;

    clientId: string;

    clientSecret?: string;
}

export interface Auth0ManagementOptionsFactory {
    createAuth0AuthenticationOptions(): Auth0ManagementOptions | Promise<Auth0ManagementOptions>;
}

export interface Auth0ManagementAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject: any[],
    useClass?: Type<Auth0ManagementOptionsFactory>,
    useExisting?: Type<Auth0ManagementOptionsFactory>,
    useFactory?: (...args: any[]) => Auth0ManagementOptions | Promise<Auth0ManagementOptions>,
}
