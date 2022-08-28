import MySquadView from './views/MySquadView.vue'
import PlayerView from './views/PlayerView.vue'
import PlayersView from './views/PlayersView.vue'
import TeamsView from './views/TeamsView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'Landing',
  //   component: LandingView
  // },
  {
    path: '/players',
    name: 'Players',
    component: PlayersView
  },
  {
    path: '/player/:id',
    name: 'Player',
    component: PlayerView
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView
  },
  // {
  //   path: '/team/:id',
  //   name: 'Team',
  //   component: TeamView
  // },
  // {
  //   path: '/fixtures',
  //   name: 'Fixtures',
  //   component: FixturesView
  // },
  // {
  //   path: '/fixture/:id',
  //   name: 'Fixture',
  //   component: FixtureView
  // },
  {
    path: '/my-squad',
    name: 'MySquad',
    component: MySquadView,
    children: [

    ]
  },
  // { path: '/:catchAll(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
