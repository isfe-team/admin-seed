<template>
  <div>
    <div style="display:flex;">
      <div>
        <h3>典型卡片</h3>
        <a-card title="Default size card" style="width: 300px;margin-right:40px;">
          <a slot="extra" href="#">more</a>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </div>
      <div>
         <h3>典型卡片</h3>
        <a-card size="small" title="Small size card" style="width: 300px">
          <a slot="extra" href="#">more</a>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </div>
      <div>
        <h3 style="margin-left:40px;">更灵活的内容展示</h3>
        <a-card hoverable style="width: 240px;margin-left:40px;">
          <img
            slot="cover"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
          <a-card-meta title="Europe Street beat">
            <template slot="description">www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
    <h3>栅格卡片 </h3>
    <div style="background:#ECECEC; padding:30px;margin-top:30px;">
      <a-card title="Card title" :bordered="false" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </a-card>
    </div>
  </div>
</template>
