import React, { memo, SVGProps } from "react";

const Ellipse1Icon = (props) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 1818 1818"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={909} cy={909} r={909} fill="#EBD3F8" />
  </svg>
);

const Memo = memo(Ellipse1Icon);
export default Memo;
