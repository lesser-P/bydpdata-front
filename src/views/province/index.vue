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
      <el-table-column label="省份ID">
        <template slot-scope="scope">
          {{ scope.row.provinceId }}
        </template>
      </el-table-column>
      <el-table-column label="省份名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.provinceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份全名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.provinceNameFull }}</span>
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
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deleteProvince(scope.row.id)"
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
            @click="updateProvince(scope.row)"
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
      title="操作省份信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item label="省份编号">
          <el-input v-model="form.provinceId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份名称" align="center">
          <el-input v-model="form.provinceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份全名">
          <el-input
            v-model="form.provinceNameFull"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          @click="
            dialogFormVisible = false;
            fileList = [];
            fetchData;
          "
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="addProvince"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "@/components/Search/index.vue";
import province from "@/api/province/province.js";
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
      fileList: [],
      visible: false,
      dialogFormVisible: false,
      list: null,
      listLoading: false,
      pagination: {
        page: 1,
        pageSize: 10,
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
      await province.getProvinceInfo(this.pagination).then((resp) => {
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
