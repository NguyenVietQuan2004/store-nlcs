import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadCrumProps {
  listBread: Array<{ name: string; href: string }>;
}

function BreadCrum({ listBread }: BreadCrumProps) {
  return (
    <Breadcrumb className="my-6">
      <BreadcrumbList className="!gap-1 ">
        {listBread.map((value, index) => (
          <React.Fragment key={value.name}>
            {index !== 0 && (
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem className="last:underline text-black text-base font-light">
              <Link href={value.href}>{value.name}</Link>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrum;
