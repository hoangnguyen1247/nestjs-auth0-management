import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ManagementClient } from "auth0";
import { InjectManagementClient } from "./auth0.decorators";
import { Auth0ManagementModule } from "./auth0.module";

describe("InjectManagementClient", () => {
    const domain = "test";
    const clientId = "test";
    const clientSecret = "test";
    let module: TestingModule;

    @Injectable()
    class TestService {
        public constructor(@InjectManagementClient() public readonly auth0ManagementClient: ManagementClient) { }
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                Auth0ManagementModule.forRoot({ 
                    domain: domain, 
                    clientId,
                    clientSecret,
                }),
            ],
            providers: [TestService],
        }).compile();
    });

    describe("when decorating a class constructor parameter", () => {
        it("should inject the Auth0 ManagementClient", () => {
            const testService = module.get(TestService);
            expect(testService).toHaveProperty("auth0ManagementClient");
            expect(testService.auth0ManagementClient).toBeInstanceOf(ManagementClient);
        });
    });
});