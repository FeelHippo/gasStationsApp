export default [
  {
    path: '/home',
    name: 'home',
    component: () => import(`@/modules/home/Home`),
  }
]