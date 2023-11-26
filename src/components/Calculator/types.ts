export type Operator = '%' | 'x' | '-' | '+'

export interface Operation {
  firstValue: number | null
  operator: Operator | null
  secondValue: number | null
}
