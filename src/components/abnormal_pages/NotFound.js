import Figure from './Figure'

export default {
  name: 'NotFound',
  // functional: true,
  render () {
    return (
      <Figure message="404" description={this.$t('404.message')}>
        <i class="icon icon-exception icon-exception-404"></i>
      </Figure>
    )
  }
}
