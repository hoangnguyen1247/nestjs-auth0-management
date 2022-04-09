import { DynamicModule, Module } from "@nestjs/common";
import { Auth0ManagementOptions, Auth0ManagementAsyncOptions } from "./auth0.interfaces";
import { Auth0ManagementCoreModule } from "./auth0-core.module";

@Module({})
export class Auth0ManagementModule {

    public static forRoot(options: Auth0ManagementOptions): DynamicModule {
        return {
            module: Auth0ManagementModule,
            imports: [Auth0ManagementCoreModule.forRoot(options)],
        };
    }

    public static forRootAsync(options: Auth0ManagementAsyncOptions): DynamicModule {
        return {
            module: Auth0ManagementModule,
            imports: [Auth0ManagementCoreModule.forRootAsync(options)],
        };
    }
}