<template>
  <el-popover placement="right" width="326" trigger="click" popper-class="elp" v-model="vis">
    <div v-for="(ic,index) in icons" :key="index" @click="icos(ic.icon)" class="item-icon">
      <i :class="ic.icon"></i>
    </div>
    <el-button slot="reference" :icon="ics" :type="ty" class="allicon"></el-button>
  </el-popover>
</template>
<script>
export default {
  props:['ics'],
  data() {
    return {
      vis: false,
      ty: "",
      icons: ""
    };
  },
  methods: {
    icos(val) {
      this.ics = val;
      this.vis=false;
      this.$emit("isicon",val)
    }
  },
  created() {
    this.axios.get("/user/getAllIcon").then(res =>{
      this.icons=res.data.data;
    })
  }
};
</script>
<style>
.elp {
  height: 250px;
  overflow: auto;
}
.item-icon {
  display: block;
  border: 1px;
  border: solid;
  border: #409eff;
  border-radius: 5px;
  float: left;
  background: #409eff;
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 25px;
  margin: 5px;
  padding: 3px;
  cursor: pointer;
}
  .allicon{
    width: 45px;
    height: 40px;
  }
.allicon i{
  margin-left: -5px;
}
</style>
