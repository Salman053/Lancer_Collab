import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-brand decoration-brand/30 hover:decoration-brand dark:decoration-brand/30 underline underline-offset-4 transition-colors duration-300 ease-out',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
