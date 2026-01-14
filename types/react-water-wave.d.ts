declare module "react-water-wave" {
  import * as React from "react";

  type Props = {
    imageUrl: string;
    dropRadius?: number;
    perturbance?: number;
    resolution?: number;
    interactive?: boolean;
    children?: React.ReactNode | ((...args: any[]) => React.ReactNode);
  };

  const WaterWave: React.ComponentType<Props>;
  export default WaterWave;
}
