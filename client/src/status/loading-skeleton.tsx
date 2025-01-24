import React from "react";
import { Skeleton } from "antd";

const SkeletonLoader: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  );
};

export default SkeletonLoader;
