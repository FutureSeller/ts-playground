export {}

type MyReadonly2<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
} & {
  readonly [Key in keyof T as Key extends K ? Key : never]: T[Key]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK
