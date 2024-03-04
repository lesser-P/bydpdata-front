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
                placeholder="空间名称"
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
              @click="
                form = { id: '' };
                dialogFormVisible = true;
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
      <el-table-column label="空间编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkNameNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="空间名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="空间原名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkOldName }}</span>
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
      <el-table-column label="是否开放" align="center">
        <template slot-scope="scope">
          {{ scope.row.parkOpen === true ? "开放" : "关闭" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            style="margin-right: 10px"
            round
            @click="openImage(scope.row.parkImg)"
            >预览</el-button
          >
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deleteParkspace(scope.row.id)"
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
            @click="updateParkspace(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="primary"
            round
            @click="openAddTeam(scope.row.parkId)"
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
      title="操作运营空间信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item label="运营空间编号" align="center">
          <el-input v-model="form.parkNameNumber" autocomplete="off">
            <template slot="append">
              <el-button @click="getParkSpaceInfoByNumber()"
                >拉取信息</el-button
              >
            </template>
          </el-input>
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
            ><br />
          </el-upload>
          <el-image
            :key="imageKey"
            style="max-width: 100%; height: auto"
            :src="this.form.parkImg"
            :fit="contain"
          ></el-image>
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
        <el-button size="mini" type="primary" @click="addTeam(data)"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog width="30%" :visible.sync="imageDialog">
      <div style="text-align: center">
        <el-image
          style="max-width: 500px; height: auto; margin: 0 auto"
          :src="this.imageUrl"
        ></el-image>
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
      open: true,
      team: {
        parkId: "",
        settleDate: "",
        settleState: true,
        teamName: "",
      },
      imageDialog: false,
      fileList: [],
      visible: false,
      dialogFormVisible: false,
      dialogFormVisibleTeam: false,
      list: null,
      listLoading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        query: "",
      },
      total: 100,
      imageUrl: "",
      form: {
        areaBuss: "",
        areaTotal: "",
        id: "",
        parkId: "",
        parkImg: "",
        parkName: "",
        parkOldName: "",
        parkNameNumber: "",
        parkNameSub: "",
        parkOpen: "",
        settleTeams: 0,
      },
      imageKey: 0,
      parkspaceList: [],
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
  computed: {
    isParkOpen: {
      get() {
        return this.form.parkOpen === 1;
      },
      set(value) {
        this.form.parkOpen = value ? 1 : 0;
      },
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    openAddTeam(id) {
      this.dialogFormVisibleTeam = true;
      this.team.parkId = id;
    },
    resetData() {
      this.pagination.query = "";
      this.fetchData();
    },
    cancelBtn() {
      this.dialogFormVisible = false;
      this.form = {};
      this.fetchData;
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchData();
    },
    handleSuccess(res, file) {
      this.form.parkImg = res.data;
      this.imageKey++;
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
    updateParkspace(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    addTeam() {
      parkspace.addTeam(this.team).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "添加团队信息成功",
            type: "success",
          });
          this.dialogFormVisibleTeam = false;
          this.team = {};
          this.fetchData();
        }
      });
    },
    deleteParkspace(id) {
      parkspace.deleteParkSpaceInfo(id).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "删除运营空间信息成功",
            type: "success",
          });
          this.fetchData();
        }
      });
    },
    openImage(url) {
      this.imageUrl = url;
      this.imageDialog = true;
    },
    getParkSpaceInfoByNumber() {
      parkspace
        .getOtherBaseParkSpaceInfo(this.form.parkNameNumber)
        .then((resp) => {
          if (resp.code === 200) {
            this.form = resp.data;
            if (this.form.parkOpen === 1) {
              this.form.parkOpen = true;
            } else {
              this.form.parkOpen = false;
            }
            this.form.id = "";
          }
        });
    },
    async addParkSpace() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        await parkspace.addParkSpaceInfo(this.form).then((resp) => {
          this.form = {};
          if (resp.code === 200) {
            this.$message({
              message: "添加运营空间信息成功",
              type: "success",
            });
            this.form = {};
          }
        });
        this.dialogFormVisible = false;
        this.fetchData();
      } else {
        await parkspace.updateParkSpaceInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "修改运营空间信息成功",
              type: "success",
            });
            this.form = {};
          }
        });
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
    async fetchData() {
      this.listLoading = true;
      console.log(this.pagination);
      await parkspace.getParkSpaceInfo(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.parkspaceList = resp.data.records;
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
