## Description

config module for nestjs using dotenv and jsyaml

## Install

> npm install nestjs-configure --save or yarn add nestjs-configure

## Basic usage

use .env or bootstrap.yml manage config

### .env

```bash
test=1
ip=localhost
```

### bootstrap.yml

```bash
# bootstrap.yml
this: is
a:
  - YAML
  - example

# config 
{ this: 'is', a: [ 'YAML', 'example' ] }
```

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-configure';

@Module({
  imports: [ConfigModule.load()]
})
export class AppModule {
  
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-configure';

@Injectable()
class TestService {
    constructor(private config: ConfigService) {}

    getConfig() {
        return this.config.getConfig();
    }
}
```
