export class ConfigFileNotFoundException extends Error {
    constructor() {
        super();
        this.message = 'config file not found';
        this.name = 'ConfigFileNotFoundException';
    }

}
