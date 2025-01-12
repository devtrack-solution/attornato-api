

export class Todo {
  private id: string
  private name: string
  private age: number
  private birthday: Date
  private isActive: boolean
  private height: number

  constructor(props: { id: string, name: string, age: number, birthday: Date, isActive: boolean, height: number }) {
    this.id = props.id
    this.name = props.name
    this.age = props.age
    this.birthday = props.birthday
    this.isActive = props.isActive
    this.height = props.height
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getAge(): number {
    return this.age
  }

  getBirthday(): Date {
    return this.birthday
  }

  getIsActive(): boolean {
    return this.isActive
  }

  getHeight(): number {
    return this.height
  }

  setId(id: string): void {
    this.id = id
  }

  validateId(id: string): any[] {
    return []
  }
}