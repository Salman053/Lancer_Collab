import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { Briefcase, Clock, DollarSign, User } from 'lucide-react';

export default function ProjectSidebar({ project }: any) {
    return (
        <div className="space-y-6">
            {/* Financial Overview Card */}
            <Card className="border-emerald-100/50 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Financials
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-muted-foreground text-xs font-semibold uppercase">Budget ({project.currency})</p>
                        <p className="text-2xl font-bold">
                            {parseFloat(project.budget?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <Separator className="bg-emerald-100/50 dark:bg-emerald-900/30" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-muted-foreground text-[10px] font-semibold uppercase">Cost to Date</p>
                            <p className="font-semibold">
                                {parseFloat(project.actual_cost?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground text-[10px] font-semibold uppercase">Billing Type</p>
                            <p className="font-semibold capitalize">{project.billing_type}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Client Info Card */}
            <Card className="bg-card border-border overflow-hidden shadow-sm">
                <div className="h-2 w-full" style={{ backgroundColor: project.color || '#3b82f6' }} />
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="text-primary h-5 w-5" />
                        Client Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-bold">
                            {project.client?.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                            <p className="font-semibold">{project.client?.name}</p>
                            <p className="text-muted-foreground text-xs">{project.client?.company || 'Personal'}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="text-muted-foreground h-4 w-4" />
                            <span>{project.client?.timezone || 'UTC'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="text-muted-foreground h-4 w-4" />
                            <Link
                                href={route('freelancer.clients.show', project.client_id || 0)}
                                className="text-primary font-medium hover:underline"
                            >
                                View Full Portfolio
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Internal Notes Card */}
            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                        <Clock className="h-4 w-4" />
                        Internal Project Notes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap italic">
                        {project.notes || 'No internal notes provided for this project.'}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
