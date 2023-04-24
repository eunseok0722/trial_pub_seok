import { createWebHistory, createRouter } from 'vue-router';
import CompList from "@/components/CompList.vue";
import CompHome from "@/components/CompHome.vue";
import CompDetail from "@/components/CompDetail.vue";
import CompComment from "@/components/CompComment.vue";
import CompAuthor from "@/components/CompAuthor.vue";
// import CompError from "@/components/CompError.vue";


const routes = [
    {
        path: "/",
        component: CompHome,
    },
    {
        path: "/list",
        name: 'CompList',
        component: CompList,
    },
    {
        name: 'CompDetail',
        // path: "/detail",
        // 숫자표현
        path: "/detail/:id/",
        component: CompDetail,
        props: true,
        children: [
            {
                name: CompAuthor,
                path: "author",
                component: CompAuthor,
            },
            {
                name: CompComment,
                path: "comment",
                component: CompComment,
            }
        ]
    },
    {
        // 404 페이지 만들기
        // 모든 문자가 들어오면 이라는 정규표현식 (.*)
        path: "/:anything(.*)",
        component: CompHome,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;