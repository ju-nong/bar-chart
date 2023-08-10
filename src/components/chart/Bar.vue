<template>
  <div
    class="bar-chart max-w-[360px] w-full h-[200px] pt-[50px] flex gap-x-[45px] items-end justify-center relative"
  >
    <div class="bar-chart-line">
      <div
        :style="`--line-start: ${
          props.data[0]
        }%; --line-rotate: ${calculateAngle(props.data)}deg`"
      ></div>
    </div>
    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="bar-chart-data"
      :class="classConfig[scoreToIndex(item)]"
      :style="`--bar-height: ${item}%;`"
    >
      <div class="bar-chart-data-point">
        <div class="bar-chart-data-point-label">
          {{ labelConfig[scoreToIndex(item)] }}
        </div>
        <div class="bar-chart-data-point-icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

const props = defineProps({
  data: {
    default: [0, 0],
    type: Array,
  },
});

const classConfig = reactive(["excellent", "good", "normal", "insufficient"]);
const labelConfig = reactive(["매우 우수", "우수", "보통", "미흡"]);

function scoreToIndex(score) {
  if (score >= 80) {
    return 0;
  } else if (score >= 60) {
    return 1;
  } else if (score >= 40) {
    return 2;
  }

  return 3;
}

function calculateAngle([start, end]) {
  const vertical = Math.abs(end - start);

  const angleInRadians = Math.atan(vertical / 67.5);
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  return end > start ? angleInDegrees * -1 : angleInDegrees;
}
</script>

<style lang="scss">
.bar-chart {
  background-image: linear-gradient(
      to bottom,
      rgba(203, 203, 203, 0.8),
      rgba(203, 203, 203, 0.8)
    ),
    linear-gradient(
      to bottom,
      rgba(203, 203, 203, 0.8),
      rgba(203, 203, 203, 0.8)
    ),
    linear-gradient(
      to bottom,
      rgba(203, 203, 203, 0.8),
      rgba(203, 203, 203, 0.8)
    );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 25%, 0 50%, 0 75%;

  &-line {
    width: 100px;
    height: calc(100% - 50px);
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    overflow: hidden;
    z-index: 2;

    > div {
      width: 500px;
      height: 1px;
      border: 1.5px dashed #000;
      position: absolute;
      left: 0;
      bottom: calc(var(--line-start));
      transform-origin: top left;
      transform: rotate(var(--line-rotate));
      transition: all 0.5s;
    }
  }

  &-data {
    width: 55px;
    height: var(--bar-height);
    border-radius: 20px 20px 0 0;
    position: relative;
    transition: all 0.5s;

    &-point {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      position: absolute;
      width: 81px;
      z-index: 3;
      transform: translate(-50%, calc(-100% + 5px));
      top: 0;
      left: 50%;

      &-label {
        text-align: center;
        color: #fff;
        font-weight: 700;
        width: 100%;
        font-size: 18px;
        line-height: 32px;
        border-radius: 4px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        position: relative;

        &::after {
          content: "";
          width: 8px;
          height: 8px;
          position: absolute;
          background-color: #000;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, calc(50% + 2px));
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }
      }

      &-icon {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        border: 1px solid #000;
        background-color: #fff;
      }
    }

    &.excellent {
      background: linear-gradient(#fb1fffe5, #f2a3ffe5);

      .bar-chart-data-point-label {
        background-color: #fb1fff;

        &::after {
          background-color: #fb1fff;
        }
      }

      .bar-chart-data-point-icon {
        border-color: #fb43ff;
      }
    }

    &.good {
      background: linear-gradient(#9c1fffe5, #f2a3ffe5);

      .bar-chart-data-point-label {
        background-color: #ae41ff;

        &::after {
          background-color: #ae41ff;
        }
      }

      .bar-chart-data-point-icon {
        border-color: #fb43ff;
      }
    }

    &.normal {
      background: linear-gradient(#00f19ae5, #68e5f5e5);

      .bar-chart-data-point-label {
        background-color: #25db9d;

        &::after {
          background-color: #25db9d;
        }
      }

      .bar-chart-data-point-icon {
        border-color: #00895d;
      }
    }

    &.insufficient {
      background: linear-gradient(#ff4a3fe5, #ffc34ee5);

      .bar-chart-data-point-label {
        background-color: #ff5823;

        &::after {
          background-color: #ff5823;
        }
      }

      .bar-chart-data-point-icon {
        border-color: #ff4a3f;
      }
    }
  }
}
</style>
