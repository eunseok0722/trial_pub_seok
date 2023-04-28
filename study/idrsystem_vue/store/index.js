export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const modules = {
}

// 모듈 폴더 안에 있는 각각의 strore 모듈을 동적으로 불러옴
const files = require.context('./modules', true, /index.js$/)
files.keys().forEach((key) => {
  modules[files(key).NAMESPACE] = files(key).default
})
