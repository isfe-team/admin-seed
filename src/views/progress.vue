<template>
  <div id="progress">
    <div>
      <h3>标准的进度条</h3>
      <a-progress :percent="30" />
      <a-progress :percent="50" status="active" />
      <a-progress :percent="70" status="exception" />
      <a-progress :percent="100" />
      <a-progress :percent="50" :show-info="false" />
    </div>
    <div style="width: 170px;margin:30px 0;">
      <h3>小进度条</h3>
      <a-progress :percent="30" size="small" />
      <a-progress :percent="50" size="small" status="active" />
      <a-progress :percent="70" size="small" status="exception" />
      <a-progress :percent="100" size="small" />
    </div>
    <div style="margin:30px 0;">
      <h3>进度圈</h3>
      <a-progress type="circle" :percent="75" />
      <a-progress type="circle" :percent="70" status="exception" />
      <a-progress type="circle" :percent="100" />
    </div>
    <div>
      <h3>小进度圈</h3>
      <a-progress type="circle" :percent="30" :width="80" />
      <a-progress type="circle" :percent="70" :width="80" status="exception" />
      <a-progress type="circle" :percent="100" :width="80" />
    </div>
    <div  style="margin:30px 0;">
        <h3>分段进度条</h3>
      <a-tooltip title="3 done / 3 in progress / 4 to do">
        <a-progress :percent="60" :success-percent="30" />
      </a-tooltip>
      <a-tooltip title="3 done / 3 in progress / 4 to do">
        <a-progress :percent="60" :success-percent="30" type="circle" />
      </a-tooltip>
      <a-tooltip title="3 done / 3 in progress / 4 to do">
        <a-progress :percent="60" :success-percent="30" type="dashboard" />
      </a-tooltip>
    </div>
  </div>
</template>
<style lang="less">
.progress {
  h3{
    padding-bottom:10px;
  }
  .ant-progress-inner {
    margin-right: 20px;
  }
}
</style>
