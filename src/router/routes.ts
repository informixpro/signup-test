import {RouteRecordRaw} from 'vue-router'

const SignUp = () => import('@/components/SignUp.vue')

const routes: RouteRecordRaw[] = [{path: '/', component: SignUp}]

export default routes
