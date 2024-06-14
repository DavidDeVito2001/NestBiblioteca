import { TypeOrmModuleOptions } from '@nestjs/typeorm'; //	Importación del módulo de configuración de TypeORM

require('dotenv').config(); //Inicializamos la variables de entorno

class ConfigService{
    constructor(private env: {[k: string]: string|undefined}) {}

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
          throw new Error(`config error - missing env.${key}`);
        }
    
        return value;
      }
    

    public ensureValues(keys: string[]){
        keys.forEach(k =>this.getValue(k, true));
        return this;
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions{ //Función que configura las opciones de TypeORM
        return{
            type: 'mysql', //Configuración del gestor de base de datos a usar

            host: this.getValue('BIBLIOTECA_HOST'), //Configuración de valores mediante variables de entorno
            port: parseInt(this.getValue('BIBLIOTECA_PORT')),
            username: this.getValue('BIBLIOTECA_USER'),
            password: this.getValue('BIBLIOTECA_PASSWORD'),
            database: this.getValue('BIBLIOTECA_DATABASE'),

            entities: [
                'dist/book/**/*.entity{.ts,.js}',
                'dist/users/**/*.entity{.ts,.js}'
            ], //Especificación del directorio de entidades
            synchronize: true, //Actualización de las tablas ante cambios en las entidades

        };
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'BIBLIOTECA_HOST',
    'BIBLIOTECA_PORT',
    'BIBLIOTECA_USER',
    'BIBLIOTECA_PASSWORD',
    'BIBLIOTECA_DATABASE'
]);

export {configService};