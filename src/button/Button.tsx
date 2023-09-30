import className from 'classnames';

type IButtonProps = {
  xs?: boolean;
  sm?: boolean;
  xl?: boolean;
  secondary?: boolean;
  full?: boolean;
  children: string;
  disabled?: boolean;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xs': props.xs,
    'btn-sm': props.sm,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-secondary': props.secondary,
    'btn-primary': !props.secondary,
    'w-full': props.full,
    'btn-disabled': props.disabled,
  });

  return (
    <div className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-lg text-center border;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-xs {
            @apply text-sm py-2 px-2;
          }

          .btn-sm {
            @apply text-base font-medium py-2 px-3;
          }

          .btn-primary {
            @apply text-white bg-blue-500 border-blue-500 dark:border-blue-600;
          }

          .btn-primary:hover {
            @apply bg-blue-600;
          }

          .btn-primary:active {
            @apply bg-blue-500;
          }

          .btn-secondary {
            @apply bg-white text-primary-500 border-gray-200 dark:border-blue-600;
          }

          .btn-secondary:hover {
            @apply bg-gray-100;
          }

          .btn-secondary:active {
            @apply border-gray-200 dark:border-blue-600;
          }
          .btn-disabled {
            @apply bg-gray-300 text-gray-500 cursor-not-allowed;
          }
        `}
      </style>
    </div>
  );
};

export { Button };
