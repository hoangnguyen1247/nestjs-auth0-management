import { ManagementClient } from "auth0";
import { Auth0ManagementOptions } from "./auth0.interfaces";

export function createAuth0ManagementClient(options: Auth0ManagementOptions) {
    const auth0ManagementClient = new ManagementClient(options);

    return auth0ManagementClient;
}