<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-image="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data(){
      return{
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created(){
      //保存iid
      this.iid = this.$route.params.iid
      //根据iid请求数据
      getDetail(this.iid).then(res =>{
        // console.log(res);
        const data = res.result
        //请求顶部轮播图数据
        this.topImage = data.itemInfo.topImages
        //请求商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取店铺数据
        this.shop = new Shop(data.shopInfo)
        //获取详细商品信息
        this.detailInfo = data.detailInfo
        //获取参数表信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        //错误的方法 无法获取图片的加载，应当用下面的getThemeTopY
        this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE)
        })
      })
      //请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      //获取getThemeTopY
      // this.getThemeTopY = debounce(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // })
  },
    methods: {
      imageLoad(){
        this.newRefresh();
        // this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position){
        // 获取Y
        const positionY = -position.y
        //positionY和主题中的进行对比
        let length = this.themeTopYs.length
        for(let i=0; i < length-1; i++){
          if(this.currentIndex !==i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }

          // if((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i])){
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }
        //是否显示返回顶部按钮
        this.isShowBackTop = (-position.y) >1000
      },
      addToCart() {
        const product = {}
        product.image = this.topImage[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //将商品添加到购物车
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart',product).then(res =>{
          this.$toast.show(res, 2000)
        })
      }
    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('item', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
