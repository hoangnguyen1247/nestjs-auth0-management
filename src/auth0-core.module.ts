import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { Auth0ManagementOptions, Auth0ManagementAsyncOptions, Auth0ManagementOptionsFactory } from "./auth0.interfaces";
import { createAuth0ManagementClient } from "./auth0.client";
import { AUTH0_MANAGEMENT_TOKEN, AUTH0_MANAGEMENT_OPTIONS } from "./auth0.constants";

@Global()
@Module({})
export class Auth0ManagementCoreModule {

    public static forRoot(options: Auth0ManagementOptions): DynamicModule {
        const auth0AuthenticationClient: Provider = {
            provide: AUTH0_MANAGEMENT_TOKEN,
            useValue: createAuth0ManagementClient(options),
        };

        return {
            exports: [],
            module: Auth0ManagementCoreModule,
            providers: [auth0AuthenticationClient],
        };
    }

    public static forRootAsync(asyncOptions: Auth0ManagementAsyncOptions): DynamicModule {
        const auth0AuthenticationClient: Provider = {
            inject: [AUTH0_MANAGEMENT_OPTIONS],
            provide: AUTH0_MANAGEMENT_TOKEN,
            useFactory: (options: Auth0ManagementOptions) => createAuth0ManagementClient(options),
        };

        return {
            exports: [auth0AuthenticationClient],
            imports: asyncOptions.imports,
            module: Auth0ManagementCoreModule,
            providers: [...this.createAsyncProviders(asyncOptions), auth0AuthenticationClient],
        };
    }

    private static createAsyncProviders(options: Auth0ManagementAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }

    private static createAsyncOptionsProvider(
        options: Auth0ManagementAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: AUTH0_MANAGEMENT_OPTIONS,
                useFactory: options.useFactory,
            };
        }

        return {
            inject: [options.useExisting || options.useClass],
            provide: AUTH0_MANAGEMENT_OPTIONS,
            useFactory: (optionsFactory: Auth0ManagementOptionsFactory) =>
                optionsFactory.createAuth0AuthenticationOptions(),
        };
    }
}
