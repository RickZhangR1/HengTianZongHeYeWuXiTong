<template>
    <div id="workoderys">
        <div id="test">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                    <el-radio-group v-model="formInline.resource">
                    <el-radio label="验收通过"></el-radio>
                    <el-radio label="验收不通过"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <br>
                <el-form-item class="workoderys_btn">
                    <el-button-group class="" >
                        <el-button @click="wo_dect2" >取消</el-button>
                        <el-button type="primary">确定</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"sbbxct2",
    props:['sbbxct2'],
    data(){
        return{
            formInline: {
                resource: ''
            }
        }
    },
    mounted(){
        
    },
    methods:{
         wo_dect2(done){
             this.$confirm('确认关闭？')
            .then(_ => {
                this.drawer.drawerSearch.hide();
            })
            .catch(_ => {});
         }
    },
    created(){

    }
}
</script>
<style>
#workoderys{
  padding-left: 20px;
  padding-right: 20px;

}
.el-form-item.workoderys_btn{
    float: right;
}

</style>