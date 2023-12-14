<template>
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openCmodal(true)">
      增加電子優惠券
    </button>
  </div>
  <div>
    <table class="table table-primary" style="width: 80%; margin: auto;">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">折扣碼</th>
          <th scope="col">折扣</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coupon, key) in Coupons" :key="key">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percent / 10 + '折' }}</td>
          <td>{{ $$filters.date(coupon.due_date) }}</td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled">Y</span>
            <span class="text-muted" v-else>N</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <CouponModal ref="couponModal" :coupon="tempCoupons" @update-coupons="updateCoupons"></CouponModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'

export default {
  data () {
    return {
      Coupons: [
        // {
        //   title: '2023年端午節促銷',
        //   percent: 0.85,
        //   due_date: '2023-06-30',
        //   is_enabled: 0
        // },
        // {
        //   title: '2023年中秋節促銷',
        //   percent: 0.8,
        //   due_date: '2023-09-30',
        //   is_enabled: 0
        // },
        // {
        //   title: '2023年聖誕節促銷',
        //   percent: 0.75,
        //   due_date: '2023-12-31',
        //   is_enabled: 1
        // }
      ],
      tempCoupons: {},
      isNew: false

    }
  },
  components: {
    CouponModal

  },
  methods: {
    openCmodal (isNew, coupon) {
      console.log(isNew)
      if (isNew) {
        this.tempCoupons = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupons = { ...coupon }
      }
      console.log('due_date')
      this.isNew = isNew
      const couponComponent = this.$refs.couponModal
      // console.log(couponComponent)
      couponComponent.showCmodal()
    },
    updateCoupons (item) { // add coupon or edit
      this.tempCoupons = item
      // console.log('CHECK OK', this.tempCoupons)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupon`
      const httpMethod = 'post'
      const couponComponent = this.$refs.couponModal
      this.$http[httpMethod](api, { data: this.tempCoupons }).then((response) => {
        console.log(response.data)
        couponComponent.hideCmodal()
        this.getCoupons()
      })
    },

    getCoupons () {
      // console.log('coupon success')
      const CouponApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupons?page=1`
      console.log('my_Coupon_api GET path: ' + CouponApi)
      this.$http.get(CouponApi)
        .then((res) => {
          // console.log(res.data)
          if (res.data.success) {
            this.Coupons = res.data.coupons
            this.pagination = res.data.pagination
          }
        })
    }
  },
  created () {
    this.getCoupons()
  }
}

</script>
