<template>
  <div id="app">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
      <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
          <Menu active-name="/" theme="dark" width="auto">
            <div class="layout-logo-left"></div>
            <!--
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        导航一
                    </template>
                    <Menu-item name="1-1">选项 1</Menu-item>
                    <Menu-item name="1-2">选项 2</Menu-item>
                    <Menu-item name="1-3">选项 3</Menu-item>
                </Submenu>
                -->
  
            <Menu-item v-for="menu in menus" :key="menu.id" :name="menu.name" @click.native="gotoHref(menu.name)">
              <Icon :type="menu.iconType" :size="iconSize"></Icon>
              <span class="layout-text">{{menu.title}}</span>
            </Menu-item>
  
          </Menu>
        </i-col>
        <i-col :span="spanRight">
          <div class="layout-header">
            <i-button type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </i-button>
          </div>
          <div class="layout-breadcrumb">
            <!--
            <Breadcrumb>
              <Breadcrumb-item href="#">首页</Breadcrumb-item>
              <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
              <Breadcrumb-item>某应用</Breadcrumb-item>
            </Breadcrumb>
            -->
          </div>
          <div class="layout-content">
            <div class="layout-content-main">
              <router-view></router-view>
            </div>
          </div>
          <div class="layout-copy">
            2011-2016 &copy; TalkingData
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      spanLeft: 4,
      spanRight: 20,
      menus: [
        { id: 0, name: '/', iconType: 'home', title: '首页' },
        { id: 1, name: '/blog', iconType: 'ios-navigate', title: '博客管理' },
        { id: 2, name: '/user', iconType: 'ios-keypad', title: '用户管理' },
        { id: 3, name: '/tag', iconType: 'ios-analytics', title: '标签管理' }
      ]
    }
  },
  computed: {
    iconSize() {
      return this.spanLeft === 4 ? 15 : 24;
    }
  },
  methods: {
    toggleClick() {
      if (this.spanLeft === 4) {
        this.spanLeft = 1;
        this.spanRight = 23;
      } else {
        this.spanLeft = 4;
        this.spanRight = 20;
      }
    },
    gotoHref(url) {
      this.$router.push({ path: url });
    }
  }
}
</script>

<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-content {
  min-height: 500px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-menu-left {
  background: #464c5b;
}

.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.layout-ceiling-main a {
  color: #9ba7b5;
}

.layout-hide-text .layout-text {
  display: none;
}

.ivu-col {
  transition: width .2s ease-in-out;
}
</style>
