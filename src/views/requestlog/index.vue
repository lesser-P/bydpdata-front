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
                placeholder="路径地址"
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
              >+添加省份信息</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="provinceList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="路径地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pushApi }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求体JSON" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.requestJson"
            placement="top"
          >
            <span
              style="
                display: block;
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
              >{{ scope.row.requestJson }}</span
            >
          </el-tooltip>
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
          <el-button
            type="success"
            icon="el-icon-document-copy"
            circle
            v-clipboard:copy="scope.row.requestJson"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></el-button>
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
  </div>
</template>
<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>
<script>
import province from "@/api/province/province.js";
import log from "@/api/log/log.js";
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
        id: "",
        provinceId: "",
        provinceName: "",
        provinceNameFull: "",
      },
      provinceList: [],
      province: {
        added: "",
        id: "",
        provinceId: "",
        provinceName: "",
        provinceNameFull: "",
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
    handleSuccess(res, file) {
      this.form.shopImg = res.data;
    },
    // 上传图片
    submitUpload() {
      this.$refs.upload.submit();
    },
    async copyJson(data) {
      await this.$clipboardConfig;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    resetData() {
      this.searchObj = "";
    },
    onCopy() {
      this.$message({
        message: "复制成功",
        type: "success",
      });
    },
    onError() {
      this.$message({
        message: "复制失败",
        type: "error",
      });
    },
    async deleteProvince(id) {
      this.visible = false;
      await province.deleteProvinceInfo(id).then((resp) => {
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
    addProvince() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        province.addProvinceInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加省份信息成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.form = {};
            this.fetchData();
          }
        });
      } else {
        province.updateProvinceInfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改省份信息成功",
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
      await log.getRequestBody(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.provinceList = resp.data.records;
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
