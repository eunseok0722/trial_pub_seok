

<tempalte>
<div class="example">
  <span class="title">{{ text }}</span>
</div>
</tempalte>

<script>
export default {
  name: 'Example',
  data() {
    return {
      text: '단일파일 컴포넌트 예시'
    }
  }
}

</script>

<style scoped>
span.title {
  color: #ffbb00;
}
</style>