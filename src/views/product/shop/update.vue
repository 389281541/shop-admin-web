<template>
  <shop-detail :is-edit=true></shop-detail>
</template>
<script>
import ShopDetail from './components/ShopDetail'
export default {
  name: 'updateShop',
  components: { ShopDetail }
}
</script>
