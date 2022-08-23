<template>
  <tr>
    <td v-for="col in columns" :key="col.shortLabel">{{ fixture[col.key] }}</td>
  </tr>
</template>

<script>

export default {
  name: 'PlayerResultsTableRow',
  props: ['columns', 'fixture']
}
</script>

<style scoped>

</style>