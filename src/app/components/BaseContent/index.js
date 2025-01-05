import React, { useEffect, useState, Children } from "react";
function BaseContent({ children, className }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const tmp = Children.map(children, (child) => {
      if (child) {
        return <div className={`site-layout-background ${className ? className : ""}`}>{child}</div>;
      }
    });
    setItems(tmp);
  }, [children]);
  return <>{items}</>;
}
export default BaseContent;
