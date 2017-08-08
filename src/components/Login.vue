<template>
    <div>
        <button v-on:click="login">{{text}}</button>
        <h1>{{ msg }}</h1>
        <i-switch v-model="switch1" @on-change="change"></i-switch>
    </div>
  
</template>
<script>
export default {
  name: 'login',
  data: function() {
    return {
        text: '点击处理',
        msg: 'hello',
        count: 1,
        switch1: false
    }
  },
  methods: {
    login: function() {
        this.text = '点击后'+(++this.count);
    },
    change (status) {
        this.$Message.info('开关状态：' + status);
        console.log(this.GLOBAL.HOST);
    }
  }
}
</script>

