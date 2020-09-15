<template>
  <div class="main_container">
       <div id="maintabs" v-if="publicUser == 1">
         <el-tabs v-model="editableTabsValue" type="card" @tab-click='tabsClick' closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
             
              <router-view></router-view>
            </el-tab-pane>
          </el-tabs>
          
       </div>
       <div v-else>
          <router-view></router-view>
       </div>

    
  </div>
</template>
 <script>
  import Home from '../../views/home/home.vue';
  import Balance from '../../views/balance/balance.vue';
  import Salary from '../../views/salary/salary.vue';
  import Summary from '../../views/summary/summary.vue';
  import bus from "../../utils/bus"

export default {
  name: 'navMain',
  data () {
    return {
      editableTabsValue: '',  //控制标签页显示那个；
      editableTabs: [],      //标签页的数据
      tabIndex: 2,
      menuData:'',
      val:false,
      publicUser: ''
    }
  },
  components:{
    Home,
    Balance,
    Salary,
    Summary
  },
  mounted(){
        //默认从左侧菜单出渲染第一个标签页；
          this.menuData = this.$session.get("child");
            let newTabName = ++this.tabIndex + '';
            //alert(newTabName);
            this.editableTabs.push({
              title: this.menuData[0].customerFullName,
              name: this.menuData[0].customerFullName,
              content: this.menuData[0].customerFullName+'New Tab content'
            });
            this.editableTabsValue = this.menuData[0].customerFullName;
            this.$router.push('datashowinput')  
             //使用bus 获取其他vue页传来的数据；
              bus.$on("menuFullname", msg => {
              //alert('home:'+msg);
                      for(let i=0; i<this.editableTabs.length; i++){
                        if(this.editableTabs[i].title == msg){
                         
                          this.val = true;
                          //console.log(this.val==true);
                        }
                      }
                    // console.log(this.val);
                    //根据 val   true: 表明标签页中存在值；     false： 标签页中不存在值；可以创建一个新的标签页；
                      if(this.val == true){
                        //alert(msg);
                         this.val = false;
                        this.editableTabsValue = msg;     //点击左侧菜单栏选中标签页；
                        //this.$router.push('one')  
                        
                      }else{
                         let newTabName = ++this.tabIndex + '';
                          //alert(newTabName);
                          this.editableTabs.push({
                            title: msg,
                            name: msg,
                            content: msg+'New Tab content'
                          });
                          this.editableTabsValue = msg;
                        
                      }
              });
     
  },
  methods: {
          tabsClick(tab){
              //alert(tab.name);
               bus.$emit("tabsFullname", tab.name);
          }
          ,removeTab(targetName) {          //关闭标签页事件；
              let tabs = this.editableTabs;
              let activeName = this.editableTabsValue;
              if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      activeName = nextTab.name;
                    }
                  }
                });
              }
              
              this.editableTabsValue = activeName;
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
    
  },
  computed: {
    
  },
  watch: {
    
    },
  created () {
    // 刷新页面时（F11)
    // 因为<router-view>的<keep-alive>，会保留刷新时所在的router
    // 但是tab标签页因为刷新而被重构了，tab没有了
    // 因此需要将router回到index
   let username = this.$session.get("loginName");
   if(username == 'admin'){
     console.log(username);
    this.$router.push('/admin')  
   }else{
     this.$router.push('index')
     this.publicUser = 1;
   }

  
  }

}
 </script>
<style>
.main_container {
  width: 100%;
  display: flex;
  /* min-height: 658px; */
  flex-direction: column;
  
}

#maintabs .el-tabs__nav-wrap {
    height: 55px;
}
#maintabs .el-tabs__item{
   height: 55px;
   line-height: 50px;
}

</style>