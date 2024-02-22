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
                placeholder="省份名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
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
      :data="brandhourlist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="品牌ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandSaleId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.provinceId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小时数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataHour }}</span>
        </template>
      </el-table-column>
      <el-table-column label="线上/线下" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.modeId === 10">线下</span>
          <span v-if="scope.row.modeId === 20">线上</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.saleOrders }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.saleVolumes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售金额" align="center">
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
      <el-table-column label="操作" fixed="right" align="center">
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
      title="修改品小时省份销售数据信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-card class="box-card" style="color: gray">
          <div>品牌ID：{{ form.brandId }}</div>
          <br />
          <div>编号：{{ form.brandSaleId }}</div>
          <br />
          <div>记录日期：{{ form.dataDate }}</div>
          <br />
          <div>小时数：{{ form.dataHour }}</div>
          <br />
          <div>省份ID：{{ form.provinceId }}</div>
        </el-card>

        <el-form-item label="订单数" align="center">
          <el-input v-model="form.saleOrders" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售数量" align="center">
          <el-input v-model="form.saleVolumes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售金额" align="center">
          <el-input v-model="form.saleAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="form.modeId" placeholder="请选择">
            <el-option label="线下" :value="10"> </el-option>
            <el-option label="线上" :value="20"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelBtn()">取 消</el-button>
        <el-button size="mini" type="primary" @click="updateBrandSaleProvince()"
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
import brandhourprovince from "@/api/update/brandhourprovince.js";
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
      brandhourprovincelist: [],
      brandhour: {
        id: "",
        brandSaleId: "",
        brandId: "",
        modeId: "",
        dataDate: "",
        dataHour: "",
        provinceId: "",
        saleOrders: "",
        saleVolumes: "",
        saleAmount: "",
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
    currentChange(newpahe) {
      this.pagination.page = newpahe;
      this.fetchData();
    },
    nextPage() {
      this.pagination.page++;
      this.fetchData();
    },
    prevPage() {
      this.pagination.page--;
      this.fetchData();
    },
    openDialog(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    async updateBrandSaleProvince() {
      await brandhourprovince.BrandHourProvince(this.form).then((resp) => {
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
      await brandhourprovince
        .getBrandHourProvinceList(this.pagination)
        .then((resp) => {
          if (resp.code === 200) {
            this.brandhourlist = resp.data.records;
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
