<template>
  <PageLoading :active="isLoading" />
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openCmodal(true)">
      新增活動優惠券
    </button>
  </div>
  <div>
    <table class="table table-primary" style="width: 80%; margin: auto;">
      <thead>
        <tr>
          <th scope="col">促銷活動專案名稱</th>
          <th scope="col">折扣碼</th>
          <th scope="col">折扣</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in Coupons" :key="coupon.id">
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
              <button class="btn btn-outline-primary btn-sm" @click="openCmodal(false, coupon)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCmodal(coupon)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <CouponModal ref="couponModal" :coupon="tempCoupons" @update-coupons="updateCoupons"></CouponModal>
  <DelCmodal ref="delCmodal" :coupon="tempCoupons" @del-coupon="delCmoal" ></DelCmodal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelCmodal from '@/components/DelCmodal.vue'
export default {
  data () {
    return {
      Coupons: [
        // {
        //   title: '2023年端午節促銷',
        //   percent: 85,
        //   due_date: '2023-06-30',
        //   is_enabled: 0
        // },
        // {
        //   title: '2023年中秋節促銷',
        //   percent: 8,
        //   due_date: '2023-09-30',
        //   is_enabled: 0
        // },
        // {
        //   title: '2023年聖誕節促銷',
        //   percent: 75,
        //   due_date: '2023-12-31',
        //   is_enabled: 1
        // }
      ],
      tempCoupons: {},
      isNew: false,
      isLoading: false

    }
  },
  components: {
    CouponModal,
    DelCmodal

  },
  inject: ['emitter'],
  methods: {
    openCmodal (isNew, coupon) {
      console.log(isNew)
      // const dueDate = new Date().getTime()
      // console.log('日期: ', dueDate)

      if (isNew) {
        this.tempCoupons = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        // console.log(coupon)
        this.tempCoupons = { ...coupon }
      }
      // console.log('due_date')
      this.isNew = isNew
      const couponComponent = this.$refs.couponModal
      // console.log(couponComponent)
      couponComponent.showCmodal()
    },
    updateCoupons (item) { // add coupon or edit
      this.tempCoupons = item
      // console.log('CHECK OK', this.tempCoupons)
      /// // 未設定判斷是否新建或舊資料 /////
      // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupon`
      // const httpMethod = 'post'
      // const couponComponent = this.$refs.couponModal
      // this.$http[httpMethod](api, { data: this.tempCoupons }).then((response) => {
      //   console.log(response.data)
      //   couponComponent.hideCmodal()
      //   this.getCoupons()
      // })
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupon`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupon/:id`
        httpMethod = 'put'
      }
      const couponComponent = this.$refs.couponModal
      this.$http[httpMethod](api, { data: this.tempCoupons }).then((response) => {
        couponComponent.hideCmodal()
        if (response.data.success) {
          this.getCoupons()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
          })
        }
      })
    },

    getCoupons () {
      // console.log('coupon success')
      const CouponApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupons?page=1`
      console.log('my_Coupon_api GET path: ' + CouponApi)
      this.isLoading = true
      this.$http.get(CouponApi)
        .then((res) => {
          // console.log(res.data)
          this.isLoading = false
          if (res.data.success) {
            this.Coupons = res.data.coupons
            this.pagination = res.data.pagination
          }
        })
    },

    openDelCmodal (coupon) {
      this.tempCoupons = { ...coupon }
      console.log(this.tempCoupons)
      const delCouponComponent = this.$refs.delCmodal
      delCouponComponent.showCmodal()
    },

    delCmoal () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/coupon/${this.tempCoupons.id}`
      console.log(url)
      this.$http.delete(url).then((response) => {
        console.log(response.data)
        const delCouponComponent = this.$refs.delCmodal
        delCouponComponent.hideCmodal()
        this.getCoupons()
      })
    }
  },

  created () {
    this.getCoupons()
  }
}

</script>
