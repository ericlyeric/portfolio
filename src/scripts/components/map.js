// prettier-ignore
const level = [
  '                                                [',
  ' P                                              <',
  '                                ^    {//}       <',
  '                                               O<',
  '                        ^    ^                {/(',
  '                                                <',
  '               []       ^                       <',
  '              [()|]              ^    ^  ^      <',
  '             [(===>      ^    ^      ^       ^  <',
  '            [(====>                             <',
  '||||||]    [(=====>                            [(',
  '======>  [|(======> O       []              O [(=',
  '======>  <========)|]   []  <>  []  []    [|||===',
  '======>  <==========>   <>  <>  <>  <>    <======',
  '======>  <==========>   <>  <>  <>  <>    <======',
]

// include github, linkedin, resume, about me
// do about me first O
// do resume after on right side
// do linkedin next
// do github at the end

export class Map {
  constructor() {
    const TILE_SIZE = 16;
    const config = {
      '[': {
        type: 'tile',
        texture: 'tile-left-ground',
      },
      '|': {
        type: 'tile',
        texture: 'tile-middle-ground',
      },
      ']': {
        type: 'tile',
        texture: 'tile-right-ground',
      },
      '{': {
        type: 'tile',
        texture: 'tile-left-float',
      },
      '/': {
        type: 'tile',
        texture: 'tile-middle-float',
      },
      '}': {
        type: 'tile',
        texture: 'tile-right-float',
      },
      '^': {
        type: 'tile',
        texture: 'tile-float',
      },
      '<': {
        type: 'tile',
        texture: 'tile-left-ground-fill',
      },
      '=': {
        type: 'tile',
        texture: 'tile-middle-ground-fill',
      },
      '>': {
        type: 'tile',
        texture: 'tile-right-ground-fill',
      },
      '(': {
        type: 'tile',
        texture: 'tile-left-ground-connect',
      },
      ')': {
        type: 'tile',
        texture: 'tile-right-ground-connect',
      },
      G: {
        type: 'goal',
        texture: 'goal',
      },
      O: {
        type: 'coin',
        texture: 'coin',
      },
      P: {
        type: 'player',
        texture: 'player',
      },
    };

    const map = level;

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
            ...config[tile.toString()],
            x: i * TILE_SIZE,
            y: j * TILE_SIZE + paddingTop,
          };
          this.info.push(info);
        }
      }
  }
}
