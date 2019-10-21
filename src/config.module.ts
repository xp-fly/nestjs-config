import {DynamicModule, Global, Module} from "@nestjs/common";
import {ConfigProvider} from "./config.provider";
import {ConfigService} from "./config.service";

@Global()
@Module({})
export class ConfigModule {
    /**
     * 返回模块，加载配置
     * @param filePath
     */
    public static load(filePath?: string, configName?: string): DynamicModule {
        // 加载配置
        ConfigProvider.load(filePath, configName);
        return {
            module: ConfigModule,
            providers: [ConfigService],
            exports: [ConfigService],
        }
    }

    /**
     * 直接读取配置文件获取配置
     * @param key
     */
    public static get(key: string) {
        // 加载配置
        ConfigProvider.load();
        return ConfigProvider.get(key);
    }
}
