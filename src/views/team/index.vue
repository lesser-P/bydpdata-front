<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input
                style="width: 95%"
                v-model="pagination.query"
                placeholder="团队名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="fetchData()"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetData"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="teamList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="空间名称">
        <template slot-scope="scope">
          {{ scope.row.parkName }}
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
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="this.pagination.page"
      :page-size="this.pagination.pageSize"
      layout="total, prev, pager, next"
      :total="this.total"
    >
    </el-pagination>
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
import parkspace from "@/api/park/park.js";
export default {
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
      total: 100,
      pagination: {
        page: "1",
        pageSize: "10",
        query: "",
        back: "",
      },
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
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchData();
    },
    resetData() {
      this.pagination.query = "";
      this.fetchData();
    },
    currentChange(newpage) {
      this.pagination.page = newpage;
      this.fetchData();
    },
    nextPage() {
      this.pagination.page++;
      this.fetchData();
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
      await parkspace.getTeamPage(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.teamList = resp.data.records;
          this.total = resp.data.total;
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
