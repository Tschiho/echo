module.exports = {
  "plugins": {
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": { utf8: false },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines', '.mint-swipe-indicators', '.mint-swipe-indicator'],
      minPixelValue: 1,
      mediaQuery: false
    },
    "postcss-viewport-units": {},
    "cssnano": {
      "cssnano-preset-advanced": {
        zindex: false,
        autoprefixer: false
      },
    }
  }
}