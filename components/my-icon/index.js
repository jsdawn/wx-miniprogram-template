// 阿里图库 iconfont
// font转base64 https://transfonter.org/
import { ComponentWithComputed } from 'miniprogram-computed';

ComponentWithComputed({
  options: {
    virtualHost: true,
  },
  externalClasses: ['class'],

  properties: {
    style: String, // external style
    color: {
      type: String,
    },
    name: {
      type: String,
    },
    prefix: {
      type: String,
      value: 'wr',
    },
    size: {
      type: String,
    },
  },

  data: {},

  computed: {
    isImage(data) {
      return data.name.indexOf('/') !== -1;
    },
  },

  methods: {},
});
