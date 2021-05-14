import Figure from './Figure'

export default {
  name: 'NotFound',
  // functional: true,
  render () {
    return (
      <Figure message="404" description={this.$t('abnormal.pageNotExist')}>
        <i class="icon icon-exception icon-exception-404"></i>
      </Figure>
    )
  }
}
