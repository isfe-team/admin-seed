<template>
  <div>
    <div>
      <h3>基本用法</h3>
      <a-steps :current="1">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">Finished</template>
          <span slot="description">This is a description.</span>
        </a-step>
        <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </div>
    <div style="margin:30px 0;">
      <h3>迷你版</h3>
      <a-steps :current="1" size="small">
        <a-step title="Finished" />
        <a-step title="In Progress" />
        <a-step title="Waiting" />
      </a-steps>
    </div>
    <div>
      <h3>带图标的步骤条</h3>
      <a-steps>
        <a-step status="finish" title="Login">
          <a-icon slot="icon" type="user" />
        </a-step>
        <a-step status="finish" title="Verification">
          <a-icon slot="icon" type="solution" />
        </a-step>
        <a-step status="process" title="Pay">
          <a-icon slot="icon" type="loading" />
        </a-step>
        <a-step status="wait" title="Done">
          <a-icon slot="icon" type="smile-o" />
        </a-step>
      </a-steps>
    </div>
    <div style="margin:30px 0;">
      <h3>竖直方向的小型步骤条</h3>
      <a-steps direction="vertical" size="small" :current="1">
        <a-step title="Finished" description="This is a description." />
        <a-step title="In Progress" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </div>
    <div>
       <h3>步骤运行错误</h3>
      <a-steps :current="1" status="error">
        <a-step title="Finished" description="This is a description." />
        <a-step title="In Progress" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </div>
    <div style="margin:30px 0;">
       <h3>横向点状步骤条</h3>
      <a-steps progress-dot :current="1">
        <a-step title="Finished" description="This is a description." />
        <a-step title="In Progress" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
      <a-divider />
    </div>
    <div style="margin-bottom:30px;">
      <h3>点状步骤条</h3>
      <a-steps progress-dot :current="1" direction="vertical">
        <a-step title="Finished" description="This is a description. This is a description." />
        <a-step title="Finished" description="This is a description. This is a description." />
        <a-step title="In Progress" description="This is a description. This is a description." />
        <a-step title="Waiting" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </div>
  </div>
</template>
