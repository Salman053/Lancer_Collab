import ClientForm from '@/components/freelancer/client-form';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/freelancer/dashbaord',
    },
    {
        title: 'Clients',
        href: '/freelancer/clients',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex items-center p-5 justify-between">
                <PageHeader
                    title="All Clients"
                    subtitle="Manage All Client here"
                />

                <Drawer >
                    <DrawerTrigger type='button'><Button className='cursor-pointer' variant={'secondary'} >New Client</Button></DrawerTrigger>
                    <DrawerContent>
                        <div className="mt-4">
                            <ClientForm className='border-none' />
                        </div>

                    </DrawerContent>
                </Drawer>

            </div>




        </AppLayout>
    );
}
