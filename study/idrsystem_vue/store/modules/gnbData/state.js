const state = () => ({
  gnbModalShow: false,
  gnbInfo: [
    {
      class: '/main',
      href: 'main',
      title: 'Home'
    },
    {
      class: '/service',
      href: 'service/commerce',
      title: 'Service',
      d2Toggle: false,
      depth2: [
        { to: '/service/commerce', href: 'service/commerce', title: 'E-commerce' },
        { to: '/service/marketing', href: 'service/marketing', title: 'AI-Marketing Curator' },
        { to: '/service/design', href: 'service/design', title: 'UX/UI Design' }
      ]
    },
    {
      class: '/works',
      href: 'works/base',
      title: 'Works'
    },
    {
      class: '/contact',
      href: 'contact/intro',
      title: 'Contact',
      d2Toggle: false,
      depth2: [
        { to: '/contact/intro', href: 'contact/intro', title: 'IDR 소개' },
        { to: '/contact/history', href: 'contact/history', title: '연혁' },
        { to: '/contact/recruit', href: 'contact/recruit', title: '채용안내' }
      ]
    }
  ]
})
export default state
