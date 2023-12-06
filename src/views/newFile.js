export default (await import('vue')).defineComponent({
data() {
return {
products: [],
pagination: {}
};
},
components: {
ProductModal
},
methods: {
getProducts() {
const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}admin/products`;
console.log(api);
this.$http.get(api)
.then((res) => {
if (res.data.success) {
this.products = res.data.products;
this.pagination = res.data.pagination;
console.log(res.data);
}
})
.catch((error) => {
console.log(error);
});
},

openModel({
this:  }) { }, : .tempProduct = {},
}
});
