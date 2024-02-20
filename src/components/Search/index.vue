<template>
  <div class="search-div">
    <el-form label-width="70px" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="关 键 字">
            <el-input
              style="width: 95%"
              v-model="searchObj.keyword"
              placeholder="用户名/姓名/手机号码"
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
</template>
<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>
<script>
export default {
  name: "Search",
  /**
   * 初始值定义
   */
  data() {
    return {
      searchObj: {
        keyword: "",
      }, // 查询表单对象
    };
  },

  methods: {
    resetData() {
      this.searchObj = "";
    },
  },
};
</script>
