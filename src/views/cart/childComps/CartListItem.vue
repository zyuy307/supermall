<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @click.native="checkedChange" :is-checked="product.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-des">{{product.des}}</div>
      <div class="item-bottom">
        <div class="item-price left">{{product.price}}</div>
        <div class="item-count right">{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartListItem",
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkedChange(){
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped>
  #shop-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title,.item-des{
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-des{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .item-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .item-bottom .item-price{
    color: orangered;
  }
</style>
