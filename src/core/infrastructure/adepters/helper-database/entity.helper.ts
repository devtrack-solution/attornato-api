import { EntityTarget } from 'typeorm/common/EntityTarget'
import { EntitySchema } from 'typeorm'

export class EntityHelper<T> {
    getEntityName(target: EntityTarget<T>): string {
        if (typeof target === 'string') return target

        if (typeof target === 'function') return target.name

        if (target instanceof EntitySchema) return target.options.name

        if (typeof target === 'object' && 'name' in target) return target.name

        throw new Error('Unable to resolve entity name')
    }

}
