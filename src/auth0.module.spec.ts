import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ManagementClient } from "auth0";
import { AUTH0_MANAGEMENT_TOKEN } from "./auth0.constants";
import { Auth0ManagementOptions, Auth0ManagementOptionsFactory } from "./auth0.interfaces";
import { Auth0ManagementModule } from "./auth0.module";

describe("Auth0ManagementModule", () => {
    const domain = "test";
    const clientId = "test";
    const clientSecret = "test";

    class TestService implements Auth0ManagementOptionsFactory {
        createAuth0ManagementOptions(): Auth0ManagementOptions {
            return {
                domain,
                clientId,
                clientSecret,
            };
        }
    }

    @Module({
        exports: [TestService],
        providers: [TestService],
    })
    class TestModule { }

    describe("forRoot", () => {
        it("should provide the Auth0 ManagementClient", async () => {
            const module = await Test.createTestingModule({
                imports: [Auth0ManagementModule.forRoot({ 
                    domain, 
                    clientId,
                    clientSecret,
                })],
            }).compile();

            const managementClient = module.get<ManagementClient>(AUTH0_MANAGEMENT_TOKEN);
            expect(managementClient).toBeDefined();
            expect(managementClient).toBeInstanceOf(ManagementClient);
        });
    });

    describe("forRootAsync", () => {
        describe("when the `useFactory` option is used", () => {
            it("should provide the Auth0 ManagementClient", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        Auth0ManagementModule.forRootAsync({
                            useFactory: () => ({ domain, clientId, clientSecret }),
                        }),
                    ],
                }).compile();

                const managementClient = module.get<ManagementClient>(AUTH0_MANAGEMENT_TOKEN);
                expect(managementClient).toBeDefined();
                expect(managementClient).toBeInstanceOf(ManagementClient);
            });
        });

        describe("when the `useExisting` option is used", () => {
            it("should provide the Auth0 ManagementClient", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        Auth0ManagementModule.forRootAsync({
                            imports: [TestModule],
                            useExisting: TestService,
                        }),
                    ],
                }).compile();

                const managementClient = module.get<ManagementClient>(AUTH0_MANAGEMENT_TOKEN);
                expect(managementClient).toBeDefined();
                expect(managementClient).toBeInstanceOf(ManagementClient);
            });
        });

        describe("when the `useClass` option is used", () => {
            it("should provide the Auth0 ManagementClient", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        Auth0ManagementModule.forRootAsync({
                            useClass: TestService,
                        }),
                    ],
                }).compile();

                const managementClient = module.get<ManagementClient>(AUTH0_MANAGEMENT_TOKEN);
                expect(managementClient).toBeDefined();
                expect(managementClient).toBeInstanceOf(ManagementClient);
            });
        });
    });
});