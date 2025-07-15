import React, { ComponentType, SVGProps } from "react";

type TNav = {
  name: string;
  path: string;
};

type TAvalible = {
  title: string;
  subtitle: string;
};

type TService = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  subtitle: string;
  action: string;
};
