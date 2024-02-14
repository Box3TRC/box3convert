const VOXEL_TXT="37 A,39 B,41 C,43 D,45 E,47 F,49 G,51 H,53 I,55 J,57 K,59 L,61 M,63 N,65 O,67 P,69 Q,71 R,73 S,75 T,77 U,79 V,81 W,83 X,85 Y,87 Z,133 acacia,3 add,0 air,585 air_duct,485 ampersand,487 asterisk,489 at,491 backslash,574 bamboo,546 bat_window,553 bear_footprint,341 biscuit,175 black,302 black_glass,363 blue,566 blue_decorative_light,557 blue_gift,276 blue_glass,291 blue_light,349 blue_surface_01,351 blue_surface_02,416 blueberry_juice,433 board0,435 board1,453 board10,455 board11,457 board12,459 board13,461 board14,463 board15,437 board2,439 board3,441 board4,443 board5,445 board6,447 board7,449 board8,451 board9,181 board_01,183 board_02,309 board_03,311 board_04,313 board_05,315 board_06,635 board_07,483 bookshelf,631 bounce_pad,493 bracket_close,495 bracket_open,637 brick_01,639 brick_02,109 brick_red,587 button,89 cadet_blue,551 candy,497 caret,195 carpet_01,197 carpet_02,199 carpet_03,201 carpet_04,203 carpet_05,205 carpet_06,207 carpet_07,235 carpet_08,237 carpet_09,239 carpet_10,241 carpet_11,243 carpet_12,245 carpet_13,428 coffee,379 coffee_gray,499 colon,172 color_glass,501 comma,471 conveyor,405 crane_lantern,401 crane_roof_01,403 crane_roof_02,162 cross_window,329 dark_brick_00,331 dark_brick_01,333 dark_brick_02,317 dark_grass,95 dark_gray,369 dark_orchid,107 dark_red,383 dark_salmon,113 dark_slate_blue,327 dark_stone,357 dark_surface,125 dirt,9 divide,503 dollar,33 eight,11 equal,13 exclamation_mark,479 express_box,589 fan,582 firecracker,27 five,25 four,577 fu,164 geometric_window_01,166 geometric_window_02,170 glass,151 gold_trim_brick,420 grape_juice,127 grass,505 greater_than,568 green_decorative_light,278 green_glass,131 green_leaf,287 green_light,319 greenbelt_L,321 greenbelt_L1,149 grey_stone_brick,535 honeycomb_01,537 honeycomb_02,398 ice,145 ice_brick,249 ice_wall,289 indigo_light,591 lab_lamp_01,593 lab_lamp_02,595 lab_lamp_03,597 lab_material_01,599 lab_material_02,601 lab_material_03,603 lab_material_04,605 lab_material_05,607 lab_material_06,609 lab_material_07,611 lab_material_08,613 lab_material_09,615 lab_material_10,617 lab_material_11,619 lab_material_12,621 lab_material_13,622 lab_material_14,624 lab_material_15,627 lab_screen,629 lab_wire,157 lantern_01,159 lantern_02,465 lava01,467 lava02,251 leaf_01,253 leaf_02,529 leaf_03,531 leaf_04,533 leaf_05,633 leaf_06,473 ledfloor01,475 ledfloor02,121 lemon,418 lemon_juice,507 less_than,97 light_gray,147 light_grey_stone_brick,414 lime_juice,339 macaroon,377 maroon,111 medium_gray,391 medium_green,371 medium_orchid,373 medium_purple,397 medium_spring_green,375 medium_violet_red,389 medium_yellow,424 milk,395 mint_green,297 mint_green_light,7 multiply,385 navajo_white,35 nine,99 olive_green,19 one,119 orange,422 orange_juice,283 orange_light,387 orange_red,264 palace_carving,361 palace_cloud,209 palace_eaves_01,211 palace_eaves_02,213 palace_eaves_03,215 palace_eaves_04,217 palace_eaves_05,219 palace_eaves_06,221 palace_eaves_07,223 palace_eaves_08,263 palace_floor,307 palace_lamp,255 palace_roof,408 palace_window,103 pale_green,541 palm,511 paren_close,509 paren_open,430 peach_juice,513 percent,515 period,381 peru,115 pink,337 pink_cake,295 pink_light,137 plank_01,139 plank_02,141 plank_03,143 plank_04,641 plank_05,643 plank_06,645 plank_07,347 polar_ice,345 polar_region,517 pound,93 powder_blue,543 pumpkin,549 pumpkin_lantern,293 purple,353 purple_surface_01,355 purple_surface_02,155 quartz_brick,15 question_mark,519 quotation_mark,581 rainbow_cube,105 red,153 red_brick,259 red_brick_floor,261 red_brick_wall,570 red_decorative_light,555 red_gift,304 red_glass,281 red_light,359 rock,231 roof_blue_04,229 roof_green,407 roof_grey,227 roof_purple,225 roof_red,233 roof_yellow,117 sakura_pink,135 sand,521 semicolon,31 seven,393 sienna,29 six,91 sky_blue,523 slash,169 snow,565 snowflake_lamp,343 snowland,561 snowman_body,559 snowman_head,426 soy_sauce,544 spiderweb,123 stained_glass,247 stainless_steel,562 star_lamp,129 stone,323 stone_brick_01,325 stone_brick_02,267 stone_pillar_03,269 stone_pillar_04,271 stone_pillar_05,273 stone_pillar_06,275 stone_wall,335 stone_wall_01,412 strawberry_juice,185 stripe_01,187 stripe_02,189 stripe_03,191 stripe_04,193 stripe_05,5 subtract,481 television,23 three,525 tilde,647 toolbox,578 traditional_window,649 treasure_chest,367 turquoise,21 two,301 warm_yellow_light,364 water,177 white,539 white_grass,299 white_light,160 window,469 windygrass,527 winter_leaf,257 wood,179 wooden_box,411 woodstone_12,572 yellow_decorative_light,477 yellow_grass,101 yellow_green,285 yellow_light,17 zero,650 barrier";

const VOXEL_NAME2ID={},VOXEL_ID2NAME={};
VOXEL_TXT.split(',').forEach((voxel,i)=>{
    let x=voxel.split(" ");
    VOXEL_NAME2ID[x[1]]=parseInt(x[0]);
    VOXEL_ID2NAME[parseInt(x[0])]=x[1];
});
let box3voxels={
    id(name){
        return VOXEL_NAME2ID[name];
    },
    name(id){
        return VOXEL_ID2NAME[id];
    }
}
var BLOCKS={
    cadet_blue: { r: 55, g: 98, b: 156 },
    sky_blue: { r: 88, g: 170, b: 231 },
    powder_blue: { r: 193, g: 236, b: 248 },
    dark_gray: { r: 66, g: 66, b: 66 },
    light_gray: { r: 174, g: 174, b: 174 },
    olive_green: { r: 117, g: 143, b: 56 },
    yellow_green: { r: 176, g: 204, b: 76 },
    pale_green: { r: 210, g: 224, b: 137 },
    red: { r: 245, g: 14, b: 14 },
    dark_red: { r: 158, g: 25, b: 6 },
    brick_red: { r: 222, g: 74, b: 74 },
    medium_gray: { r: 113, g: 113, b: 113 },
    dark_slate_blue: { r: 40, g: 53, b: 115 },
    pink: { r: 255, g: 125, b: 156 },
    sakura_pink: { r: 255, g: 191, b: 226 },
    orange: { r: 255, g: 148, b: 14 },
    lemon: { r: 255, g: 247, b: 76 },
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    blue: { r: 0, g: 0, b: 255 },
    turquoise: { r: 77, g: 208, b: 225 },
    dark_orchid: { r: 123, g: 31, b: 162 },
    medium_orchid: { r: 186, g: 104, b: 200 },
    medium_purple: { r: 139, g: 140, b: 222 },
    medium_violet: { r: 221, g: 52, b: 141 },
    maroon: { r: 221, g: 52, b: 141 },
    coffee_gray: { r: 121, g: 85, b: 72 },
    peru: { r: 187, g: 117, b: 71 },
    dark_salmin: { r: 219, g: 164, b: 99 },
    navajo_white: { r: 251, g: 223, b: 155 },
    orange_red: { r: 230, g: 81, b: 0 },
    medium_yellow: { r: 255, g: 213, b: 65 },
    medium_green: { r: 10, g: 126, b: 7 },
    sienna: { r: 132, g: 107, b: 41 },
    mint_green: { r: 183, g: 255, b: 164 },
    medium_spring_green: { r: 55, g: 255, b: 193 },
  }