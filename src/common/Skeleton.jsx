import React from "react";
import Each from "./Each";

const Skeleton = ({
  show = true,
  children,
  height = 4,
  heightClass,
  widthClass,
  width = "full",
  count = 1,
  bg = "white",
  className,
  radiusClass,
  radius = "lg",
  content = null,
}) => {
  return show ? (
    <Each
      of={Array.from({ length: count })}
      render={() =>
        content ? (
          content
        ) : (
          <div
            className={`bg-${bg} animate-pulse ${
              heightClass || `h-${height}`
            } ${widthClass || `w-${width}`} ${className} ${
              radiusClass || `rounded-${radius}`
            } `}
          ></div>
        )
      }
    />
  ) : (
    children
  );
};

export default Skeleton;
