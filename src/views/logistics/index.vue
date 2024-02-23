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
                placeholder="物流中心名称"
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
    <div class="tool" style="margin-bottom: 20px">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-button
              size="mini"
              type="primary"
              @click="dialogFormVisible = true"
              >+添加物流中心</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="logisticsList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="物流中心ID">
        <template slot-scope="scope">
          {{ scope.row.logisticsId }}
        </template>
      </el-table-column>
      <el-table-column label="物流中心名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.logisticsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.added }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deletcLogistics(scope.row.id)"
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
            @click="updateLogistic(scope.row)"
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

    <!-- 添加渠道 弹窗 -->
    <el-dialog
      width="30%"
      title="操作物流中心信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item label="物流中心ID">
          <el-input v-model="form.logisticsId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物流中心名称">
          <el-input v-model="form.logisticsName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="addLogistic"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import logistics from "@/api/logistics/logistics";

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
      visible: false,
      dialogFormVisible: false,
      list: null,
      total: 100,
      listLoading: false,
      pagination: {
        page: "1",
        pageSize: "10",
        query: "",
      },
      form: {
        id: "",
        logisticsId: "",
        logisticsName: "",
      },
      logisticsList: [],
      logistics: {
        added: "",
        logisticsId: "",
        logisticsName: "",
        id: "",
        updated: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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
    async deletcLogistics(id) {
      this.visible = false;
      await logistics.deleteLogisticsInfo(id).then((resp) => {
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
      });
      this.fetchData();
    },
    updateLogistic(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    async addLogistic() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        await logistics.addLogisticsInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加物流中心信息成功",
              type: "success",
            });
          }
        });
        this.form = {};
        this.dialogFormVisible = false;
        this.fetchData();
      } else {
        await logistics.updateLogisticsInfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改物流中心信息成功",
              type: "success",
            });
          }
        });
        this.form = {};
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
    async fetchData() {
      this.listLoading = true;
      await logistics.getLogisticsInfo(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.logisticsList = resp.data.records;
          this.total = resp.data.total;
        } else {
          this.$message({
            message: "请求失败",
            type: "error",
          });
        }
      });
      this.listLoading = false;
    },
  },
};
</script>
