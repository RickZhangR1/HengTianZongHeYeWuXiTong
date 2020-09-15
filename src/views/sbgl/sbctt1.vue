<template>
    <div id="inputcontext">
        <div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="单位">
                    <el-input v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item label="厂家">
                    <el-input v-model="form.supplierfullname"></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="form.machineName"></el-input>
                </el-form-item>
                <el-form-item label="设备型号">
                    <el-input v-model="form.machineCode"></el-input>
                </el-form-item>
                <el-form-item label="设备编号">
                    <el-input v-model="form.machineNo"></el-input>
                </el-form-item>
                <el-form-item label="报修人员">
                    <el-input v-model="form.operator"></el-input>
                </el-form-item>
                <el-form-item label="维修人员">
                    <el-input v-model="form.repairMan"></el-input>
                </el-form-item>
                <el-form-item label="进厂时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form.intoFactoryTime" type="date" placeholder="进厂时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="报修时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form.operatorTime" type="date" placeholder="报修时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="维修时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form.repairTime" type="date" placeholder="维修时间"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="设备状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="故障中"></el-radio>
                        <el-radio label="维修中养"></el-radio>
                        <el-radio label="保中"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-button-group class="group_an">
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-button-group>
        </div>
    </div>
</template>
<script>
    export default {
        name: "sbctt1",
        data() {
            return {
                form: {
                    companyName: '',
                    supplierfullname: '',
                    machineName: '',
                    machineCode: '',
                    machineNo: '',
                    intoFactoryTime: '',
                    status:[],
                    operator: '',
                    repairMan: '',
                    operatorTime: '',
                    repairTime: ''

                },
                drawer: true,
                screenHeight: document.body.clientHeight
            }
        },
        mounted() {
        },
        methods: {
            onSubmit() {
                this.drawer = false
                let sweet={
                    companyName:this.form.companyName,
                    supplierfullname:this.form.supplierfullname,
                    machineName:this.form.machineName,
                    machineCode:this.form.machineCode,
                    machineNo:this.form.machineNo,
                    intoFactoryTime:this.form.intoFactoryTime,
                    status:this.form.status,
                    operator:this.form.operator,
                    operatorTime:this.form.operatorTime,
                    repairMan:this.form.repairMan,
                    repairTime:this.form.repairTime
                }
                this.$http.post("/fabric/machine/toAdd", sweet).then(res => {
                console.log(this.form)

                })

                }

        },
        created() {

        }
    }
</script>
<style>
    #inputcontext {
        padding-left: 20px;
        padding-right: 20px;
    }

    .el-button-group.group_an {
        float: right;
    }

    .el-form-item {
        margin-bottom: 10px;
    }

    .el-input__icon.el-icon-date {
        line-height: 30px;
    }

    /* 输入框 */
    #inputcontext .el-input__inner {
        height: 30px;
        width: 300px;
    }
</style>