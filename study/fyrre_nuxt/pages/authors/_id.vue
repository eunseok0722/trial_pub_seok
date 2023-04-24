<template>
 <div id="content">
   <section class="section">
     <div class="flex-space-center post-top">
       <div class="btn-go-back">
         <a @click="$router.go(-1)">GO BACK</a>
       </div>
       <div class="post-tit">
         AUTHOR
       </div>
     </div>
   </section>
   <!--  section | main-contents -->
   <section class="section sec-post-cont">
     <!--  Author information  -->
     <div class="podcast-info ty2">
       <div class="post-profile-wrap">
         <div class="post-cover-img">
           <img :src="require(`~/assets/images/${fndCont.profileImg}`)" :alt="fndCont.text">
         </div>
       </div>
       <div class="article-info">
         <div class="info-item flex-space-center">
           <span class="tit-l">FOLLOW</span>
           <div class="nav-sns">
             <!--    SNS link component        -->
             <NavSnsList :nav-sns-item="navSnsItemTy2"></NavSnsList>
             <!--    //SNS link component        -->
           </div>
         </div>
       </div>
     </div>
     <!--  Author information  -->
     <!--  post contents  -->
     <div class="post-cont-wrap">
       <div class="post-hl">
         <div class="post-hl-tit">
           <div class="section-tit">
             {{ fndCont.text }}
           </div>
         </div>
         <div class="post-description post-sub-tit post-lh">
           {{ fndCont.postBold01 }}
         </div>
       </div>
       <div class="post-cont">
         <div class="post-text txt-l post-lh">
           {{ fndCont.postText01 }}
         </div>
       </div>
     </div>
     <!--  post contents  -->
   </section>
   <!--  //section | main-contents -->
   <!--  author articles list component -->
   <AuthorArticlesList :author-name="fndCont.text"></AuthorArticlesList>
   <!--  //author articles list component -->
 </div>
</template>

<script>
export default {
  name: "PodcastPost",
  data() {
    return {
      id: Number(this.$route.params.id),
    }
  },
  computed: {
    navSnsItemTy2() {
      return this.$store.state.navSnsItem.slice(0, 3)
    },
    fndCont() {
      const dataBase = this.$store.state.authors.authorCont;
      const data = {};
      for (let i = 0; i < dataBase.length; i++) {
        if (dataBase[i].id === this.id) {
          Object.assign(data, dataBase[i]);
        }
      }
      return data
    }
  }
}
</script>

