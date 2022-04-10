import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Auth0ManagementModule } from "nestjs-auth0-management";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        Auth0ManagementModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                domain: configService.get('AUTH0_DOMAIN'),
                clientId: configService.get('AUTH0_CLIENT_ID'),
                clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
            }),
        }),
    ],
    providers: [AppService],
})
export class AppModule {

}