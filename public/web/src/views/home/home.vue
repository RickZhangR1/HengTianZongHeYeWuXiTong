<template>
    <div class="main_container">
        <div>
         
        </div>

       


    </div>
</template>
<script>
    import bus from "../../utils/bus"
    export default {
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                 editableTabsValue: '',  //控制标签页显示那个；
                  editableTabs: [],      //标签页的数据
                  tabIndex: 2,
                  menuData:'',
                  val:false,
                  msg:true
            }
        },
        mounted(){
              // //默认从左侧菜单出渲染第一个标签页；
              // this.menuData = this.$session.get("child");
              //  let newTabName = ++this.tabIndex + '';
              //   //alert(newTabName);
              //   this.editableTabs.push({
              //     title: this.menuData[0].customerFullName,
              //     name: this.menuData[0].customerFullName,
              //     content: this.menuData[0].customerFullName+'New Tab content'
              //   });
              //   this.editableTabsValue = this.menuData[0].customerFullName;


                //this.$router.push('one')  

              //使用bus 获取其他vue页传来的数据；
              // bus.$on("menuFullname", msg => {
              // //alert('home:'+msg);
              //         for(let i=0; i<this.editableTabs.length; i++){
              //           if(this.editableTabs[i].title == msg){
                         
              //             this.val = true;
              //             //console.log(this.val==true);
              //           }
              //         }
              //       // console.log(this.val);
              //       //根据 val   true: 表明标签页中存在值；     false： 标签页中不存在值；可以创建一个新的标签页；
              //         if(this.val == true){
              //           //alert(msg);
              //            this.val = false;
              //           this.editableTabsValue = msg;     //点击左侧菜单栏选中标签页；
                        
              //         }else{
              //            let newTabName = ++this.tabIndex + '';
              //             //alert(newTabName);
              //             this.editableTabs.push({
              //               title: msg,
              //               name: msg,
              //               content: msg+'New Tab content'
              //             });
              //             this.editableTabsValue = msg;
                        
              //         }
              // });
        },
        methods:{
            // removeTab(targetName) {          //关闭标签页事件；
            //   let tabs = this.editableTabs;
            //   let activeName = this.editableTabsValue;
            //   if (activeName === targetName) {
            //     tabs.forEach((tab, index) => {
            //       if (tab.name === targetName) {
            //         let nextTab = tabs[index + 1] || tabs[index - 1];
            //         if (nextTab) {
            //           activeName = nextTab.name;
            //         }
            //       }
            //     });
            //   }
              
            //   this.editableTabsValue = activeName;
            //   this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            // }
        }
    }
</script>
<style>
    .main_container {
        width: 100%;
        /* height: 100%; */
        display: flex;
        flex-direction: column;
        
    }

    .el-tabs {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        /* background-color: #fff; */
    }

    .el-tabs__header {
        background-color: #fff !important;
        
    }

    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        border-bottom: none;
        background-color: #E9EEF3
    }

    .el-tabs__content {
        overflow: auto;
    }

</style>
