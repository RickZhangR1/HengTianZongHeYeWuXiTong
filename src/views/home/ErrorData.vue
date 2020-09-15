<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="序号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="orderNO"
                    label="合同号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="fabricEncoding"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="batchNo"
                    label="缸号">
            </el-table-column>
            <el-table-column
                    prop="pinumber"
                    label="匹号">
            </el-table-column>

        </el-table>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                tableData: [{
                    id: '',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                ]
            }
        }

    }
</script>

<style scoped>

</style>
