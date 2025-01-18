export class IdentityVo {
  private readonly value: string;

  /**
   * Creates a new Identity instance.
   * @param id - The string representation of the identifier.
   * @throws Error if the id is invalid.
   */
  private constructor(id: string) {
    this.ensureIsValidId(id);
    this.value = id;
  }

  /**
   * Factory method to create an Identity instance.
   * @param id - The string representation of the identifier.
   * @returns An Identity instance.
   */
  static create(id: string): IdentityVo {
    return new IdentityVo(id);
  }

  /**
   * Generates a new unique identifier.
   * @returns A new Identity instance.
   */
  static generate(): IdentityVo {
    const uuid = IdentityVo.generateUuid();
    return new IdentityVo(uuid);
  }

  /**
   * Returns the string representation of the identifier.
   * @returns The identifier as a string.
   */
  toString(): string {
    return this.value;
  }

  /**
   * Checks if another Identity is equal to the current one.
   * @param other - Another Identity instance.
   * @returns True if both identities are equal, false otherwise.
   */
  equals(other: IdentityVo): boolean {
    return this.value === other.value;
  }

  /**
   * Ensures that the provided id is a valid identifier.
   * @param id - The identifier to validate.
   * @throws Error if the identifier is invalid.
   */
  private ensureIsValidId(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!id || id.trim().length === 0) {
      throw new Error("Identity cannot be empty.");
    }

    if (!uuidRegex.test(id)) {
      throw new Error(`Invalid Identity format: ${id}`);
    }
  }

  /**
   * Generates a new UUID v4.
   * @returns A string representing a UUID v4.
   */
  private static generateUuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
