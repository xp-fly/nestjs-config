import {DynamicModule, Global, Module} from "@nestjs/common";
import {ConfigProvider} from "./config.provider";
import {ConfigService} from "./config.service";

@Global()
@Module({})
export class ConfigModule {
    public static load(filePath?: string): DynamicModule {
        // 加载配置
        ConfigProvider.load(filePath);
        return {
            module: ConfigModule,
            providers: [ConfigService],
            exports: [ConfigService],
        }
    }
}
