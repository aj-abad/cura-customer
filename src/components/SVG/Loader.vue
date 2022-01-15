<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 16 16"
    overflow="visible"
  >
    <g
      id="path_1"
      transform="translate(12.138556,9.250000) scale(0,0)"
    >
      <path
        d="M15.900000,3.900000C16.300000,6.400000,15.700000,8.800000,14.300000,10.800000C12.900000,12.800000,10.800000,14.200000,8.400000,14.600000C7.500000,9.600000,10.900000,4.800000,15.900000,3.900000L15.900000,3.900000Z"
        transform="translate(-12.138556,-9.250000)"
        fill="#0d826e"
      />
    </g>
    <g
      id="path_2"
      transform="translate(8,5.500000) scale(0,0)"
    >
      <path
        d="M8,9.600000C8.500000,8.200000,9.300000,6.900000,10.400000,5.800000C10,4.200000,9.200000,2.700000,8,1.400000C6.800000,2.700000,6,4.200000,5.600000,5.800000C6,6.300000,6.400000,6.700000,6.800000,7.200000C7.300000,8,7.700000,8.800000,8,9.600000L8,9.600000Z"
        transform="translate(-8,-5.500000)"
        fill="#0d826e"
      />
    </g>
    <g
      id="path_3"
      transform="translate(3.838742,9.250000) scale(0,0)"
    >
      <path
        d="M1.700000,10.800000C3.100000,12.700000,5.100000,14.100000,7.500000,14.600000C7.400000,13.500000,7.400000,12.300000,7.600000,11.200000C7.300000,9.900000,6.800000,8.800000,6.100000,7.700000C4.700000,5.700000,2.600000,4.300000,0.200000,3.900000C-0.200000,6.300000,0.400000,8.800000,1.700000,10.800000Z"
        transform="translate(-3.838742,-9.250000)"
        fill="#0d826e"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Loader'
}
</script>
    <style scoped>
#path_1,
#path_2,
#path_3 {
  animation-duration: 2500ms;
  animation-iteration-count: infinite;
}

#path_1 {
  animation-name: anim_1;
}

#path_2 {
  animation-name: anim_2;
}

#path_3 {
  animation-name: anim_3;
}

@keyframes anim_1 {
  0% {
    opacity: 0;
    transform: translate(12.138556px, 9.25px) scale(0, 0);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.42, 1.5);
  }

  20% {
    opacity: 1;
    transform: translate(12.138556px, 9.25px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.42, 1.5);
  }

  80% {
    opacity: 1;
    transform: translate(12.138556px, 9.25px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.42, -0.5, 0.55, 0.95);
  }

  100% {
    transform: translate(12.138556px, 9.25px) scale(0, 0);
    opacity: 0;
  }
}

@keyframes anim_2 {
  0% {
    opacity: 0;
    transform: translate(8px, 5.5px) scale(0, 0);
  }

  20% {
    opacity: 0;
    transform: translate(8px, 5.5px) scale(0, 0);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.42, 1.5);
  }

  40% {
    opacity: 1;
    transform: translate(8px, 5.5px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.42, 1.5);
  }

  60% {
    opacity: 1;
    transform: translate(8px, 5.5px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.42, -0.5, 0.55, 0.95);
  }

  80% {
    opacity: 0;
    transform: translate(8px, 5.5px) scale(0, 0);
  }

  100% {
    transform: translate(8px, 5.5px) scale(0, 0);
  }
}

@keyframes anim_3 {
  0% {
    opacity: 0;
    transform: translate(3.838742px, 9.25px) scale(0, 0);
  }

  10% {
    opacity: 0;
    transform: translate(3.838742px, 9.25px) scale(0, 0);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.42, 1.5);
  }

  30% {
    opacity: 1;
    transform: translate(3.838742px, 9.25px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.445, 0.05, 0.42, 1.5);
  }

  70% {
    opacity: 1;
    transform: translate(3.838742px, 9.25px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.42, -0.5, 0.55, 0.95);
  }

  90% {
    opacity: 0;
    transform: translate(3.838742px, 9.25px) scale(0, 0);
  }

  100% {
    opacity: 0;
    transform: translate(3.838742px, 9.25px) scale(0, 0);
  }
}
</style>
