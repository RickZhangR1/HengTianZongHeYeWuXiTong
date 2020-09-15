import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:true,
    Hid:'',
    Hid2:'',
    procuredatails:'',
    procuredatailsChild:'',
    styleinfo: '',
    cacheTable: false,
    del: false,
    upd: false,
    add: false,
    gongyistate: false,
    addstyleinfostatus:'',
	storxq1:'',
    material:''
  },
  mutations: {
    setdelete(state,del){
      state.del = del
    },
    setupd(state,upd){
      state.upd = upd
    },
    setadd(state,add){
      state.add = add
    },

    toggleMenu (state,collapse) {
      state.isCollapse=collapse
    },
    setHid (state,hid) {
      state.Hid=hid
    },
    setHid2 (state,hid2) {
      state.Hid2=hid2
    },
    SetProcuredatails(state, component){
      state.procuredatails=component;
    },
    SetProcuredatailsChild(state, component){
      state.procuredatailsChild=component;
    },
    setstorxq1 (state,storxq1) {
      state.Storxq1=storxq1
    },
    setcacheTable(state, cacheTable){
      state.cacheTable= cacheTable;
    }
    ,SetStyleinfo(state, styleinfo){
      state.styleinfo = styleinfo;
    }
    ,Setgongyistate(state, gongyistate){
      state.gongyistate = gongyistate;
    }
    ,Setaddstyleinfostatus(state, addstyleinfostatus){
      state.addstyleinfostatus = addstyleinfostatus;
    },
    setmaterial(state, component){
      state.material=component;
    },

  }
})
