<template>
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
    <br />
    <br />
    <h3>迷你版</h3>
    <a-steps :current="1" size="small">
      <a-step title="Finished" />
      <a-step title="In Progress" />
      <a-step title="Waiting" />
    </a-steps>
    <br />
    <br />
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
    <br />
    <br />
    <h3>竖直方向的步骤条</h3>
    <a-steps direction="vertical" :current="1">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
  </div>
</template>
