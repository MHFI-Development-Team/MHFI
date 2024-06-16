declare module '@georgedoescode/spline' {
    export function spline(points: any[], tension: number, closed: boolean): string;
  }

  declare module '@chriscourses/perlin-noise' {
    export function generateNoise(): (x: number, y: number) => number;
  }