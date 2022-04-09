import { Inject } from "@nestjs/common";
import { AUTH0_MANAGEMENT_TOKEN } from "./auth0.constants";

export function InjectManagementClient() {
    return Inject(AUTH0_MANAGEMENT_TOKEN);
}
