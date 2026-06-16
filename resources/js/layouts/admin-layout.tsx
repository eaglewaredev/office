import { Box } from "@mui/material";
import React, { useEffect, useMemo } from 'react'
import Header from "@/components/admin/Header";
import SideMenu from "@/components/admin/SideMenu";
import { Head, usePage } from "@inertiajs/react";

export default function AdminLayout({
    title,
    menu,
    subMenu,
    children,

}: Readonly<{
    title: string;
    menu: string;
    subMenu: string;
    children: React.ReactNode;
}>) {
    // console.log(usePage())
    const {appName, staff, site} = usePage().props

    return (
        <>
        <Head>
            <title>{`${title} - ${appName}`}</title>
        </Head>
        <Box sx={{display: 'flex', minHeight: '100dvh'}}>
            <SideMenu site={site} menu={menu} subMenu={subMenu} staff={staff}/>
            <Header menu={menu} staff={staff} subMenu={subMenu} site={site}/>
            {children}
        </Box>
        </>

    )
}
