import { AuthenticationClient } from "auth0";
import { InjectManagementClient } from "nestjs-auth0-management";

export class AppService {
    constructor(
        @InjectManagementClient() private readonly authenticationClient: AuthenticationClient,
    ) {}
}