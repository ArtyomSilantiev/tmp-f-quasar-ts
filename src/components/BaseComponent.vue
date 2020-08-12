<template>
  <div>
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropOptions, PropType, SetupContext } from '@vue/composition-api';

export interface Props extends PropOptions {
  name: string;
}

export default defineComponent({
  name: 'BaseComponent',

  props: {
    name: {
      type: String as PropType<string>,
      default: 'BlankPage'
    }
  },

  setup (props: Props, ctx: SetupContext) {
    const base = useBase(props, ctx);
    return {
      ...base
    };
  }
})

function useBase (props: Props, ctx: SetupContext) {
  const name = ref(props.name);
  return { name };
}
</script>

<style lang="scss">

</style>
