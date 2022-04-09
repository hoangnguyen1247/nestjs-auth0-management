import { ModuleMetadata, Type } from "@nestjs/common";
import { ManagementClientOptions } from "auth0";

export type Auth0ManagementOptions = ManagementClientOptions;

export interface Auth0ManagementOptionsFactory {
    createAuth0AuthenticationOptions(): Auth0ManagementOptions | Promise<Auth0ManagementOptions>;
}

export interface Auth0ManagementAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject: any[],
    useClass?: Type<Auth0ManagementOptionsFactory>,
    useExisting?: Type<Auth0ManagementOptionsFactory>,
    useFactory?: (...args: any[]) => Auth0ManagementOptions | Promise<Auth0ManagementOptions>,
}
