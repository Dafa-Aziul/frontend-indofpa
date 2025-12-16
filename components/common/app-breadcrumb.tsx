"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BreadcrumbItemType = {
    label: string;
    href?: string;
};

type AppBreadcrumbProps = {
    items: BreadcrumbItemType[];
    className?: string;
};

export default function AppBreadcrumb({
    items,
    className,
}: AppBreadcrumbProps) {
    const shouldCollapse = items.length > 3;

    const renderLink = (item: BreadcrumbItemType) => (
        <BreadcrumbLink asChild>
            <Link href={item.href || "#"}>{item.label}</Link>
        </BreadcrumbLink>
    );

    /* ================= NORMAL MODE ================= */
    if (!shouldCollapse) {
        return (
            <Breadcrumb className={cn("mb-4", className)}>
                <BreadcrumbList>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    ) : (
                                        renderLink(item)
                                    )}
                                </BreadcrumbItem>

                                {!isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    /* ================= COLLAPSED MODE ================= */
    const firstItem = items[0];
    const prevLastItem = items[items.length - 2];
    const lastItem = items[items.length - 1];
    const ellipsisItems = items.slice(1, -2);

    return (
        <Breadcrumb className={cn("mb-4", className)}>
            <BreadcrumbList>
                <BreadcrumbItem>{renderLink(firstItem)}</BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                            <BreadcrumbEllipsis className="h-4 w-4" />
                            <span className="sr-only">Toggle breadcrumb menu</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start">
                            {ellipsisItems.map((item, index) => (
                                <DropdownMenuItem key={index} asChild={!!item.href}>
                                    {item.href ? (
                                        <Link href={item.href}>{item.label}</Link>
                                    ) : (
                                        <span>{item.label}</span>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>{renderLink(prevLastItem)}</BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{lastItem.label}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
