"use client";
import { useState } from "react";
import '@/styles/globals.css';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import manu from "@/../public/images/menu.png";
import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "sonner";
import { Icon } from "@iconify/react";
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";
import { File } from "lucide-react";
import { Images } from "lucide-react";
import { Users } from "lucide-react";

interface LinkItem {
    label: string;
    href: string;
    icon: React.ReactNode; 
    children?: LinkItem[];
}
const links: LinkItem[] = [
    {
        label: "Website Management",
        href: "#",
        icon: <Icon icon="mdi:web-sync" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        children: [
            { label: "Addnews", href: "/admin/AddArticle", icon: (
                <div className="flex items-center gap-1">
                  <Plus className="text-neutral-700 dark:text-neutral-200 w-4 h-4" />
                  <Icon icon="marketeq:Addnews-alt" className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                </div>
              )},
            { label: "Updatennews", href: "/admin/updatearticle", icon: (
                <div className="flex items-center gap-1" >
                    <Pencil className="text-neutral-500 dark:text-neutral-200 w-4 h-4"/>
                    <Icon icon="marketeq:Addnews-alt" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> 
                </div>
            )},
            { label: "Pdf", href: "/admin/pdf", icon: (
                <div className="flex gap-1">
                <File className="text-neutral-500 dark:text-neutral-200 w-4 h-4"/>
                <Icon icon="marketeq:Addnews-alt" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                </div>
            )},
            { label: "Images", href: "/admin/adminimages", icon: (
                <div className="flex gap-1">
                <Images className="w-4 h-4 text-neutral-500"/>
                <Icon icon="marketeq:Addnews-alt" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />

                </div>
            ) },
            { label: "Home Page", href: "/", icon: <Icon icon="flat-color-icons:home" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
            { label: "About", href: "/admin/adminabout", icon: (
                <div className="flex gap-1">
                    <Users className="w-4 h-4 text-neutral-500"/>
                    <Icon icon="marketeq:Addnews-alt" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                </div>
            ) },
            { label: "Contact us", href: "/admin/admincontact", icon: (
                <div className="flex gap-1">
                    <Users className="w-4 h-4 text-neutral-500"/>
                    <Icon icon="marketeq:Addnews-alt" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                </div>
            ) },
            { label: "Ads", href: "/admin/adminads", icon: (
                <div className="flex gap-1">
                    <Users className="w-4 h-4 text-neutral-500"/>
                    <Icon icon="marketeq:Addnews-alt" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                </div>
            ) },
            // { label: "Course List", href: "/admin/course", icon: <Icon icon="hugeicons:course" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
        ],
    },
    { label: "Logout", href: "/logout", icon: <Icon icon="flowbite:profile-card-outline" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    // { label: "Settings", href: "#", icon: <Icon icon="flat-color-icons:settings" className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
];

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <html lang="en">
            <StoreProvider>
                <body className="antialiased h-screen">
                    <div className="flex h-screen bg-gray-100 dark:bg-neutral-800">
                        <div className="w-auto flex-shrink-0">
                            <Sidebar open={open} setOpen={setOpen}>
                                <SidebarBody>
                                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                                        {open ? <Logo /> : <LogoIcon />}
                                        <div className="mt-8 flex flex-col gap-2">
                                            {links.map((link, idx) => (
                                                <SidebarLink
                                                    key={idx}
                                                    link={{
                                                        ...link,
                                                        icon: link.icon,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <SidebarLink
                                            link={{
                                                label: "Admin User",
                                                href: "#",
                                                icon: (
                                                    <Image
                                                        src={manu}
                                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                                        width={50}
                                                        height={50}
                                                        alt="Avatar"
                                                    />
                                                ),
                                            }}
                                        />
                                    </div>
                                </SidebarBody>
                            </Sidebar>
                        </div>
                        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
                        <Toaster />
                    </div>
                </body>
            </StoreProvider>
        </html>
    );
}

const Logo = () => (
    <Link href="/admin" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <Image src='/images/one.png' height={200} width={500} loading="lazy" quality={100} alt="K-Tech Logo" className="h-7 w-7 rounded-lg" />
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
          Badalata-Bharat-AdminPanel
        </motion.span>
    </Link>
);

const LogoIcon = () => (
    <Link href="/admin" className="flex space-x-2 items-center py-1 relative z-20">
        <Image src="/images/one.png" height={500} width={500} loading="lazy" quality={100} alt="K-Tech Logo" className="h-7 w-7 rounded-lg" />
    </Link>
);
