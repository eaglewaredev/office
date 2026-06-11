import { Head, usePage } from "@inertiajs/react";

export default function WWWLayout({
    title,
    menu,
    children,
}:{
    title: string;
    menu: string;
    children: React.ReactNode;
}){
    const { appName } = usePage().props

    return (
        <>
        <Head>
            <title>{`${title} - ${appName}`}</title>
        </Head>
        {children}
        </>
    )
}
