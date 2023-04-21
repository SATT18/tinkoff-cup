import globalClassNames from '....../style.d'
declare const classNames: typeof globalClassNames & {
  readonly container: 'container'
  readonly text: 'text'
  readonly actions: 'actions'
}
export = classNames
