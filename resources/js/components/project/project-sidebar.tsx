import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { DollarSign, User, Clock, Briefcase } from 'lucide-react';

export default function ProjectSidebar({ project }: any) {
    return (
        <div className="space-y-6">
            {/* Financial Overview Card */}
            <Card className="bg-emerald-50/30 border-emerald-100/50 dark:bg-emerald-950/10 dark:border-emerald-900/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Financials
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Budget ({project.currency})</p>
                        <p className="text-2xl font-bold">{parseFloat(project.budget?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                    <Separator className="bg-emerald-100/50 dark:bg-emerald-900/30" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Cost to Date</p>
                            <p className="font-semibold">{parseFloat(project.actual_cost?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Billing Type</p>
                            <p className="font-semibold capitalize">{project.billing_type}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Client Info Card */}
            <Card className="bg-card shadow-sm border-border overflow-hidden">
                <div className="h-2 w-full" style={{ backgroundColor: project.color || '#3b82f6' }} />
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Client Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {project.client?.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                            <p className="font-semibold">{project.client?.name}</p>
                            <p className="text-xs text-muted-foreground">{project.client?.company || 'Personal'}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{project.client?.timezone || 'UTC'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <Link href={route('freelancer.clients.show', project.client_id || 0)} className="text-primary hover:underline font-medium">
                                View Full Portfolio
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Internal Notes Card */}
            <Card className="bg-card shadow-sm border-border">
                <CardHeader>
                    <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Internal Project Notes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm italic text-muted-foreground whitespace-pre-wrap">
                        {project.notes || 'No internal notes provided for this project.'}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
