<template>
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info">
    <div class="info-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-others">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <div class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    color: #222;
  }
  .info-price{
    margin-top: 10px;
  }
  .info-price .n-price{
    font-size: 20px;
    color: var(--color-high-text)
  }
  .info-price .o-price{
    font-size: 13px;
    margin-left: 8px;
    text-decoration: line-through;
  }
  .info-price .discount{
    font-size: 12px;
    margin-left: 8px;
    border-radius: 8px;
    background-color: var(--color-high-text);
    color: #ffffff;
    padding: 2px 5px;
    position: relative;
    top: -5px;
  }
  .info-others{
    margin-top: 15px;
    padding-bottom: 10px;
    font-size: 13px;
    display: flex;
    border-bottom: 3px solid #f2f5f8;

    justify-content: space-between
  }
  /*.info-others span{*/
    /*flex: 1;*/
  /*}*/
  .info-service{
    margin-top: 15px;
    display: flex;
    font-size: 12px;
    padding-bottom: 15px;
    justify-content: space-between
  }
  /*.info-service .info-service-item{*/
    /*flex: 1;*/
  /*}*/
  .info-service .info-service-item img{
    width: 12px;
    height: 12px;
  }
</style>
