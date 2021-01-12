export class Location {
  world: string;

  x: number;
  y: number;
  z: number;

  constructor(world: string, x: number, y: number, z: number) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
