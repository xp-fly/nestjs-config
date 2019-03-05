import {Test, TestingModule} from "@nestjs/testing";
import {ConfigModule} from "../config.module";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "../config.service";

describe('ConfigModule', () => {
    it('configModule', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.load()],
        }).compile();

        const app = module.createNestApplication();
        await app.init();

        const configModule = module.get(ConfigModule);
        expect(configModule).toBeInstanceOf(ConfigModule);

        await app.close();
    })

    it('use config', async () => {
        @Injectable()
        class TestService {
            constructor(private config: ConfigService) {}

            getConfig() {
                return this.config.getConfig();
            }
        }

        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.load()],
            providers: [TestService],
        }).compile();

        const app = module.createNestApplication();
        await app.init();

        const testService = module.get(TestService);
        console.log(testService.getConfig())
        expect(testService.getConfig()).toBeInstanceOf(Object);

        await app.close();

    });
});

