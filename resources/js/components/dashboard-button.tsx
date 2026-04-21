import { Auth } from '@/types';
import { Link } from '@inertiajs/react';
import { useMemo } from 'react';

export default function DashboardButton({ auth }: {
    auth: Auth
}) {
    const dashboardRoute = useMemo(() => {
        if (!auth.user) return '/dashboard';

        const role = auth.user.role;

        switch (role) {
            case 'admin':
                return '/admin/dashboard';
            case 'client':
                return '/client/dashboard';
            case 'freelancer':
                return '/freelancer/dashboard';
            default:
                return '/dashboard';
        }
    }, [auth.user]);

    return (
        <div className="flex items-center gap-4">
            {auth.user && (
                <Link
                    href={dashboardRoute}
                    className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90 dark:bg-brand/70 dark:hover:bg-brand/60 transition-colors"
                >
                    Dashboard
                </Link>
            )}
        </div>
    );
}