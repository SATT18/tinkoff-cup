import globalClassNames from '....../style.d'
declare const classNames: typeof globalClassNames & {
  readonly container: 'container'
  readonly loader: 'loader'
}
export = classNames
