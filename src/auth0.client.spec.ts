import { ManagementClient } from "auth0";
import { createAuth0ManagementClient } from "./auth0.client";

describe("createAuth0ManagementClient", () => {
    const domain = "test";
    const clientId = "test";
    const clientSecret = "test";

    it("should return the Auth0 AuthenticationClient", () => {
        const auth0ManagementClient = createAuth0ManagementClient({ 
            domain: domain,
            clientId,
            clientSecret,
        });
        expect(auth0ManagementClient).toBeInstanceOf(ManagementClient);
    });
});