import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    //3监听图片加载完成
    let newRefresh = debounce(this.$refs.scroll.refresh, 50)
    //对监听的事件进行保存
    this.itemImgListener = () =>{
      newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('woshi hunru');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick(){
      // console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
  

