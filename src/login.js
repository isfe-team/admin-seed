;(function () {
  var $account = document.querySelector('#login_account')
  var $password = document.querySelector('#login_password')
  var $isAutoLogin = document.querySelector('.auto-login')
  var $error = document.querySelector('.error-message')

  document.querySelector('#login_form').addEventListener('submit', function (evt) {
    console.log('here')
    evt.preventDefault()
    let isAutoLoginValue = null
    if (!$account.value) {
      $error.classList.add('login-error-show')
      $error.innerText = '账号不能为空'
      return
    }
    if (!$password.value) {
      $error.classList.add('login-error-show')
      $error.innerText = '密码不能为空'
      return
    }
    window.location.href = document.location.origin
  })
})()
