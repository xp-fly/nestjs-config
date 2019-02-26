import {Injectable} from "@nestjs/common";
import {ConfigProvider} from "./config.provider";

@Injectable()
export class ConfigService {
    get(key: string) {
        return ConfigProvider.get(key);
    }

    getConfig(keys?: string[]) {
        return ConfigProvider.getConfig(keys);
    }
}
