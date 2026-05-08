import { usePage } from "@inertiajs/react";

export default function AppLogo() {

    const { auth } = usePage<{ auth: any }>().props;
    return (
        <div className="group/logo flex items-center gap-2">
            <div className="bg-brand text-brand-foreground flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm transition-all duration-300 group-hover/logo:scale-110 overflow-hidden border border-border/50">
                <img src="/logo.png" alt="LancerCollab Logo" className="w-full h-full object-cover" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="group-hover/logo:from-brand group-hover/logo:to-brand/70 truncate  font-bold tracking-tight transition-all duration-300 dark:text-white">
                    LancerCollab
                </span>
                <span className="text-white group-data-[sidebar=menu-button]:text-sidebar-foreground/70 truncate text-[9px] font-bold uppercase tracking-widest opacity-70">
                    {auth.user.role} Portal
                </span>
            </div>
        </div>
    );
}
