import { NotFoundError } from '@/commons/errors/not-found.error'

/**
 * Exception thrown when a Todo item is not found.
 */
export class TodoNotFoundException extends NotFoundError {}
