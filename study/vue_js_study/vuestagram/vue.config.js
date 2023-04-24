const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  // pwa 관련된 설정 저장
  pwa: {
    name: 'vuestagram',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    workboxOptions: {
      // 제외하고 싶은 파일명
      // .map .namifest.json으로 끝나는 파일, index.html은 제외해주세요 라는 내용
      // 자세한 내용은 workbox 라이브러리 찾아보거나 vue pwa 검색 필요
      exclude: [/\.map$/, /manifest\.json$/, 'html.html']
    }
  }
})
