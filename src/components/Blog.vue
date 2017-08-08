<template>
  <div>
    <div style="margin-bottom:10px;">
  
      <Button shape='circle' v-on:click='showAdd'>
        <Icon type="plus" />
      </Button>
      <Button shape='circle'>
        <Icon type="minus" />
      </Button>
  
    </div>
    <Table :data="articleData" :columns="articleColumns" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page total="totalArticle" :current="1" @on-change="changePage" show-elevator show-sizer></Page>
      </div>
    </div>
  
    <!--
                <Modal v-model="deleteConfirm" title="是否删除？" @on-ok="deleteConfirmOk" @on-cancel="deleteConfirmCancel">
            
                </Modal>
                -->
  </div>
</template>
<script>
export default {
  name: 'blog',
  data() {
    return {
      totalArticle: 0,
      articleColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '内容',
          key: 'content',
          render: (h, params) => {
            var value = params.row.content.length > 20 ? params.row.content.substring(0, 20) + '...' : params.row.content;
            return h('div', value);
          }
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/article/edit.view', query: { articleId: this.articleData[params.index]._id } });
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '是否删除？',
                      content: '<p>是否删除（' + this.articleData[params.index].title + '）</p>',
                      onOk: () => {
                        var articleId = this.articleData[params.index]._id;
                        this.articleData.splice(params.index, 1);
                        this.$http.post(this.GLOBAL.HOST + '/article/delete/' + articleId).then(
                          function (res) {
                            this.changePage(this.currentPage);
                          }, function (res) {
                            this.$Message.info('删除失败');
                          }
                        );
                      },
                      onCancel: () => {
                        //this.$Message.info('点击了取消');
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      articleData: [],
      currentPage: 1
    }
  },
  methods: {
    changePage: function (page) {
      this.currentPage = page;
      this.$http.get(this.GLOBAL.HOST + '/article/list/' + page + '/10').then(
        function (res) {
          // 处理成功的结果
          this.articleData = res.data.rows;
          this.totalArticle = res.data.total;
        }, function (res) {
          // 处理失败的结果
        }
      );
    },
    showAdd() {
      this.$router.push({ path: '/article/edit.view' });
    }
  },
  mounted() {
    this.changePage(1);
  }
}
</script>
