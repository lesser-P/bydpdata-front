<template>
  <div class="app-container">
    <search></search>

    <el-table
      v-loading="listLoading"
      :data="teamList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="空间ID">
        <template slot-scope="scope">
          {{ scope.row.parkId }}
        </template>
      </el-table-column>
      <el-table-column label="团队名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入驻时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.settleDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否在园区" align="center">
        <template slot-scope="scope">
          {{ scope.row.settleState === true ? "在园区" : "不在园区" }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.added }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updated }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deleteTeam(scope.row.id)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
              round
              style="margin-right: 10px"
              >删除</el-button
            >
          </el-popconfirm>
          <el-button
            size="mini"
            type="warning"
            round
            @click="updateTeam(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      width="30%"
      title="修改团队信息"
      :visible.sync="dialogFormVisibleTeam"
    >
      <el-form :model="team" style="width: ">
        <el-form-item label="团队名称" align="center">
          <el-input v-model="team.teamName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入住日期">
          <el-date-picker
            v-model="team.settleDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-switch
            style="margin-left: 10px"
            v-model="team.settleState"
            active-text="在园区"
            inactive-text="不在园区"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          @click="
            dialogFormVisibleTeam = false;
            this.team = {};
          "
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="update(data)"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "@/components/Search/index.vue";
import parkspace from "@/api/park/park.js";
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
      dialogFormVisibleTeam: false,
      team: {},
      teamList: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async deleteTeam(id) {
      this.visible = false;
      await parkspace.deleteTeam(id).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "删除失败",
            type: "error",
          });
        }
        this.fetchData();
      });
    },
    updateTeam(data) {
      this.team = data;
      this.dialogFormVisibleTeam = true;
    },
    async update() {
      this.team.settleState = this.open ? 1 : 0;
      await parkspace.updateTeamInfo(this.team).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "error",
          });
        }
        this.dialogFormVisibleTeam = false;
        this.fetchData();
      });
    },
    async fetchData() {
      this.listLoading = true;
      await parkspace.getTeamList().then((resp) => {
        if (resp.code === 200) {
          this.teamList = resp.data;
        } else {
          this.$message({
            message: "请求失败",
            type: "error",
          });
        }
        this.listLoading = false;
      });
    },
  },
};
</script>
