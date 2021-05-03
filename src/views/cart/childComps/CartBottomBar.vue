<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="checked"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="t-price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item =>{
          return item.checked
        }).reduce((preValue, item) =>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkedLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0) return false

        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        return !this.$store.state.cartList.find(item =>!item.checked)
      }
    },
    methods: {
      checkClick(){
        if(this.isSelectAll){//全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{//部分或全部不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }
  .check-content .checked{
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .t-price{
    flex: 1;
  }
  .calculate{
    width: 100px;
    text-align: center;
    background-color: orangered;
    color: #fff;

  }
</style>
