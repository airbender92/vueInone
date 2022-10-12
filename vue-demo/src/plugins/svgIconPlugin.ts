// https://cloud.tencent.com/developer/article/1764171
import SvgIcon from '@/components/SvgIcon.vue'

const SvgIconPlugin: any = {
  install: function (vue: any, options: any) {
    if (
      options &&
      options.imports &&
      Array.isArray(options.imports) &&
      options.imports.length > 0
    ) {
      // 按需引入图标
      const { imports } = options;
      imports.forEach((name: any) => {
        require(`@/icons/svg/${name}.svg`);
      });
    } else {
      // 全量引入图标
      const ctx = require.context('@/icons/svg', false, /\.svg$/);
      const reg = /\.\/([A-Za-z0-9\-_]+)\.svg$/;
      ctx.keys().forEach((path: any) => {
        const temp = path.match(reg);
        if (!temp) return;
        const name = temp[1];
        require(`@/icons/svg/${name}.svg`)
      });
    }
    vue.component(SvgIcon.name, SvgIcon);
  }
};

export default SvgIconPlugin;