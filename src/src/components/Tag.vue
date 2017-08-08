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
    <Table :data="tagData" :columns="tagColumns" stripe></Table>
    <!--
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page total="totalArticle" :current="1" @on-change="changePage" show-elevator show-sizer></Page>
      </div>
    </div>
    -->
    <Modal v-model="editModal" title="编辑" @on-ok="editOk" @on-cancel="deleteConfirmCancel">
        <Form :model="tag">
          <Form-item label="名称">
            <Input v-model="tag.name" placeholder="请输入名称"></Input>
          </Form-item>
          <Form-item label="描述">
            <Input v-model="tag.content" placeholder="请输入描述信息"></Input>
          </Form-item>
        </Form>
    </Modal>
    
  </div>
</template>
<script>
export default {
  name: 'tag',
  data() {
    return {
      tag: {},
      editModal: false,
      tagColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name'
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
                    this.tag = this.tagData[params.index];
                    this.editModal = true;
                    //this.$router.push({ path: '/article/edit.view', query: { articleId: this.articleData[params.index]._id } });
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
                      content: '<p>是否删除（' + this.tagData[params.index].name + '）</p>',
                      onOk: () => {
                        
                        var tagId = this.tagData[params.index]._id;
                        this.tagData.splice(params.index, 1);
                        this.$http.post(this.GLOBAL.HOST + '/tag/delete/' + tagId).then(
                          function (res) {
                            this.changePage(1);
                            this.$Message.info('删除成功！');
                          }, function (res) {
                            this.$Message.info('删除失败！');
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
      tagData: [],
      currentPage: 1
    }
  },
  methods: {
    changePage: function (page) {
      this.$http.get(this.GLOBAL.HOST + '/tags/list').then(
        function (res) {
          // 处理成功的结果
          this.tagData = res.data;
          //this.totalArticle = res.data.total;
        }, function (res) {
          // 处理失败的结果
        }
      );
    },
    showAdd() {
      this.tag = {};
      this.editModal = true;
      //this.$router.push({ path: '/article/edit.view' });
    },
    editOk(){
      this.$http.post(this.GLOBAL.HOST + '/tag/update',{tag:this.tag}).then(
        function (res) {
          this.changePage(1);
          this.$Message.info(res.data);
        }, function (res) {
          this.$Message.info('删除失败');
        }
      );
    }
  },
  mounted() {
    this.changePage(1);
  }
}
</script>
