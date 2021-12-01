module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-sass-guidelines',
    'stylelint-config-rational-order',
  ],

  plugins: [
    'stylelint-scss',
  ],

  rules: {
    'order/properties-alphabetical-order': null,
    'color-named': 'always-where-possible',
    'selector-class-pattern': '^[a-z0-9\\-\\_]+$',
    'max-nesting-depth': 3,
    'indentation': 2,
  },
}