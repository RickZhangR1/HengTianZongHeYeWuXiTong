<template>
     <div id="inputcontext2">
         <div id="test">
                <table class="workoder_tbl">
                    <tr>
                        <td class="td1">设备名称</td>
                        <td>平车</td>
                    </tr>
                    <tr>
                        <td class="td1">维修人</td>
                        <td>李千千</td>
                    </tr>
                    <tr>
                        <td class="td1">存放地址</td>
                        <td>YHT19611</td>
                    </tr>
                    <tr>
                        <td class="td1">故障描述</td>
                        <td>仓库中硝酸溶液不足,需要解释补充</td>
                    </tr>
                </table>
                <br>
                <span id="span_work">维修时间轴</span>
                <div style="width:250;margin-left:60px;margin-top:20px">
                <el-timeline>
                    <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
                </div>
        </div>
     </div>
</template>
<script>
export default {
    name:"sbbxct1",
    props:['drawer'],
    data(){
        return{
            activities: [{
                content: '已报修',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
                }, {
                content: '维修中',
                timestamp: '2018-04-03 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-s-tools'
                }, {
                content: '待验收',
                timestamp: '2018-04-03 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
                }, {
                content: '已验收',
                timestamp: '2018-04-03 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-circle-check'
            }]
        }
    },
    mounted(){
        
    },
    methods:{
         
    },
    created(){

    }
}
</script>
<style>
#inputcontext2{
  padding-left: 20px;
  padding-right: 20px;
}
.work_ipt1.el-input .el-input__inner {
    height: 30px;
    width: 150px;
}
#test table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
.workoder_tbl{
    font-size: 12px;
}
.workoder_tbl tr .td1{
    width: 120px;
    height: 30px;
}
/* span */
#span_work{
    color: #409EFF;
}
/* 时间轴 */

</style>