import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  subtitle1?: string;
  details?: string[];
};

const ReportSection = ({ title, subtitle, subtitle1, details }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-blue-600">{title}</h3>
      <div className="flex flex-col md:flex-row justify-between">
        {subtitle && <p>- {subtitle}</p>}
        {subtitle1 && <p>- {subtitle1}</p>}
      </div>

      {details && (
        <ul>
          {details.map((detail, i) => (
            <li className="mb-2" key={i}>
              - {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportSection;
