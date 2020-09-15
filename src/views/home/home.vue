<template>
  <div class="home_container" :style="{'min-height':screenHeight-115+'px'}">

     
      
  </div>
</template>

<script>
import Sortable from 'sortablejs';   //引入表格（列/行）拖拽组件；
export default {
  data() {
    return {   
      screenHeight: document.body.clientHeight,
    
    };
  },
  mounted(){
   
  },
 
  methods:{
  
  },

  computed: {
 
  },
  watch: {
  
  },
  created() {

  }
};
</script>

<style>
.home_container {
   flex-grow: 1;
  flex-shrink: 1;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px 10px 10px;
  padding-top: 15px;
  
}


        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
          background-color: #dfecfb;
        }


</style>



		  
