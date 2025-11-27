// Tiny WCAG contrast checker (relative luminance)
function srgbToLin(c){ c/=255; return c<=0.03928? c/12.92 : Math.pow((c+0.055)/1.055,2.4) }
function luminance([r,g,b]){ return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b) }
export function contrast(rgb1, rgb2){
  const L1 = luminance(rgb1), L2 = luminance(rgb2)
  const [a,b] = L1>L2? [L1,L2] : [L2,L1]
  return (a+0.05)/(b+0.05)
}
console.log('Contrast of black/white =', contrast([0,0,0],[255,255,255]))
