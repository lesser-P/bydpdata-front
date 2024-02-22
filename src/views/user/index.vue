<template>
  <div class="app-container">
    <search></search>
    <div class="tool" style="margin-bottom: 20px">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-button
              size="mini"
              type="primary"
              @click="dialogFormVisible = true"
              >+添加用户</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="userList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.added }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.updated }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-popover v-model="visible" style="margin-right: 10px">
            <p>是否要删除这条数据？</p>
            <div>
              <el-button size="mini" type="text" @click="visible = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="deleteUserById(scope.row.id)"
                >确定</el-button
              >
            </div>

            <el-button
              slot="reference"
              size="mini"
              type="danger"
              round
              @click="deleteUserById(scope.row.id)"
              >删除</el-button
            >
          </el-popover>
          <el-button
            size="mini"
            type="warning"
            round
            @click="resetPassword(scope.row.id)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: ">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          @click="
            dialogFormVisible = false;
            form = {};
          "
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "@/components/Search/index.vue";
import admin from "@/api/admin/admin";

export default {
  components: {
    Search,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      visible: false,
      dialogFormVisible: false,
      userList: [],
      listLoading: false,
      form: {
        id: "",
        username: "",
        password: "",
      },
      user: {
        id: "",
        username: "",
        password: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await admin.getUserList().then((resp) => {
        if (resp.code === 200) {
          this.userList = resp.data;
        }
      });
    },
    async addUser() {
      await admin.addUser(this.form).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.form = {};
          this.dialogFormVisible = false;
          this.fetchData();
        }
      });
    },
    async deleteUserById(id) {
      await admin.deleteUserById(id).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.fetchData();
        }
      });
    },
    async resetPassword(id) {
      await admin.resetPassword(id).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "重置成功",
            type: "success",
          });
          this.fetchData();
        }
      });
    },
  },
};
</script>
