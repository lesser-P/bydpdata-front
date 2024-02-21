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
              @click="
                dialogFormVisible = true;
                this.form = {};
              "
              >+添加运营空间信息</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="parkspaceList"
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
      <el-table-column label="空间ID">
        <template slot-scope="scope">
          {{ scope.row.parkId }}
        </template>
      </el-table-column>
      <el-table-column label="空间名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="空间副名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkNameSub }}</span>
        </template>
      </el-table-column>
      <el-table-column label="空间总面积/平方" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.areaTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营面积/平方" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.areaBuss }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入驻团队数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.settleTeams }}</span>
        </template>
      </el-table-column>
      <el-table-column label="空间图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.parkImg"
            :fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否开放" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkOpen }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.added }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.updated }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-popover v-model="visible" style="margin-right: 10px">
            <p>是否要删除这条数据？</p>
            <el-button size="mini" type="text" @click="visible = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="deleteParkSpaceInfo(scope.row.id)"
              >确定</el-button
            >
            <el-button slot="reference" size="mini" type="danger" round
              >删除</el-button
            >
          </el-popover>
          <el-button
            size="mini"
            type="warning"
            round
            @click="updateParkspace(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="primary"
            round
            @click="dialogFormVisibleTeam = true"
            >添加团队</el-button
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

    <!-- 添加运营空间 弹窗 -->
    <el-dialog
      width="30%"
      title="新增运营空间信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item label="运营空间ID" align="center">
          <el-input v-model="form.parkId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运营空间名称">
          <el-input v-model="form.parkName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运营空间副名称" align="center">
          <el-input v-model="form.parkNameSub" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运营空间总面积">
          <el-input v-model="form.areaTotal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运营面积" align="center">
          <el-input v-model="form.areaBuss" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开放" align="center">
          <el-switch
            v-model="form.parkOpen"
            active-text="开放"
            inactive-text="关闭"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="上传运营空间图片" align="center">
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelBtn">取 消</el-button>
        <el-button size="mini" type="primary" @click="addParkSpace"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加团队 弹窗 -->
    <el-dialog
      width="30%"
      title="新增团队信息"
      :visible.sync="dialogFormVisibleTeam"
    >
      <el-form :model="team" style="width: ">
        <el-form-item label="团队名称" align="center">
          <el-input v-model="form.parkId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入住日期">
          <el-date-picker
            v-model="team.settle_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-switch
            style="margin-left: 10px"
            v-model="open"
            active-text="在园区"
            inactive-text="不在园区"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisibleTeam = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary">确定</el-button>
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
      team: {},
      open: true,
      fileList: [],
      visible: false,
      dialogFormVisible: false,
      dialogFormVisibleTeam: false,
      list: null,
      listLoading: false,
      pagination: {
        page: 1,
        pageSize: 10,
      },
      total: 100,
      form: {
        areaBuss: "",
        areaTotal: "",
        id: "",
        parkId: "",
        parkImg: "",
        parkName: "",
        parkNameSub: "",
        parkOpen: "",
        settleTeams: "",
      },
      parkspaceList: [
        {
          added: "",
          areaBuss: "",
          areaTotal: "",
          id: "1",
          parkId: "",
          parkImg: "",
          parkName: "",
          parkNameSub: "",
          parkOpen: "",
          settleTeams: "",
          updated: "",
        },
      ],
      parkspace: {
        added: "",
        areaBuss: "",
        areaTotal: "",
        id: "",
        parkId: "",
        parkImg: "",
        parkName: "",
        parkNameSub: "",
        parkOpen: "",
        settleTeams: "",
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
      this.fileList = [];
      this.thisform;
      this.fetchData;
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
    deleteParkspace(id) {
      this.visible = false;
      parkspace.deleteParkSpaceInfo(id).then((resp) => {
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
    },
    updateParkspace(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    addParkSpace() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        parkspace.addParkSpaceInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加店铺信息成功",
              type: "success",
            });
            this.fileList = [];
          }
        });
      } else {
        parkspace.updateParkSpaceInfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改店铺信息成功",
              type: "success",
            });
          }
        });
      }
    },
    fetchData() {
      //   this.listLoading = true;
      //   console.log(this.pagination);
      //   parkspace.getParkSpaceInfo(this.pagination).then((resp) => {
      //     if (resp === 200) {
      //       this.parkspaceList = resp.data.records;
      //       this.total = resp.data.total;
      //     } else {
      //       this.$message({
      //         message: "请求失败",
      //         type: "error",
      //       });
      //     }
      //   });
    },
  },
};
</script>
