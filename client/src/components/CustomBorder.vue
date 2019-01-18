<template>
  <div>
    <img :src="require(`@/assets/strut/${type}-middle.png`)" :class="[ 'c-border-middle', flipped ? 'flipped' : '', 'on-'+position ]" alt="middle border">
    <img :src="require(`@/assets/strut/${type}-side.png`)" :class="[ 'c-border-left', flipped ? 'flipped' : '', 'on-'+position ]" alt="left border">
    <img :src="require(`@/assets/strut/${type}-side.png`)" :class="[ 'c-border-right', flipped ? 'flipped' : '', 'on-'+position ]" alt="right border">
  </div>
</template>

<script>
export default {
  name: 'CustomBorder',
  props: {
    type: {
      default: 'divider'
    },
    flipped: {
      default: false
    },
    position: {
      default: 'top'
    }
  }
}
</script>

<style lang="stylus">
.c-border-left, .c-border-middle, .c-border-right
  position: absolute
  &.flipped
    transform: rotate(180deg)
  &.on-top
    top: -57px
  &.on-bottom
    bottom: -16px

.c-border-left, .c-border-right
  &.on-top.flipped
    top: -16px
  &.on-bottom.flipped
    bottom: -57px

.c-border-left, .c-border-middle
  left: 0
  &.flipped
    transform: scaleX(-1) rotate(180deg)

.c-border-middle
  width: 100%
  height: 72px
  padding: 0px 79px
  &.flipped
    top: -16px

.c-border-right
  right: 0
  transform: scaleX(-1)
</style>
