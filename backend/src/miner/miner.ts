import AppTurtle from "../appturtle";
import { Direction, Location } from "../utils";

export default class Miner {
  turtle: AppTurtle;

  location: Location;
  direction: Direction;

  constructor(turtle: AppTurtle) {
    this.turtle = turtle;

    this.location = new Location("world", -91, 12, 5);
    this.direction = Direction.NORTH;
  }

  async forward(): Promise<boolean> {
    let res = await this.turtle.forward();
    if (res) {
      switch (this.direction) {
        case Direction.NORTH:
          this.location.z--;
        case Direction.SOUTH:
          this.location.z++;
        case Direction.EAST:
          this.location.x++;
        case Direction.WEST:
          this.location.x--;
      }
    }
    return res;
  }

  async back(): Promise<boolean> {
    let res = await this.turtle.back();
    if (res) {
      switch (this.direction) {
        case Direction.NORTH:
          this.location.z++;
        case Direction.SOUTH:
          this.location.z--;
        case Direction.EAST:
          this.location.x--;
        case Direction.WEST:
          this.location.x++;
      }
    }
    return res;
  }

  async turnLeft(): Promise<boolean> {
    let res = await this.turtle.turnLeft();
    if (res) {
      switch (this.direction) {
        case Direction.NORTH:
          this.direction = Direction.WEST;
        case Direction.SOUTH:
          this.direction = Direction.EAST;
        case Direction.EAST:
          this.direction = Direction.NORTH;
        case Direction.WEST:
          this.direction = Direction.SOUTH;
      }
    }
    return res;
  }

  async turnRight(): Promise<boolean> {
    let res = await this.turtle.turnRight();
    if (res) {
      switch (this.direction) {
        case Direction.NORTH:
          this.direction = Direction.EAST;
        case Direction.SOUTH:
          this.direction = Direction.WEST;
        case Direction.EAST:
          this.direction = Direction.SOUTH;
        case Direction.WEST:
          this.direction = Direction.NORTH;
      }
    }
    return res;
  }

  async setDirection(direction: Direction) {}

  async moveTo(location: Location) {
    if (this.location === location) return;
    if (this.location.world !== location.world) return;

    if (location.x > this.location.x) {
    }
  }
}
