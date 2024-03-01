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
                placeholder="板块/品牌 名称"
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
            <el-button size="mini" type="primary" @click="openDia()"
              >+添加板块品牌信息</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="brandList"
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
      <el-table-column label="品牌名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="深度" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deep }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deleteBrand(scope.row.brandId)"
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
            @click="updateBrand(scope.row)"
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
      title="操作板块品牌信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item label="品牌ID">
          <el-input v-model="form.brandId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" align="center">
          <el-input v-model="form.brandName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="深度">
          <el-select v-model="form.deep" placeholder="请选择">
            <el-option :label="1" :value="1"> </el-option>
            <el-option :label="2" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="板块" v-if="form.deep == 2">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option label="家纺" :value="10"> </el-option>
            <el-option label="服饰" :value="20"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelBtn()">取 消</el-button>
        <el-button size="mini" type="primary" @click="addBrand()"
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
import brand from "@/api/brand/brand.js";
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
      },
      total: 100,
      form: {
        brandId: "",
        brandName: "",
        deep: "",
        id: "",
        parentId: "",
      },
      brandList: [],
      brand: {
        added: "",
        brandId: "",
        brandName: "",
        deep: "",
        id: "",
        parentId: "",
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
      this.fetchData();
    },
    updateBrand(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    async deleteBrand(id) {
      this.visible = false;
      await brand.deleteBrandInfoById(id).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.fetchData();
        } else {
          this.$message({
            message: "删除失败",
            type: "error",
          });
        }
      });
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
    updateProvince(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    async addBrand() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        if (this.form.deep === 1) {
          this.form.parentId = 0;
        }
        await brand.addBrandInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加板块品牌信息成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.form = {};
            this.fetchData();
          }
        });
      } else {
        if (this.form.deep === 1) {
          this.form.parentId = 0;
        }
        await brand.updateBrandInfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改板块品牌信息成功",
              type: "success",
            });
          }
          this.dialogFormVisible = false;
          this.form = {};
          this.fetchData();
        });
      }
    },
    async fetchData() {
      this.listLoading = true;
      console.log(this.pagination);
      await brand.getBrandInfoPage(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.brandList = resp.data.records;
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
