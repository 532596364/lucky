<template>
  <div class="container">
    <el-card class="container-item">
      <el-form
        ref="queryForm"
        :model="form"
        class="form-search"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="工号：" prop="account">
          <el-input v-model="form.account" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-upload
            ref="upload"
            action="/"
            :show-file-list="false"
            :on-change="handleFile"
            :auto-upload="false"
            :multiple="false"
            class="upload-style"
            name="file"
          >
            <el-button size="medium" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="container-item">
      <el-pagination
        :pager-count="5"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40, 50, 80, 100]"
        :page-size="pageSize"
        :total="total"
        background
        class="pagination-style"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-card class="container-item table-box">
      <el-table
        :data="list"
        border
        stripe
        tooltip-effect="dark"
        class="table-style"
        max-height="1000"
      >
        <el-table-column
          type="index"
          label="序号"
          width="180"
        ></el-table-column>
        <el-table-column prop="名字" label="姓名" width="180"></el-table-column>
        <el-table-column prop="工号" label="工号" width="180"></el-table-column>
        <el-table-column prop="是否参加" label="是否参加"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import util from './../helper/util';

export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      list: [],
      form: {
        name: '',
        account: ''
      },
      users: []
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSearch() {
      console.log('111');
    },
    onReset() {
      this.$refs.queryForm.resetFields();
    },
    async handleFile(file) {
      const types = file.name.split('.')[1];
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(
        item => item === types
      );
      if (!fileType) {
        alert('格式错误！请重新选择');
        return;
      }
      let dataJson = await util.file2json(file);
      this.list = dataJson[0].sheet;
      this.users = dataJson[0].sheet;
      return;
    }
  }
};
</script>
<style scoped>
.container {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
}
.container-item {
  margin-bottom: 20px;
}
.form-search {
  text-align: left;
  display: flex;
}
.upload-style {
  display: inline-block;
  margin-left: 10px;
}
.pagination-style {
  text-align: right;
}
.table-box {
  flex: 1;
}
.table-style {
  width: 100%;
  height: 100%;
}
</style>
