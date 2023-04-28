// console.log('plugin.Js')
const CustomPlugin = {
  // eslint-disable-next-line no-unused-vars
  install (Vue, options) {
    Vue.mixin({
      mounted () {
        // console.log('Mounted!')
      },
      methods: {
        mixinCallTest () {
          console.log('mixinCallTest')
        },
        gnbToggle: function () {
          this.$store.commit('modules/gnbData/gnbModalToggle')
        },
        gnbToggleOff: function () {
          window.scrollTo(0, 0)
          this.$store.commit('modules/gnbData/gnbModalToggle', false)
        },
        scrollTop () {
          document.querySelector('#wrapper').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start'
          })
        },
        commonScrollToAnchor (selectedAnchor) {
          // console.log(`commonScrollToAnchor : ${selectedAnchor}`)
          const blkWorks = document.querySelector('#works_' + selectedAnchor)
          let targetScroll
          let direction // 스크롤방향
          if (selectedAnchor > this.selectedIdx) {
            direction = 1 // 아래방향
          } else if (selectedAnchor < this.selectedIdx) {
            direction = 0 // 위방향
          }
          if (blkWorks) {
            if (this.isMobile) {
              if (direction) {
                targetScroll = blkWorks.offsetTop - 59
              } else {
                targetScroll = blkWorks.offsetTop - 119
              }
            } else {
              targetScroll = blkWorks.offsetTop
            }
          }
          window.scrollTo(0, targetScroll)
        }
      }
    })
  }
}

export default CustomPlugin
