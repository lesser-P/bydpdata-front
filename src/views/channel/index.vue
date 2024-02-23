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
                placeholder="渠道名称"
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
              >+添加渠道</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="channelList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="渠道ID">
        <template slot-scope="scope">
          {{ scope.row.channelId }}
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道深度" align="center">
        <template slot-scope="scope">
          {{ scope.row.deep }}
        </template>
      </el-table-column>
      <el-table-column label="渠道父级ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentId }}
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
          <el-popconfirm
            title="确定删除这条数据吗"
            @onConfirm="deletcChannel(scope.row.id)"
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
            @click="updateChannel(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @prev-click="prevPage"
      @next-click="nextPage"
      @current-change="currentChange"
      :current-page.sync="this.pagination.page"
      :page-size="this.pagination.pageSize"
      layout="total, prev, pager, next"
      :total="this.total"
    >
    </el-pagination>

    <!-- 添加渠道 弹窗 -->
    <el-dialog
      width="30%"
      title="操作渠道信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" style="width: ">
        <el-form-item label="渠道ID">
          <el-input v-model="form.channelId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道名">
          <el-input v-model="form.channelName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道深度">
          <el-select v-model="form.deep" placeholder="请选择">
            <el-option :key="1" :label="1" :value="1"> </el-option>
            <el-option :key="2" :label="2" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父渠道ID">
          <el-select
            v-model="form.parentId"
            v-if="form.deep == 2"
            placeholder="请选择"
            blur=""
          >
            <el-option :key="10" :label="线下" :value="10"> </el-option>
            <el-option :key="20" :label="线上" :value="20"> </el-option>
          </el-select>
          <el-select v-else v-model="form.parentId" placeholder="请选择">
            <el-option :key="0" :label="0" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          @click="
            dialogFormVisible = false;
            this.form = {};
          "
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="addChannel"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "@/components/Search/index.vue";
import channel from "@/api/channel/channel";

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
      pagination: {
        page: 1,
        pageSize: 10,
        query: "",
      },
      visible: false,
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      form: {
        id: "",
        channelId: "",
        channelName: "",
        deep: "",
        parentId: "",
      },
      channelList: [
        {
          added: "",
          channelId: "",
          channelName: "",
          deep: "",
          id: "1",
          parentId: "",
          updated: "",
        },
      ],
      channel: {
        added: "",
        channelId: "",
        channelName: "",
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
    deletcChannel(id) {
      this.visible = false;
      channel.deleteChannelInfo(id).then((resp) => {
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
    updateChannel(data) {
      this.dialogFormVisible = true;
      this.form = data;
    },
    addChannel() {
      // 判断是否有id，有id则修改无则添加
      if (this.form.id === "") {
        channel.addChannelInfo(this.form).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: "添加渠道信息成功",
              type: "success",
            });
          }
          this.form = {};
          this.dialogFormVisible = false;
        });
      } else {
        channel.updateChannelinfo(this.form).then((resp) => {
          if (resp === 200) {
            this.$message({
              message: "修改渠道信息成功",
              type: "success",
            });
          }
          this.form = {};
          this.dialogFormVisible = false;
        });
      }
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
    resetData() {
      this.pagination.query = "";
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      await channel.getChannelInfo(this.pagination).then((resp) => {
        if (resp.code === 200) {
          this.channelList = resp.data.records;
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
