<template>
     <div>
    <table class="table table-primary" style="width: 80%; margin: auto;">
      <thead>
        <tr>
          <th scope="col">訂單編號 (eShop-XXXX)</th>
          <th scope="col">訂單日期</th>
          <th scope="col">已付款</th>
          <th scope="col">付款確認日期</th>
          <th scope="col">是否要結清</th>
          <th scope="col">訂單明細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ $$filters.date(item.create_at) }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">Y</span>
            <span class="text-muted" v-else>N</span>
          </td>
          <td>
            <span class="text-success" v-if="item.is_paid">{{  $$filters.date(item.paid_date ) }}</span>
            <span class="text-muted" v-else>未付款</span>
            </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" v-if="!item.is_paid" @click="payOrder(item.id)">設定結清</button>
              <span class="text-muted" v-else>已結清</span>
            </div>

          </td>
          <td>
            <div class="btn-group">
                <RouterLink :to="{ path: `../products/checkout/${item.id}`}"  target="_blank">訂單明細</RouterLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      pagination: 0,
      check: ''
    }
  },
  methods: {
    getOrders () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}orders?page=1`
      console.log(url)
      this.$http.get(url)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.orders = res.data.orders
            this.pagination = res.data.pagination.total_pages
            this.check = res.data.orders.id
            console.log(this.pagination)
          }
        })
    },

    payOrder (itemID) { // 此api只把付款狀態改為true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}pay/${itemID}`
      this.$http.post(url, { data: itemID })
        .then((res) => {
          if (res.data.success) {
            this.getOrders()
          }
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
