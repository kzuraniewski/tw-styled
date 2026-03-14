# tw-styled

A UI library to create styled React components using tailwind classes. Inspired by styled-components 

## Examples

### Styling an HTML element
```ts
 const Card = tw.div`
    radius-2
    p-4
    mx-2
    my-3
`;
```

### Styling a component

```ts
const StyledButton = tw(Button)`
    mx-auto
    mt-3
`;
```

### Custom props and conditional styles

```ts
type BlockProps = { bordered?: boolean };

const Block = tw.div<BlockProps>`
    w-3
    h-3
    ${p => p.bordered && 'border-1'}
`;
```

### Default props

```ts
type TextFieldProps = { variant?: 'outlined' | 'underlined' };

const TextField = tw.input.props<TextFieldProps>({
    type: 'text',
    variant: 'outlined',
})`
    w-full
    rounded-md
    ${p => p.variant === 'outlined' && 'border-1 ...'}
    ...
`;
```
