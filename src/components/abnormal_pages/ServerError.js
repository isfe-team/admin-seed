import Figure from './Figure'

export default {
  name: 'ServerError',
  functional: true,
  render () {
    return (
      <Figure class="serve-error" message="500" description="抱歉，服务异常了">
        <i class="icon icon-exception icon-exception-500"></i>
      </Figure>
    )
  }
}
