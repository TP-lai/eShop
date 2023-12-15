<template>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="Cmodal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">活動優惠券資訊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!---->
                    <div class="row mb-3">
                        <label for="inputName" class="col-sm-2 col-form-label">標 題</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="couponName" placeholder="請輸入活動名稱" v-model="tempCoupons.title">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputDiscount" class="col-sm-2 col-form-label">折扣(%)</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="couponDiscount"  placeholder="請輸入折扣數(%)" v-model="tempCoupons.percent">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputDiscount" class="col-sm-2 col-form-label">優惠碼</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="couponCode"  placeholder="請輸入活動優惠碼" v-model="tempCoupons.code">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="due_date" class="col-sm-2 col-form-label">到期日</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="due_date" v-model="due_date">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-10 offset-sm-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="tempCoupons.is_enabled" :true-value="1" :false-value="0" id="is_enabled" />
                                <label class="form-check-label" for="is_enabled">
                                    勾選啟用此優惠券
                                </label>
                            </div>
                        </div>
                    </div>
                    <!---->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="$emit('update-coupons', tempCoupons)">儲存優惠券</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CmodalMixin from '@/mixins/CmodalMixin'

export default {
  name: 'couponModal',
  props: { // 傳出外層Coupon列表
    coupon: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      Cmodal: {},
      tempCoupons: {},
      due_date: ''
    }
  },

  watch: {
    coupon () {
      this.tempCoupons = this.coupon
      // 將時間格式改為 YYYY-MM-DD
      console.log('原始時間碼除1000', this.tempCoupons.due_date)
      const dateAndTime = new Date(this.tempCoupons.due_date * 1000)
        .toISOString().split('T') // split('T') 是用分隔線 - 分開年月日
      this.due_date = dateAndTime[0]
      console.log('時間碼乘回1000再轉成數字日期', this.due_date)
    },

    due_date () {
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },

  methods: {
  },

  mixins: [CmodalMixin]
}
</script>
