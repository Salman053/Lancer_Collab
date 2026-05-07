import { Sparkles } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Sparkles className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">LaraCollab</span>
                <span className="truncate text-xs text-muted-foreground">Project Portal</span>
            </div>
        </div>
    );
}
