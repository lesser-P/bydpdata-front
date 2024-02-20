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
      <el-table-column label="物流中心ID">
        <template slot-scope="scope">
          {{ scope.row.logisticsId }}
        </template>
      </el-table-column>
      <el-table-column label="物流中心名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.logisticsName }}</span>
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
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-popover v-model="visible" style="margin-right: 10px">
            <p>是否要删除这条数据？</p>
            <el-button size="mini" type="text" @click="visible = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="deletcLogistics(scope.row.id)"
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
            @click="updateChannel(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加渠道 弹窗 -->
    <el-dialog
      width="30%"
      title="新增物流中心"
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
import Search from "@/components/Search/index.vue";
import logistics from "@/api/logistics/logistics";

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
      visible: false,
      dialogFormVisible: false,
      list: null,
      listLoading: false,
      form: {
        id: "",
        logisticsId: "",
        logisticsName: "",
      },
      logisticsList: [
        {
          added: "",
          logisticsId: "",
          logisticsName: "",
          id: "1",
          updated: "",
        },
      ],
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
    deletcLogistics(id) {
      this.visible = false;
      logistics.deleteLogisticsInfo(id).then((resp) => {
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
    updateLogistic(data) {
      this.form = data;
      this.dialogFormVisible = true;
    },
    addLogistic() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        logistics.addLogisticsInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加物流中心信息成功",
              type: "success",
            });
          }
        });
      } else {
        logistics.updateLogisticsInfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改物流中心信息成功",
              type: "success",
            });
          }
        });
      }
    },
    fetchData() {
      // this.listLoading = true;
      //   logistics.logisticsList().then((resp) => {
      //     if (resp === 200) {
      //       this.logisticsList = resp.data;
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
