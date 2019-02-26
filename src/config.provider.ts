import * as dotenv from 'dotenv';
import * as YAML from 'yamljs';
import * as fs from 'fs';
import * as path from 'path';
import {ConfigFileNotFoundException} from "./config.exception";
import {Provider} from "@nestjs/common";
import {CONFIG_PROVIDER_TOKEN} from "./constant";

export interface ConfigInterface {
    [key: string]: any;
}

// app root dir
const baseDir = process.cwd();

let config: ConfigInterface = {};

export class ConfigProvider {
    /**
     * 加载配置文件
     * @param filePath
     */
    public static load(filePath?: string): Provider {
        if (!filePath || !fs.existsSync(filePath)) {
            if (fs.existsSync(path.resolve(baseDir, 'bootstrap.yml'))) {
                filePath = path.resolve(baseDir, 'bootstrap.yml');
            } else if (fs.existsSync(path.resolve(baseDir, '.env'))) {
                filePath = path.resolve(baseDir, '.env');
            } else {
                throw new ConfigFileNotFoundException();
            }
        }
        const extName = path.extname(filePath);
        if (!extName || !['.env', '.yml'].includes(extName)) {
            throw new ConfigFileNotFoundException();
        }
        switch (extName) {
            case '.yml':
                config = YAML.load(filePath);
                break;
            case '.env':
                config = dotenv.load(filePath);
                break;
            default:
                throw new ConfigFileNotFoundException();
        }
        return {
            provide: CONFIG_PROVIDER_TOKEN,
            useValue: config,
        };

    }

    /**
     * 根据 key 值获取配置
     * @param key
     */
    public static get(key: string) {
        return config[key];
    }

    /**
     * 获取配置
     * @param keys
     */
    public static getConfig(keys?: string[]): ConfigInterface {
        if (Array.isArray(keys)) {
            return keys.reduce((prev, next) => {
                prev[next] = config[next];
                return prev;
            }, {})
        }
        return config;
    }
}
