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
        <el-row>
          <el-form-item label="日期">
            <el-col :span="10">
              <el-date-picker
                v-model="pagination.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="shopSaleDateList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="店铺编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shopNbr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shopName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="sku销售量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.skuVolumes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.saleAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderVolumes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截至数据小时" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataHourExp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            round
            @click="openDialog(scope.row)"
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
      title="修改物流中心小时发货数据"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-card class="box-card" style="color: gray">
          <div>店铺编号：{{ form.shopNbr }}</div>
          <br />
          <div>店铺名称：{{ form.shopName }}</div>
          <br />
          <div>品牌ID：{{ form.brandId }}</div>
          <br />
          <div>渠道ID：{{ form.channelId }}</div>
          <br />
          <div>日期：{{ form.dataDate }}</div>
          <br />
          <div>截至数据小时 ：{{ form.dataHourExp }}</div>
          <br />
        </el-card>
        <el-form-item label="sku销售量">
          <el-input v-model="form.skuVolumes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售额" align="center">
          <el-input v-model="form.saleAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单数量">
          <el-input v-model="form.orderVolumes" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelBtn()">取 消</el-button>
        <el-button size="mini" type="primary" @click="updateInfo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>
<script>
import shopSaleDate from "@/api/update/shopSaleDateHexp";
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
      listLoading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        query: "",
        date: "",
      },
      total: 100,
      form: {},
      shopSaleDateList: [],
      shopSaleDateHexp: {
        id: "",
        shopNbr: "",
        shopName: "",
        brandId: "",
        channelId: "",
        skuVolumes: "",
        saleAmount: "",
        orderVolumes: "",
        dataDate: "",
        dataHourExp: "",
        added: "",
        updated: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    cancelBtn() {
      this.dialogFormVisible = false;
      this.form = { id: "" };
    },
    openDia() {
      this.dialogFormVisible = true;
      this.form.id = "";
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchData();
    },
    resetData() {
      this.pagination.query = "";
      this.pagination.date = "";
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
    openDialog(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    prevPage() {
      this.pagination.page--;
      this.fetchData();
    },
    async updateInfo() {
      await shopSaleDate.ShopSaleDateHexp(this.form).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$message({
            message: "修改失败",
            type: "error",
          });
        }
      });
    },
    async fetchData() {
      this.listLoading = true;
      console.log(this.pagination);
      await shopSaleDate
        .getShopSaleDateHexpList(this.pagination)
        .then((resp) => {
          if (resp.code === 200) {
            this.shopSaleDateList = resp.data.records;
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
