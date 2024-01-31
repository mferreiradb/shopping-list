import { DataSource } from 'typeorm'
import { ProductEntity } from './entities/ProductEntity'

export const dataSource = new DataSource({
    database: 'database.db',
    entities: [ ProductEntity],
    type: 'expo',
    driver: require('expo-sqlite'),
    synchronize: true
})