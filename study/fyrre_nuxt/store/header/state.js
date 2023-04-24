export default () => ({
  // counter: 0
  navMenuItem: [
    {id: 1, name: 'Magazine', path: '/magazine'},
    {id: 2, name: 'Authors', path: '/authors'},
    {id: 3, name: 'Podcast', path: '/podcast'},
  ],
  logoImg: {url: 'fyrre_magazine.png', name: `fyrre_magazine`},
  navActive: false,
  scrollY: 0,
  lastScrollY: 0,
  timer: null,
  inactive: false,
})
