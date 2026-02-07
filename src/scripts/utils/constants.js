const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 360;
const MAX_WIDTH = DEFAULT_WIDTH * 1.5;
const MAX_HEIGHT = DEFAULT_HEIGHT * 1.5;
const SCALE_MODE = 'SMOOTH'; // FIT OR SMOOTH

export const CONFIG = {
  default: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  max: {
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
  },
  scaleMode: SCALE_MODE,
}

export const DIALOG = {
  text: {
    pc: 'left/right: ←/→ jump: ↑ or spacebar\n--Press any of the keys mentioned above to start--\n\nTo play on mobile scan the qr code below',
    mobile: 'Use the buttons below\n--Tap the arrow buttons below to start--\nChallenge a friend, get them to scan the qr code',
    objective1: `Hello, I'm Eric.\n\nOutside of my interest in STEM, I stay active through bouldering and men's league hockey. When I'm not keeping my brain or body busy, I'm spending time with my loved ones. \nA fun fact about me: I'm a big fan of escape rooms, we make an effort to try new rooms when visiting a new city. \n\nFor more information about my professional career click on "See Eric's resume" below.`,
    objective2: `If you're on LinkedIn feel free to reach out, I would love to connect with you`,
    objective3: `Wow, congratulations for getting to this point, I'm impressed. Thank you for your time, and feel free to check out my other projects by clicking "See Eric's other projects below"`,
  },
  info: {
    objective1: "See Eric's resume",
    objective2: "Let's connect",
    objective3: "See Eric's other projects",
  },
  link: {
    objective1: 'https://drive.google.com/file/d/199R62aN0CXS_gDt_GlSuH2VyqpZEq-C5/view?usp=sharing',
    objective2: 'https://www.linkedin.com/in/ericlyly/',
    objective3: 'https://github.com/ericlyeric',
  }
};

export const TILE_MAPPINGS = {
  ground: {
    fill: {
      left: 'tile-left-ground-fill',
      middle: 'tile-middle-ground-fill',
      right: 'tile-right-ground-fill',
    },
    connect: {
      left: 'tile-left-ground-connect',
      right: 'tile-right-ground-connect',
    },
    left: 'tile-left-ground',
    middle: 'tile-middle-ground',
    right: 'tile-right-ground',
  },
  float: {
    left: 'tile-left-float',
    middle: 'tile-middle-float',
    right: 'tile-right-float',
    single: 'tile-float',
  },
  size: 16,
}

export const TILE_SIZE = 16;

export const IMAGES = [
  'tile-left-ground',
  'tile-middle-ground',
  'tile-right-ground',
  'tile-left-ground-fill',
  'tile-middle-ground-fill',
  'tile-right-ground-fill',
  'tile-left-ground-connect',
  'tile-right-ground-connect',
  'tile-left-float',
  'tile-middle-float',
  'tile-right-float',
  'tile-float',
  'controls',
  'background',
  'dialog-box',
  'dialog-box-big',
  'qr-code',
];

export const LEVEL_DESIGN = [
  '                                                     ',
  '   MP                                                ',
  '                                  ^    {//}          ',
  '                                                  O  ',
  '                          ^    ^                {//} ',
  '                                                     ',
  '                 []       ^                          ',
  '                [()|]              ^    ^  ^         ',
  '               [(===>      ^    ^      ^       ^     ',
  '              [(====>                                ',
  ' [||||||]    [(=====>                            [|] ',
  ' <======>  [|(======> O       []              O [(=> ',
  ' <======>  <========)|]       <>      []    [|||(==> ',
  ' <======>  <==========>   []  <>      <>    <======> ',
  ' <======>  <==========>   <>  <>  []  <>    <======> ',
  ' <======>  <==========>   <>  <>  <>  <>    <======> ',
  ' <======>  <==========>   <>  <>  <>  <>    <======> ',
];

export const LEVEL_MAPPINGS = {
  '[': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.left,
  },
  '|': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.middle,
  },
  ']': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.right,
  },
  '{': {
    type: 'tile',
    texture: TILE_MAPPINGS.float.left,
  },
  '/': {
    type: 'tile',
    texture: TILE_MAPPINGS.float.middle,
  },
  '}': {
    type: 'tile',
    texture: TILE_MAPPINGS.float.right,
  },
  '^': {
    type: 'tile',
    texture: TILE_MAPPINGS.float.single,
  },
  '<': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.fill.left,
  },
  '=': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.fill.middle,
  },
  '>': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.fill.right,
  },
  '(': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.connect.left,
  },
  ')': {
    type: 'tile',
    texture: TILE_MAPPINGS.ground.connect.right,
  },
  G: {
    type: 'goal',
    texture: 'goal',
  },
  O: {
    type: 'objective',
    texture: 'objective',
  },
  P: {
    type: 'player',
    texture: 'player',
  },
  M: {
    type: 'monte',
    texture: 'monte',
  }
}
