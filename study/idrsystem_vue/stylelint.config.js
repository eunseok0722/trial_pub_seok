module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
    'stylelint-config-recommended-vue'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'scss/dollar-variable-pattern': null,
    indentation: 2,
    'string-quotes': 'double',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-function-notation': 'legacy',
    'selector-combinator-space-after': 'always',
    'selector-attribute-quotes': 'always',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'number-leading-zero': 'always',
    'number-max-precision': 8,
    'function-url-quotes': 'always',
    'font-family-name-quotes': 'always-where-recommended',
    'comment-whitespace-inside': 'always',
    'comment-empty-line-before': 'always',
    'at-rule-no-vendor-prefix': null,
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always',
    'at-rule-semicolon-space-before': 'never',
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['after-single-line-comment', 'first-nested']
      }
    ],
    'selector-pseudo-class-parentheses-space-inside': 'always',
    'selector-no-vendor-prefix': null,
    'media-feature-range-operator-space-before': 'always',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-parentheses-space-inside': 'always',
    'media-feature-name-no-vendor-prefix': null,
    'media-feature-colon-space-before': 'never',
    'media-feature-colon-space-after': 'always',
    'keyframe-block-no-duplicate-selectors': null,
    'value-list-max-empty-lines': 0,
    'declaration-empty-line-before': 'never',
    'block-no-empty': true,
    'shorthand-property-no-redundant-values': true,
    'no-descending-specificity': null,
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules'
    ],
    'order/properties-alphabetical-order': true
  }
}
