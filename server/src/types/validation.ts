/** Represents a constructor for a class */
type ClassType<T> = { new (...args: any[]): T };

export type { ClassType }