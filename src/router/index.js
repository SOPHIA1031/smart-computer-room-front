import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '主页' },
            children:[
                {
                    path: '/inout',
                    component: resolve => require(['../components/page/inoutRecord.vue'], resolve),
                    meta: { title: '出入门统计' }
                },
                {
                    path: '/alarm',
                    component: resolve => require(['../components/page/AlarmCount.vue'], resolve),
                    meta: { title: '告警统计' }
                },
                {
                    path: '/location',
                    component: resolve => require(['../components/page/Location.vue'], resolve),
                    meta: { title: '人员定位' }
                },
                {
                    path: '/workpoint',
                    component: resolve => require(['../components/page/WorkPointManagement.vue'], resolve),
                    meta: { title: '工作点管理' }
                },
                {
                    path: '/pointLoc',
                    component: resolve => require(['../components/page/StaticWorkPoint.vue'], resolve),
                    meta: { title: '静态人员定位' }
                },
                {
                    path: '/panshi',
                    component: resolve => require(['../components/page/LocationPanshi.vue'],resolve),
                    meta: { title: '磐石系统测试'}
                },
                {
                    path: '/uwbTrajectory',
                    component: resolve => require(['../components/page/UWBTrajectory.vue'],resolve),
                    meta: { title: 'uwb定位历史轨迹查询'}
                },
                {
                    path: '/history',
                    component: resolve => require(['../components/page/HistoryTrajectory.vue'],resolve),
                    meta: { title: '地磁历史轨迹查询'}
                },
                {
                    path: '/UWBUpload',
                    component: resolve => require(['../components/page/UWBUpload.vue'], resolve),
                    meta: { title: 'UWB指纹库' }
                },
                {
                    path: '/MagUpload',
                    component: resolve => require(['../components/page/MagUpload.vue'], resolve),
                    meta: { title: '地磁指纹库' }
                },
                {
                    path: '/roleManagement',
                    component: resolve => require(['../components/page/RoleManagement.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/taskManagement',
                    component: resolve => require(['../components/page/TaskManagement.vue'], resolve),
                    meta: { title: '作业管理' }
                },
                {
                    path: '/deviceManagement',
                    component: resolve => require(['../components/page/DeviceManagement.vue'], resolve),
                    meta: { title: '设备管理' }
                },
                {
                    path: '/accountManagement',
                    component: resolve => require(['../components/page/AccountManagement.vue'], resolve),
                    meta: { title: '账号管理' }
                },
            ]
        },
        {
            path:'/register',
            component:resolve=>require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path:'/403',
            component: resolve => require(['../components/basePage/403.vue'], resolve)
        }
    ]
})
