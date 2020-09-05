// components/default-list/default-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:'Boolean',
      value:false,
      observer:function(new_val,old_val){
        console.log("值变化了");
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function(){
    console.log('组件中的数据',this.data);
  }

  
})
