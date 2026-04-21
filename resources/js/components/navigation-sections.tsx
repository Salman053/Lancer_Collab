import { NavMain } from '@/components/nav-main';
import { type NavItem } from '@/types';

interface NavigationSectionsProps {
    items: NavItem[];
    className?: string;
}

export function NavigationSections({ items, className = '' }: NavigationSectionsProps) {
    const sections = {
        main: items.filter(item => !['Settings', 'Support'].includes(item.title)),
        secondary: items.filter(item => ['Settings', 'Support'].includes(item.title)),
    };

    return (
        <div className={className}>
            {sections.main.length > 0 && (
                <div className="mb-4">
                    <NavMain items={sections.main} />
                </div>
            )}

            {sections.secondary.length > 0 && (
                <div className="border-t border-border pt-4 mt-4">
                    <NavMain items={sections.secondary} />
                </div>
            )}
        </div>
    );
}