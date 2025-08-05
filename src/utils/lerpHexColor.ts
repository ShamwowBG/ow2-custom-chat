/**
 * A linear interpolator for hex colors.
 *
 * Based on:
 * https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
 *
 * @param {Number} a  (hex color start val)
 * @param {Number} b  (hex color end val)
 * @param {Number} ratio  (the amount to fade from a to b)
 *
 * @example
 * // returns 0x7f7f7f
 * lerpColor(0x000000, 0xffffff, 0.5)
 *
 * @returns {Number}
 */
export function lerpHexColorRGBA(a: number, b: number, ratio: number) {
  const ar =  (a & 0xff000000) >>> 24,
    ag =      (a & 0x00ff0000) >>> 16,
    ab =      (a & 0x0000ff00) >>> 8,
    aa =      a & 0x000000ff,
    br =      (b & 0xff000000) >>> 24,
    bg =      (b & 0x00ff0000) >>> 16,
    bb =      (b & 0x0000ff00) >>> 8,
    ba =      b & 0x000000ff,
    rr = ar + ratio * (br - ar),
    rg = ag + ratio * (bg - ag),
    rb = ab + ratio * (bb - ab),
    ra = aa + ratio * (ba - aa);

  const res = ((rr << 24) >>> 0) + ((rg << 16)) + (rb << 8) + (ra | 0);

  return res;
}


// <fg605d5dff>W<fg764f4fff>h<fg8d4242ff>y <fgba2828ff>d<fgd11b1bff>i<fge80e0eff>d <fgff0101ff>c<fgda0101ff>h<fgb60101ff>i<fg910101ff>c<fg6d0101ff>k<fg480101ff>e<fg240101ff>n <fg101ff>cross the road

// <fg605d5dff>W<fg764f4fff>h<fg8d4242ff>y <fgba2828ff>d<fgd11b1bff>i<fge80e0eff>d <fgff0101ff>c<fge02525ff>h<fgc14949ff>i<fga26d6dff>c<fg839292ff>k<fg64b6b6ff>e<fg45dadaff>n <fg27ffffff>cross the road

// <fg605d5dff>W<fg764f4fff>h<fg8d4242ff>y <fgba2828ff>d<fgd11b1bff>i<fge80e0eff>d <fgff0101ff>c<fgda0000ff>h<fgb60000ff>i<fg910000ff>c<fg6d0000ff>k<fg480000ff>e<fg240000ff>n <fgff>cross the road