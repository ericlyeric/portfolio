import { LEVEL_DESIGN, LEVEL_MAPPINGS, TILE_SIZE } from '../utils/constants.js';

export class Map {
  constructor() {
    const map = LEVEL_DESIGN
    const paddingTop = 32 * TILE_SIZE;

    this.size = {
      x: 0,
      y: 0,
      width: map[0].length * TILE_SIZE,
      height: map.length * TILE_SIZE + paddingTop,
    };
    this.info = [];

    for (let j = 0; j < map.length; j++)
      for (let i = 0; i < map[j].length; i++) {
        const tile = map[j].charAt(i);
        if (tile !== ' ') {
          let info = {
            ...LEVEL_MAPPINGS[tile.toString()],
            x: i * TILE_SIZE,
            y: j * TILE_SIZE + paddingTop,
          };
          this.info.push(info);
        }
      }
  }
}
