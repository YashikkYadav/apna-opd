<template>
  <h1>hello</h1>
</template>

<script>
export default {
  mounted() {
    const doctorId = localStorage.getItem('doctor_id');
    const accessToken = localStorage.getItem('access_token');

    if (doctorId && accessToken) {
      this.$router.push('/create-rx');
    } else {
      this.$router.push('/login');
    }
  },
};
</script>
