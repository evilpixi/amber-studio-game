const IS_LANDSCAPE: boolean = window.innerWidth > window.innerHeight;
const GAME_WIDTH: number = IS_LANDSCAPE ? 800 : 480;
const GAME_HEIGHT: number = IS_LANDSCAPE ? 480 : 800;
const STARTING_HEARTS: number = 3;


export { IS_LANDSCAPE, GAME_WIDTH, GAME_HEIGHT, STARTING_HEARTS };