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
                placeholder="年份"
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
              @click="dialogFormVisible = true;form={}"
              >+添加趋势信息</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="groupSaleList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="年份">
        <template slot-scope="scope">
          {{ scope.row.sumYear }}
        </template>
      </el-table-column>
      <el-table-column label="月份" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sumMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年月编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sumYearmonth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.saleAmount }}</span>
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
            @onConfirm="deleteInfo(scope.row.id)"
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
            @click="updateInfo(scope.row)"
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

    <!-- 添加店铺 弹窗 -->
    <el-dialog
      width="30%"
      title="操作集团销售金额数据"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item v-if="form.sumMonth>0"" label="当前时间">
          {{ form.sumYearmonth }}
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            type="month"
            v-model="form.time"
            placeholder="选择数据日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="销售额">
          <el-input v-model="form.saleAmount" autocomplete="off"></el-input>
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
        <el-button size="mini" type="primary" @click="addGroupSale"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import groupSale from "@/api/group_sale_month/group_sale_month";
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
      fileList: [],
      visible: false,
      dialogFormVisible: false,
      list: null,
      listLoading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        query: "",
      },
      total: 100,
      form: {
        time: "",
        id: "",
        saleAmount: "",
      },
      groupSaleList: [],
      groupSaleInfo: {
        added: "",
        sumYear: "",
        sumYearmonth: "",
        id: "",
        sumMonth: "",
        saleAmount: "",
        updated: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    resetData() {
      this.pagination.query = "";
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchData();
    },
    async deleteInfo(id) {
      await groupSale.deleteGroupSale(id).then((resp) => {
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
    updateInfo(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    async addGroupSale() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        groupSale.addMonthSale(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加集团销售信息成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.form = {};
            this.fetchData();
          }
        });
      } else {
        await groupSale.updateGroupSale(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "修改集团销售信息成功",
              type: "success",
            });
            this.fetchData();
            this.dialogFormVisible = false;
            this.form = {};
          } else {
            this.$message({
              message: "修改集团销售信息失败",
              type: "error",
            });
            this.dialogFormVisible = false;
            this.form = {};
          }
        });
      }
    },
    async fetchData() {
      this.listLoading = true;
      await groupSale.getGroupSalePage(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.groupSaleList = resp.data.records;
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
