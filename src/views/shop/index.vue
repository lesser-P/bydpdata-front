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
                placeholder="店铺名称/品牌ID"
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
              >+添加店铺信息</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="shopList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shopName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺图片地址" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.shopImg"
            :fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="店铺品牌ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shopNbr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺渠道ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deleteShop(scope.row.id)"
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
            @click="updateShop(scope.row)"
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
    <el-dialog width="30%" title="新增店铺" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: ">
        <el-form-item label="店铺编号">
          <el-input v-model="form.shopNbr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" align="center">
          <el-input v-model="form.shopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺品牌ID">
          <el-input v-model="form.brandId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺渠道ID" align="center">
          <el-input v-model="form.channelId" autocomplete="off"></el-input>
        </el-form-item>
        <el-table-column label="上传店铺图片" align="center">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://10.100.150.42:8080/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
          </el-upload>
        </el-table-column>
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
        <el-button size="mini" type="primary" @click="addShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "@/components/Search/index.vue";
import shopinfo from "@/api/shop/shop.js";
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
        query: "",
      },
      total: 100,
      form: {
        brandId: "",
        channelId: "",
        id: "",
        shopImg: "",
        shopName: "",
        shopNbr: "",
      },
      shopList: [],
      shop: {
        added: "",
        brandId: "",
        channelId: "",
        id: "",
        shopImg: "",
        shopName: "",
        shopNbr: "",
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
    handlePreview(file) {
      console.log(file);
    },
    async deleteShop(id) {
      await shopinfo.deleteShopInfo(id).then((resp) => {
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
    updateShop(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    async addShop() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        shopinfo.addShopInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加店铺信息成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.form = {};
            this.fetchData();
          }
        });
      } else {
        await shopinfo.updateShopInfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改店铺信息成功",
              type: "success",
            });
          }
        });
      }
    },
    async fetchData() {
      this.listLoading = true;
      await shopinfo.getShopInfo(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.shopList = resp.data.records;
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
