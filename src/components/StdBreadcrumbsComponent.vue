<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="item in breadcrumbs" :key="item.name"
      :label="item.name"
      :to="item.to || null"
    />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropOptions, PropType, SetupContext, watch, onMounted } from '@vue/composition-api';
import { AppRoute, Breadcrumb } from '@/router';

export interface Props extends PropOptions {
  xBreadcrumbs: Breadcrumb[];
  xRoute: AppRoute;
}

export default defineComponent({
  name: 'StdBreadcrumbs',

  props: {
    xBreadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      required: false
    },
    xRoute: {
      type: Object as PropType<AppRoute>,
      required: false
    }
  },

  setup (props: Props, ctx: SetupContext) {
    const base = useBase(props, ctx);
    return {
      ...base
    };
  }
});

function useBase (props: Props, ctx: SetupContext) {
  const breadcrumbs = <Ref<Breadcrumb[]>>ref([]);

  onMounted(() => {
    if (props.xBreadcrumbs) {
      breadcrumbs.value = props.xBreadcrumbs;
    } else if (props.xRoute && props.xRoute.meta && props.xRoute.meta.breadcrumbs) {
      breadcrumbs.value = props.xRoute.meta.breadcrumbs;
    } else if (ctx.root.$route.meta && ctx.root.$route.meta.breadcrumbs) {
      breadcrumbs.value = ctx.root.$route.meta.breadcrumbs;
    }
    if (breadcrumbs.value.length > 0) {
      for (const item of breadcrumbs.value) {
        if (item.to && item.to._params) {
          const params: { [paramKey: string]: string } = {};
          for (const param of item.to._params) {
            params[param] = ctx.root.$route.params[param];
          }
          item.to.params = params;
        }
      }
    }
  });

  return { breadcrumbs };
}
</script>

<style lang="scss">

</style>
