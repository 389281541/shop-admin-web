<template>
  <shop-detail :is-edit=false></shop-detail>
</template>
<script>
import ShopDetail from './components/ShopDetail'
export default {
  name: 'addShop',
  components: {ShopDetail}
}
</script>
