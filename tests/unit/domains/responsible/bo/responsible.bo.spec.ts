import { Subject } from '@/domain/process/component/subject/business-objects/subject.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Subject BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Processos Civis',
  }

  it('should create a valid Subject without id', () => {
    const subject = new Subject(validObject)
    expect(subject).toBeInstanceOf(Subject)
    expect(subject.name).toBe('Processos Civis')
  })

  it('should serialize to persistence object', () => {
    const subject = new Subject(validObject)
    const output = subject.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Subject(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
