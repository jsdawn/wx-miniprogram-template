Component({
  options: {
    virtualHost: true,
  },
  externalClasses: ['class'],

  properties: {
    active: {
      type: Number,
      value: 0,
    },
    list: {
      type: Array,
      value: [],
    },
    safebottom: {
      type: Boolean,
      value: false,
    },
    fixed: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    tabChange(e) {
      const { index } = e.currentTarget.dataset;
      if (index === this.data.active) {
        return;
      }
      this.setData({
        active: index,
      });
      this.triggerEvent('change', { index, item: this.data.list[index] });
    },
  },
});
